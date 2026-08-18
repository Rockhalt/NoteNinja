import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

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

const formatBase64ForGemini = (base64String) => {
  const rawBase64 = base64String.split(",")[1] || base64String;
  const mimeMatch = base64String.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);
  const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
  return { data: rawBase64, mimeType };
};

// ⚡ NEW: High-Speed Image Compression Engine
// This intercepts massive camera files and shrinks them to 1024px WebP/JPEG format
export const compressImageForGemini = async (blobUrl) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      // 1024px is the sweet spot: perfectly readable for OCR, extremely fast to upload
      const MAX_WIDTH = 1024; 
      const MAX_HEIGHT = 1024;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > MAX_WIDTH) {
          height *= MAX_WIDTH / width;
          width = MAX_WIDTH;
        }
      } else {
        if (height > MAX_HEIGHT) {
          width *= MAX_HEIGHT / height;
          height = MAX_HEIGHT;
        }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      // Compress to JPEG at 75% quality to aggressively cut upload latency
      resolve(canvas.toDataURL('image/jpeg', 0.75));
    };
    img.onerror = reject;
    img.src = blobUrl;
  });
};

// ==========================================
// 1. UNIFIED ENGINE 
// ==========================================
export async function processNotes(imageBlobUrl) {
  try {
    // FIXED: Route the image through the compressor before hitting Gemini
    const compressedBase64 = await compressImageForGemini(imageBlobUrl);
    const { data, mimeType } = formatBase64ForGemini(compressedBase64);

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
    // FIXED: Route the image through the compressor
    const compressedBase64 = await compressImageForGemini(imageBlobUrl);
    const { data, mimeType } = formatBase64ForGemini(compressedBase64);

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
    // FIXED: Route the image through the compressor
    const compressedBase64 = await compressImageForGemini(imageBlobUrl);
    const { data, mimeType } = formatBase64ForGemini(compressedBase64);

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