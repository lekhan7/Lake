import React, { useState } from 'react';
import { Calendar, User, Phone, MessageSquare, CheckCircle, XCircle, Loader2, Video, MapPin } from 'lucide-react';
import emailjs from '@emailjs/browser';

// CONFIGURATION - Replace with your EmailJS credentials
const EMAILJS_CONFIG = {
  serviceId: 'service_kv6jdlp',
  callBookingTemplateId: 'template_u6w1vdk', // Using existing template temporarily
  confirmationTemplateId: 'template_z4vsctc', // Using existing template temporarily
  publicKey: 'nx1BIUXyj2In0oq5U'
};

const BookCall = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    callType: 'consultation',
    date: '',
    time: '',
    timezone: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Available time slots
  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ];

  // Call types
  const callTypes = [
    { value: 'consultation', label: 'Free Consultation', duration: '30 min', icon: MessageSquare },
    { value: 'project', label: 'Project Discussion', duration: '45 min', icon: Calendar },
    { value: 'demo', label: 'Live Demo', duration: '60 min', icon: Video },
    { value: 'support', label: 'Technical Support', duration: '30 min', icon: Phone }
  ];

  // Get user's timezone
  React.useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setFormData(prev => ({ ...prev, timezone }));
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
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

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.callType) {
      newErrors.callType = 'Please select a call type';
    }

    if (!formData.date) {
      newErrors.date = 'Please select a date';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Please select a time slot';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Please tell us what you want to discuss';
    } else if (formData.message.trim().length < 20) {
      newErrors.message = 'Please provide at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendCallBookingEmail = async () => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      website_name: formData.company || 'N/A',
      charges: 'Call Booking',
      days: `${formData.callType} - ${formData.date} at ${formData.time}`,
      message: `Phone: ${formData.phone}\nTimezone: ${formData.timezone}\n\nMessage: ${formData.message}`,
      to_email: 'ktkarumbaiah@gmail.com', // Your email
      from_name: 'Lake Wreb Agency'
    };

    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.callBookingTemplateId,
        templateParams,
        EMAILJS_CONFIG.publicKey
      );
      return true;
    } catch (error) {
      console.error('Failed to send booking email:', error);
      throw error;
    }
  };

  const sendConfirmationEmail = async () => {
    const templateParams = {
      name: formData.name,
      email: formData.email,
      website_name: 'Call Booking Confirmation',
      charges: 'Call Scheduled',
      days: `${formData.callType} - ${formData.date} at ${formData.time}`,
      message: `Your call has been successfully booked!\n\nDetails:\nType: ${formData.callType}\nDate: ${formData.date}\nTime: ${formData.time}\nTimezone: ${formData.timezone}\n\nWe look forward to speaking with you.`,
      to_name: formData.name,
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
      await sendCallBookingEmail();
      await sendConfirmationEmail();
      setStep(2);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setFormData({
      name: '',
      email: '',
      phone: '',
      company: '',
      callType: 'consultation',
      date: '',
      time: '',
      timezone: formData.timezone,
      message: ''
    });
    setErrors({});
    setSubmitStatus(null);
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (30 days from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setDate(maxDate.getDate() + 30);
    return maxDate.toISOString().split('T')[0];
  };

  return (
    <div id="bookcall" className="bookcall">
      <div className="bookcall-container">
        {/* Header */}
        <div className="bookcall-header">
          <h2 className="text-4xl font-bold text-white mb-4">Book a Call</h2>
          <p className="text-gray-300 text-lg">Schedule a consultation with our team to discuss your project</p>
        </div>

        {/* Step 1: Booking Form */}
        {step === 1 && (
          <div className="bookcall-form-wrapper">
            <form className="bookcall-form">
              {/* Personal Information */}
              <div className="form-section">
                <h3 className="section-title">
                  <User size={20} />
                  Personal Information
                </h3>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
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
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && (
                      <p className="error-message">
                        <XCircle size={14} /> {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && (
                      <p className="error-message">
                        <XCircle size={14} /> {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Company Name
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company Inc."
                    />
                  </div>
                </div>
              </div>

              {/* Call Details */}
              <div className="form-section">
                <h3 className="section-title">
                  <Calendar size={20} />
                  Call Details
                </h3>

                <div className="form-group">
                  <label>
                    Call Type <span className="required">*</span>
                  </label>
                  <div className="call-types">
                    {callTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <label key={type.value} className="call-type-option">
                          <input
                            type="radio"
                            name="callType"
                            value={type.value}
                            checked={formData.callType === type.value}
                            onChange={handleChange}
                          />
                          <div className="call-type-card">
                            <Icon size={24} />
                            <div>
                              <div className="call-type-label">{type.label}</div>
                              <div className="call-type-duration">{type.duration}</div>
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                  {errors.callType && (
                    <p className="error-message">
                      <XCircle size={14} /> {errors.callType}
                    </p>
                  )}
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Select Date <span className="required">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      min={getMinDate()}
                      max={getMaxDate()}
                      className={errors.date ? 'error' : ''}
                    />
                    {errors.date && (
                      <p className="error-message">
                        <XCircle size={14} /> {errors.date}
                      </p>
                    )}
                  </div>

                  <div className="form-group">
                    <label>
                      Time Slot <span className="required">*</span>
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className={errors.time ? 'error' : ''}
                    >
                      <option value="">Select a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                    {errors.time && (
                      <p className="error-message">
                        <XCircle size={14} /> {errors.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label>
                    <MapPin size={16} />
                    Timezone
                  </label>
                  <input
                    type="text"
                    name="timezone"
                    value={formData.timezone}
                    readOnly
                    className="timezone-input"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="form-section">
                <h3 className="section-title">
                  <MessageSquare size={20} />
                  What would you like to discuss?
                </h3>
                
                <div className="form-group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and any specific questions you have..."
                    rows="4"
                    className={errors.message ? 'error' : ''}
                  />
                  {errors.message && (
                    <p className="error-message">
                      <XCircle size={14} /> {errors.message}
                    </p>
                  )}
                </div>
              </div>

              {submitStatus === 'error' && (
                <div className="submit-message error">
                  <XCircle size={20} />
                  <div>
                    <p>Failed to book the call</p>
                    <p>Please try again or contact us directly</p>
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
                    Booking Your Call...
                  </>
                ) : (
                  <>
                    <Calendar size={20} />
                    Book Call
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Step 2: Success */}
        {step === 2 && (
          <div className="bookcall-form-wrapper">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="text-green-600" size={48} />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">Call Booked Successfully!</h2>
              <p className="text-gray-300 mb-6">
                Thank you for booking a call with us. We've sent a confirmation email to:
              </p>
              <p className="text-lg font-semibold text-cyan mb-6">{formData.email}</p>
              
              <div className="submit-message success" style={{marginBottom: '24px'}}>
                <h3 className="font-semibold text-white mb-3">Call Details</h3>
                <div className="space-y-2 text-left">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name:</span>
                    <span className="font-medium">{formData.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Call Type:</span>
                    <span className="font-medium">{callTypes.find(t => t.value === formData.callType)?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Date:</span>
                    <span className="font-medium">{new Date(formData.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Time:</span>
                    <span className="font-medium">{formData.time} ({formData.timezone})</span>
                  </div>
                </div>
              </div>

              <div className="text-gray-300 mb-6">
                <p className="mb-2">📅 Add this event to your calendar</p>
                <p className="text-sm">We'll send you a reminder 24 hours before the call</p>
              </div>

              <button
                onClick={resetForm}
                className="submit-button"
              >
                Book Another Call
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookCall;
