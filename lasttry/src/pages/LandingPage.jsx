import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { 
  Sparkles, Camera, BarChart3, ArrowRight, Brain, Terminal, 
  Cpu, ShieldCheck, Activity, ChevronRight, ChevronDown, 
  Quote, GitCommit, Eye, Layers, HelpCircle 
} from 'lucide-react';

// Reusable Premium Architectural Glass Block Component
function GlassFeatureCard({ title, description, icon: Icon }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(12, 12, 12, 0.7) 0%, rgba(3, 3, 3, 0.5) 100%)',
      backdropFilter: 'blur(30px)',
      WebkitBackdropFilter: 'blur(30px)',
      border: '1px solid rgba(255, 255, 255, 0.04)',
      borderRadius: '24px',
      padding: '44px 36px',
      boxSizing: 'border-box',
      transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
      boxShadow: '0 30px 70px rgba(0, 0, 0, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.02)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}
    className="luxury-card-block"
    >
      <div style={{
        width: '46px', height: '46px', borderRadius: '14px',
        background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)',
        border: '1px solid rgba(245, 158, 11, 0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 8px 20px rgba(0,0,0,0.4)'
      }} className="feature-icon-frame">
        <Icon size={20} style={{ color: '#f59e0b', transition: 'all 0.3s ease' }} />
      </div>
      <div>
        <h3 style={{ fontSize: '19px', fontWeight: '700', color: '#ffffff', margin: '0 0 10px 0', letterSpacing: '-0.3px', transition: 'color 0.3s ease' }} className="feature-title">
          {title}
        </h3>
        <p style={{ fontSize: '13.5px', color: '#71717a', margin: 0, lineHeight: '1.65', fontWeight: '500', transition: 'color 0.3s ease' }} className="feature-desc">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const navigate = useNavigate();
  const [activePreviewTab, setActivePreviewTab] = useState('extract');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Active cloud session forward intercept tracking
  useEffect(() => {
    async function evaluateActiveSession() {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/dashboard');
      }
    }
    evaluateActiveSession();
  }, [navigate]);

  // High-performance scroll tracking intersection observer pipeline
  useEffect(() => {
    const observerOptions = {
      root: null, 
      rootMargin: '0px',
      threshold: 0.12 
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll, footer');
    revealElements.forEach(el => scrollObserver.observe(el));

    return () => {
      revealElements.forEach(el => scrollObserver.unobserve(el));
    };
  }, []);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      backgroundColor: '#000000', 
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
        position: 'absolute', width: '900px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(153, 27, 27, 0.06) 0%, rgba(245, 158, 11, 0.02) 50%, transparent 100%)',
        filter: 'blur(100px)', top: '-12%', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0
      }} />
      <div style={{
        position: 'absolute', width: '700px', height: '700px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(153, 27, 27, 0.03) 0%, transparent 70%)',
        filter: 'blur(90px)', top: '35%', right: '-15%', pointerEvents: 'none', zIndex: 0
      }} />

      {/* HEADER NAVIGATION BAR */}
      <header style={{
        width: '100%', maxWidth: '1240px', margin: '0 auto',
        padding: '36px 40px', boxSizing: 'border-box',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        position: 'relative', zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}>
          <div style={{ width: '3px', height: '22px', backgroundColor: '#f59e0b', borderRadius: '2px', boxShadow: '0 0 10px #f59e0b' }} />
          <span style={{ fontSize: '21px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.75px', fontFamily: 'monospace' }}>NoteNinja</span>
        </div>
        
        <button
          onClick={() => navigate('/auth')}
          style={{
            background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.07)',
            padding: '12px 26px', borderRadius: '14px', color: '#ffffff', fontSize: '13px',
            fontWeight: '600', cursor: 'pointer', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', outline: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.02)'
          }}
          className="nav-portal-button"
        >
          Portal Entry
        </button>
      </header>

      {/* MAIN LAYOUT WRAPPER CANVAS */}
      <main style={{ 
        maxWidth: '1240px', 
        margin: '0 auto', 
        padding: '60px 40px 120px 40px', 
        boxSizing: 'border-box', 
        position: 'relative', 
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '150px',
        width: '100%'
      }}>
        
        {/* SECTION 1: HERO INTRODUCTION CANVAS */}
        <section style={{ textAlign: 'center' }} className="reveal-on-scroll">
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg, rgba(153, 27, 27, 0.15) 0%, rgba(245, 158, 11, 0.05) 100%)',
            border: '1px solid rgba(245, 158, 11, 0.25)', padding: '8px 20px', borderRadius: '30px',
            fontSize: '11px', fontWeight: '700', color: '#f59e0b', textTransform: 'uppercase',
            letterSpacing: '1.5px', marginBottom: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            <Sparkles size={12} style={{ fill: '#f59e0b' }} /> Spaced Recall Engine v4.0
          </div>

          <h1 style={{
            fontSize: 'calc(32px + 3vw)', fontWeight: '800', color: '#ffffff',
            letterSpacing: '-2px', lineHeight: '1.1', margin: '0 auto 28px auto', maxWidth: '980px'
          }}>
            <span className="text-mask-wrapper">
              <span className="text-mask-line line-1" style={{ background: 'linear-gradient(to bottom, #ffffff 30%, #e4e4e7 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Transform Raw Data Matrices
              </span>
            </span>
            <br />
            <span className="text-mask-wrapper">
              <span className="text-mask-line line-2" style={{ background: 'linear-gradient(to bottom, #e4e4e7 30%, #a1a1aa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Into Retained Knowledge.
              </span>
            </span>
          </h1>

          <p style={{
            fontSize: '16px', color: '#71717a', maxWidth: '580px',
            margin: '0 auto 48px auto', lineHeight: '1.7', fontWeight: '500', letterSpacing: '0.1px'
          }}>
            Accelerate your learning curve. Route documents straight through high-speed AI extraction nodes to compile permanent active recall storage profiles instantly.
          </p>

          <button
            onClick={() => navigate('/auth')}
            style={{
              padding: '18px 40px', borderRadius: '16px', fontSize: '14px', fontWeight: '700',
              border: '1px solid rgba(245, 158, 11, 0.6)', background: '#f59e0b', color: '#000000', 
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '14px',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)', outline: 'none',
              boxShadow: '0 12px 30px rgba(245, 158, 11, 0.2)'
            }}
            className="master-action-btn"
          >
            <span>Initialize Master Account</span>
            <ArrowRight size={16} className="arrow-icon" style={{ transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} />
          </button>
        </section>

        {/* SECTION 2: INTERACTIVE LIVE INTERFACE MOCKUP PREVIEW */}
        <section style={{ width: '100%' }} className="reveal-on-scroll">
          <div style={{
            background: 'linear-gradient(135deg, rgba(16, 16, 16, 0.7) 0%, rgba(4, 4, 4, 0.5) 100%)',
            backdropFilter: 'blur(30px)', border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '28px', overflow: 'hidden', boxShadow: '0 50px 100px rgba(0,0,0,0.85), inset 0 1px 1px rgba(255,255,255,0.02)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 28px', backgroundColor: 'rgba(0, 0, 0, 0.4)', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#ef4444', opacity: 0.4 }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#f59e0b', opacity: 0.4 }} />
                <div style={{ width: '11px', height: '11px', borderRadius: '50%', backgroundColor: '#10b981', opacity: 0.4 }} />
              </div>
              
              <div style={{ display: 'flex', gap: '6px', backgroundColor: 'rgba(0,0,0,0.5)', padding: '5px 10px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.02)' }}>
                {['extract', 'recall', 'analytics'].map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActivePreviewTab(tab)}
                    style={{
                      padding: '8px 18px', borderRadius: '8px', fontSize: '11px', fontWeight: '700',
                      border: 'none', background: activePreviewTab === tab ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                      color: activePreviewTab === tab ? '#f59e0b' : '#52525b', cursor: 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)', fontFamily: 'monospace', letterSpacing: '0.5px'
                    }}
                    className={activePreviewTab === tab ? "" : "inactive-preview-tab"}
                  >
                    {tab.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ padding: '52px', minHeight: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', backgroundColor: 'rgba(2,2,2,0.2)' }}>
              {activePreviewTab === 'extract' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', maxWidth: '640px', animation: 'previewFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 24px', backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '14px', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                    <Camera size={16} style={{ color: '#f59e0b' }} />
                    <span style={{ fontSize: '13px', fontFamily: 'monospace', color: '#a1a1aa' }}>analyzing_lecture_schematics.png ...</span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', color: '#10b981', fontWeight: '800', fontFamily: 'monospace' }}>PARSING_OK</span>
                  </div>
                  <div style={{ padding: '24px', backgroundColor: 'rgba(255,255,255,0.005)', border: '1px dashed rgba(245, 158, 11, 0.25)', borderRadius: '14px', fontSize: '14px', color: '#e4e4e7', lineHeight: '1.7', boxShadow: 'inset 0 4px 30px rgba(0,0,0,0.3)' }}>
                    <strong style={{ color: '#ffffff' }}>Groq AI Pipeline Summary Output:</strong> Special grade architectural energy systems stabilize computational density limits by passing resource metrics cleanly down to isolated child nodes.
                  </div>
                </div>
              )}

              {activePreviewTab === 'recall' && (
                <div style={{ width: '100%', maxWidth: '420px', padding: '36px', border: '1px solid rgba(245, 158, 11, 0.25)', background: 'linear-gradient(135deg, rgba(22,22,22,0.9) 0%, rgba(5,5,5,0.7) 100%)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.6), 0 0 30px rgba(245,158,11,0.02)', animation: 'previewFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                  <span style={{ fontSize: '10px', color: '#f59e0b', fontWeight: '800', letterSpacing: '1.5px', fontFamily: 'monospace' }}>ACTIVE RECALL PROMPT</span>
                  <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#ffffff', lineHeight: '1.55', letterSpacing: '-0.2px' }}>What mechanism prevents layout boundary leaking across viewports?</p>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '16px', width: '100%', fontSize: '11px', color: '#52525b', fontFamily: 'monospace', fontWeight: '700' }}>
                    Click Space to Invert Card Profile
                  </div>
                </div>
              )}

              {activePreviewTab === 'analytics' && (
                <div style={{ display: 'flex', gap: '20px', width: '100%', maxWidth: '640px', flexWrap: 'wrap', animation: 'previewFadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both' }}>
                  {[
                    { label: 'Knowledge Accuracy Ratio', val: '94.2%', color: '#f59e0b' },
                    { label: 'Active Memory Clusters', val: '1,420 Nodes', color: '#ffffff' },
                    { label: 'Pipeline Network Uptime', val: '99.98%', color: '#a1a1aa' }
                  ].map((stat, i) => (
                    <div key={i} style={{ flex: 1, minWidth: '180px', padding: '24px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '16px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                      <span style={{ display: 'block', fontSize: '10px', color: '#71717a', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'monospace', letterSpacing: '0.5px' }}>{stat.label}</span>
                      <span style={{ display: 'block', fontSize: '26px', fontWeight: '800', color: stat.color, marginTop: '10px', letterSpacing: '-0.5px' }}>{stat.val}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* SECTION 3: PIPELINE OPERATIONS TIMELINE */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '48px', width: '100%' }} className="reveal-on-scroll">
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>The Knowledge Processing Loop</h2>
            <p style={{ fontSize: '13.5px', color: '#71717a', margin: '6px 0 0 0', fontWeight: '500' }}>Tracing your analytical payload from raw capture to deep recall matrix stabilization</p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', width: '100%', justifyContent: 'space-between', position: 'relative' }}>
            {[
              { step: '01', title: 'Telemetry Ingestion', desc: 'Upload visual schematics or handwritten texts via secure client drop frames.', icon: GitCommit },
              { step: '02', title: 'LPU Neural Matrixing', desc: 'Groq API processing cluster maps textual components into semantic code frameworks.', icon: Eye },
              { step: '03', title: 'Structured Storage', desc: 'Vault registries partition card systems cleanly under user-specific RLS database vectors.', icon: Layers },
              { step: '04', title: 'Recall Serialization', desc: 'Iterative spaced learning intervals automatically priority-sort active flashcard lines.', icon: Brain }
            ].map((node, idx) => (
              <div 
                key={idx}
                style={{
                  flex: '1 1 240px', background: 'rgba(10, 10, 10, 0.4)', border: '1px solid rgba(255,255,255,0.02)',
                  borderRadius: '20px', padding: '32px', boxSizing: 'border-box', position: 'relative',
                  boxShadow: '0 15px 35px rgba(0,0,0,0.4)'
                }}
                className="timeline-node-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '12px', fontFamily: 'monospace', color: '#f59e0b', fontWeight: '800' }}>NODE // {node.step}</span>
                  <node.icon size={16} style={{ color: '#52525b' }} />
                </div>
                <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#ffffff', margin: '0 0 8px 0' }}>{node.title}</h4>
                <p style={{ fontSize: '12.5px', color: '#71717a', margin: 0, lineHeight: '1.6' }}>{node.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: THREE-COLUMN CORE FEATURES GRIDS */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px', width: '100%' }} className="reveal-on-scroll">
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

        {/* SECTION 5: ELITE OPERATOR ENDORSEMENTS (TESTIMONIALS) */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '40px', width: '100%' }} className="reveal-on-scroll">
          <div style={{ paddingLeft: '10px', borderLeft: '3px solid #f59e0b' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Operational Validations</h3>
            <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Performance metrics certified by high-velocity platform operators</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px', width: '100%' }}>
            {[
              { quote: "NoteNinja completely refactored how I store systems hardware logic maps. The LPU vision scanning delay is effectively negligible.", user: "E. Vance", role: "Principal Systems Engineer" },
              { quote: "The frosted UI architecture matches my dark luxury desktop workspace configurations perfectly. High aesthetics anchored by heavy Supabase RLS security.", user: "A. Sterling", role: "Quantitative Data Architect" }
            ].map((card, idx) => (
              <div 
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, rgba(14, 14, 14, 0.6) 0%, rgba(3, 3, 3, 0.4) 100%)',
                  border: '1px solid rgba(255, 255, 255, 0.03)', borderRadius: '24px', padding: '36px',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.5)', display: 'flex', flexDirection: 'column', gap: '24px'
                }}
              >
                <Quote size={20} style={{ color: '#f59e0b', opacity: 0.6 }} />
                <p style={{ margin: 0, fontSize: '14.5px', color: '#e4e4e7', lineHeight: '1.65', fontStyle: 'italic', fontWeight: '500' }}>
                  "{card.quote}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.03)', paddingTop: '16px', marginTop: 'auto' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#f59e0b' }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '13px', color: '#ffffff', fontWeight: '700' }}>{card.user}</span>
                    <span style={{ display: 'block', fontSize: '11px', color: '#52525b', fontFamily: 'monospace', marginTop: '2px' }}>{card.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 6: ASYMMETRIC METRICS BENTO GRID */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '36px', width: '100%' }} className="reveal-on-scroll">
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Engine Integrity Parameters</h3>
            <p style={{ fontSize: '13.5px', color: '#71717a', margin: '6px 0 0 0', fontWeight: '500' }}>Under-the-hood micro-systems powering your synchronization cluster</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px', width: '100%' }}>
            
            <div style={{ 
              gridColumn: 'span 4', background: 'linear-gradient(135deg, rgba(12,12,12,0.6) 0%, rgba(3,3,3,0.4) 100%)', border: '1px solid rgba(255,255,255,0.03)', 
              borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '200px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }} className="luxury-bento-cell">
              <div>
                <Cpu size={22} style={{ color: '#f59e0b', marginBottom: '20px' }} />
                <h4 style={{ fontSize: '19px', color: '#ffffff', margin: '0 0 10px 0', fontWeight: '700', letterSpacing: '-0.2px' }}>Groq Core LPU Infrastructure Acceleration</h4>
                <p style={{ fontSize: '13.5px', color: '#71717a', margin: 0, lineHeight: '1.65', fontWeight: '500' }}>
                  By mapping textual evaluation pipelines straight to active language processing hardware arrays, flashcard compiling layers run with negligible processing drag.
                </p>
              </div>
            </div>

            <div style={{ 
              gridColumn: 'span 2', background: 'linear-gradient(135deg, rgba(12,12,12,0.6) 0%, rgba(3,3,3,0.4) 100%)', border: '1px solid rgba(255,255,255,0.03)', 
              borderRadius: '24px', padding: '36px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }} className="luxury-bento-cell">
              <Activity size={22} style={{ color: '#ffffff', marginBottom: '16px' }} />
              <span style={{ fontSize: '32px', fontWeight: '900', color: '#ffffff', letterSpacing: '-1.5px', fontFamily: 'monospace' }}>&lt; 1.2s</span>
              <span style={{ fontSize: '10px', color: '#71717a', fontWeight: '800', textTransform: 'uppercase', marginTop: '8px', fontFamily: 'monospace', letterSpacing: '0.5px' }}>Extraction Delay Latency</span>
            </div>

            <div style={{ 
              gridColumn: 'span 6', background: 'linear-gradient(135deg, rgba(14,14,14,0.7) 0%, rgba(4,4,4,0.4) 100%)', 
              border: '1px solid rgba(255, 255, 255, 0.04)', borderRadius: '24px', padding: '36px', display: 'flex', flexWrap: 'wrap', gap: '28px', alignItems: 'center',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
            }} className="luxury-bento-cell">
              <div style={{ marginRight: '20px' }}>
                <h5 style={{ margin: 0, color: '#ffffff', fontSize: '16px', fontWeight: '700', letterSpacing: '-0.2px' }}>Secure Cluster Frameworks</h5>
                <p style={{ margin: '4px 0 0 0', color: '#52525b', fontSize: '12px', fontWeight: '600' }}>Standard parameters checked continuously</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                {['Supabase Row-Level Shielding', 'SHA-256 Storage Mapping', 'Isomorphic Render Isolation'].map((check, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#a1a1aa', fontWeight: '600', backgroundColor: 'rgba(0,0,0,0.4)', padding: '10px 18px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.02)' }}>
                    <ShieldCheck size={14} style={{ color: '#f59e0b' }} /> {check}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 7: OPERATIONAL QUERY MATRIX (FAQ ACCORDION) */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', maxWidth: '800px', margin: '0 auto' }} className="reveal-on-scroll">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <HelpCircle size={20} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>System Queries Matrix</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', width: '100%' }}>
            {[
              { q: "How exactly does the AI Vision parsing pipeline execute data separation?", a: "When an image payload is dropped into the ScanTab grid, pixels are routed dynamically down to high-velocity Groq LPU nodes. The raw information undergoes immediate structural synthesis to cleanly split titles from core contextual bullet metrics, ensuring schema anomalies are purged before hitting our database records." },
              { q: "Is local browser task storage fully synced up to the Supabase backend layers?", a: "Yes. The active checklist matrix bypasses static browser constraints completely by checking for your verified user authentication signature. Data mutations occur inside custom remote tables guarded by active Row-Level Security, protecting your targets across all operational desktop environments seamlessly." },
              { q: "Can I manage complex multi-variable engineering concepts inside NoteNinja cards?", a: "NoteNinja is explicitly optimized to compress complex, data-heavy clusters. The underlying active recall scheduling algorithms evaluate target card profiles against custom input verification values, making it exceptionally powerful for processing deep technical notation frameworks." }
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  style={{
                    background: 'rgba(12, 12, 12, 0.5)', border: '1px solid rgba(255,255,255,0.02)',
                    borderRadius: '16px', overflow: 'hidden', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.3)'
                  }}
                  className={`faq-accordion-row ${isOpen ? 'active' : ''}`}
                >
                  <div 
                    onClick={() => toggleFaq(idx)}
                    style={{ padding: '24px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', userSelect: 'none' }}
                  >
                    <span style={{ fontSize: '14.5px', fontWeight: '700', color: isOpen ? '#f59e0b' : '#ffffff', transition: 'color 0.25s ease' }}>
                      {faq.q}
                    </span>
                    <ChevronDown size={16} style={{ color: isOpen ? '#f59e0b' : '#52525b', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }} />
                  </div>
                  
                  <div 
                    style={{ 
                      maxHeight: isOpen ? '200px' : '0px', padding: isOpen ? '0 28px 24px 28px' : '0 28px',
                      opacity: isOpen ? 1 : 0, transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                      overflow: 'hidden', boxSizing: 'border-box'
                    }}
                  >
                    <p style={{ margin: 0, fontSize: '13.5px', color: '#71717a', lineHeight: '1.65', fontWeight: '500' }}>
                      {faq.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 8: THE FINAL CONVERSION OVERLAY GATE */}
        <section style={{ width: '100%' }} className="reveal-on-scroll">
          <div style={{
            background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.7) 0%, rgba(5, 5, 5, 0.4) 100%)',
            backdropFilter: 'blur(30px)', border: '1px solid rgba(245, 158, 11, 0.3)',
            borderRadius: '28px', padding: '72px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px',
            boxShadow: '0 40px 90px rgba(0,0,0,0.8), 0 0 40px rgba(245,158,11,0.01)'
          }} className="conversion-panel">
            <h3 style={{ fontSize: '30px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-1px' }}>
              Ready to Optimize Your Recall Pipeline?
            </h3>
            <p style={{ fontSize: '14.5px', color: '#71717a', maxWidth: '#500px', margin: 0, lineHeight: '1.65', fontWeight: '500' }}>
              Create your secure operational study profile vault space and begin transforming your text documents inside NoteNinja immediately.
            </p>
            <button
              onClick={() => navigate('/auth')}
              style={{
                marginTop: '12px', padding: '16px 36px', borderRadius: '14px', fontSize: '13.5px', fontWeight: '700',
                border: 'none', backgroundColor: '#ffffff', color: '#000000', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '10px', transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 8px 24px rgba(255,255,255,0.05)'
              }}
              className="conversion-btn"
            >
              <span>Get Started Now</span>
              <ChevronRight size={15} />
            </button>
          </div>
        </section>

      </main>

      {/* FIXED: MULTI-COLUMN LUXER FOOTER WITH EXPLICIT LEFT-ALIGNMENT CONTROLS */}
      <footer style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '120px auto 0 auto',
        padding: '80px 40px 40px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.03)',
        boxSizing: 'border-box',
        position: 'relative',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        gap: '60px',
        textAlign: 'left' // Overrides any top-level global centering parameters
      }}>
        {/* Upper Corporate Grid Link Array */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '40px',
          width: '100%',
          textAlign: 'left'
        }}>
          {/* Brand Matrix Summary Frame */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', gridColumn: 'span 2', alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '3px', height: '18px', backgroundColor: '#f59e0b', borderRadius: '2px', boxShadow: '0 0 10px #f59e0b' }} />
              <span style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px', fontFamily: 'monospace' }}>NoteNinja</span>
            </div>
            <p style={{ fontSize: '12.5px', color: '#52525b', lineHeight: '1.65', margin: 0, maxWidth: '280px', fontWeight: '500', textAlign: 'left' }}>
              Elite architectural memory cores engineering permanent active recall schemas from raw input parameters.
            </p>
          </div>

          {/* Directory Column 1 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#ffffff', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Systems</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', alignItems: 'flex-start' }}>
              <a href="#vision" className="footer-luxury-link">Vision Ingestion</a>
              <a href="#recall" className="footer-luxury-link">Recall Core</a>
              <a href="#telemetry" className="footer-luxury-link">Telemetry Arrays</a>
            </div>
          </div>

          {/* Directory Column 2 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#ffffff', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Security</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', alignItems: 'flex-start' }}>
              <a href="#rls" className="footer-luxury-link">RLS Guarding</a>
              <a href="#encryption" className="footer-luxury-link">Vector Shields</a>
              <a href="#compliance" className="footer-luxury-link">Audit Protocols</a>
            </div>
          </div>

          {/* Directory Column 3 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#ffffff', letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'monospace' }}>Registry</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', alignItems: 'flex-start' }}>
              <a href="#terms" className="footer-luxury-link">Terms Matrix</a>
              <a href="#privacy" className="footer-luxury-link">Privacy Node</a>
              <a href="#access" className="footer-luxury-link">Terminal Access</a>
            </div>
          </div>
        </div>

        {/* Lower Telemetry Row & Copyright Alignment Panel */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          borderTop: '1px solid rgba(255, 255, 255, 0.02)',
          paddingTop: '32px',
          width: '100%'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '11px', color: '#444444', fontFamily: 'monospace', textAlign: 'left' }}>
            <Terminal size={12} style={{ color: '#f59e0b' }} />
            <div className="typewriter-terminal-line">
              // NOTENINJA PLATFORM // CORE OPERATIONAL FRAMEWORK SECURE //
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '11px', color: '#3f3f46', fontFamily: 'monospace', fontWeight: '600' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981', boxShadow: '0 0 8px #10b981' }} className="status-glow-node" />
              <span style={{ color: '#52525b', fontSize: '10px', letterSpacing: '0.5px' }}>CLUSTER: ONLINE</span>
            </div>
            <span>© 2026 NOTENINJA NODE.</span>
          </div>
        </div>
      </footer>

      {/* Embedded High-Performance Luxury Stylesheet */}
      <style>{`
        /* Hidden state setups */
        .reveal-on-scroll {
          opacity: 0;
          transform: translateY(45px) scale(0.98);
          filter: blur(6px);
          transition: 
            opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.85s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.85s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity, filter;
        }

        .reveal-on-scroll.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .text-mask-wrapper {
          display: inline-block;
          overflow: hidden;
          vertical-align: bottom;
          padding-bottom: 4px;
        }

        .text-mask-line {
          display: inline-block;
          transform: translateY(105%);
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform;
        }

        .reveal-on-scroll.visible .line-1 { transform: translateY(0%); transition-delay: 100ms; }
        .reveal-on-scroll.visible .line-2 { transform: translateY(0%); transition-delay: 260ms; }

        @keyframes typeText {
          from { width: 0; }
          to { width: 100%; }
        }

        @keyframes blinkCaretCursor {
          from, to { border-color: transparent; }
          50% { border-color: #f59e0b; }
        }

        .typewriter-terminal-line {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #f59e0b;
          letter-spacing: 1px;
          width: 0;
        }

        footer.visible .typewriter-terminal-line {
          animation: 
            typeText 2.5s steps(54, end) both,
            blinkCaretCursor 0.8s step-end infinite;
          animation-delay: 200ms;
        }

        /* Interactive Luxury Navigation link micro-glides */
        .footer-luxury-link {
          color: #52525b;
          text-decoration: none;
          font-weight: 500;
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-block;
          width: fit-content;
        }
        .footer-luxury-link:hover {
          color: #f59e0b;
          transform: translateX(4px);
        }

        /* Pulse core for network status matrix indicator node */
        @keyframes clusterPulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.9); }
        }
        .status-glow-node {
          animation: clusterPulse 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes previewFadeIn {
          from { opacity: 0; transform: scale(0.99) translateY(6px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .nav-portal-button:hover {
          border-color: rgba(245, 158, 11, 0.4) !important;
          background-color: rgba(245, 158, 11, 0.02) !important;
          color: #f59e0b !important;
          box-shadow: 0 8px 24px rgba(0,0,0,0.6) !important;
        }

        .master-action-btn:hover {
          background-color: #ffffff !important;
          border-color: #ffffff !important;
          box-shadow: 0 16px 40px rgba(255, 255, 255, 0.15) !important;
        }
        .master-action-btn:hover .arrow-icon { transform: translateX(5px); }

        .luxury-card-block:hover {
          transform: translateY(-5px);
          border-color: rgba(245, 158, 11, 0.3) !important;
          background: linear-gradient(135deg, rgba(20, 20, 20, 0.8) 0%, rgba(6, 6, 6, 0.5) 100%) !important;
          box-shadow: 0 40px 80px rgba(0, 0, 0, 0.95), inset 0 1px 1px rgba(245, 158, 11, 0.03) !important;
        }
        .luxury-card-block:hover .feature-title { color: #f59e0b !important; }
        .luxury-card-block:hover .feature-desc { color: #a1a1aa !important; }
        .luxury-card-block:hover .feature-icon-frame {
          border-color: rgba(245, 158, 11, 0.5) !important;
          background-color: rgba(245, 158, 11, 0.15) !important;
        }

        .inactive-preview-tab:hover {
          color: #a1a1aa !important;
          background-color: rgba(255,255,255,0.01) !important;
        }

        .luxury-bento-cell { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .luxury-bento-cell:hover {
          border-color: rgba(255, 255, 255, 0.08) !important;
          background: rgba(14, 14, 14, 0.5) !important;
          box-shadow: 0 30px 60px rgba(0,0,0,0.7) !important;
        }

        .timeline-node-card { transition: all 0.35s ease; }
        .timeline-node-card:hover {
          border-color: rgba(245, 158, 11, 0.2) !important;
          background-color: rgba(15, 15, 15, 0.6) !important;
          box-shadow: 0 20px 40px rgba(0,0,0,0.6) !important;
        }

        .faq-accordion-row { transition: border-color 0.25s ease; }
        .faq-accordion-row:hover { border-color: rgba(255,255,255,0.06) !important; }
        .faq-accordion-row.active { border-color: rgba(245, 158, 11, 0.2) !important; background: rgba(12, 12, 12, 0.8) !important; }

        .conversion-panel { transition: border-color 0.5s ease; }
        .conversion-panel:hover { border-color: rgba(245, 158, 11, 0.45) !important; }
        .conversion-btn:hover {
          background-color: #f59e0b !important;
          box-shadow: 0 12px 32px rgba(245, 158, 11, 0.25) !important;
        }

        @media (max-width: 900px) {
          .luxury-bento-cell { grid-column: span 6 !important; }
          .typewriter-terminal-line { white-space: normal; border-right: none; width: auto; animation: none !important; }
        }
      `}</style>
    </div>
  );
}