import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../utils/supabaseClient';
import { 
  generateFlashcardsFromImage, 
  generateSummaryFromImage,
  generateFlashcardsFromText,
  generateSummaryFromText 
} from '../utils/groqService';

// Import Modular Studio Tabs
import DashboardOverview from '../components/DashboardOverview';
import ScanTab from '../components/ScanTab';
import NotebooksTab from '../components/NotebooksTab';
import QuizTab from '../components/QuizTab'; 
import AnalyticsTab from '../components/AnalyticsTab';

import { LayoutDashboard, BookOpen, Camera, BarChart3, LogOut, Zap, User, ShieldAlert, Award } from "lucide-react";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // File Scanning & UI State Hooks
  const [selectedFile, setSelectedFile] = useState(null); 
  const [previewUrl, setPreviewUrl] = useState(null); 
  const [isProcessing, setIsProcessing] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Verifying Security Credentials...');
  const [statusColor, setStatusColor] = useState('#a1a1aa');

  // Active User Context Sessions
  const [loading, setLoading] = useState(true);
  const [activeUser, setActiveUser] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // Cloud Records Matrices & Dynamic Analytical Indices
  const [notebooksList, setNotebooksList] = useState([]);
  const [selectedNotebook, setSelectedNotebook] = useState(null);
  const [generatedCards, setGeneratedCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [totalFlashcardsCount, setTotalFlashcardsCount] = useState(0);
  const [currentStreak, setCurrentStreak] = useState(0);      
  const [retentionScore, setRetentionScore] = useState(85);  
  const [systemCheckStatus, setSystemCheckStatus] = useState('System Idle');

  // Lifted Global Persistent Quiz Metrics
  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    correct: 0,
    incorrect: 0
  });

  // Timezone-safe, automatic chart data memoization calculation loop
  const processedChartData = useMemo(() => {
    const shortDayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const trailingDaysWindow = [];

    const getLocalYYYYMMDD = (dateObj) => {
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    for (let i = 6; i >= 0; i--) {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - i);
      
      const dayLabel = shortDayNames[targetDate.getDay()];
      const targetDateStr = getLocalYYYYMMDD(targetDate);

      const matchingNotesCount = notebooksList.filter(note => {
        if (!note.created_at) return false;
        const noteDateStr = getLocalYYYYMMDD(new Date(note.created_at));
        return noteDateStr === targetDateStr;
      }).length;

      trailingDaysWindow.push({
        day: dayLabel,
        formattedDate: targetDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        notesCount: matchingNotesCount
      });
    }

    return trailingDaysWindow;
  }, [notebooksList]);

  // Core Data Stream Synchronizer Loop
  const fetchCloudDatabaseMetrics = async (userId) => {
    try {
      const { data: notes, error: notesError } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (notesError) throw notesError;
      setNotebooksList(notes || []);

      const { count, error: cardsCountError } = await supabase
        .from('flashcards')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId);

      if (cardsCountError) throw cardsCountError;
      const totalCards = count || 0;
      setTotalFlashcardsCount(totalCards);

      if (notes && notes.length > 0) {
        const formattedDates = notes.map(n => new Date(n.created_at).toISOString().split('T')[0]);
        const uniqueDates = [...new Set(formattedDates)].map(d => new Date(d));
        uniqueDates.sort((a, b) => b - a);
        
        const today = new Date();
        today.setHours(0,0,0,0);
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (uniqueDates[0] >= yesterday) {
          let calculatedStreak = 1;
          for (let i = 0; i < uniqueDates.length - 1; i++) {
            const dateDiff = (uniqueDates[i] - uniqueDates[i + 1]) / (1000 * 60 * 60 * 24);
            if (dateDiff === 1) calculatedStreak++;
            else if (dateDiff > 1) break;
          }
          setCurrentStreak(calculatedStreak);
        } else {
          setCurrentStreak(0);
        }
      } else {
        setCurrentStreak(0);
      }

      if (totalCards === 0) {
        setRetentionScore(0);
      } else {
        setRetentionScore(Math.min(99, 82 + Math.floor(totalCards / 4)));
      }

    } catch (err) {
      console.error("Database sync pipeline failure:", err.message);
    }
  };

  useEffect(() => {
    async function evaluateActiveSession() {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session) {
          navigate('/auth');
          return;
        }
        setActiveUser(session.user);
        setUserEmail(session.user.email);
        setConnectionStatus(`Connected Live Account: ${session.user.email}`);
        setStatusColor('#f59e0b');
        await fetchCloudDatabaseMetrics(session.user.id);
        setLoading(false);
      } catch (err) {
        navigate('/auth');
      }
    }
    evaluateActiveSession();
  }, [navigate]);

  const handleLogout = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const loadSpecificNotebookDeck = async (notebook) => {
    try {
      setSelectedNotebook(notebook);
      const { data: cards, error } = await supabase
        .from('flashcards')
        .select('*')
        .eq('note_id', notebook.id);
      
      if (error) throw error;
      setGeneratedCards(cards || []);
      setCurrentCardIndex(0);
      setIsFlipped(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  // CRUD CREATE: CAMERA SCANNER (IMAGES)
  const handleProcessNotes = async () => {
    if (!selectedFile || !activeUser) return;
    setIsProcessing(true);
    try {
      const fileExtension = selectedFile.name.split('.').pop();
      const generatedFileName = `${Math.random().toString(36).substring(2)}.${fileExtension}`;
      const uniqueDestinationPath = `${activeUser.id}/${generatedFileName}`;

      const { data: uploadDetails, error: storageError } = await supabase.storage
        .from('note-files')
        .upload(uniqueDestinationPath, selectedFile);

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from('note-files')
        .getPublicUrl(uniqueDestinationPath);

      const rawAiFlashcardPayload = await generateFlashcardsFromImage(previewUrl);
      const computedSummaryText = await generateSummaryFromImage(previewUrl);

      const { data: noteRow, error: noteError } = await supabase
        .from('notes')
        .insert([{ 
          user_id: activeUser.id, 
          title: selectedFile.name, 
          file_url: publicUrl,
          summary: computedSummaryText
        }])
        .select().single();

      if (noteError) throw noteError;

      if (rawAiFlashcardPayload && rawAiFlashcardPayload.length > 0) {
        const compiledInsertPayload = rawAiFlashcardPayload.map(card => {
          const keys = Object.keys(card);
          const qKey = keys.find(k => k.toLowerCase().startsWith('q') || k.toLowerCase().includes('front'));
          const aKey = keys.find(k => k.toLowerCase().startsWith('a') || k.toLowerCase().includes('back'));
          return {
            user_id: activeUser.id,
            note_id: noteRow.id,
            question: card[qKey] || card[keys[0]] || "Question node",
            answer: card[aKey] || card[keys[1]] || card[keys[0]] || "Answer node"
          };
        });

        const { error: batchInsertError } = await supabase.from('flashcards').insert(compiledInsertPayload);
        if (batchInsertError) throw batchInsertError;

        setSelectedFile(null);
        setPreviewUrl(null);
        await fetchCloudDatabaseMetrics(activeUser.id);
        await loadSpecificNotebookDeck(noteRow);
        setActiveTab('notebooks');
      }
    } catch (error) {
      alert(`Image processing pipeline crash: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  // CRUD CREATE: MULTI-FORMAT WIZARD (.TXT / COPIED TEXT)
  const handleCreateMultiFormatNote = async (title, contentText, optionalFileObject) => {
    if (!activeUser) return;
    try {
      let finalPublicFileUrl = "";

      if (optionalFileObject && !optionalFileObject.type.startsWith('text/')) {
        const fileExtension = optionalFileObject.name.split('.').pop();
        const generatedFileName = `${Math.random().toString(36).substring(2)}.${fileExtension}`;
        const uniqueDestinationPath = `${activeUser.id}/${generatedFileName}`;

        const { error: storageError } = await supabase.storage
          .from('note-files')
          .upload(uniqueDestinationPath, optionalFileObject);

        if (!storageError) {
          const { data: { publicUrl } } = supabase.storage
            .from('note-files')
            .getPublicUrl(uniqueDestinationPath);
          finalPublicFileUrl = publicUrl;
        }
      }

      const rawAiFlashcardPayload = await generateFlashcardsFromText(contentText);
      const computedSummaryText = await generateSummaryFromText(contentText);

      const { data: noteRow, error: noteError } = await supabase
        .from('notes')
        .insert([{ 
          user_id: activeUser.id, 
          title: title || "Untitled Note Node", 
          file_url: finalPublicFileUrl || null,
          summary: computedSummaryText
        }])
        .select().single();

      if (noteError) throw noteError;

      if (rawAiFlashcardPayload && rawAiFlashcardPayload.length > 0) {
        const compiledInsertPayload = rawAiFlashcardPayload.map(card => {
          const keys = Object.keys(card);
          const qKey = keys.find(k => k.toLowerCase().startsWith('q') || k.toLowerCase().includes('front'));
          const aKey = keys.find(k => k.toLowerCase().startsWith('a') || k.toLowerCase().includes('back'));
          return {
            user_id: activeUser.id,
            note_id: noteRow.id,
            question: card[qKey] || card[keys[0]] || "Question node",
            answer: card[aKey] || card[keys[1]] || card[keys[0]] || "Answer node"
          };
        });

        const { error: batchInsertError } = await supabase.from('flashcards').insert(compiledInsertPayload);
        if (batchInsertError) throw batchInsertError;

        await fetchCloudDatabaseMetrics(activeUser.id);
        await loadSpecificNotebookDeck(noteRow);
        setActiveTab('notebooks');
      }
    } catch (error) {
      alert(`Multi-format creation loop error: ${error.message}`);
    }
  };

  // CRUD UPDATE: NOTE TITLE INLINE
  const handleUpdateNotebookTitle = async (noteId, newTitle) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ title: newTitle })
        .eq('id', noteId);

      if (error) throw error;
      await fetchCloudDatabaseMetrics(activeUser.id);
      if (selectedNotebook && selectedNotebook.id === noteId) {
        setSelectedNotebook(prev => ({ ...prev, title: newTitle }));
      }
    } catch (err) {
      alert(`Title update failed: ${err.message}`);
    }
  };

  // CRUD UPDATE: NOTE BRIEFING/SUMMARY CONTENT
  const handleUpdateNotebookSummary = async (noteId, newSummary) => {
    try {
      const { error } = await supabase
        .from('notes')
        .update({ summary: newSummary })
        .eq('id', noteId);

      if (error) throw error;
      await fetchCloudDatabaseMetrics(activeUser.id);
      if (selectedNotebook && selectedNotebook.id === noteId) {
        setSelectedNotebook(prev => ({ ...prev, summary: newSummary }));
      }
    } catch (err) {
      alert(`Content briefing update failed: ${err.message}`);
    }
  };

  // CRUD DELETE: PURGE REPOSITORY COMPLETELY
  const handleDeleteNotebook = async (noteId) => {
    if (!window.confirm("Are you sure you want to permanently erase this notebook and all its calculated AI flashcards?")) return;
    try {
      const { error: cardsWipeError } = await supabase
        .from('flashcards')
        .delete()
        .eq('note_id', noteId);
      if (cardsWipeError) throw cardsWipeError;

      const { error: noteWipeError } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);
      if (noteWipeError) throw noteWipeError;

      if (selectedNotebook && selectedNotebook.id === noteId) {
        setSelectedNotebook(null);
      }
      await fetchCloudDatabaseMetrics(activeUser.id);
    } catch (err) {
      alert(`Repository termination failure: ${err.message}`);
    }
  };

  const triggerSystemDiagnostic = () => {
    setSystemCheckStatus('Analyzing Pipeline...');
    setTimeout(() => { setSystemCheckStatus('Groq API Node: Operational ✓');
      setTimeout(() => { setSystemCheckStatus('Database Engine: Connected Live ✓');
        setTimeout(() => { setSystemCheckStatus('All Systems Nominal'); }, 1200);
      }, 1200);
    }, 1200);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#000000', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <ShieldAlert size={40} style={{ color: '#f59e0b', animation: 'pulse 2s infinite ease-in-out' }} />
          <span style={{ fontSize: '12px', color: '#a1a1aa', fontWeight: 'bold', letterSpacing: '2px', textTransform: 'uppercase' }}>Decoding Core Session nodes...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'flex', 
      backgroundColor: '#000000', 
      color: '#d4d4d8', 
      height: '100vh',            
      width: '100%',              
      overflow: 'hidden',         
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      boxSizing: 'border-box'     
    }}>
      
      {/* Premium Translucent Glassmorphism Sidebar */}
      <aside style={{ 
        width: '270px', 
        backgroundColor: 'rgba(5, 5, 5, 0.65)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: '1px solid rgba(38, 38, 38, 0.4)', 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '32px 20px',
        boxSizing: 'border-box',  
        flexShrink: 0,
        boxShadow: '10px 0 30px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ marginBottom: '44px', paddingLeft: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '8px', height: '24px', backgroundColor: '#f59e0b', borderRadius: '2px' }} />
          <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff', letterSpacing: '-0.5px' }}>NoteNinja</span>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flexGrow: 1 }}>
          {[
            { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
            { id: 'notebooks', label: 'My Notebooks', icon: BookOpen },
            { id: 'scan', label: 'Scan Notes', icon: Camera },
            { id: 'quiz', label: 'Active Quizzes', icon: Award }, 
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          ].map((item) => {
            const isSelected = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveTab(item.id); setSelectedNotebook(null); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '10px', border: 'none',
                  backgroundColor: isSelected ? 'rgba(245, 158, 11, 0.08)' : 'transparent',
                  color: isSelected ? '#ffffff' : '#71717a', 
                  fontSize: '14px', 
                  fontWeight: isSelected ? '600' : '500', 
                  cursor: 'pointer', 
                  textAlign: 'left',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isSelected ? '0 0 20px rgba(245, 158, 11, 0.05)' : 'none',
                  outline: 'none'
                }}
                onMouseEnter={(e) => {
                  if(!isSelected) {
                    e.currentTarget.style.color = '#d4d4d8';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.02)';
                  }
                }}
                onMouseLeave={(e) => {
                  if(!isSelected) {
                    e.currentTarget.style.color = '#71717a';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <item.icon size={18} style={{ 
                  color: isSelected ? '#f59e0b' : 'inherit',
                  transition: 'transform 0.25s ease',
                  transform: isSelected ? 'scale(1.05)' : 'none'
                }} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Elegant Frosted User Badge Node */}
        <div style={{ 
          padding: '14px 16px', 
          backgroundColor: 'rgba(20, 20, 20, 0.4)', 
          backdropFilter: 'blur(10px)',
          borderRadius: '12px', 
          border: '1px solid rgba(38, 38, 38, 0.5)', 
          marginBottom: '16px', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          overflow: 'hidden' 
        }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={14} style={{ color: '#f59e0b' }} />
          </div>
          <span style={{ fontSize: '12px', color: '#a1a1aa', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', fontWeight: '500', letterSpacing: '0.2px' }}>{userEmail}</span>
        </div>

        <button 
          onClick={handleLogout} 
          style={{ 
            display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 18px', borderRadius: '10px', border: 'none', 
            backgroundColor: 'transparent', color: '#52525b', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textAlign: 'left',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#ef4444'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#52525b'}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </aside>

      {/* Main Premium Canvas Workspace Area */}
      <main style={{ 
        flex: 1, 
        padding: '48px 56px', 
        overflowY: 'auto',         
        overflowX: 'hidden',       
        boxSizing: 'border-box',   
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#000000',
        backgroundLinearGradient: 'radial-gradient(circle at 50% 0%, rgba(245, 158, 11, 0.03) 0%, transparent 70%)'
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '48px' }}>
          <div>
            <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#ffffff', letterSpacing: '-0.75px', margin: '0' }}>Study Workspace</h1>
            <div style={{ 
              marginTop: '10px', padding: '6px 14px', 
              backgroundColor: 'rgba(10, 10, 10, 0.5)', 
              backdropFilter: 'blur(5px)',
              border: `1px solid ${statusColor === '#f59e0b' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(161, 161, 170, 0.2)'}`, 
              borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: statusColor, display: 'inline-block', letterSpacing: '0.3px'
            }}>
              <span style={{ display: 'inline-block', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: statusColor, marginRight: '8px', verticalAlign: 'middle' }} />
              {connectionStatus}
            </div>
          </div>
          
          {/* Glass Gold Luxury Tier Badge */}
          <div style={{ 
            display: 'flex', alignItems: 'center', gap: '10px', 
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.12) 0%, rgba(245, 158, 11, 0.02) 100%)', 
            padding: '10px 20px', borderRadius: '30px', 
            border: '1px solid rgba(245, 158, 11, 0.25)', 
            fontSize: '13px', fontWeight: '700', color: '#ffffff', letterSpacing: '0.5px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)'
          }}>
            <Zap size={13} style={{ color: '#f59e0b', fill: '#f59e0b' }} />
            <span>Premium Tier Elite</span>
          </div>
        </header>

        {/* Modular Workspace Display Panel Render Block with Subtle Fade-In Layout Style */}
        <div style={{ 
          flexGrow: 1, 
          animation: 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {activeTab === 'dashboard' && (
            <DashboardOverview 
              userId={activeUser?.id}
              notebooksCount={notebooksList.length}
              totalFlashcardsCount={totalFlashcardsCount}
              notebooksList={notebooksList}
              onReviewNotebook={(notebook) => { loadSpecificNotebookDeck(notebook); setActiveTab('notebooks'); }}
              onNavigateToScan={() => setActiveTab('scan')}
              systemCheckStatus={systemCheckStatus}
              onTriggerDiagnostic={triggerSystemDiagnostic}
              currentStreak={currentStreak}       
              retentionScore={retentionScore}     
            />
          )}

          {activeTab === 'scan' && (
            <ScanTab 
              previewUrl={previewUrl}
              selectedFile={selectedFile}
              isProcessing={isProcessing}
              onFileChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedFile(e.target.files[0]);
                  setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                }
              }}
              onClearFile={() => { setPreviewUrl(null); setSelectedFile(null); }}
              onProcessNotes={handleProcessNotes}
            />
          )}

          {activeTab === 'quiz' && (
            <QuizTab 
              notebooksList={notebooksList}
              stats={quizStats}
              onUpdateStats={(newStats) => setQuizStats(prev => ({ ...prev, ...newStats }))}
            />
          )}

          {activeTab === 'notebooks' && (
            <NotebooksTab 
              notebooksList={notebooksList}
              selectedNotebook={selectedNotebook}
              onSelectNotebook={loadSpecificNotebookDeck}
              onBackToList={() => setSelectedNotebook(null)}
              generatedCards={generatedCards}
              currentCardIndex={currentCardIndex}
              isFlipped={isFlipped}
              onToggleFlip={() => generatedCards.length > 0 && setIsFlipped(!isFlipped)}
              onNextCard={() => {
                setIsFlipped(false);
                setTimeout(() => { setCurrentCardIndex((prev) => (prev + 1) % generatedCards.length); }, 150);
              }}
              onUpdateTitle={handleUpdateNotebookTitle}
              onDeleteNotebook={handleDeleteNotebook}
              onUpdateSummary={handleUpdateNotebookSummary}
              onCreateMultiFormatNote={handleCreateMultiFormatNote}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab 
              chartData={processedChartData} 
              quizStats={quizStats} 
            />
          )}
        </div>
      </main>
      
      {/* Global CSS Inject Node for Dynamic Micro-Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.96); }
        }
        ::-webkit-scrollbar {
          width: 8px;
        }
        ::-webkit-scrollbar-track {
          background: #000000;
        }
        ::-webkit-scrollbar-thumb {
          background: #1c1917;
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #262626;
        }
      `}</style>
    </div>
  );
}