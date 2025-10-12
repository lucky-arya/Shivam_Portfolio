import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Channel5 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Update these with your actual social media links
  const socialLinks = {
    LinkedIn: 'https://www.linkedin.com/in/your-profile',
    GitHub: 'https://github.com/your-username',
    'X (Twitter)': 'https://twitter.com/your-handle',
    Email: 'mailto:your.email@example.com'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-2xl font-black text-black mb-2">
                YOUR NAME:
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 text-xl border-4 border-black focus:border-yellow-400 focus:outline-none"
                placeholder="Enter your name here..."
                required
              />
            </div>

            <div>
              <label className="block text-2xl font-black text-black mb-2">
                EMAIL ADDRESS:
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 text-xl border-4 border-black focus:border-yellow-400 focus:outline-none"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-2xl font-black text-black mb-2">
                YOUR MESSAGE:
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                rows={5}
                className="w-full px-4 py-3 text-xl border-4 border-black focus:border-yellow-400 focus:outline-none resize-none"
                placeholder="Tell me about your project..."
                required
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full font-black text-3xl py-4 border-4 border-black transform hover:scale-105 transition-all ${
                isSubmitting 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-green-500 hover:bg-green-600 animate-pulse'
              } text-white`}
            >
              {isSubmitting ? '📤 SENDING...' : '📧 SUBMIT MESSAGE'}
            </button>

            {submitStatus && (
              <div className={`mt-4 p-4 border-4 border-black text-center font-bold text-xl ${
                submitStatus.type === 'success' ? 'bg-green-300 text-green-900' : 'bg-red-300 text-red-900'
              }`}>
                {submitStatus.message}
              </div>
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
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`${social.color} text-white font-black text-xl py-4 px-6 border-4 border-white transform hover:scale-110 transition-all block text-center cursor-pointer`}
            >
              <div className="text-4xl mb-2">
                <i className={social.icon}></i>
              </div>
              <div>{social.label}</div>
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

