import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { submitContactForm } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    try {
      await submitContactForm(formData);
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.'
      });
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section contact-section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="section-header"
        >
          <h2 className="section-title">Get In Touch</h2>
          <div className="title-underline"></div>
          <p className="section-description">
            Have a project in mind or want to collaborate? Drop me a message!
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3>Let's Connect</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, 
              or opportunities to be part of your vision.
            </p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div>
                  <h4>Email</h4>
                  <a href="mailto:your.email@example.com">your.email@example.com</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">💼</div>
                <div>
                  <h4>LinkedIn</h4>
                  <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer">
                    linkedin.com/in/yourprofile
                  </a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">💻</div>
                <div>
                  <h4>GitHub</h4>
                  <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                    github.com/yourusername
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Your message..."
              />
            </div>

            {status.message && (
              <div className={`form-status ${status.type}`}>
                {status.message}
              </div>
            )}

            <motion.button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
