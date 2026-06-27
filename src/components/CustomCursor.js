import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const tailRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const tail = tailRef.current;
    
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(tail, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e) => {
      // Main cursor moves quickly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
      // Tail moves slower to create trailing effect
      gsap.to(tail, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div 
        className="custom-cursor-tail" 
        ref={tailRef} 
        style={{ left: 0, top: 0 }}
      />
      <div 
        className="custom-cursor" 
        ref={cursorRef} 
        style={{ left: 0, top: 0 }}
      />
    </>
  );
};

export default CustomCursor;
