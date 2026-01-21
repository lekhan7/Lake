import React, { useState } from 'react';
import { Send, Loader2, CheckCircle, XCircle, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Booking.css';

// CONFIGURATION - Replace with your EmailJS credentials
const EMAILJS_CONFIG = {
  serviceId: 'service_kv6jdlp',
  verificationTemplateId: 'template_u6w1vdk',
  confirmationTemplateId: 'template_z4vsctc',
  publicKey: 'nx1BIUXyj2In0oq5U'
};

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    websiteName: '',
    charges: '',
    days: '',
    email: '',
    confirmEmail: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [verificationError, setVerificationError] = useState('');
  const [submitStatus, setSubmitStatus] = useState(null);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Your name is required';
    }

    if (!formData.websiteName.trim()) {
      newErrors.websiteName = 'Website name is required';
    }

    if (!formData.charges.trim()) {
      newErrors.charges = 'Charges are required';
    } else if (isNaN(formData.charges) || parseFloat(formData.charges) <= 0) {
      newErrors.charges = 'Please enter a valid amount';
    }

    if (!formData.days.trim()) {
      newErrors.days = 'Days to complete is required';
    } else if (isNaN(formData.days) || parseInt(formData.days) <= 0) {
      newErrors.days = 'Please enter a valid number of days';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.confirmEmail.trim()) {
      newErrors.confirmEmail = 'Confirm email is required';
    } else if (!validateEmail(formData.confirmEmail)) {
      newErrors.confirmEmail = 'Please enter a valid email address';
    } else if (formData.email !== formData.confirmEmail) {
      newErrors.confirmEmail = 'Emails do not match';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Website information is required (minimum 50 characters)';
    } else if (formData.message.trim().length < 50) {
      newErrors.message = 'Please provide at least 50 characters of information about your project';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendVerificationEmail = async () => {
    const code = generateVerificationCode();
    setGeneratedCode(code);

    const templateParams = {
      name:formData.name,
      email: formData.email,            // 
      website_name: formData.websiteName,
      charges: formData.charges,
      days: formData.days,
      passcode: code,                   // match {{passcode}} in template
      time: '15 minutes'
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.verificationTemplateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );
      return true;
    } catch (error) {
      console.error('Failed to send verification email:', error);
      throw error;
    }
  };

  const sendBookingConfirmation = async () => {
    const templateParams = {
      name:formData.name,
      email: formData.email,              // 
      website_name: formData.websiteName,
      charges: formData.charges,
      days: formData.days,
      message: formData.message,
      to_name: formData.name, // Use the actual name field
      from_name: 'Lake Wreb Agency'
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.confirmationTemplateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );
      return true;
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await sendVerificationEmail();
      setStep(2);
      setIsSubmitting(false);
    } catch (error) {
      setSubmitStatus('error');
      setIsSubmitting(false);
    }
  };

  const handleVerification = async () => {
    setVerificationError('');

    if (verificationCode.trim() !== generatedCode) {
      setVerificationError('Invalid verification code. Please try again.');
      return;
    }

    setIsSubmitting(true);

    try {
      await sendBookingConfirmation();
      setStep(3);
      setIsSubmitting(false);
      
      setTimeout(() => {
        resetForm();
      }, 5000);
    } catch (error) {
      setVerificationError('Failed to send confirmation. Please try again.');
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      websiteName: '',
      charges: '',
      days: '',
      email: '',
      confirmEmail: '',
      message: ''
    });
    setVerificationCode('');
    setGeneratedCode('');
    setVerificationError('');
    setSubmitStatus(null);
  };

  const resendVerificationCode = async () => {
    setIsSubmitting(true);
    try {
      await sendVerificationEmail();
      setVerificationError('');
      setVerificationCode('');
      setIsSubmitting(false);
      alert('Verification code resent! Please check your email.');
    } catch (error) {
      setVerificationError('Failed to resend code. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div id="booking" className="booking">
      <div className="booking-container">
        {/* Progress Steps */}
        <div className="mb-8">
        
        </div>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <div className="booking-form-wrapper">
            <div className="booking-header">
              <h2 className="text-3xl font-bold text-white mb-2">Book Your Website</h2>
              <p className="text-gray-300">Fill out the form below to get started on your project</p>
            </div>

            <form className="booking-form">
              <div className="form-group">
                <label>
                  Your Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && (
                  <p className="error-message">
                    <XCircle size={14} /> {errors.name}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>
                  Website Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="websiteName"
                  value={formData.websiteName}
                  onChange={handleChange}
                  placeholder="Enter your website name"
                  className={errors.websiteName ? 'error' : ''}
                />
                {errors.websiteName && (
                  <p className="error-message">
                    <XCircle size={14} /> {errors.websiteName}
                  </p>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Charges ($) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="charges"
                    value={formData.charges}
                    onChange={handleChange}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    className={errors.charges ? 'error' : ''}
                  />
                  {errors.charges && (
                    <p className="error-message">
                      <XCircle size={14} /> {errors.charges}
                    </p>
                  )}
                </div>

                <div className="form-group">
                  <label>
                    Days to Complete <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="days"
                    value={formData.days}
                    onChange={handleChange}
                    placeholder="30"
                    min="1"
                    className={errors.days ? 'error' : ''}
                  />
                  {errors.days && (
                    <p className="error-message">
                      <XCircle size={14} /> {errors.days}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>
                  Your Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && (
                  <p className="error-message">
                    <XCircle size={14} /> {errors.email}
                  </p>
                )}
                <p className="email-note">
                  We'll send a verification code to this email
                </p>
              </div>

              <div className="form-group">
                <label>
                  Confirm Your Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  name="confirmEmail"
                  value={formData.confirmEmail}
                  onChange={handleChange}
                  placeholder="confirm.your.email@example.com"
                  className={errors.confirmEmail ? 'error' : ''}
                />
                {errors.confirmEmail && (
                  <p className="error-message">
                    <XCircle size={14} /> {errors.confirmEmail}
                  </p>
                )}
              </div>

              <div className="form-group">
                <label>
                  Website Information (Detailed Requirements) <span className="required">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Please provide detailed information about your website project (minimum 50 characters). Include features you want, design preferences, functionality requirements, timeline expectations, and any other important details..."
                  rows="6"
                  className={errors.message ? 'error' : ''}
                />
                {errors.message && (
                  <p className="error-message">
                    <XCircle size={14} /> {errors.message}
                  </p>
                )}
                <p className="email-note">
                  Please provide at least 2-3 sentences describing your project requirements
                </p>
              </div>

              {submitStatus === 'error' && (
                <div className="submit-message error">
                  <XCircle size={20} />
                  <div>
                    <p>Failed to send verification email</p>
                    <p>Please check your email and try again</p>
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="submit-button"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="spinner" size={20} />
                    Sending Verification Code...
                  </>
                ) : (
                  <>
                    <Mail size={20} />
                    Send Verification Code
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Email Verification */}
        {step === 2 && (
          <div className="booking-form-wrapper">
            <div className="otp-verification">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <Mail className="text-blue-600" size={32} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Verify Your Email</h2>
                <p className="text-gray-300">
                  We've sent a 6-digit verification code to<br />
                  <span className="font-semibold">{formData.email}</span>
                </p>
              </div>

              <div className="otp-input-group">
                <div className="form-group" style={{flex: 1}}>
                  <label className="text-center">
                    Enter Verification Code
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => {
                      setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6));
                      setVerificationError('');
                    }}
                    placeholder="000000"
                    maxLength="6"
                    className={`otp-input ${verificationError ? 'error' : ''}`}
                  />
                  {verificationError && (
                    <p className="error-message text-center">
                      <XCircle size={14} /> {verificationError}
                    </p>
                  )}
                </div>
                <button
                  onClick={handleVerification}
                  disabled={isSubmitting || verificationCode.length !== 6}
                  className="otp-verify-button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="spinner" size={20} />
                      Verifying...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={20} />
                      Verify & Complete Booking
                    </>
                  )}
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={resendVerificationCode}
                  disabled={isSubmitting}
                  className="otp-send-button"
                >
                  Didn't receive the code? Resend
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-400 hover:text-gray-300 text-sm font-medium"
                >
                  ← Back to form
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="booking-form-wrapper">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Booking Confirmed!</h2>
              <p className="text-gray-300 mb-2">
                Thank you for your booking request. We've sent a confirmation email to:
              </p>
              <p className="text-lg font-semibold text-cyan mb-6">{formData.email}</p>
              
              <div className="submit-message success" style={{marginBottom: '24px'}}>
                <h3 className="font-semibold text-white mb-3">Booking Summary</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Website Name:</span>
                    <span className="font-medium">{formData.websiteName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Charges:</span>
                    <span className="font-medium">${formData.charges}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Days to Complete:</span>
                    <span className="font-medium">{formData.days} days</span>
                  </div>
                </div>
              </div>

              <p className="text-gray-300 mb-6">
                We'll get back to you within 24-48 hours to discuss your project in detail.
              </p>

              <button
                onClick={resetForm}
                className="submit-button"
              >
                Make Another Booking
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingForm;