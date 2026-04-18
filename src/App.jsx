import React, { useCallback, useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaDownload, FaSun, FaMoon, FaMicrophone, FaExternalLinkAlt, FaLinkedin, FaWhatsapp, FaInstagram } from 'react-icons/fa';

const App = () => {
  const [isLightMode, setIsLightMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [isLightMode]);

  const speak = (text) => {
    setCaption(text);
    const utterance = new SpeechSynthesisUtterance(text);
    
    // Animated Boy Voice Characteristics
    utterance.pitch = 1.5; 
    utterance.rate = 1.15; 

    // Try to grab a suitable voice if available
    const voices = window.speechSynthesis.getVoices();
    const boyVoice = voices.find(v => v.name.includes('Google UK English Male') || v.name.includes('Male')) || voices[0];
    if (boyVoice) utterance.voice = boyVoice;

    window.speechSynthesis.speak(utterance);
    
    utterance.onend = () => {
      setTimeout(() => setCaption(""), 3000);
    };
  };

  const handleVoiceAssistant = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Your browser does not support Voice Recognition.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.onstart = () => {
      setIsListening(true);
      speak("Hello, I am Gowda. How can I help you?");
    };
    
    recognition.onresult = (event) => {
      const current = event.resultIndex;
      const transcript = event.results[current][0].transcript.toLowerCase();
      
      if (transcript.includes("resume") || transcript.includes("download")) {
        speak("Downloading resume now.");
        const link = document.createElement('a');
        link.href = '/resume.pdf';
        link.download = 'RANGASWAMY_Resume.pdf';
        link.click();
      } else if (transcript.includes("contact") || transcript.includes("email")) {
        speak("Here is Rangaswamy's contact information.");
        window.location.href = "mailto:mrangaswamy061@gmail.com";
      } else if (transcript.includes("light mode")) {
          setIsLightMode(true);
          speak("Switched to light mode.");
      } else if (transcript.includes("dark mode")) {
          setIsLightMode(false);
          speak("Switched to dark mode.");
      } else if (transcript.includes("projects")) {
          speak("Scrolling to projects.");
          document.getElementById('projects').scrollIntoView({ behavior: 'smooth' });
      } else if (transcript.includes("skills")) {
          speak("Scrolling to skills.");
          document.getElementById('skills').scrollIntoView({ behavior: 'smooth' });
      } else {
        speak("I heard " + transcript + ", but I'm not sure how to help with that yet.");
      }
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const particlesInit = useCallback(async engine => {
    await loadFull(engine);
  }, []);

  const particlesConfig = {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: "#22c55e" },
      shape: { type: "circle" },
      opacity: { value: 0.3, random: true },
      size: { value: 4, random: true },
      line_linked: { enable: true, distance: 150, color: "#f87171", opacity: 0.2, width: 1 },
      move: { enable: true, speed: 1.5, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { grab: { distance: 140, line_linked: { opacity: 0.8 } }, push: { particles_nb: 3 } }
    },
    retina_detect: true
  };

  // Scroll Reveal Animations
  const scrollVariant = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <>
      <div className="nature-bg"></div>
      <Particles id="tsparticles" init={particlesInit} options={particlesConfig} />
      
      {/* Ambient Glows */}
      <div className="ambient-glow"></div>
      <div className="ambient-glow secondary"></div>

      {/* Navigation */}
      <nav className="nav-bar">
        <a href="#home" className="nav-logo">RM.</a>
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#details">Details</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* --- HOME SECTION --- */}
      <section id="home">
        <motion.div className="bento-container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          <motion.div className="glass-panel bento-profile-img" variants={scrollVariant}>
            <img src="/profile.jpeg" alt="Rangaswamy M" />
          </motion.div>

          {/* Hero Bento */}
          <Tilt tiltMaxAngleX={3} tiltMaxAngleY={3} scale={1.01} className="glass-panel bento-hero" style={{ zIndex: 10 }}>
            <motion.div variants={scrollVariant}>
              <h3 style={{ color: 'var(--accent-secondary)' }}>Welcome to my digital space!</h3>
              <h1>Rangaswamy M</h1>
              <h2 style={{ fontSize: '1.5rem', marginTop: '0.5rem', color: 'var(--accent-color)' }}>Creative Strategy & Digital Growth</h2>
              <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>
                Final-year BCA student specializing in <strong>Social Media Management</strong> and <strong>Digital Marketing</strong>. 
                I help brands build engaging online communities through highly creative content strategies.
              </p>
            </motion.div>
          </Tilt>

          {/* Resume View/Download Bento */}
          <motion.div 
            className="glass-panel bento-resume"
            variants={scrollVariant}
            style={{ padding: 0 }}
          >
            <div className="resume-buttons">
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="resume-btn" title="View Resume">
                <FaExternalLinkAlt size={24} style={{ marginBottom: '0.5rem' }} />
                <h4>View</h4>
              </a>
              <a href="/resume.pdf" download="RANGASWAMY_Resume.pdf" className="resume-btn" title="Download Resume">
                <FaDownload size={24} style={{ marginBottom: '0.5rem' }} />
                <h4>Download</h4>
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* --- SKILLS SECTION --- */}
      <section id="skills">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Expertise</motion.h2>
        <motion.div className="bento-container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          
          {/* Experience Bento */}
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="glass-panel bento-experience">
            <motion.div variants={scrollVariant}>
              <h2>Experience & Focus</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
                <div>
                  <h3>Social Media Strategy</h3>
                  <p>Ideating creative content pipelines, fostering deep customer interactions, and ensuring active community management to build brand loyalty.</p>
                </div>
                <div>
                  <h3>Digital Marketing Campaigns</h3>
                  <p>Assisting in data-driven marketing campaigns, heavily focusing on audience engagement metrics and performance analysis to optimize reach.</p>
                </div>
              </div>
            </motion.div>
          </Tilt>

          {/* Skills Bento */}
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="glass-panel bento-skills">
            <motion.div variants={scrollVariant} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
              <h2>Core Competencies</h2>
              
              <div className="skill-tree-container">
                <div className="tree-root">Digital Growth & Marketing</div>
                <div className="tree-branches">
                  
                  <div className="tree-branch">
                    <div className="tree-node">Content Strategy</div>
                    <div className="tree-leaves">
                      <div className="tree-leaf">Idea Generation</div>
                      <div className="tree-leaf">Content Calendar</div>
                      <div className="tree-leaf">Viral Strategy</div>
                    </div>
                  </div>

                  <div className="tree-branch">
                    <div className="tree-node">Community</div>
                    <div className="tree-leaves">
                      <div className="tree-leaf">Audience Engagement</div>
                      <div className="tree-leaf">Customer Interaction</div>
                      <div className="tree-leaf">Brand Loyalty</div>
                    </div>
                  </div>

                  <div className="tree-branch">
                    <div className="tree-node">Analytics</div>
                    <div className="tree-leaves">
                      <div className="tree-leaf">Performance Metrics</div>
                      <div className="tree-leaf">Campaign Tracking</div>
                      <div className="tree-leaf">Data Insights</div>
                    </div>
                  </div>

                </div>
              </div>
              
            </motion.div>
          </Tilt>
        </motion.div>
      </section>

      {/* --- PROJECTS SECTION --- */}
      <section id="projects">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Featured Projects</motion.h2>
        <motion.div className="projects-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer}>
          {/* Project 1 */}
          <motion.div className="project-card" variants={scrollVariant} style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop)' }}>
            <h3>Brand Engagement Campaign</h3>
            <p style={{ color: '#ccc' }}>Increased organic reach by 40% using viral reel strategies.</p>
          </motion.div>
          {/* Project 2 */}
          <motion.div className="project-card" variants={scrollVariant} style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop)' }}>
            <h3>Analytics Dashboard Tracking</h3>
            <p style={{ color: '#ccc' }}>Developed a tracking flow for marketing performance metrics.</p>
          </motion.div>
          {/* Project 3 */}
          <motion.div className="project-card" variants={scrollVariant} style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(https://images.unsplash.com/photo-1542435503-956c469947f6?q=80&w=1000&auto=format&fit=crop)' }}>
            <h3>Content Calendar Hub</h3>
            <p style={{ color: '#ccc' }}>Streamlined scheduling across 4 distinct social platforms.</p>
          </motion.div>
          {/* Project 4 */}
          <motion.div className="project-card" variants={scrollVariant} style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop)' }}>
            <h3>Personal Interactive Portfolio</h3>
            <p style={{ color: '#ccc' }}>Built a fully responsive, animated Bento-box portfolio using React & Framer Motion.</p>
          </motion.div>
          {/* Project 5 */}
          <motion.div className="project-card" variants={scrollVariant} style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(https://images.unsplash.com/photo-1533750349088-cd871a92f312?q=80&w=1000&auto=format&fit=crop)' }}>
            <h3>Kaggadu Adventure Team</h3>
            <p style={{ color: '#ccc' }}>Trek Lead & Social Media Management. Driving community engagement through outdoor experiences.</p>
          </motion.div>
          {/* Project 6 */}
          <motion.div className="project-card" variants={scrollVariant} style={{ backgroundImage: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent), url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop)' }}>
            <h3>Creative Content Ideation</h3>
            <p style={{ color: '#ccc' }}>Orchestrated creative strategy and performance tracking for digital growth.</p>
          </motion.div>
        </motion.div>
      </section>

      {/* --- DETAILS SECTION --- */}
      <section id="details">
        <motion.h2 className="section-title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>More About Me</motion.h2>
        <motion.div className="bento-container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {/* Education */}
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="glass-panel" style={{ gridColumn: 'span 1' }}>
            <motion.div variants={scrollVariant}>
              <h2>Education & Background</h2>
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ color: 'var(--text-primary)' }}>Bachelor of Computer Applications (BCA)</h3>
                <p style={{ color: 'var(--accent-color)', fontWeight: 'bold' }}>Final Year Student</p>
                <p>HMS College, Tumkur</p>
                
                <h4 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Languages</h4>
                <p>English (Fluent), Kannada (Native)</p>
              </div>
            </motion.div>
          </Tilt>

          {/* Hobbies */}
          <Tilt tiltMaxAngleX={2} tiltMaxAngleY={2} className="glass-panel" style={{ gridColumn: 'span 1' }}>
            <motion.div variants={scrollVariant}>
              <h2>Lifestyle & Hobbies</h2>
              <p>Beyond the screen, I draw immense creative inspiration from the real world.</p>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                <span className="skill-tag" style={{ background: 'rgba(56,189,248,0.1)', borderColor: 'var(--accent-color)' }}>📸 Photography</span>
                <span className="skill-tag" style={{ background: 'rgba(56,189,248,0.1)', borderColor: 'var(--accent-color)' }}>⛰️ Trekking</span>
                <span className="skill-tag" style={{ background: 'rgba(56,189,248,0.1)', borderColor: 'var(--accent-color)' }}>✈️ Traveling</span>
                <span className="skill-tag" style={{ background: 'rgba(56,189,248,0.1)', borderColor: 'var(--accent-color)' }}>📚 Reading</span>
              </div>
            </motion.div>
          </Tilt>

          {/* Sketch Picture */}
          <motion.div className="glass-panel" variants={scrollVariant} style={{ gridColumn: 'span 2', padding: 0, height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <img src="/animated_pic.png" alt="Rangaswamy Animated Portrait" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
        </motion.div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section id="contact">
        <motion.div className="bento-container" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.5 }} variants={staggerContainer}>
          <motion.div className="glass-panel bento-contact" variants={scrollVariant}>
            <h2>Let's Create Something Great</h2>
            <p style={{ marginBottom: '2rem', fontSize: '1.2rem', maxWidth: '600px' }}>Ready to elevate your brand's digital presence? Get in touch and let's discuss how my creative strategies can help.</p>
            
            <div style={{ display: 'flex', gap: '3rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="mailto:mrangaswamy061@gmail.com" className="contact-link">
                <FaEnvelope className="contact-icon" />
                <span>Email Me</span>
              </a>
              
              <a href="tel:+918310668859" className="contact-link">
                <FaPhoneAlt className="contact-icon" />
                <span>Call Me</span>
              </a>

              <a href="https://wa.me/918310668859" target="_blank" rel="noreferrer" className="contact-link">
                <FaWhatsapp className="contact-icon" />
                <span>WhatsApp</span>
              </a>

              <a href="https://linkedin.com/in/rangaswamy" target="_blank" rel="noreferrer" className="contact-link">
                <FaLinkedin className="contact-icon" />
                <span>LinkedIn</span>
              </a>

              <a href="https://instagram.com/" target="_blank" rel="noreferrer" className="contact-link">
                <FaInstagram className="contact-icon" />
                <span>Instagram</span>
              </a>
              
              <div className="contact-link" style={{ pointerEvents: 'none' }}>
                <FaMapMarkerAlt className="contact-icon" />
                <span>Shettihalli road HMS, Tumkur</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fab-container">
        <button className="fab-button" onClick={() => setIsLightMode(!isLightMode)} title="Toggle Theme">
          {isLightMode ? <FaMoon /> : <FaSun />}
        </button>
        <button className={`fab-button ${isListening ? 'listening' : ''}`} onClick={handleVoiceAssistant} title="Gowda Voice Assistant">
          <FaMicrophone />
        </button>
      </div>

      {/* Voice Assistant Caption */}
      <motion.div 
        className="gowda-caption"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: caption ? 1 : 0, y: caption ? 0 : 20 }}
        style={{ pointerEvents: caption ? 'auto' : 'none' }}
      >
        <span className="icon"><FaMicrophone /></span>
        <p style={{ color: 'inherit', margin: 0 }}>{caption}</p>
      </motion.div>

    </>
  );
};

export default App;
