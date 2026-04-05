import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import AuthModal from '../components/auth/AuthModal';
import '../App.css';

const LandingPage = () => {
  const handVariants = {
    initial: {
      scale: 0.9,
      y: 100,
      opacity: 0,
    },
    animate: {
      scale: 1.1,
      y: -220,
      opacity: 1,
      transition: {
        duration: 1.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const bubbleVariants = (targetX, targetY) => ({
    initial: { x: 0, y: 0, opacity: 0, scale: 0.5 },
    animate: {
      x: targetX,
      y: targetY,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: 'easeOut',
        delay: 0.3,
      },
    },
  });

  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <ArrowUpRight className="logo-icon" /> FinSight
        </div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#testimonials">Testimonials</a>
          <a href="#pricing">Pricing</a>
        </div>
        {/* Log In As with dropdown */}
        <AuthModal />
      </nav>

      {/* Hero Section */}
      <main className="hero">
        <div className="hero-text-content">
          <h1>Take Control of Your Finances <br /> with FinSight by Your Side</h1>
          <p className="subtitle">
            It's not about having lots of money, <br /> It's knowing how to manage it.... Maxwell
          </p>
        </div>

        {/* Visual Animation Section */}
        <div className="visual-section">
          {/* Big Central Bubble */}
          <div className="big-bubble"></div>

          {/* Animated Hand */}
          <motion.div className="hand-wrapper" variants={handVariants} initial="initial" animate="animate">
            <img src="/hand-mobile.png" alt="FinSight App" className="hand-image" />
          </motion.div>

          {/* Animated Small Bubbles */}
          <motion.div className="small-bubble sb-1" variants={bubbleVariants(-380, -180)} initial="initial" animate="animate">
<i className="fa-solid fa-cart-shopping" style={{ color: 'rgb(255, 168, 15)' }}></i>          </motion.div>

          <motion.div className="small-bubble sb-2" variants={bubbleVariants(-490, -260)} initial="initial" animate="animate">
          </motion.div>

          <motion.div className="small-bubble sb-3" variants={bubbleVariants(290, -250)} initial="initial" animate="animate">
            <i className="fa-solid fa-piggy-bank" style={{color:'  rgb(255, 168, 15)'}}></i>
          </motion.div>

          <motion.div className="small-bubble sb-4" variants={bubbleVariants(-300, -50)} initial="initial" animate="animate">
            <i className="fa-solid fa-stethoscope" style={{ color: 'rgb(255, 168, 15)' }}></i>
          </motion.div>

          <motion.div className="small-bubble sb-5" variants={bubbleVariants(500, -180)} initial="initial" animate="animate">
            <i class="fa-solid fa-burger" style={{ color: 'rgb(255, 168, 15)' }}></i>
          </motion.div>

          <motion.div className="small-bubble sb-6" variants={bubbleVariants(290, -80)} initial="initial" animate="animate">
            <i class="fa-solid fa-plane" style={{ color: 'rgb(255, 168, 15)' }}></i>
          </motion.div>

          <motion.div className="small-bubble sb-7" variants={bubbleVariants(465, -320)} initial="initial" animate="animate">
           
          </motion.div>

          <motion.div className="small-bubble sb-8" variants={bubbleVariants(-580, -110)} initial="initial" animate="animate">
           <i class="fa-solid fa-building-columns" style={{ color: 'rgb(255, 168, 15)' }}></i>
          </motion.div>

          <motion.div className="small-bubble sb-9" variants={bubbleVariants(-265, -220)} initial="initial" animate="animate">
             <i class="fa-brands fa-paypal" style={{ color: 'rgb(255, 168, 15)' }}></i>
          </motion.div>

          <motion.div className="small-bubble sb-10" variants={bubbleVariants(170, -180)} initial="initial" animate="animate">
                <i class="fa-solid fa-wallet" style={{ color: 'rgb(255, 168, 15)' }}></i>
          </motion.div>


          <motion.div className="small-bubble sb-11" variants={bubbleVariants(-420, -60)} initial="initial" animate="animate">
                
          </motion.div>
          <motion.div className="small-bubble sb-12" variants={bubbleVariants(420, -5)} initial="initial" animate="animate">
                
          </motion.div>
          <motion.div className="small-bubble sb-13" variants={bubbleVariants(550, -280)} initial="initial" animate="animate">
                
          </motion.div>


        </div>
      </main>
    </div>
  );
};

export default LandingPage;
