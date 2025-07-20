import { useEffect, useRef, useCallback, useMemo, useState } from 'react';

/**
 * Scroll animation configuration options
 */
export interface ScrollAnimationOptions {
  /** CSS selector for elements to animate */
  selector?: string;
  /** Default animation class name */
  defaultAnimation?: string;
  /** Intersection observer threshold (0-1) */
  threshold?: number;
  /** Root margin for intersection observer */
  rootMargin?: string;
  /** Whether to animate elements only once */
  once?: boolean;
  /** Whether to initially hide elements */
  initiallyHidden?: boolean;
  /** Debug mode for development */
  debug?: boolean;
}

/**
 * Animation element configuration from data attributes
 */
export interface AnimationElementConfig {
  /** Animation class name */
  animation: string;
  /** Delay in seconds */
  delay: number;
  /** Duration in seconds */
  duration?: number;
  /** Whether element should be observed once */
  once: boolean;
}

/**
 * Hook return type
 */
export interface UseScrollAnimationReturn {
  /** Re-initialize animations for new elements */
  reinitialize: () => void;
  /** Manually trigger animation for specific element */
  triggerAnimation: (element: HTMLElement, config?: Partial<AnimationElementConfig>) => void;
  /** Check if animations are supported */
  isSupported: boolean;
  /** Get current observer instance */
  observer: IntersectionObserver | null;
  /** Whether the hook is mounted and ready */
  isMounted: boolean;
}

/**
 * Default configuration values
 */
const DEFAULT_OPTIONS: Required<ScrollAnimationOptions> = {
  selector: '[data-animation]',
  defaultAnimation: 'animate__fadeInUp',
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px',
  once: true,
  initiallyHidden: true,
  debug: false,
};

/**
 * Parse animation configuration from HTML element data attributes
 */
const parseElementConfig = (element: HTMLElement, defaultAnimation: string): AnimationElementConfig => {
  const animation = element.dataset.animation || defaultAnimation;
  const delay = parseFloat(element.dataset.delay || '0');
  const duration = element.dataset.duration ? parseFloat(element.dataset.duration) : undefined;
  const once = element.dataset.once !== 'false'; // Default to true unless explicitly set to false

  return {
    animation,
    delay: Math.max(0, delay), // Ensure non-negative delay
    duration,
    once,
  };
};

/**
 * Apply animation to an element
 */
const applyAnimation = (
  element: HTMLElement, 
  config: AnimationElementConfig, 
  debug: boolean = false
): void => {
  // Prevent double animation
  if (element.classList.contains('animate__animated')) {
    if (debug) {
      console.log('Animation already applied, skipping:', element);
    }
    return;
  }

  const applyClasses = () => {
    // Double-check to prevent race conditions
    if (!element.classList.contains('animate__animated')) {
      element.classList.add('animate__animated', config.animation);
      element.style.visibility = 'visible';
      
      // Set custom duration if specified
      if (config.duration) {
        element.style.setProperty('--animate-duration', `${config.duration}s`);
      }
    }
  };

  if (config.delay > 0) {
    setTimeout(applyClasses, config.delay * 1000);
  } else {
    applyClasses();
  }
};

/**
 * Professional scroll animation hook
 * 
 * @description
 * A comprehensive hook for handling scroll-based animations using Intersection Observer API.
 * Supports Animate.css classes and custom animation configurations.
 * Optimized for React Strict Mode and prevents double animations.
 * Hydration-safe with proper client-side mounting.
 * @param options - Configuration options for the animation system
 * @returns Hook utilities for controlling animations
 */
export const useScrollAnimation = (
  options: ScrollAnimationOptions = {}
): UseScrollAnimationReturn => {
  // Hydration-safe mounting state
  const [isMounted, setIsMounted] = useState(false);
  
  // Memoize config to prevent unnecessary re-initializations
  const config = useMemo(() => ({ ...DEFAULT_OPTIONS, ...options }), [options]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const observedElementsRef = useRef<Set<HTMLElement>>(new Set());
  const initializedRef = useRef<boolean>(false);

  /**
   * Check if the environment supports the required APIs
   */
  const isSupported = useMemo(() => 
    typeof window !== 'undefined' && 
    'IntersectionObserver' in window && 
    'requestAnimationFrame' in window,
    []
  );

  /**
   * Set mounted state after hydration
   */
  useEffect(() => {
    setIsMounted(true);
  }, []);

  /**
   * Intersection Observer callback
   */
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Skip if not properly mounted
    if (!isMounted) return;
    
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const element = entry.target as HTMLElement;
        
        try {
          const elementConfig = parseElementConfig(element, config.defaultAnimation);
          applyAnimation(element, elementConfig, config.debug);
          
          // Unobserve if animation should only happen once
          if (elementConfig.once && observerRef.current) {
            observerRef.current.unobserve(element);
            observedElementsRef.current.delete(element);
          }
        } catch (error) {
          if (config.debug) {
            console.error('Error applying animation:', error, element);
          }
        }
      }
    });
  }, [config.defaultAnimation, config.debug, isMounted]);

  /**
   * Initialize or reinitialize the animation system
   */
  const initialize = useCallback(() => {
    // Skip if not mounted or not supported
    if (!isMounted || !isSupported) {
      if (config.debug && !isSupported) {
        console.warn('Scroll animations not supported in this environment');
      }
      return;
    }

    // Prevent double initialization
    if (initializedRef.current && observerRef.current) {
      if (config.debug) {
        console.log('Animation system already initialized, skipping');
      }
      return;
    }

    // Clean up existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
      observedElementsRef.current.clear();
    }

    // Create new observer
    try {
      observerRef.current = new IntersectionObserver(handleIntersection, {
        threshold: config.threshold,
        rootMargin: config.rootMargin,
      });

      // Find and observe elements
      const elements = document.querySelectorAll<HTMLElement>(config.selector);

      elements.forEach((element) => {
        // Skip elements that are already animated
        if (element.classList.contains('animate__animated')) {
          if (config.debug) {
            console.log('Element already animated, skipping:', element);
          }
          return;
        }

        // Initially hide elements if configured and mounted
        if (config.initiallyHidden && isMounted && element.style.visibility !== 'hidden') {
          element.style.visibility = 'hidden';
        }

        // Start observing
        observerRef.current?.observe(element);
        observedElementsRef.current.add(element);
      });

      initializedRef.current = true;

    } catch (error) {
      if (config.debug) {
        console.error('Error initializing scroll animations:', error);
      }
    }
  }, [
    isMounted,
    isSupported, 
    config.selector, 
    config.threshold, 
    config.rootMargin, 
    config.initiallyHidden, 
    config.debug, 
    handleIntersection
  ]);

  /**
   * Manually trigger animation for a specific element
   */
  const triggerAnimation = useCallback((
    element: HTMLElement, 
    customConfig?: Partial<AnimationElementConfig>
  ) => {
    // Skip if not mounted
    if (!isMounted) return;
    
    try {
      const baseConfig = parseElementConfig(element, config.defaultAnimation);
      const finalConfig = { ...baseConfig, ...customConfig };
      
      applyAnimation(element, finalConfig, config.debug);
    } catch (error) {
      if (config.debug) {
        console.error('Error manually triggering animation:', error, element);
      }
    }
  }, [config.defaultAnimation, config.debug, isMounted]);

  /**
   * Re-initialize function (public API)
   */
  const reinitialize = useCallback(() => {
    if (!isMounted) return;
    
    initializedRef.current = false;
    initialize();
  }, [initialize, isMounted]);

  /**
   * Initialize animations after mounting
   */
  useEffect(() => {
    if (!isMounted) return;
    
    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      if (!initializedRef.current) {
        initialize();
      }
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [initialize, isMounted]);

  /**
   * Cleanup on unmount (important for Strict Mode)
   */
  useEffect(() => {
    return () => {
      const observer = observerRef.current;
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const observedElements = observedElementsRef.current;
      
      if (observer) {
        observer.disconnect();
        observedElements.clear();
        initializedRef.current = false;
      }
    };
  }, []);

  return {
    reinitialize,
    triggerAnimation,
    isSupported,
    observer: observerRef.current,
    isMounted,
  };
}; 