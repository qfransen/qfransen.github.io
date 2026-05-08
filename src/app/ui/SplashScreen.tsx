"use client";

import React, { useState, useEffect, useCallback } from 'react';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true); // Default to true to prevent FOUC of the homepage
  const [isClient, setIsClient] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = "Hi, I'm Quinn";

  useEffect(() => {
    setIsClient(true);
    // Check session storage to only show once per visit
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  // typewriter effect
  useEffect(() => {
    if (!isClient || !showSplash) return;

    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeChar = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex + 1));

        const char = fullText[currentIndex];
        let delay = Math.random() * 100 + 50;
        if (char === ',') delay += 400;

        currentIndex++;
        timeoutId = setTimeout(typeChar, delay);
      } else {
        setIsTypingComplete(true);
      }
    };

    timeoutId = setTimeout(typeChar, 500);
    return () => clearTimeout(timeoutId);
  }, [isClient, showSplash]);

  // Trigger listener
  const handleTrigger = useCallback((e: Event) => {
    if (!isTypingComplete) return;
    setShowSplash(false);  // hide the splash screen so we can actually access the homepage underneath
    if (e.type === 'wheel' || e.type === 'touchmove') e.preventDefault();
  }, [isTypingComplete]);

  useEffect(() => {
    if (!isTypingComplete) return;

    const events = ['click', 'wheel', 'scroll', 'touchmove', 'keydown'];
    events.forEach(event => window.addEventListener(event, handleTrigger, { passive: false }));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleTrigger));
    };
  }, [isTypingComplete, handleTrigger]);

  useEffect(() => {
    if (isTypingComplete) {
      const autoHideTimer = setTimeout(() => {
        setShowSplash(false);
      }, 7000); // Waits 7 seconds after typing before hiding
      return () => clearTimeout(autoHideTimer);
    }
  }, [isTypingComplete]);

  // Provide a minimal, blocking inline script to hide the splash screen IMMEDIATELY
  // before React even hydrates, completely preventing the FOUC for returning visitors.
  const inlineScript = `
    try {
      if (sessionStorage.getItem('hasSeenSplash')) {
        document.documentElement.classList.add('hide-splash');
      }
    } catch (e) {}
  `;

  if (!showSplash) return null;

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
      <style>{`
        .hide-splash #splash-screen-root {
          display: none !important;
        }
      `}</style>
      <div
        id="splash-screen-root"
        className={`fixed inset-0 z-[100] overflow-hidden ${
          isTypingComplete ? 'cursor-pointer' : ''
        }`}
        style={{
          // Main background turns transparent during transition, we rely on the cells
          backgroundColor: !isTypingComplete ? 'var(--background)' : 'transparent',
          transition: 'background-color 0s'
        }}
      >

        {/* Typewriter Text */}
        <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground">
          <div className="font-mono text-2xl md:text-4xl flex items-center">
            {displayedText}
            <span className="animate-[pulse_1s_step-end_infinite] ml-1 opacity-100">_</span>
          </div>
        </div>

      </div>
    </>
  );
}