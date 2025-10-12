import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const Channel5 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState('name'); // 'name', 'email', 'message', 'submit', 'social0-3'
  
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const messageRef = useRef(null);
  const submitRef = useRef(null);

  // Update these with your actual social media links
  const socialLinks = {
    LinkedIn: 'https://www.linkedin.com/in/your-profile',
    GitHub: 'https://github.com/your-username',
    'X (Twitter)': 'https://twitter.com/your-handle',
    Email: 'mailto:your.email@example.com'
  };

  // Handle remote navigation
  useEffect(() => {
    const handleNavigation = (e) => {
      const action = e.detail;
      
      if (action === 'up') {
        if (focusedField === 'email') {
          setFocusedField('name');
          nameRef.current?.focus();
        } else if (focusedField === 'message') {
          setFocusedField('email');
          emailRef.current?.focus();
        } else if (focusedField === 'submit') {
          setFocusedField('message');
          messageRef.current?.focus();
        } else if (focusedField.startsWith('social')) {
          setFocusedField('submit');
          submitRef.current?.focus();
        }
      } else if (action === 'down') {
        if (focusedField === 'name') {
          setFocusedField('email');
          emailRef.current?.focus();
        } else if (focusedField === 'email') {
          setFocusedField('message');
          messageRef.current?.focus();
        } else if (focusedField === 'message') {
          setFocusedField('submit');
          submitRef.current?.focus();
        } else if (focusedField === 'submit') {
          setFocusedField('social0');
        }
      } else if (action === 'left' && focusedField.startsWith('social')) {
        const currentIndex = parseInt(focusedField.replace('social', ''));
        if (currentIndex > 0) {
          setFocusedField(`social${currentIndex - 1}`);
        }
      } else if (action === 'right' && focusedField.startsWith('social')) {
        const currentIndex = parseInt(focusedField.replace('social', ''));
        if (currentIndex < 3) {
          setFocusedField(`social${currentIndex + 1}`);
        }
      } else if (action === 'ok') {
        if (focusedField === 'submit') {
          submitRef.current?.click();
        } else if (focusedField.startsWith('social')) {
          const socialIndex = parseInt(focusedField.replace('social', ''));
          const socialButtons = document.querySelectorAll('[data-social-link]');
          socialButtons[socialIndex]?.click();
        }
      }
    };

    // Listen to both remote events for backward compatibility
    window.addEventListener('remoteNavigation', handleNavigation);
    window.addEventListener('remoteDirectionalInput', handleNavigation);
    return () => {
      window.removeEventListener('remoteNavigation', handleNavigation);
      window.removeEventListener('remoteDirectionalInput', handleNavigation);
    };
  }, [focusedField]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (focusedField === 'email') {
          setFocusedField('name');
          nameRef.current?.focus();
        } else if (focusedField === 'message') {
          setFocusedField('email');
          emailRef.current?.focus();
        } else if (focusedField === 'submit') {
          setFocusedField('message');
          messageRef.current?.focus();
        } else if (focusedField.startsWith('social')) {
          setFocusedField('submit');
          submitRef.current?.focus();
        }
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (focusedField === 'name') {
          setFocusedField('email');
          emailRef.current?.focus();
        } else if (focusedField === 'email') {
          setFocusedField('message');
          messageRef.current?.focus();
        } else if (focusedField === 'message') {
          setFocusedField('submit');
          submitRef.current?.focus();
        } else if (focusedField === 'submit') {
          setFocusedField('social0');
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [focusedField]);

  // Auto-focus first field on mount
  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = '⚠️ ERROR! Name field cannot be empty!';
      isValid = false;
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = '⚠️ ERROR! Email field cannot be empty!';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '⚠️ ERROR! Invalid email format!';
      isValid = false;
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = '⚠️ ERROR! Message field cannot be empty!';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('http://localhost:3001/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Message sent successfully! I\'ll get back to you soon! 🎉' });
        setFormData({ name: '', email: '', message: '' });
        setErrors({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Failed to send message. Please try again later.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-pink-600 via-purple-600 to-blue-600 p-4 sm:p-6 md:p-8 overflow-auto">
      <motion.div
        initial={{ scale: 0.5, rotate: -5, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="max-w-4xl mx-auto"
      >
        {/* Hotline Header */}
        <div className="text-center mb-6 sm:mb-8 animate-pulse">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-yellow-300 drop-shadow-[0_0_30px_rgba(255,255,0,0.8)] mb-3 sm:mb-4 leading-tight">
            📞 CALL NOW!
          </h1>
          <div className="bg-yellow-400 text-black text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-black py-3 sm:py-4 px-4 sm:px-6 inline-block transform rotate-2 border-2 sm:border-4 border-black">
            +917543927096-HIRE-ME
          </div>
          <p className="text-xl sm:text-2xl md:text-3xl text-white font-bold mt-3 sm:mt-4 drop-shadow-lg px-2">
            ⚡ Operators Standing By! ⚡
          </p>
        </div>

        {/* Contact Form - 90s Style */}
        <div className="bg-white border-4 sm:border-8 border-black p-4 sm:p-6 md:p-8 rounded-lg shadow-2xl transform -rotate-1">
          <div className="bg-red-600 text-white text-center py-2 sm:py-3 -mx-4 sm:-mx-6 md:-mx-8 -mt-4 sm:-mt-6 md:-mt-8 mb-4 sm:mb-6">
            <p className="text-lg sm:text-xl md:text-2xl font-black">🔥 LIMITED TIME OFFER! 🔥</p>
            <p className="text-lg">First consultation is FREE!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label className="block text-2xl font-black text-black mb-2">
                YOUR NAME:
              </label>
              <input
                ref={nameRef}
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({...formData, name: e.target.value});
                  if (errors.name) setErrors({...errors, name: ''});
                }}
                onFocus={() => setFocusedField('name')}
                className={`w-full px-4 py-3 text-xl border-4 focus:outline-none ${
                  errors.name 
                    ? 'border-red-600 bg-red-100 animate-pulse' 
                    : focusedField === 'name'
                    ? 'border-yellow-400 ring-4 ring-yellow-300'
                    : 'border-black'
                }`}
                placeholder="Enter your name here..."
              />
              {errors.name && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-red-600 border-4 border-black text-white font-black text-lg p-3 shadow-[0_0_20px_rgba(220,38,38,0.8)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl animate-pulse">⚠️</span>
                    <span>{errors.name}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-2xl font-black text-black mb-2">
                EMAIL ADDRESS:
              </label>
              <input
                ref={emailRef}
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({...formData, email: e.target.value});
                  if (errors.email) setErrors({...errors, email: ''});
                }}
                onFocus={() => setFocusedField('email')}
                className={`w-full px-4 py-3 text-xl border-4 focus:outline-none ${
                  errors.email 
                    ? 'border-red-600 bg-red-100 animate-pulse' 
                    : focusedField === 'email'
                    ? 'border-yellow-400 ring-4 ring-yellow-300'
                    : 'border-black'
                }`}
                placeholder="your@email.com"
              />
              {errors.email && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-red-600 border-4 border-black text-white font-black text-lg p-3 shadow-[0_0_20px_rgba(220,38,38,0.8)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl animate-pulse">⚠️</span>
                    <span>{errors.email}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-2xl font-black text-black mb-2">
                YOUR MESSAGE:
              </label>
              <textarea
                ref={messageRef}
                value={formData.message}
                onChange={(e) => {
                  setFormData({...formData, message: e.target.value});
                  if (errors.message) setErrors({...errors, message: ''});
                }}
                onFocus={() => setFocusedField('message')}
                rows={5}
                className={`w-full px-4 py-3 text-xl border-4 focus:outline-none resize-none ${
                  errors.message 
                    ? 'border-red-600 bg-red-100 animate-pulse' 
                    : focusedField === 'message'
                    ? 'border-yellow-400 ring-4 ring-yellow-300'
                    : 'border-black'
                }`}
                placeholder="Tell me about your project..."
              />
              {errors.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-red-600 border-4 border-black text-white font-black text-lg p-3 shadow-[0_0_20px_rgba(220,38,38,0.8)]"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl animate-pulse">⚠️</span>
                    <span>{errors.message}</span>
                  </div>
                </motion.div>
              )}
            </div>

            <button
              ref={submitRef}
              type="submit"
              disabled={isSubmitting}
              onFocus={() => setFocusedField('submit')}
              className={`w-full font-black text-3xl py-4 border-4 transform hover:scale-105 transition-all ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed border-gray-600' 
                  : focusedField === 'submit'
                  ? 'bg-green-500 hover:bg-green-600 border-yellow-400 ring-4 ring-yellow-300 animate-pulse'
                  : 'bg-green-500 hover:bg-green-600 border-black animate-pulse'
              } text-white`}
            >
              {isSubmitting ? '📤 SENDING...' : '📧 SUBMIT MESSAGE'}
            </button>

            {submitStatus && (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`mt-4 p-4 border-4 border-black text-center font-black text-xl ${
                  submitStatus.type === 'success' 
                    ? 'bg-green-400 text-green-900 shadow-[0_0_20px_rgba(34,197,94,0.8)]' 
                    : 'bg-red-400 text-red-900 shadow-[0_0_20px_rgba(220,38,38,0.8)]'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl">{submitStatus.type === 'success' ? '✅' : '❌'}</span>
                  <span>{submitStatus.message}</span>
                </div>
              </motion.div>
            )}
          </form>

          <div className="mt-6 bg-yellow-300 border-4 border-black p-4 text-center transform rotate-1">
            <p className="text-xl font-bold text-black">
              ⏰ Don&apos;t wait! This offer won&apos;t last forever! ⏰
            </p>
          </div>
        </div>

        {/* Social Media Links - 90s Style */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: 'fab fa-linkedin', label: 'LinkedIn', color: 'bg-blue-600', link: socialLinks.LinkedIn },
            { icon: 'fab fa-github', label: 'GitHub', color: 'bg-gray-800', link: socialLinks.GitHub },
            { icon: 'fab fa-x-twitter', label: 'X (Twitter)', color: 'bg-black', link: socialLinks['X (Twitter)'] },
            { icon: 'fas fa-envelope', label: 'Email', color: 'bg-red-600', link: socialLinks.Email }
          ].map((social, index) => (
            <motion.a
              key={social.label}
              href={social.link}
              target={social.label !== 'Email' ? '_blank' : '_self'}
              rel={social.label !== 'Email' ? 'noopener noreferrer' : undefined}
              data-social-link
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setFocusedField(`social${index}`)}
              className={`${social.color} text-white font-black text-xl py-4 px-6 border-4 transform hover:scale-110 transition-all block text-center cursor-pointer ${
                focusedField === `social${index}` 
                  ? 'border-yellow-400 ring-4 ring-yellow-300 scale-110' 
                  : 'border-white'
              }`}
            >
              <div className="text-4xl mb-2">
                <i className={social.icon}></i>
              </div>
              <div>{social.label}</div>
              {focusedField === `social${index}` && (
                <div className="absolute -top-2 -right-2 bg-yellow-400 text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-lg animate-pulse">
                  ✓
                </div>
              )}
            </motion.a>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="mt-6 text-center text-white text-sm">
          <p className="opacity-75">
            * Response time may vary. But I promise I&apos;ll get back to you faster than a 90s dial-up connection! 🚀
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Channel5;

