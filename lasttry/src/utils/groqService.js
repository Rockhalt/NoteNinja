import Tesseract from 'tesseract.js';

// ==========================================
// 1. IN-BROWSER OCR PIPELINE (Tesseract.js)
// ==========================================
export const extractTextFromImage = async (imageBlobUrl) => {
  try {
    // Tesseract.js runs entirely in the client's browser
    const { data: { text } } = await Tesseract.recognize(
      imageBlobUrl,
      'eng',
      { logger: m => console.log(m) } // Logs OCR reading progress to the browser console
    );
    return text;
  } catch (error) {
    console.error("Tesseract.js extraction failed:", error);
    throw new Error("Failed to extract text from the image locally.");
  }
};

// ==========================================
// 2. UNIFIED ENGINE (Tesseract + GPT-OSS-120B)
// ==========================================
export async function processNotes(imageBlobUrl) {
  try {
    // Step 1: Extract text locally to avoid vision model rate limits
    const extractedText = await extractTextFromImage(imageBlobUrl);
    
    if (!extractedText.trim()) {
      throw new Error("No readable text detected in the image.");
    }

    // Step 2: Send the extracted text to Groq's 120B reasoning model
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b", 
        messages: [
          {
            role: "user",
            content: `You are an elite study assistant. Analyze this extracted text from a student's lecture notes and return a raw JSON object strictly using this structure. Do not output markdown code blocks or conversational text:
{
  "title": "A short, descriptive title",
  "summary": "A 2-3 sentence executive master summary of core concepts",
  "flashcards": [
    { "question": "Question text here", "answer": "Answer text here" }
  ]
}

Extracted Notes:
${extractedText}`
          }
        ],
        response_format: { type: "json_object" },
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.error?.message || `Groq API error: ${response.status}`);
    }

    const data = await response.json();
    return JSON.parse(data.choices[0].message.content);

  } catch (error) {
    console.error("Pipeline processing error:", error);
    throw error;
  }
}

// ==========================================
// 3. COMPONENT WRAPPERS
// ==========================================
export const generateFlashcardsFromImage = async (imageBlobUrl) => {
  const data = await processNotes(imageBlobUrl);
  return data.flashcards || [];
};

export const generateSummaryFromImage = async (imageBlobUrl) => {
  const data = await processNotes(imageBlobUrl);
  return data.summary || "Summary could not be generated.";
};

// ==========================================
// 4. TEXT PIPELINES (Direct Groq API Integration)
// ==========================================
export const generateFlashcardsFromText = async (rawText) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b", 
        messages: [{
          role: "user",
          content: `You are an elite educational assistant. Take the raw lecture notes text content and synthesize them into high-yield flashcards. Output a valid JSON object containing a 'flashcards' array. Each card object needs a key for 'question' and a key for 'answer'.\n\nNotes:\n${rawText}`
        }],
        response_format: { type: "json_object" }
      })
    });
    
    if (!response.ok) {
        throw new Error(`Groq API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const parsed = JSON.parse(data.choices[0].message.content);
    return parsed.flashcards || [];
  } catch (error) {
    console.error("Groq Text Flashcard Ingestion Failure:", error);
    throw error;
  }
};

export const generateSummaryFromText = async (rawText) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: [{
          role: "user",
          content: `You are an elite educational analyst. Analyze this lecture document text. Provide a concise, high-impact 3-4 sentence master summary highlighting the core concepts, definitions, or equations for quick pre-quiz revision. Return only the summary paragraph—do not include introductory phrases, headers, or conversational filler.\n\nNotes:\n${rawText}`
        }]
      })
    });
    
    if (!response.ok) {
        throw new Error(`Groq API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content || "Core overview layers could not be formulated for this text array.";
  } catch (error) {
    console.error("Groq Text Summary Ingestion Failure:", error);
    return "The system encountered an error parsing the document frame context.";
  }
};