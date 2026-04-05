import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// ── Data version guard ──
// Bump this string whenever MOCK_USERS or mockTransactions change
// so that stale localStorage (deleted users, edited txns, etc.) is purged.
const DATA_VERSION = '2';
const storedVersion = localStorage.getItem('finsight_data_version');
if (storedVersion !== DATA_VERSION) {
  const theme = localStorage.getItem('finsight_theme'); // preserve theme
  localStorage.clear();
  if (theme) localStorage.setItem('finsight_theme', theme);
  localStorage.setItem('finsight_data_version', DATA_VERSION);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
