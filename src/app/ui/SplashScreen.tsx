"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';

interface Cell {
  id: string;
  char: string;
  x: number;
  y: number;
  distance: number;
  visible: boolean;
  opacity: number;
}

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(true); // Default to true to prevent FOUC of the homepage
  const [isClient, setIsClient] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cells, setCells] = useState<Cell[]>([]);
  const [phase, setPhase] = useState<'typing' | 'expanding' | 'fading' | 'done'>('typing');

  const maxDistanceRef = useRef(0);
  const fullText = "Hi, I'm Quinn";
  const cellSize = 24; // Size of each character cell

  useEffect(() => {
    setIsClient(true);
    // Check session storage to only show once per visit
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      setShowSplash(false);
      setPhase('done');
    } else {
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  // 1. Typewriter Effect
  useEffect(() => {
    if (!isClient || !showSplash || isTransitioning) return;

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
  }, [isClient, showSplash, isTransitioning]);

  // 2. Trigger Listener
  const handleTrigger = useCallback((e: Event) => {
    if (!isTypingComplete || isTransitioning) return;
    if (e.type === 'wheel' || e.type === 'touchmove') e.preventDefault();

    setIsTransitioning(true);
    setPhase('expanding');
  }, [isTypingComplete, isTransitioning]);

  useEffect(() => {
    if (!isTypingComplete || isTransitioning) return;

    const events = ['click', 'wheel', 'scroll', 'touchmove', 'keydown'];
    events.forEach(event => window.addEventListener(event, handleTrigger, { passive: false }));

    return () => {
      events.forEach(event => window.removeEventListener(event, handleTrigger));
    };
  }, [isTypingComplete, isTransitioning, handleTrigger]);

  // 3. Setup Matrix Grid and Transition Phases
  useEffect(() => {
    if (phase !== 'expanding') return;

    const cols = Math.ceil(window.innerWidth / cellSize);
    const rows = Math.ceil(window.innerHeight / cellSize);
    const centerX = cols / 2;
    const centerY = rows / 2;

    const initialCells: Cell[] = [];
    let maxDistance = 0;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const dx = c - centerX;
        const dy = r - centerY;
        // Adjust dx to account for aspect ratio of character vs line height
        const distance = Math.sqrt((dx * 0.6) ** 2 + dy ** 2);
        if (distance > maxDistance) maxDistance = distance;

        initialCells.push({
          id: `${r}-${c}`,
          char: Math.random() > 0.5 ? '1' : '0',
          x: c,
          y: r,
          distance: distance,
          visible: false,
          opacity: 1,
        });
      }
    }

    maxDistanceRef.current = maxDistance;
    setCells(initialCells);

    // Phase 1: Expanding outwards (showing 1s and 0s)
    const startTime = performance.now();
    const expandDuration = 800; // ms to reach edges
    let expandRaf: number;

    const animateExpand = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / expandDuration, 1);
      const currentRadius = progress * maxDistance;

      setCells(prev => {
        let changed = false;
        const next = prev.map(c => {
          if (!c.visible && c.distance <= currentRadius) {
            changed = true;
            return { ...c, visible: true };
          }
          return c;
        });
        return changed ? next : prev;
      });

      if (progress < 1) {
        expandRaf = requestAnimationFrame(animateExpand);
      } else {
        // Start fading phase after short delay
        setTimeout(() => setPhase('fading'), 200);
      }
    };

    expandRaf = requestAnimationFrame(animateExpand);

    return () => cancelAnimationFrame(expandRaf);
  }, [phase]);

  // 4. Phase 2: Fading outwards
  useEffect(() => {
    if (phase !== 'fading') return;

    const startTime = performance.now();
    const fadeDuration = 1200; // ms to reach edges
    const maxDist = maxDistanceRef.current;
    let fadeRaf: number;

    const animateFade = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / fadeDuration, 1);
      // Give it a little trail behind the radius
      const currentRadius = progress * maxDist * 1.5;

      setCells(prev => {
        let changed = false;
        const next = prev.map(c => {
          if (c.opacity > 0 && c.distance <= currentRadius) {
            changed = true;
            // The further inside the radius, the more faded
            const fadeAmount = Math.max(0, 1 - (currentRadius - c.distance) / 5);
            return { ...c, opacity: fadeAmount };
          }
          return c;
        });
        return changed ? next : prev;
      });

      if (progress < 1) {
        fadeRaf = requestAnimationFrame(animateFade);
      } else {
        setTimeout(() => {
          setPhase('done');
          setShowSplash(false);
        }, 500); // Wait for last fades
      }
    };

    fadeRaf = requestAnimationFrame(animateFade);

    return () => cancelAnimationFrame(fadeRaf);
  }, [phase]);

  // Provide a minimal, blocking inline script to hide the splash screen IMMEDIATELY
  // before React even hydrates, completely preventing the FOUC for returning visitors.
  const inlineScript = `
    try {
      if (sessionStorage.getItem('hasSeenSplash')) {
        document.documentElement.classList.add('hide-splash');
      }
    } catch (e) {}
  `;

  if (phase === 'done' || !showSplash) return null;

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
          isTypingComplete && !isTransitioning ? 'cursor-pointer' : ''
        }`}
        style={{
          // Main background turns transparent during transition, we rely on the cells
          backgroundColor: phase === 'typing' ? 'var(--background)' : 'transparent',
          transition: 'background-color 0s'
        }}
      >
        {/* Fill the background with solid color until the cells render to hide homepage */}
        {phase === 'expanding' && cells.length === 0 && (
          <div className="absolute inset-0 bg-background" />
        )}

        {/* Typewriter Text */}
        {phase === 'typing' && (
          <div className="absolute inset-0 flex items-center justify-center bg-background text-foreground">
            <div className="font-mono text-2xl md:text-4xl flex items-center">
              {displayedText}
              <span className="animate-[pulse_1s_step-end_infinite] ml-1 opacity-100">_</span>
            </div>
          </div>
        )}

        {/* Matrix Effect */}
        {(phase === 'expanding' || phase === 'fading') && (
          <div
            className="absolute inset-0 font-mono text-foreground font-bold text-opacity-80"
            style={{
              fontSize: `${cellSize}px`,
              lineHeight: `${cellSize}px`
            }}
          >
            {cells.map(cell => (
              <span
                key={cell.id}
                style={{
                  position: 'absolute',
                  left: `${cell.x * cellSize}px`,
                  top: `${cell.y * cellSize}px`,
                  opacity: cell.opacity,
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  textAlign: 'center',
                  // Ensure every cell has a solid background to cover the site beneath it
                  backgroundColor: 'var(--background)',
                  // Hide completely if not visible during expansion phase
                  visibility: cell.visible ? 'visible' : 'hidden'
                }}
              >
                {cell.char}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
