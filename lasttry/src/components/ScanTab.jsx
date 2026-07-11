import React from 'react';
import { UploadCloud, X, Cpu, Sparkles, FileImage, RefreshCw } from 'lucide-react';

// Internal Premium Glass Layout Wrapper
function GlassPanel({ children, style = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.55) 0%, rgba(3, 3, 3, 0.35) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(38, 38, 38, 0.4)',
      borderRadius: '20px',
      padding: '32px',
      boxSizing: 'border-box',
      boxShadow: '0 12px 40px 0 rgba(0, 0, 0, 0.5)',
      ...style
    }}>
      {children}
    </div>
  );
}

export default function ScanTab({
  previewUrl,
  selectedFile,
  isProcessing,
  onFileChange,
  onClearFile,
  onProcessNotes
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Title & Context Header */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Vision Engine Capture</h2>
        <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Upload whiteboard snaps or lecture diagrams to generate flashcard structures</p>
      </div>

      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
        
        {/* Dropzone Upload Workspace (Left / Primary) */}
        <div style={{ flex: '1 1 450px', display: 'flex', flexDirection: 'column' }}>
          <GlassPanel style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '340px', relative: 'true' }}>
            
            {!previewUrl ? (
              // Empty Upload State Panel
              <label style={{
                width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: '16px', cursor: isProcessing ? 'not-allowed' : 'pointer',
                padding: '40px 20px', boxSizing: 'border-box'
              }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={onFileChange} 
                  disabled={isProcessing}
                  style={{ display: 'none' }} 
                />
                
                <div style={{ 
                  width: '56px', height: '56px', borderRadius: '14px', 
                  background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.06) 0%, transparent 100%)',
                  border: '1px solid rgba(245, 158, 11, 0.15)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s ease'
                }} className="upload-icon-box">
                  <UploadCloud size={24} style={{ color: '#f59e0b' }} />
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '15px', color: '#ffffff', fontWeight: '600' }}>
                    Select structural diagram image
                  </span>
                  <span style={{ display: 'block', fontSize: '12px', color: '#52525b', marginTop: '6px' }}>
                    Supports PNG, JPG, or high-res capture sheets
                  </span>
                </div>
              </label>
            ) : (
              // Populated Image View Canvas State Panel
              <div style={{ width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(38,38,38,0.6)', boxShadow: '0 8px 32px rgba(0,0,0,0.4)', maxWidth: '100%', maxHeight: '400px' }}>
                  <img 
                    src={previewUrl} 
                    alt="Workspace note preview payload" 
                    style={{ display: 'block', maxWidth: '100%', maxHeight: '400px', objectFit: 'contain' }} 
                  />
                  
                  {/* Dynamic Laser Line Overlay Triggered exclusively when system parses */}
                  {isProcessing && (
                    <div style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '3px',
                      background: 'linear-gradient(90deg, transparent, #f59e0b, transparent)',
                      boxShadow: '0 0 12px #f59e0b, 0 0 4px #f59e0b',
                      animation: 'scanning 2.2s linear infinite'
                    }} />
                  )}
                </div>

                {/* Cancel / Clear Anchor Button */}
                {!isProcessing && (
                  <button
                    onClick={onClearFile}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255,255,255,0.02)',
                      border: '1px solid rgba(38,38,38,0.8)', color: '#a1a1aa', padding: '8px 16px',
                      borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#ef4444'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(38,38,38,0.8)'; e.currentTarget.style.color = '#a1a1aa'; }}
                  >
                    <X size={14} /> Clear Selection
                  </button>
                )}
              </div>
            )}
          </GlassPanel>
        </div>

        {/* Tactical Control Console Side panel (Right / Secondary) */}
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column' }}>
          <GlassPanel style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyBetween: 'space-between', gap: '24px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Cpu size={16} style={{ color: '#f59e0b' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Model Directives
                </h3>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa', lineHeight: '1.6' }}>
                The vision engine routes pixel arrays straight to the Groq parsing nodes to compile high-retention flashcards and summary files automatically.
              </p>
              
              {selectedFile && (
                <div style={{ marginTop: '20px', padding: '12px 16px', backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px solid rgba(38,38,38,0.5)', borderRadius: '10px' }}>
                  <span style={{ display: 'block', fontSize: '11px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Selected Target</span>
                  <span style={{ display: 'block', fontSize: '13px', color: '#ffffff', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontFamily: 'monospace' }}>
                    📄 {selectedFile.name}
                  </span>
                </div>
              )}
            </div>

            <div style={{ marginTop: 'auto' }}>
              <button
                onClick={onProcessNotes}
                disabled={!selectedFile || isProcessing}
                style={{
                  width: '100%', padding: '14px', borderRadius: '10px', fontSize: '14px', fontWeight: '700',
                  border: !selectedFile ? '1px solid rgba(38,38,38,0.4)' : '1px solid rgba(245,158,11,0.3)',
                  backgroundColor: !selectedFile ? 'rgba(20,20,20,0.2)' : isProcessing ? 'transparent' : 'rgba(245,158,11,0.08)',
                  color: !selectedFile ? '#52525b' : '#f59e0b',
                  cursor: !selectedFile || isProcessing ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)', outline: 'none'
                }}
                onMouseEnter={(e) => {
                  if (selectedFile && !isProcessing) {
                    e.currentTarget.style.backgroundColor = '#f59e0b';
                    e.currentTarget.style.color = '#000000';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedFile && !isProcessing) {
                    e.currentTarget.style.backgroundColor = 'rgba(245,158,11,0.08)';
                    e.currentTarget.style.color = '#f59e0b';
                  }
                }}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw size={16} style={{ animation: 'spin 1.5s linear infinite' }} />
                    <span>Extracting Matrix Variables...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    <span>Initialize Vision Scan</span>
                  </>
                )}
              </button>
            </div>
          </GlassPanel>
        </div>

      </div>

      {/* Local Structural CSS Rules */}
      <style>{`
        @keyframes scanning {
          0% { top: 0%; opacity: 0.8; }
          50% { top: 100%; opacity: 1; }
          100% { top: 0%; opacity: 0.8; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        label:hover .upload-icon-box {
          border-color: rgba(245, 158, 11, 0.5) !important;
          background: rgba(245, 158, 11, 0.12) !important;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  );
}