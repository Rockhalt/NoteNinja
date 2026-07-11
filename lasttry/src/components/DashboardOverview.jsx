import React, { useState, useEffect } from 'react';
import { supabase } from '../utils/supabaseClient'; // Injected master backend client connection
import { Zap, Award, BookOpen, Camera, Cpu, Plus, Check, Trash2, ListTodo } from 'lucide-react';

// Internal Premium Glass Component: Metric Stats Block
function GlassStatBox({ title, value, icon: Icon, accentColor = '#f59e0b' }) {
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
      gap: '20px',
      boxSizing: 'border-box',
      flex: '1 1 240px',
      boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.3)'
    }}>
      <div>
        <span style={{ display: 'block', fontSize: '11px', color: '#71717a', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>
          {title}
        </span>
        <span style={{ display: 'block', fontSize: '32px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.5px' }}>
          {value}
        </span>
      </div>
      
      {Icon && (
        <div style={{ 
          width: '46px', height: '46px', borderRadius: '12px', 
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, transparent 100%)',
          border: '1px solid rgba(245, 158, 11, 0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
        }}>
          <Icon size={22} style={{ color: accentColor }} />
        </div>
      )}
    </div>
  );
}

// Internal Glass Component: Section Container Card
function GlassCard({ children, style = {} }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(15, 15, 15, 0.5) 0%, rgba(3, 3, 3, 0.3) 100%)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(38, 38, 38, 0.35)',
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

export default function DashboardOverview({
  userId, // Unique operator ID derived from main Supabase session authentication context
  notebooksCount,
  totalFlashcardsCount,
  notebooksList,
  onReviewNotebook,
  onNavigateToScan,
  systemCheckStatus,
  onTriggerDiagnostic,
  currentStreak,
  retentionScore
}) {
  
  const [todoList, setTodoList] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const [loadingTasks, setLoadingTasks] = useState(true);

  // FIXED: Fetch real-time unique user data straight from the Supabase 'todos' table
  useEffect(() => {
    if (!userId) return;

    async function fetchUserTasks() {
      try {
        setLoadingTasks(true);
        const { data, error } = await supabase
          .from('todos')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: true });

        if (error) throw error;
        setTodoList(data || []);
      } catch (err) {
        console.error('Task Matrix sync error:', err.message);
      } finally {
        setLoadingTasks(false);
      }
    }

    fetchUserTasks();
  }, [userId]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim() || !userId) return;

    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{
          text: newTodoText.trim(),
          user_id: userId,
          completed: false
        }])
        .select()
        .single();

      if (error) throw error;
      if (data) setTodoList(prev => [...prev, data]);
      setNewTodoText('');
    } catch (err) {
      console.error('Failed to inject new target to database:', err.message);
    }
  };

  const handleToggleTask = async (id, currentStatus) => {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ completed: !currentStatus })
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      setTodoList(prev => prev.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
    } catch (err) {
      console.error('Database task status mutation failure:', err.message);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id)
        .eq('user_id', userId);

      if (error) throw error;

      setTodoList(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      console.error('Failed to clear target row from database:', err.message);
    }
  };

  const previewNotebooks = notebooksList.slice(0, 3);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* SECTION 1: Metrics */}
      <section style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
        <GlassStatBox title="Current Learning Streak" value={`${currentStreak} Days`} icon={Zap} />
        <GlassStatBox title="Knowledge Retention Score" value={`${retentionScore}%`} icon={Award} />
        <GlassStatBox title="Calculated Card Registry" value={totalFlashcardsCount} icon={BookOpen} />
      </section>

      {/* SECTION 2: Split Workspace */}
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', width: '100%' }}>
        
        {/* Left Column: Workspaces */}
        <div style={{ flex: '2 1 500px', display: 'flex', flexDirection: 'column' }}>
          <GlassCard style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', margin: 0, letterSpacing: '-0.25px' }}>Recent Workspaces</h2>
                <p style={{ fontSize: '13px', color: '#71717a', margin: '4px 0 0 0' }}>Your latest AI-extracted study clusters</p>
              </div>
              <div style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: '600', backgroundColor: 'rgba(255, 255, 255, 0.03)', padding: '6px 12px', borderRadius: '8px', border: '1px solid rgba(38, 38, 38, 0.5)' }}>
                {notebooksCount} Repositories
              </div>
            </div>

            {previewNotebooks.length === 0 ? (
              <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', border: '1px dashed rgba(38, 38, 38, 0.5)', borderRadius: '12px', backgroundColor: 'rgba(0, 0, 0, 0.1)' }}>
                <BookOpen size={28} style={{ color: '#52525b', marginBottom: '12px' }} />
                <span style={{ fontSize: '14px', color: '#a1a1aa', fontWeight: '500' }}>No active flashcard structures detected</span>
                <button 
                  onClick={onNavigateToScan}
                  style={{ marginTop: '14px', backgroundColor: '#f59e0b', color: '#000000', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer' }}
                >
                  Create Custom Deck
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flexGrow: 1 }}>
                {previewNotebooks.map((notebook) => (
                  <div
                    key={notebook.id}
                    onClick={() => onReviewNotebook(notebook)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px',
                      backgroundColor: 'rgba(255, 255, 255, 0.01)', border: '1px solid rgba(38, 38, 38, 0.3)',
                      borderRadius: '12px', cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.02)';
                      e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.01)';
                      e.currentTarget.style.borderColor = 'rgba(38, 38, 38, 0.3)';
                    }}
                  >
                    <div>
                      <h4 style={{ margin: 0, color: '#ffffff', fontSize: '15px', fontWeight: '600' }}>{notebook.title}</h4>
                      <span style={{ display: 'block', fontSize: '12px', color: '#71717a', marginTop: '4px' }}>
                        Synchronized {new Date(notebook.created_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                      </span>
                    </div>
                    <Zap size={14} style={{ color: '#52525b' }} />
                  </div>
                ))}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Column: Tasks Matrix & Diagnostics */}
        <div style={{ flex: '1 1 340px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <GlassCard style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ListTodo size={18} style={{ color: '#f59e0b' }} />
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: '700', color: '#ffffff' }}>Study Tasks Matrix</h3>
            </div>

            <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                placeholder="Add critical learning target..."
                value={newTodoText}
                onChange={(e) => setNewTodoText(e.target.value)}
                style={{
                  flexGrow: 1, backgroundColor: 'rgba(0,0,0,0.4)', border: '1px solid rgba(38,38,38,0.8)',
                  borderRadius: '8px', padding: '10px 14px', color: '#ffffff', fontSize: '13px', outline: 'none',
                  transition: 'border 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(245, 158, 11, 0.4)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(38, 38, 38, 0.8)'}
              />
              <button 
                type="submit"
                style={{
                  backgroundColor: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.3)',
                  color: '#f59e0b', width: '36px', height: '36px', borderRadius: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f59e0b'; e.currentTarget.style.color = '#000000'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(245, 158, 11, 0.08)'; e.currentTarget.style.color = '#f59e0b'; }}
              >
                <Plus size={16} />
              </button>
            </form>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '200px', overflowY: 'auto' }}>
              {loadingTasks ? (
                <span style={{ fontSize: '12px', color: '#52525b', textAlign: 'center', padding: '10px 0' }}>Syncing data parameters...</span>
              ) : todoList.length === 0 ? (
                <span style={{ fontSize: '12px', color: '#52525b', textAlign: 'center', padding: '10px 0' }}>All clear paths, vector targets complete.</span>
              ) : (
                todoList.map(todo => (
                  <div 
                    key={todo.id}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px',
                      padding: '10px 14px', backgroundColor: 'rgba(255,255,255,0.01)', border: '1px solid rgba(38,38,38,0.3)',
                      borderRadius: '8px', opacity: todo.completed ? 0.45 : 1, transition: 'all 0.2s'
                    }}
                  >
                    <div 
                      onClick={() => handleToggleTask(todo.id, todo.completed)}
                      style={{
                        width: '18px', height: '18px', borderRadius: '4px', border: todo.completed ? '1px solid #f59e0b' : '1px solid rgba(82,82,91,0.6)',
                        backgroundColor: todo.completed ? 'rgba(245,158,11,0.1)' : 'transparent', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                      }}
                    >
                      {todo.completed && <Check size={12} style={{ color: '#f59e0b' }} />}
                    </div>
                    
                    <span style={{
                      flexGrow: 1, fontSize: '13px', color: '#d4d4d8', textDecoration: todo.completed ? 'line-through' : 'none',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                    }}>
                      {todo.text}
                    </span>

                    <button 
                      onClick={() => handleDeleteTask(todo.id)}
                      style={{ background: 'none', border: 'none', color: '#3f3f46', cursor: 'pointer', padding: '2px', display: 'flex' }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#3f3f46'}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </GlassCard>

          {/* Runtime Integrity Status */}
          <GlassCard style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <Cpu size={16} style={{ color: '#f59e0b' }} />
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Runtime Integrity</h3>
              </div>
              <p style={{ margin: 0, fontSize: '13px', color: '#a1a1aa', lineHeight: '1.5' }}>
                Core telemetry loops evaluate framework status variables against active nodes.
              </p>
            </div>
            <div style={{ marginTop: '20px' }}>
              <div style={{ padding: '12px 16px', backgroundColor: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(38, 38, 38, 0.6)', borderRadius: '10px', fontSize: '12px', fontFamily: 'monospace', color: '#f59e0b', marginBottom: '14px' }}>
                🔹 {systemCheckStatus}
              </div>
              <button
                onClick={onTriggerDiagnostic}
                style={{
                  width: '100%', padding: '12px', backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(38, 38, 38, 0.8)', borderRadius: '10px', color: '#ffffff',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)'; e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.3)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.03)'; e.currentTarget.style.borderColor = 'rgba(38, 38, 38, 0.8)'; }}
              >
                Execute System Diagnostic
              </button>
            </div>
          </GlassCard>

        </div>
      </div>
    </div>
  );
}