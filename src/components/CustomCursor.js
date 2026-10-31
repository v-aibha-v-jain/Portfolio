import { useEffect, useRef } from 'react';
import cursorImage from '../assets/sprites/knight-sword.png';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const moveCursor = (event) => {
      cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
    };

    window.addEventListener('mousemove', moveCursor);

    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <img
      ref={cursorRef}
      className="custom-cursor"
      src={cursorImage}
      alt=""
      aria-hidden="true"
    />
  );
};

export default CustomCursor;
