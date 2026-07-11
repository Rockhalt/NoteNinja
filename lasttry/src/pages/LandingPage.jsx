import React, { useState, useEffect } from 'react'; // FIXED: Destructured useEffect here
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient'; // FIXED: Added client connection reference
import { 
  Sparkles, Camera, BarChart3, ArrowRight, Brain, Terminal, 
  Layers, ShieldCheck, Activity, Cpu, CheckCircle2, ChevronRight 
} from 'lucide-react';

// Reusable Premium Glass Feature Box Component
function GlassFeatureCard({ title, description, icon: Icon }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.7) 0%, rgba(5, 5, 5, 0.4) 100%)',
      backdropFilter: 'blur(24px)',
      WebkitBackdropFilter: 'blur(24px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '24px',
      padding: '40px 32px',
      boxSizing: 'border-box',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.02)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}
    className="luxury-card"
    >
      <div style={{
        width: '44px', height: '44px', borderRadius: '12px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, transparent 100%)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <Icon size={20} style={{ color: '#f59e0b' }} />
      </div>
      <div>
        <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0', letterSpacing: '-0.3px' }}>
          {title}
        </h3>
        <p style={{ fontSize: '13.5px', color: '#71717a', margin: 0, lineHeight: '1.6', fontWeight: '500' }}>
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [activePreviewTab, setActivePreviewTab] = useState('extract');

  // FIXED: Active session forward intercept loop checks cloud variables on initial mounting
  useEffect(() => {
    async function evaluateActiveSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    }
    evaluateActiveSession();
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#020202',
      color: '#d4d4d8',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      position: 'relative',
      overflowX: 'hidden',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      {/* Dynamic Ambient Blur Lighting Layers */}
      <div style={{
        position: 'absolute', width: '800px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.04) 0%, transparent 70%)',
        filter: 'blur(90px)', top: '-10%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(245, 158, 11, 0.02) 0%, transparent 70%)',
        filter: 'blur(80px)', top: '45%', right: '-10%', pointerEvents: 'none', zIndex: 0
      }} />

      {/* HEADER NAVIGATION BAR */}
      <header style={{
        width: '100%', maxWidth: '1200px', margin: '0 auto',
        padding: '32px 40px', boxSizing: 'border-box',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '4px', height: '20px', backgroundColor: '#f59e0b', borderRadius: '2px' }} />
          <span style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>NoteNinja</span>
        </div>
        
        <button
          onClick={() => navigate('/auth')}
          style={{
            background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '10px 22px', borderRadius: '12px', color: '#ffffff', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.25s ease', outline: 'none'
          }}
          onMouseEnter={(e) => { 
            e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.4)'; 
            e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.03)'; 
          }}
          onMouseLeave={(e) => { 
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'; 
            e.currentTarget.style.backgroundColor = 'transparent'; 
          }}
        >
          Portal Entry
        </button>
      </header>

      {/* MAIN LAYOUT WRAPPER CANVAS */}
      <main style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '40px 40px 100px 40px', 
        boxSizing: 'border-box', 
        position: 'relative', 
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '120px',
        width: '100%'
      }}>
        
        {/* SECTION 1: THE HERO INTRODUCTION CANVAS */}
        <section style={{ textAlign: 'center', animation: 'heroReveal 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)',
            border: '1px solid rgba(245, 158, 11, 0.2)', padding: '6px 16px', borderRadius: '20px',
            fontSize: '11px', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase',
            letterSpacing: '1px', marginBottom: '32px'
          }}>
            <Sparkles size={12} style={{ fill: '#f59e0b' }} /> Spaced Recall Engine v4.0
          </div>

          <h2 style={{
            fontSize: 'calc(28px + 2.8vw)', fontWeight: '800', color: '#ffffff',
            background: 'linear-gradient(to bottom, #ffffff 40%, #a1a1aa 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-1.5px', lineHeight: '1.1', margin: '0 auto 24px auto', maxWidth: '900px'
          }}>
            Transform Raw Data Matrices Into Retained Knowledge.
          </h2>

          <p style={{
            fontSize: '15px', color: '#71717a', maxWidth: '540px',
            margin: '0 auto 44px auto', lineHeight: '1.6', fontWeight: '500', letterSpacing: '0.1px'
          }}>
            Accelerate your learning curve. Route documents straight through high-speed AI extraction nodes to compile permanent active recall storage profiles instantly.
          </p>

          <button
            onClick={() => navigate('/auth')}
            style={{
              padding: '16px 36px', borderRadius: '14px', fontSize: '14px', fontWeight: '700',
              border: '1px solid rgba(245, 158, 11, 0.5)', background: '#f59e0b', color: '#000000', 
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '12px',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', outline: 'none',
              boxShadow: '0 8px 24px rgba(245, 158, 11, 0.15)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
              e.currentTarget.style.borderColor = '#ffffff';
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(255, 255, 255, 0.2)';
              e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f59e0b';
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)';
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.15)';
              e.currentTarget.querySelector('.arrow-icon').style.transform = 'translateX(0)';
            }}
          >
            <span>Initialize Master Account</span>
            <ArrowRight size={15} className="arrow-icon" style={{ transition: 'transform 0.2s' }} />
          </button>
        </section>

        {/* SECTION 2: INTERACTIVE LIVE INTERFACE MOCKUP PREVIEW */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.6) 0%, rgba(5, 5, 5, 0.4) 100%)',
            backdropFilter: 'blur(24px)', border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '24px', overflow: 'hidden', boxShadow: '0 40px 80px rgba(0,0,0,0.7)'
          }}>
            {/* Top Chrome Window Control Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 24px', backgroundColor: 'rgba(0, 0, 0, 0.3)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#ef4444', opacity: 0.5 }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#f59e0b', opacity: 0.5 }} />
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#10b981', opacity: 0.5 }} />
              </div>
              <div style={{ display: 'flex', gap: '4px', backgroundColor: 'rgba(0,0,0,0.4)', padding: '4px 8px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.02)' }}>
                {['extract', 'recall', 'analytics'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActivePreviewTab(tab)}
                    style={{
                      padding: '6px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '600',
                      border: 'none', background: activePreviewTab === tab ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                      color: activePreviewTab === tab ? '#f59e0b' : '#71717a', cursor: 'pointer',
                      transition: 'all 0.2s'
                    }}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated UI Window Main Frame */}
            <div style={{ padding: '40px', minHeight: '260px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              {activePreviewTab === 'extract' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '600px', animation: 'fadeIn 0.3s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 20px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '12px' }}>
                    <Camera size={16} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#a1a1aa' }}>analyzing_lecture_schematics.png ...</span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#10b981', fontWeight: '700' }}>PARSING OK</span>
                  </div>
                  <div style={{ padding: '20px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(245, 158, 11, 0.2)', borderRadius: '12px', fontSize: '13.5px', color: '#d4d4d8', lineHeight: '1.6' }}>
                    <strong>Groq AI Pipeline Summary Output:</strong> Special grade architectural energy systems stabilize computational density limits by passing resource metrics cleanly down to isolated child nodes.
                  </div>
                </div>
              )}

              {activePreviewTab === 'recall' && (
                <div style={{ width: '100%', maxWidth: '400px', padding: '32px', border: '1px solid rgba(245, 158, 11, 0.25)', background: 'linear-gradient(135deg, rgba(20,20,20,0.8) 0%, rgba(0,0,0,0.6) 100%)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', textAlign: 'center', boxShadow: '0 0 30px rgba(245,158,11,0.03)', animation: 'fadeIn 0.3s' }}>
                  <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '700', letterSpacing: '1px' }}>ACTIVE RECALL PROMPT</span>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#ffffff', lineHeight: '1.5' }}>What mechanism prevents layout boundary leaking across viewports?</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px', width: '100%', fontSize: '12px', color: '#71717a', fontWeight: '600' }}>
                    Click Space to Invert Card Profile
                  </div>
                </div>
              )}

              {activePreviewTab === 'analytics' && (
                <div style={{ display: 'flex', gap: '16px', width: '100%', maxWidth: '600px', flexWrap: 'wrap', animation: 'fadeIn 0.3s' }}>
                  {[
                    { label: 'Knowledge Accuracy Ratio', val: '94.2%', color: '#f59e0b' },
                    { label: 'Active Memory Clusters', val: '1,420 Nodes', color: '#ffffff' },
                    { label: 'Pipeline Network Uptime', val: '99.98%', color: '#a1a1aa' }
                  ].map((stat, i) => (
                    <div key={i} style={{ flex: 1, minWidth: '160px', padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '14px' }}>
                      <span style={{ display: 'block', fontSize: '11px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase' }}>{stat.label}</span>
                      <span style={{ display: 'block', fontSize: '24px', fontWeight: '800', color: stat.color, marginTop: '8px' }}>{stat.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: THREE-COLUMN CORE FEATURES GRIDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', width: '100%' }}>
          <GlassFeatureCard 
            title="Vision Scanning Pipeline" 
            description="Snap physical mockups, technical notation sheets, or lecture notes. Our vision systems decode visual layers into textual assets instantly."
            icon={Camera}
          />
          <GlassFeatureCard 
            title="Active Recall Inversion" 
            description="Deconstruct dense text models into high-retention interactive flashcards. Target operational friction nodes via custom calculated quiz runs."
            icon={Brain}
          />
          <GlassFeatureCard 
            title="Telemetry Analytics Loop" 
            description="Monitor study volume metrics, tracking execution speed vectors, accuracy patterns, and data sync indices in real time."
            icon={BarChart3}
          />
        </section>

        {/* SECTION 4: ASYMMETRIC METRICS BENTO GRID */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%' }}>
          <div>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Engine Integrity Parameters</h3>
            <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Under-the-hood micro-systems powering your synchronization cluster</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px', width: '100%' }}>
            
            {/* Bento Block 1: Large Performance Statement */}
            <div style={{ 
              gridColumn: 'span 4', background: 'rgba(10,10,10,0.4)', border: '1px solid rgba(255,255,255,0.03)', 
              borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '180px' 
            }} className="bento-box">
              <Cpu size={22} style={{ color: '#f59e0b', marginBottom: '16px' }} />
              <h4 style={{ fontSize: '18px', color: '#ffffff', margin: '0 0 8px 0', fontWeight: '700' }}>Groq Core LPU Infrastructure Acceleration</h4>
              <p style={{ fontSize: '13px', color: '#71717a', margin: 0, lineHeight: '1.6' }}>
                By mapping textual evaluation pipelines straight to active language processing hardware arrays, flashcard compiling layers run with negligible processing drag.
              </p>
            </div>

            {/* Bento Block 2: Mini Stat Profile */}
            <div style={{ 
              gridColumn: 'span 2', background: 'rgba(10,10,10,0.4)', border: '1px solid rgba(255,255,255,0.03)', 
              borderRadius: '20px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' 
            }} className="bento-box">
              <Activity size={20} style={{ color: '#ffffff', marginBottom: '12px' }} />
              <span style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1px' }}>&lt; 1.2s</span>
              <span style={{ fontSize: '11px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase', marginTop: '6px' }}>Extraction Delay Latency</span>
            </div>

            {/* Bento Block 3: Verification Check Array */}
            <div style={{ 
              gridColumn: 'span 6', background: 'linear-gradient(135deg, rgba(16,16,16,0.5) 0%, rgba(5,5,5,0.3) 100%)', 
              border: '1px solid rgba(255,255,255,0.04)', borderRadius: '20px', padding: '32px', display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'center' 
            }} className="bento-box">
              <div style={{ marginRight: '16px' }}>
                <h5 style={{ margin: 0, color: '#ffffff', fontSize: '15px', fontWeight: '700' }}>Secure Cluster Frameworks</h5>
                <p style={{ margin: '2px 0 0 0', color: '#52525b', fontSize: '12px' }}>Standard parameters checked continuously</p>
              </div>
              {['Supabase Row-Level Shielding', 'SHA-256 Storage Mapping', 'Isomorphic Render Isolation'].map((check, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: '#a1a1aa', fontWeight: '500', backgroundColor: 'rgba(0,0,0,0.3)', padding: '8px 14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.02)' }}>
                  <ShieldCheck size={14} style={{ color: '#f59e0b' }} /> {check}
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* SECTION 5: THE FINAL CONVERSION OVERLAY GATE */}
        <section style={{ width: '100%' }}>
          <div style={{
            background: 'linear-gradient(135deg, rgba(25, 25, 25, 0.6) 0%, rgba(8, 8, 8, 0.4) 100%)',
            backdropFilter: 'blur(24px)', border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: '24px', padding: '60px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
            boxShadow: '0 0 40px rgba(245,158,11,0.02)'
          }}>
            <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.75px' }}>
              Ready to Optimize Your Recall Pipeline?
            </h3>
            <p style={{ fontSize: '14px', color: '#71717a', maxWidth: '460px', margin: 0, lineHeight: '1.6' }}>
              Create your secure operational study profile vault space and begin transforming your text documents inside NoteNinja immediately.
            </p>
            <button
              onClick={() => navigate('/auth')}
              style={{
                marginTop: '12px', padding: '14px 32px', borderRadius: '12px', fontSize: '13px', fontWeight: '700',
                border: 'none', backgroundColor: '#ffffff', color: '#000000', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f59e0b';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <span>Get Started Now</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </section>

      </main>

      {/* FOOTER SYSTEM TELEMETRY STRINGS */}
      <footer style={{
        width: '100%', maxWidth: '1200px', margin: 'auto auto 0 auto', padding: '32px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)', textAlign: 'center', boxSizing: 'border-box', position: 'relative', zIndex: 5
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '11px', color: '#262626', fontFamily: 'monospace', letterSpacing: '1px' }}>
          <Terminal size={12} />
          <span>// NOTENINJA PLATFORM // CORE MEMORY STORAGE ENGINE OPERATIONAL</span>
        </div>
      </footer>

      {/* GLOBAL TRANSITIONS FRAMEWORK INJECTION */}
      <style>{`
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .luxury-card:hover {
          transform: translateY(-4px);
          border-color: rgba(245, 158, 11, 0.25) !important;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.02) !important;
          background: linear-gradient(135deg, rgba(25, 25, 25, 0.8) 0%, rgba(10, 10, 10, 0.5) 100%) !important;
        }
        .bento-box {
          transition: border 0.3s ease, background 0.3s ease;
        }
        .bento-box:hover {
          border-color: rgba(255,255,255,0.08) !important;
          background: rgba(15,15,15,0.6) !important;
        }
        @media (max-width: 768px) {
          .bento-box {
            grid-column: span 6 !important;
          }
        }
      `}</style>
    </div>
  );
}