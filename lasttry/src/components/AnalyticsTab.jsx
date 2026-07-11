import React, { useMemo } from 'react';
import { BarChart3, TrendingUp, CheckCircle2, XCircle, Calendar, Percent, ShieldAlert } from 'lucide-react';

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

// Internal Glass Component: Performance Data Box
function AnalyticsMetric({ title, value, label, icon: Icon, iconColor = '#f59e0b' }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(20, 20, 20, 0.4) 0%, rgba(5, 5, 5, 0.2) 100%)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      border: '1px solid rgba(38, 38, 38, 0.4)',
      borderRadius: '16px',
      padding: '24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px',
      flex: '1 1 220px',
      boxSizing: 'border-box',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
    }}>
      <div>
        <span style={{ display: 'block', fontSize: '10px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          {title}
        </span>
        <span style={{ display: 'block', fontSize: '28px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
          {value}
        </span>
        <span style={{ display: 'block', fontSize: '12px', color: '#52525b', marginTop: '4px', fontWeight: '500' }}>
          {label}
        </span>
      </div>
      {Icon && (
        <div style={{
          width: '44px', height: '44px', borderRadius: '12px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.02) 0%, transparent 100%)',
          border: '1px solid rgba(63, 63, 70, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Icon size={20} style={{ color: iconColor }} />
        </div>
      )}
    </div>
  );
}

export default function AnalyticsTab({ chartData = [], quizStats }) {
  
  // Calculate active analytics ratios safely
  const metrics = useMemo(() => {
    const totalAnswers = (quizStats?.correct || 0) + (quizStats?.incorrect || 0);
    const accuracy = totalAnswers > 0 ? Math.round((quizStats.correct / totalAnswers) * 100) : 0;
    
    const totalWeeklyNotes = chartData.reduce((acc, curr) => acc + (curr.notesCount || 0), 0);
    
    // Determine highest notation frequency value to scale chart segments proportionally
    const maxNotesInWindow = Math.max(...chartData.map(d => d.notesCount || 0), 1);

    return {
      totalAnswers,
      accuracy,
      totalWeeklyNotes,
      maxNotesInWindow
    };
  }, [quizStats, chartData]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box', animation: 'fadeIn 0.3s ease' }}>
      
      {/* Title Header Descriptor */}
      <div>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>Performance Telemetry</h2>
        <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Real-time evaluation tracking and file synchronization indices</p>
      </div>

      {/* Row 1: High-Contrast Glass Performance Rows */}
      <section style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
        <AnalyticsMetric title="Evaluation Accuracy" value={`${metrics.accuracy}%`} label="Lifetime Success Index" icon={Percent} iconColor="#f59e0b" />
        <AnalyticsMetric title="Total Recall Inversions" value={metrics.totalAnswers} label={`${quizStats?.totalQuizzes || 0} Complete Sessions`} icon={TrendingUp} iconColor="#ffffff" />
        <AnalyticsMetric title="Weekly Syntheses" value={metrics.totalWeeklyNotes} label="Active Knowledge Extractions" icon={Calendar} iconColor="#a1a1aa" />
      </section>

      {/* Row 2: Split Analytical Matrix Displays */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
        
        {/* Left Card: Weekly Workspace Synchronization Velocity */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column' }}>
          <GlassPanel style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#ffffff' }}>Workspace Synthesis Velocity</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#71717a' }}>Volume of new database note assets compiled over trailing 7-day windows</p>
            </div>

            {/* Premium Hand-Crafted CSS Glass Graph Column Arrays */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-end', 
              height: '240px', 
              padding: '0 10px',
              borderBottom: '1px solid rgba(38, 38, 38, 0.6)',
              marginBottom: '16px',
              gap: '12px'
            }}>
              {chartData.map((item, index) => {
                const calculatedPct = ((item.notesCount || 0) / metrics.maxNotesInWindow) * 100;
                // Defensively guarantee clean height mapping even when data reads zero
                const fillHeight = Math.max(calculatedPct, 4);

                return (
                  <div key={index} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                    <div style={{ fontSize: '11px', color: item.notesCount > 0 ? '#f59e0b' : '#3f3f46', fontFamily: 'monospace', fontWeight: '700', marginBottom: '8px' }}>
                      {item.notesCount}
                    </div>
                    
                    {/* Glowing Translucent Bar Structure Element */}
                    <div style={{
                      width: '100%',
                      maxWidth: '36px',
                      height: `${fillHeight}%`,
                      background: item.notesCount > 0 
                        ? 'linear-gradient(0deg, rgba(245, 158, 11, 0.2) 0%, rgba(245, 158, 11, 0.7) 100%)'
                        : 'rgba(38, 38, 38, 0.2)',
                      border: item.notesCount > 0 ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid rgba(63, 63, 70, 0.2)',
                      borderRadius: '6px 6px 0 0',
                      transition: 'height 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: item.notesCount > 0 ? '0 0 15px rgba(245, 158, 11, 0.08)' : 'none'
                    }} />
                  </div>
                );
              })}
            </div>

            {/* X-Axis Timeline Labels */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', gap: '12px' }}>
              {chartData.map((item, index) => (
                <div key={index} style={{ flex: 1, textAlign: 'center' }}>
                  <span style={{ display: 'block', fontSize: '12px', color: '#ffffff', fontWeight: '600' }}>{item.day}</span>
                  <span style={{ display: 'block', fontSize: '10px', color: '#52525b', marginTop: '2px', fontFamily: 'monospace' }}>{item.formattedDate}</span>
                </div>
              ))}
            </div>
          </GlassPanel>
        </div>

        {/* Right Card: Active Recall Target Verification Rings */}
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column' }}>
          <GlassPanel style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '28px' }}>
            <div>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#ffffff' }}>Metrics Breakdown Matrix</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#71717a' }}>Verification index split ratios across active response nodes</p>
            </div>

            {metrics.totalAnswers === 0 ? (
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(38, 38, 38, 0.5)', borderRadius: '12px', padding: '40px 20px' }}>
                <ShieldAlert size={22} style={{ color: '#52525b', marginBottom: '8px' }} />
                <span style={{ fontSize: '13px', color: '#a1a1aa', fontWeight: '500' }}>Telemetry Log Empty</span>
                <span style={{ fontSize: '11px', color: '#52525b', marginTop: '2px', textAlign: 'center' }}>Initiate studio queries to generate diagnostic trends</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', justifyContent: 'center', flexGrow: 1 }}>
                
                {/* Visual Tracker Ring 1: Correct Verification Signals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                      <CheckCircle2 size={14} style={{ color: '#f59e0b' }} /> Verified Axiom Nodes
                    </span>
                    <span style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: '700' }}>
                      {quizStats.correct} ({Math.round((quizStats.correct / metrics.totalAnswers) * 100)}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(38, 38, 38, 0.4)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${(quizStats.correct / metrics.totalAnswers) * 100}%`,
                      backgroundColor: '#f59e0b', borderRadius: '3px', boxShadow: '0 0 8px #f59e0b'
                    }} />
                  </div>
                </div>

                {/* Visual Tracker Ring 2: Incorrect Boundary Signals */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                    <span style={{ color: '#a1a1aa', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                      <XCircle size={14} style={{ color: '#ef4444' }} /> Terminated Error Paths
                    </span>
                    <span style={{ color: '#ffffff', fontFamily: 'monospace', fontWeight: '700' }}>
                      {quizStats.incorrect} ({Math.round((quizStats.incorrect / metrics.totalAnswers) * 100)}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(38, 38, 38, 0.4)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%', width: `${(quizStats.incorrect / metrics.totalAnswers) * 100}%`,
                      backgroundColor: '#ef4444', borderRadius: '3px', boxShadow: '0 0 8px #ef4444'
                    }} />
                  </div>
                </div>

              </div>
            )}
          </GlassPanel>
        </div>

      </div>

      {/* Embedded Animation Transitions */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}