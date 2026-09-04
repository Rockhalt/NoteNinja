🥷 NoteNinja
High-Velocity AI Study Synthesis Engine

🚀 Launch Live Application
https://noteninja-sigma.vercel.app/

NoteNinja is a 100% serverless, high-velocity educational web platform designed to streamline studying by automating knowledge extraction, active recall testing, and performance tracking. By combining in-browser OCR with ultra-low-latency AI reasoning, NoteNinja eliminates the friction of manual note-taking and instantly transforms raw lectures or uploaded diagrams into structured memory nodes.

⚡ Core Features
In-Browser Vision Processing: Utilizes Tesseract.js to process image payloads and extract text directly within the client's browser, ensuring zero server upload times and bypassing API rate limits.

Instant Knowledge Synthesis: Hooks directly into Groq’s high-throughput LPU infrastructure (openai/gpt-oss-120b) to synthesize raw extracted text into high-yield flashcards and executive summaries in milliseconds.

The Recall Arena: A distraction-free, interactive 3D flashcard testing interface designed for rapid active recall and memory retention.

Vault Repositories: Organizes study materials into dynamic structural profiles, utilizing Supabase (PostgreSQL) for secure telemetry, data isolation, and session management.

Premium Glassmorphism UI: Built with custom CSS glass components, featuring a dark-themed, high-contrast aesthetic with ambient blurs and gold accents.

🛠️ Technical Stack
Frontend Framework: React.js + Vite (100% Client-Side Architecture)

Optical Character Recognition (OCR): Tesseract.js (In-Browser Execution)

AI Inference Engine: Groq API (openai/gpt-oss-120b)

Database & Auth: Supabase (PostgreSQL)

Deployment: Vercel

💻 Local Development Setup
To run NoteNinja locally on your machine, follow these steps:

1. Clone the Repository
Bash
git clone https://github.com/your-username/noteninja.git
cd noteninja
2. Install Dependencies
Bash
npm install
3. Environment Configuration
Create a .env file in the root directory of the project and add your Groq and Supabase keys:

Code snippet
# Groq AI Key
VITE_GROQ_API_KEY=gsk_your_groq_api_key_here

# Supabase Keys (If applicable)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
Security Note: Ensure your .env file is listed in your .gitignore before committing any changes.

4. Launch the Development Server
Bash
npm run dev
Navigate to http://localhost:5173 in your browser to view the application.

🧠 Workflow Architecture
Ingestion: User uploads an image of a diagram/notes or pastes raw text into the Vault interface.

Local Extraction: If an image is uploaded, Tesseract.js maps the text vectors entirely in the browser.

AI Reasoning: The extracted string is beamed directly to Groq's 120B reasoning model.

JSON Structuring: The model strictly adheres to a JSON schema, returning a parsed summary and a matrix of question-answer nodes.

UI Rendering: The React state updates instantly, populating the 3D flashcard deck for immediate review.
