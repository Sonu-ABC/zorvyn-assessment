import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, CreditCard, Lightbulb } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { getTransactionsForUser } from '../data/mockTransactions';
import MOCK_USERS from '../data/mockUsers';
import Sidebar from '../components/dashboard/Sidebar';
import HomeSection from '../components/dashboard/HomeSection';
import TransactionSection from '../components/dashboard/TransactionSection';
import InsightSection from '../components/dashboard/InsightSection';
import './UserDashboard.css';

export default function UserDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const [isDark,           setIsDark]          = useState(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection,    setActiveSection]    = useState('home');

  // Only load mock transactions for seeded users; new sign-ups get empty array
  const isMockUser   = MOCK_USERS.some(u => u.username === currentUser?.username);
  const transactions = isMockUser ? getTransactionsForUser(currentUser?.username) : [];

  const homeRef    = useRef(null);
  const transRef   = useRef(null);
  const insightRef = useRef(null);
  const contentRef = useRef(null);

  /* ── Scroll detection to update activeSection ── */
  useEffect(() => {
    const handleScroll = () => {
      if (!contentRef.current) return;
      
      const scrollTop = contentRef.current.scrollTop;
      const homeElement = homeRef.current;
      const transElement = transRef.current;
      const insightElement = insightRef.current;

      if (!homeElement || !transElement || !insightElement) return;

      const homeTop = homeElement.offsetTop;
      const transTop = transElement.offsetTop;
      const insightTop = insightElement.offsetTop;

      // Determine which section is currently in view (with some threshold)
      const threshold = 100;

      if (scrollTop >= insightTop - threshold) {
        setActiveSection('insights');
      } else if (scrollTop >= transTop - threshold) {
        setActiveSection('transactions');
      } else {
        setActiveSection('home');
      }
    };

    const contentElement = contentRef.current;
    if (contentElement) {
      contentElement.addEventListener('scroll', handleScroll);
      return () => contentElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollTo = (ref, section) => {
    setActiveSection(section);
    setTimeout(() => ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  };

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className={`ud-root ${isDark ? 'dark' : 'light'}`}>

      <Sidebar
        user={currentUser}
        isDark={isDark}
        toggleDark={() => setIsDark(d => !d)}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        activeSection={activeSection}
        onNavHome={()         => scrollTo(homeRef,    'home')}
        onNavTransactions={()  => scrollTo(transRef,   'transactions')}
        onNavInsights={()      => scrollTo(insightRef, 'insights')}
        onLogout={handleLogout}
      />

      <main className={`ud-main ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>

        {/* Dashboard header bar */}
        <div className="ud-topbar">
          <div className="ud-topbar-left">
            <span className="ud-page-title">
              {activeSection === 'home' && (
                <>
                  <Home size={18} className="topbar-icon" />
                  Dashboard
                </>
              )}
              {activeSection === 'transactions' && (
                <>
                  <CreditCard size={18} className="topbar-icon" />
                  Transactions
                </>
              )}
              {activeSection === 'insights' && (
                <>
                  <Lightbulb size={18} className="topbar-icon" />
                  Insights
                </>
              )}
            </span>
          </div>
          <div className="ud-topbar-right">
            <div className="ud-topbar-user">
              <div className="ud-topbar-avatar">
                {currentUser?.firstName?.[0]}{currentUser?.lastName?.[0]}
              </div>
              <span className="ud-topbar-name">{currentUser?.firstName} {currentUser?.lastName}</span>
            </div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="ud-content" ref={contentRef}>

          <section ref={homeRef} id="home-section" className="ud-section">
            <HomeSection transactions={transactions} isDark={isDark} user={currentUser} />
          </section>

          <section ref={transRef} id="transactions-section" className="ud-section">
            <TransactionSection transactions={transactions} isDark={isDark} />
          </section>

          <section ref={insightRef} id="insights-section" className="ud-section">
            <InsightSection transactions={transactions} isDark={isDark} />
          </section>

        </div>
      </main>
    </div>
  );
}
