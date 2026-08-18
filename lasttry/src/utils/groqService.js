import { GoogleGenAI } from "@google/genai";

// Initialize the Google client pulling the secure key from your environment
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

// Helper function to deep-scan the AI response object and find the array of cards
const findArrayInObject = (obj) => {
  if (Array.isArray(obj)) return obj;
  if (typeof obj !== 'object' || obj === null) return null;
  
  for (const key in obj) {
    if (Array.isArray(obj[key])) return obj[key];
    if (typeof obj[key] === 'object') {
      const nested = findArrayInObject(obj[key]);
      if (nested) return nested;
    }
  }
  return null;
};

// Internal Helper: Standardize Base64 strings for Gemini Vision ingestion
const formatBase64ForGemini = (base64String) => {
  const rawBase64 = base64String.split(",")[1] || base64String;
  const mimeMatch = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
  return { data: rawBase64, mimeType };
};

// If you don't already have fileToBase64 imported from elsewhere, here is the standard converter:
export const fileToBase64 = async (blobUrl) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

// ==========================================
// 1. UNIFIED ENGINE (Highly Recommended for Performance)
// ==========================================
export async function processNotes(base64Image) {
  try {
    const { data, mimeType } = formatBase64ForGemini(base64Image);

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        {
          inlineData: { data, mimeType }
        },
        {
          text: `You are an elite study assistant. Analyze these notes and return a raw JSON object strictly using this structure:
          {
            "title": "A short, descriptive title",
            "summary": "A 2-3 sentence summary of the core concepts",
            "flashcards": [
              { "question": "Question text here", "answer": "Answer text here" }
            ]
          }`
        }
      ],
      config: { responseMimeType: "application/json" }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Vision processing failure:", error);
    throw new Error("Failed to process notes through the Gemini pipeline.");
  }
}

// ==========================================
// 2. IMAGE PIPELINES
// ==========================================
export const generateFlashcardsFromImage = async (imageBlobUrl) => {
  try {
    const base64Image = await fileToBase64(imageBlobUrl);
    const { data, mimeType } = formatBase64ForGemini(base64Image);

    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { inlineData: { data, mimeType } },
        { text: "You are an elite educational assistant. Extract the text/diagrams from this image and synthesize them into high-yield flashcards. Output a valid JSON object containing an array of flashcards. Each card object needs a key for 'question' and a key for 'answer'." }
      ],
      config: { responseMimeType: "application/json" }
    });

    const rawJson = JSON.parse(aiResponse.text || "{}");
    const cleanArray = findArrayInObject(rawJson);
    return cleanArray || [];
  } catch (error) {
    console.error("Gemini AI API Failure (Flashcards):", error);
    throw error;
  }
};

export async function generateSummaryFromImage(imageBlobUrl) {
  try {
    const base64Image = await fileToBase64(imageBlobUrl);
    const { data, mimeType } = formatBase64ForGemini(base64Image);

    const summaryResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { inlineData: { data, mimeType } },
        { text: "You are an elite educational analyst. Analyze these lecture notes or textbook diagrams. Provide a concise, high-impact 3-4 sentence master summary highlighting the core concepts, definitions, or equations for quick pre-quiz revision. Return only the summary paragraph—do not include introductory phrases, headers, or conversational filler." }
      ]
    });

    return summaryResponse.text || "Core overview layers could not be formulated for this note array.";
  } catch (error) {
    console.error("Gemini AI API Failure (Summary):", error);
    return "The system encountered an error parsing the document framework for a pre-quiz briefing.";
  }
}

// ==========================================
// 3. TEXT PIPELINES
// ==========================================
export const generateFlashcardsFromText = async (rawText) => {
  try {
    const aiResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { text: `You are an elite educational assistant. Take the raw lecture notes text content and synthesize them into high-yield flashcards. Output a valid JSON object containing an array of flashcards. Each card object needs a key for 'question' and a key for 'answer'. \n\n Notes:\n${rawText}` }
      ],
      config: { responseMimeType: "application/json" }
    });

    const rawJson = JSON.parse(aiResponse.text || "{}");
    const cleanArray = findArrayInObject(rawJson);
    return cleanArray || [];
  } catch (error) {
    console.error("Gemini AI Text Flashcard Ingestion Failure:", error);
    throw error;
  }
};

export const generateSummaryFromText = async (rawText) => {
  try {
    const summaryResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: [
        { text: `You are an elite educational analyst. Analyze this lecture document text. Provide a concise, high-impact 3-4 sentence master summary highlighting the core concepts, definitions, or equations for quick pre-quiz revision. Return only the summary paragraph—do not include introductory phrases, headers, or conversational filler.\n\n Notes:\n${rawText}` }
      ]
    });

    return summaryResponse.text || "Core overview layers could not be formulated for this text array.";
  } catch (error) {
    console.error("Gemini AI Text Summary Ingestion Failure:", error);
    return "The system encountered an error parsing the document frame context.";
  }
}