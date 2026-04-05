import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Eye, EyeOff, Camera } from 'lucide-react';
import { saveUserToLocalStorage, isUsernameTaken } from '../../utils/authUtils';
import { useAuth } from '../../hooks/useAuth';
import './AuthForms.css';

export default function SignUpForm({ role, onSwitchToLogin }) {
  const navigate = useNavigate();
  const { login } = useAuth();
  const fileRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    username: '',
    profession: '',
  });
  const [photoBase64, setPhotoBase64]   = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors]             = useState({});
  const [loading, setLoading]           = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: '' }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPhotoBase64(ev.target.result);
      setPhotoPreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required.';
    if (!formData.lastName.trim())  newErrors.lastName  = 'Last name is required.';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required.';
    if (!formData.username.trim()) newErrors.username = 'Username is required.';
    else if (isUsernameTaken(formData.username.trim()))
      newErrors.username = 'Username already taken. Choose another.';
    if (formData.password.length < 6)
      newErrors.password = 'Password must be at least 6 characters.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    await new Promise((r) => setTimeout(r, 400));

    const newUser = {
      username:   formData.username.trim(),
      password:   formData.password,
      role,
      firstName:  formData.firstName.trim(),
      lastName:   formData.lastName.trim(),
      email:      formData.email.trim(),
      profession: formData.profession.trim() || 'Member',
      avatar:     photoBase64 || null,
    };

    saveUserToLocalStorage(newUser);
    login(newUser);
    navigate(role === 'admin' ? '/admin-dashboard' : '/user-dashboard');

    setLoading(false);
  };

  const roleLabel = role === 'admin' ? 'Admin' : 'User';

  return (
    <div className="auth-form-container">
      <div className="auth-form-header">
        <div className={`role-badge ${role}`}>{roleLabel}</div>
        <h2 className="auth-form-title">Create account</h2>
        <p className="auth-form-subtitle">Join FinSight as a {roleLabel.toLowerCase()}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {/* Profile photo upload */}
        <div className="photo-upload-wrap">
          <div
            className="photo-upload-circle"
            onClick={() => fileRef.current?.click()}
            style={{ backgroundImage: photoPreview ? `url(${photoPreview})` : 'none' }}
          >
            {!photoPreview && <Camera size={22} color="#8292b4" />}
          </div>
          <button type="button" className="photo-upload-btn" onClick={() => fileRef.current?.click()}>
            Upload Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handlePhotoChange} />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="su-firstName">First Name</label>
            <input id="su-firstName" name="firstName" type="text" placeholder="John"
              value={formData.firstName} onChange={handleChange} autoFocus />
            {errors.firstName && <span className="field-error">{errors.firstName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="su-lastName">Last Name</label>
            <input id="su-lastName" name="lastName" type="text" placeholder="Doe"
              value={formData.lastName} onChange={handleChange} />
            {errors.lastName && <span className="field-error">{errors.lastName}</span>}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="su-email">Email</label>
          <input id="su-email" name="email" type="email" placeholder="john@example.com"
            value={formData.email} onChange={handleChange} autoComplete="email" />
          {errors.email && <span className="field-error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="su-profession">Profession</label>
          <input id="su-profession" name="profession" type="text" placeholder="e.g. Software Engineer"
            value={formData.profession} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="su-username">Username</label>
          <input id="su-username" name="username" type="text" placeholder="Choose a username"
            value={formData.username} onChange={handleChange} autoComplete="username" />
          {errors.username && <span className="field-error">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="su-password">Password</label>
          <div className="password-wrapper">
            <input id="su-password" name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Min. 6 characters"
              value={formData.password} onChange={handleChange} autoComplete="new-password" />
            <button type="button" className="password-toggle"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}>
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          {errors.password && <span className="field-error">{errors.password}</span>}
        </div>

        <button type="submit" className="btn-auth-submit" disabled={loading}>
          {loading ? <span className="spinner" /> : <><UserPlus size={16} />Create Account</>}
        </button>
      </form>

      <p className="auth-switch-text">
        Already have an account?{' '}
        <button className="link-btn" onClick={onSwitchToLogin}>Log In</button>
      </p>
    </div>
  );
}
