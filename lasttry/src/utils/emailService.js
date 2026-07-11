import { supabase } from './supabaseClient';

const RESEND_FROM = 'NoteNinja <onboarding@resend.dev>';

// Dynamically pulls the target email from your local configuration
const OWNER_EMAIL = (import.meta.env.VITE_OWNER_EMAIL || 'adityavishwakarma121007@gmail.com').toLowerCase().trim();

// In dev:  /api/resend/emails → Vite proxy configuration setup
// In prod: /api/resend/emails → Production/Vercel serverless gateway deployment
const RESEND_URL = '/api/resend/emails';

let rateLimitStore = {};

// Local standard rate limiter
export async function checkRateLimit(identifier, maxRequests = 5, windowMs = 60000) {
  const now = Date.now();
  const windowStart = now - windowMs;

  if (!rateLimitStore[identifier]) {
    rateLimitStore[identifier] = [];
  }

  rateLimitStore[identifier] = rateLimitStore[identifier].filter(
    (timestamp) => timestamp > windowStart
  );

  if (rateLimitStore[identifier].length >= maxRequests) {
    const oldestRequest = rateLimitStore[identifier][0];
    const retryAfter = Math.ceil((oldestRequest + windowMs - now) / 1000);

    return {
      success: false,
      remaining: 0,
      retryAfter,
      message: `Rate limit exceeded. Try again in ${retryAfter} seconds.`,
    };
  }

  rateLimitStore[identifier].push(now);

  return {
    success: true,
    remaining: maxRequests - rateLimitStore[identifier].length,
    retryAfter: 0,
    message: 'Request allowed',
  };
}

// Emulated Arcjet rate limiter configuration
export async function checkArcjetRateLimit(identifier, config = { max: 5, window: '1m' }) {
  const windowMs = config.window === '1m' ? 60000 : 60000;
  const maxRequests = config.max || 5;

  const now = Date.now();
  const windowStart = now - windowMs;
  const arcjetKey = `arcjet-${identifier}`;

  if (!rateLimitStore[arcjetKey]) {
    rateLimitStore[arcjetKey] = [];
  }

  rateLimitStore[arcjetKey] = rateLimitStore[arcjetKey].filter(
    (timestamp) => timestamp > windowStart
  );

  const currentCount = rateLimitStore[arcjetKey].length;

  if (currentCount >= maxRequests) {
    const oldestRequest = rateLimitStore[arcjetKey][0];
    const retryAfter = Math.ceil((oldestRequest + windowMs - now) / 1000);

    return {
      allowed: false,
      remaining: 0,
      reset: new Date(oldestRequest + windowMs),
      retryAfter,
      reason: 'RATE_LIMITED',
      message: `Arcjet: Rate limit exceeded. Blocked until ${new Date(oldestRequest + windowMs).toLocaleTimeString()}.`,
    };
  }

  rateLimitStore[arcjetKey].push(now);

  return {
    allowed: true,
    remaining: maxRequests - currentCount - 1,
    reset: new Date(now + windowMs),
    retryAfter: 0,
    reason: 'OK',
    message: 'Request allowed by Arcjet',
  };
}

// Core unified request handler (FIXED: Authorization header restored)
async function postEmail(payload) {
  console.log("Routing email transmission payload packet:", payload);
  const response = await fetch(RESEND_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${import.meta.env.VITE_RESEND_API_KEY}`, // Restored the missing key link
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
}

// 1. Verification Test Email Trigger
export async function sendTestEmail(userEmail, userName) {
  const normalizedInputEmail = (userEmail || '').toLowerCase().trim();
  const isUnauthorized = normalizedInputEmail !== OWNER_EMAIL;

  try {
    const data = await postEmail({
      from: RESEND_FROM,
      to: [OWNER_EMAIL],
      subject: 'Verification Loop from NoteNinja Command Center',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000; color: #d4d4d8;">
          <div style="background: linear-gradient(135deg, #1c1917, #000000); padding: 24px; border-radius: 12px 12px 0 0; border: 1px solid #1c1917; border-bottom: none;">
            <h1 style="margin: 0; color: #f59e0b; font-size: 24px;">NoteNinja</h1>
            <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 14px; opacity: 0.9;">Integration Loop Verification</p>
          </div>
          <div style="background: #050505; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #1c1917;">
            <p style="color: #ffffff; font-size: 16px;">Hi ${userName || 'there'},</p>
            <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
              This confirms your relative proxy routing configuration is running smoothly! NoteNinja is prepared to sync generated flashcard arrays down to your mail client destination.
            </p>

            ${isUnauthorized ? `
              <div style="margin-top: 20px; padding: 12px; background-color: #1c1917; border: 1px dashed #78350f; border-radius: 8px; font-size: 12px; color: #f59e0b;">
                <strong>🛠️ Sandbox Reroute Active:</strong> This action was triggered by unauthorized email signature <code>${userEmail}</code> but delivered here to the API key owner for testing.
              </div>
            ` : ''}

            <p style="color: #52525b; font-size: 13px; margin-top: 24px; border-top: 1px solid #1c1917; padding-top: 12px;">
              Dispatched at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        </div>
      `,
    });

    return { success: true, id: data.id, message: 'Verification text sent!' };
  } catch (error) {
    return { success: false, message: error.message };
  }
}

// 2. Synchronized Flashcard Deck Email Delivery
export async function sendFlashcardDeckEmail(userEmail, userName, deckTitle, flashcards) {
  const normalizedInputEmail = (userEmail || '').toLowerCase().trim();
  const isUnauthorized = normalizedInputEmail !== OWNER_EMAIL;

  try {
    if (!flashcards || flashcards.length === 0) {
      throw new Error("Cannot process synchronization with an empty card array container.");
    }

    const cardRowsHtml = flashcards.map((card, idx) => `
      <div style="background: #000000; padding: 16px; border-radius: 8px; border: 1px solid #1c1917; border-left: 4px solid #f59e0b; margin-bottom: 12px;">
        <p style="margin: 0 0 8px 0; color: #ffffff; font-weight: 600; font-size: 14px;">
          CARD #${idx + 1}: ${card.question || 'Review Question Node'}
        </p>
        <p style="margin: 0; color: #a1a1aa; font-size: 13px; line-height: 1.5; padding-top: 6px; border-top: 1px dashed #1c1917;">
          Ans: ${card.answer || 'Review Answer Node'}
        </p>
      </div>
    `).join('');

    const data = await postEmail({
      from: RESEND_FROM,
      to: [OWNER_EMAIL],
      subject: `🥷 NoteNinja Review Array: ${deckTitle || 'Generated Notes'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #000000; color: #d4d4d8; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1c1917, #000000); color: white; padding: 24px; border-radius: 12px 12px 0 0; border: 1px solid #1c1917; border-bottom: none;">
            <h1 style="margin: 0; font-size: 24px; color: #f59e0b;">NoteNinja</h1>
            <p style="margin: 8px 0 0; color: #a1a1aa; font-size: 14px;">Spaced Repetition Review Deck</p>
          </div>
          <div style="background: #050505; padding: 24px; border-radius: 0 0 12px 12px; border: 1px solid #1c1917;">
            <p style="color: #ffffff; font-size: 16px; margin-top: 0;">Hi ${userName || 'there'},</p>
            <p style="color: #a1a1aa; font-size: 15px; line-height: 1.6;">
              Your live AI workspace extraction has been completed successfully. Review your synchronized structural **${deckTitle || 'Lecture Workspace'}** cards below:
            </p>
            
            <div style="margin: 24px 0;">
              ${cardRowsHtml}
            </div>

            <p style="color: #52525b; font-size: 12px; margin-top: 24px; border-top: 1px solid #1c1917; padding-top: 12px; text-align: center;">
              Sent via Llama proxy runtime context setup.
            </p>

            ${isUnauthorized ? `
              <div style="margin-top: 16px; padding: 10px; background-color: #1c1917; border: 1px dashed #78350f; border-radius: 6px; font-size: 11px; color: #f59e0b; text-align: center;">
                * Intended Recipient Context: <code>${userEmail}</code> (Rerouted safely via sandbox testing configurations)
              </div>
            ` : ''}
          </div>
        </div>
      `,
    });

    return { success: true, id: data.id, message: 'Flashcard workspace deck alert sent!' };
  } catch (error) {
    console.error('Flashcard email dispatcher failure:', error);
    return { success: false, message: error.message };
  }
}

// 3. New Account Sign-Up Welcome Email
export const sendWelcomeEmail = async (userEmail) => {
  const normalizedInputEmail = (userEmail || '').toLowerCase().trim();
  const isUnauthorized = normalizedInputEmail !== OWNER_EMAIL;

  try {
    const htmlContent = `
      <div style="background-color: #000000; color: #d4d4d8; font-family: sans-serif; padding: 40px; max-width: 600px; margin: 0 auto; border: 1px solid #1c1917; border-radius: 16px;">
        <div style="text-align: center; margin-bottom: 32px;">
          <span style="font-size: 24px; font-weight: bold; color: #f59e0b; letter-spacing: 1px;">NoteNinja</span>
          <p style="color: #71717a; font-size: 14px; margin-top: 8px;">Workspace Architecture Initialized</p>
        </div>
        
        <h2 style="color: #ffffff; font-size: 20px; font-weight: 600; margin-bottom: 16px;">Welcome to the Elite Matrix</h2>
        
        <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 24px;">
          Your account signature has been successfully registered. NoteNinja has established your educational workspace context, fully unlocking access to multi-modal vision parsing engines and live cloud notebook storage.
        </p>
        
        <div style="background-color: #050505; border: 1px solid #1c1917; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
          <h4 style="color: #f59e0b; margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Registered Identity Signature</h4>
          <span style="font-size: 14px; color: #ffffff; font-family: monospace;">${userEmail}</span>
        </div>

        ${isUnauthorized ? `
          <div style="margin-bottom: 24px; padding: 12px; background-color: #1c1917; border: 1px dashed #78350f; border-radius: 8px; font-size: 12px; color: #f59e0b;">
            <strong>🛠️ Dev Mode Intercept:</strong> This welcome sequence was triggered by account entry <code>${userEmail}</code> and rerouted directly to the configured API key owner box.
          </div>
        ` : ''}
        
        <p style="font-size: 13px; color: #52525b; line-height: 1.5;">
          Ready to optimize your study routine? Head over to the workspace panel, drop in a lecture screenshot or diagram sheet, and activate your memory retention metrics loops instantly.
        </p>
        
        <div style="border-top: 1px solid #1c1917; margin-top: 32px; padding-top: 20px; text-align: center; font-size: 11px; color: #52525b;">
          Automated Transmission • NoteNinja Premium Network Tier
        </div>
      </div>
    `;

    await postEmail({
      from: RESEND_FROM,
      to: [OWNER_EMAIL],
      subject: 'Workspace Architecture Initialized | Welcome to NoteNinja',
      html: htmlContent,
    });

    return true;
  } catch (error) {
    console.error("Welcome email delivery failure:", error.message);
    return true;
  }
};