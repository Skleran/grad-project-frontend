'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const ScrollRevealContext = createContext<{ isVisible: boolean }>({
  isVisible: false,
});

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
  preset?: boolean;
}

export function ScrollReveal({
  children,
  className = '',
  threshold = 0.12,
  rootMargin = '0px 0px -100px 0px',
  preset = false,
}: ScrollRevealProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (preset) {
      setIsVisible(true);
      // const timer = setTimeout(() => {
      //   setIsVisible(true);
      // }, 0);
      // //make it 50 if smth broken
      // return () => clearTimeout(timer);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [preset, threshold, rootMargin]);

  return (
    <ScrollRevealContext.Provider value={{ isVisible }}>
      <div ref={ref} className={className}>
        {children}
      </div>
    </ScrollRevealContext.Provider>
  );
}

interface RevealItemProps {
  children: React.ReactNode;
  className?: string;
  delayIndex?: number;
  direction?: 'none' | 'up' | 'down' | 'left' | 'right';
  preset?: boolean;
}

export function RevealItem({
  children,
  className = '',
  delayIndex = 0,
  direction = 'none',
  preset = false,
}: RevealItemProps) {
  const context = useContext(ScrollRevealContext);
  const isVisible = preset || context.isVisible;

  // stagger elements
  const delay = delayIndex * 150;

  const directionClasses = {
    none: 'translate-x-0 translate-y-0',
    up: 'translate-y-6',
    down: '-translate-y-6',
    left: 'translate-x-6',
    right: '-translate-x-6',
  };

  return (
    <div
      className={`transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:filter-none ${
        isVisible
          ? 'opacity-100 blur-0 translate-x-0 translate-y-0'
          : `opacity-0 blur-md ${directionClasses[direction]}`
      } ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
