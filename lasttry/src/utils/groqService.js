import { GoogleGenAI } from "@google/genai";

// Initialize the Google client pulling the secure key from your environment
const ai = new GoogleGenAI({ 
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});

export async function processNotes(base64Image) {
  try {
    // Strip the "data:image/jpeg;base64," prefix that HTML canvas generates
    const rawBase64 = base64Image.split(",")[1];
    const mimeType = base64Image.split(";")[0].split(":")[1];

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: rawBase64,
            mimeType: mimeType
          }
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
      config: {
        // Forces the engine to return a perfectly structured JSON string
        responseMimeType: "application/json" 
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Gemini Vision processing failure:", error);
    throw new Error("Failed to process notes through the Gemini pipeline.");
  }
}
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

export const generateFlashcardsFromImage = async (imageBlobUrl) => {
  try {
    const base64Image = await fileToBase64(imageBlobUrl);

    const visionResponse = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "You are an expert OCR transcription AI. Read the handwritten notes or diagrams in this image. Transcribe all text accurately. Return only raw text." 
            },
            { 
              type: "image_url", 
              image_url: { url: base64Image } 
            }
          ]
        }
      ]
    });

    const transcription = visionResponse.choices[0]?.message?.content || "";

    const aiResponse = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: `You are an elite educational assistant. Take the raw lecture notes transcription and synthesize them into high-yield flashcards. Output a valid JSON object containing an array of flashcards. Each card object needs a key for the question and a key for the answer. \n\n Notes:\n${transcription}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const rawJson = JSON.parse(aiResponse.choices[0]?.message?.content || "{}");
    
    // Automatically find the card array regardless of what key the AI named it
    const cleanArray = findArrayInObject(rawJson);
    return cleanArray || [];
  } catch (error) {
    console.error("Groq AI API Failure (Flashcards):", error);
    throw error;
  }
};

// LIVE FUNCTIONAL REVISION SUMMARY ENGINE
export async function generateSummaryFromImage(imageBlobUrl) {
  try {
    // 1. Convert local blob URL to an acceptable base64 data stream
    const base64Image = await fileToBase64(imageBlobUrl);

    // 2. Query the multimodal node to extract a direct high-impact summary
    const summaryResponse = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: [
            { 
              type: "text", 
              text: "You are an elite educational analyst. Analyze these lecture notes or textbook diagrams. Provide a concise, high-impact 3-4 sentence master summary highlighting the core concepts, definitions, or equations for quick pre-quiz revision. Return only the summary paragraph—do not include introductory phrases, headers, or conversational filler." 
            },
            { 
              type: "image_url", 
              image_url: { url: base64Image } 
            }
          ]
        }
      ]
    });

    return summaryResponse.choices[0]?.message?.content || "Core overview layers could not be formulated for this note array.";
  } catch (error) {
    console.error("Groq AI API Failure (Summary):", error);
    return "The system encountered an error parsing the document framework for a pre-quiz briefing.";
  }
}

// Add these exports at the bottom of your src/utils/groqService.js file

// TEXT INTEGRATION ENGINE: Generates flashcard blocks instantly from document text
export const generateFlashcardsFromText = async (rawText) => {
  try {
    const aiResponse = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: `You are an elite educational assistant. Take the raw lecture notes text content and synthesize them into high-yield flashcards. Output a valid JSON object containing an array of flashcards. Each card object needs a key for the question and a key for the answer. \n\n Notes:\n${rawText}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const rawJson = JSON.parse(aiResponse.choices[0]?.message?.content || "{}");
    const cleanArray = findArrayInObject(rawJson);
    return cleanArray || [];
  } catch (error) {
    console.error("Groq AI Text Flashcard Ingestion Failure:", error);
    throw error;
  }
};

// TEXT SUMMARY ENGINE: Extracts 3-4 sentence pre-quiz master brief from text strings
export const generateSummaryFromText = async (rawText) => {
  try {
    const summaryResponse = await groq.chat.completions.create({
      model: "qwen/qwen3.6-27b",
      messages: [
        {
          role: "user",
          content: `You are an elite educational analyst. Analyze this lecture document text. Provide a concise, high-impact 3-4 sentence master summary highlighting the core concepts, definitions, or equations for quick pre-quiz revision. Return only the summary paragraph—do not include introductory phrases, headers, or conversational filler.\n\n Notes:\n${rawText}`
        }
      ]
    });

    return summaryResponse.choices[0]?.message?.content || "Core overview layers could not be formulated for this text array.";
  } catch (error) {
    console.error("Groq AI Text Summary Ingestion Failure:", error);
    return "The system encountered an error parsing the document frame context.";
  }
}