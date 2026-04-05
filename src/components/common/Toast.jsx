import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, X } from 'lucide-react';
import './Toast.css';

/**
 * Reusable Toast / Popup notification component
 * @param {string} message - The message to display
 * @param {'success'|'error'} type - Toast type
 * @param {boolean} show - Whether to show the toast
 * @param {function} onClose - Callback when toast is dismissed
 * @param {number} duration - Auto-dismiss duration in ms (default 3500)
 */
export default function Toast({ message, type = 'success', show, onClose, duration = 3500 }) {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (show && message) {
      setVisible(true);
      setExiting(false);

      const timer = setTimeout(() => {
        setExiting(true);
        setTimeout(() => {
          setVisible(false);
          setExiting(false);
          onClose?.();
        }, 400); // match exit animation duration
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [show, message, duration, onClose]);

  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      setExiting(false);
      onClose?.();
    }, 400);
  };

  if (!visible) return null;

  const isSuccess = type === 'success';

  return (
    <div className={`toast-popup-overlay ${exiting ? 'exiting' : ''}`} onClick={handleClose}>
      <div className={`toast-popup ${type} ${exiting ? 'exiting' : ''}`} onClick={e => e.stopPropagation()}>
        <div className="toast-popup-glow" />
        <div className="toast-popup-icon-wrap">
          <div className={`toast-popup-icon ${type}`}>
            {isSuccess ? <CheckCircle size={28} /> : <XCircle size={28} />}
          </div>
        </div>
        <div className="toast-popup-content">
          <h4 className="toast-popup-title">
            {isSuccess ? 'Success!' : 'Error!'}
          </h4>
          <p className="toast-popup-message">{message}</p>
        </div>
        <button className="toast-popup-close" onClick={handleClose} aria-label="Close notification">
          <X size={16} />
        </button>
        <div className={`toast-popup-progress ${type}`}>
          <div
            className="toast-popup-progress-bar"
            style={{ animationDuration: `${duration}ms` }}
          />
        </div>
      </div>
    </div>
  );
}
