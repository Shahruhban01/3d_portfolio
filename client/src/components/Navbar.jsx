import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'hero', title: 'Home' },
    { id: 'about', title: 'About' },
    { id: 'projects', title: 'Projects' },
    { id: 'experience', title: 'Experience' },
    { id: 'blog', title: 'Blog' },
    { id: 'contact', title: 'Contact' }
  ];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <motion.div 
          className="navbar-logo"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="logo-text">&lt;Dev/Portfolio&gt;</span>
        </motion.div>

        {/* Desktop Navigation */}
        <ul className="nav-links-desktop">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <button onClick={() => scrollToSection(link.id)} className="nav-link">
                {link.title}
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button 
          className="hamburger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isOpen ? 'open' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <motion.div 
        className={`mobile-menu ${isOpen ? 'open' : ''}`}
        initial={false}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <ul className="nav-links-mobile">
          {navLinks.map((link) => (
            <li key={link.id}>
              <button onClick={() => scrollToSection(link.id)} className="nav-link-mobile">
                {link.title}
              </button>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
};

export default Navbar;
