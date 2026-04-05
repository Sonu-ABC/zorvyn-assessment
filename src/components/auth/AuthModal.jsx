import React, { useState } from 'react';
import Modal from '../common/Modal';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import LoginDropdown from './LoginDropdown';

/**
 * AuthModal orchestrates:
 *  1. LoginDropdown button (role selection)
 *  2. Modal with LoginForm or SignUpForm depending on state
 */
export default function AuthModal() {
  const [selectedRole, setSelectedRole] = useState(null); // null | 'admin' | 'user'
  const [formView, setFormView] = useState('login');       // 'login' | 'signup'
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setFormView('login');
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <LoginDropdown onSelectRole={handleSelectRole} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        {formView === 'login' ? (
          <LoginForm
            role={selectedRole}
            onSwitchToSignUp={() => setFormView('signup')}
          />
        ) : (
          <SignUpForm
            role={selectedRole}
            onSwitchToLogin={() => setFormView('login')}
          />
        )}
      </Modal>
    </>
  );
}
