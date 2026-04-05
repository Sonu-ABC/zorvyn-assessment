import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, User, Shield } from 'lucide-react';
import './LoginDropdown.css';

export default function LoginDropdown({ onSelectRole }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (role) => {
    setOpen(false);
    onSelectRole(role);
  };

  return (
    <div className="login-dropdown-wrapper" ref={ref}>
      <button
        className="btn-login-as"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Log In As
        <ChevronDown size={15} className={`chevron ${open ? 'open' : ''}`} />
      </button>

      {open && (
        <div className="login-dropdown-menu" role="menu">
          <button
            className="login-dropdown-item"
            role="menuitem"
            onClick={() => handleSelect('admin')}
          >
            <Shield size={15} />
            Admin
          </button>
          <button
            className="login-dropdown-item"
            role="menuitem"
            onClick={() => handleSelect('user')}
          >
            <User size={15} />
            User
          </button>
        </div>
      )}
    </div>
  );
}
