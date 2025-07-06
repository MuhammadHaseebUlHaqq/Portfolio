import { useEffect, useRef } from 'react';
import './CustomCursor.css';

function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const moveCursor = (e) => {
      const { clientX, clientY } = e;
      cursor.style.top = `${clientY}px`;
      cursor.style.left = `${clientX}px`;
    };

    const handleClick = () => {
      cursor.classList.add('expand');
      setTimeout(() => {
        cursor.classList.remove('expand');
      }, 500);
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" />;
}

export default CustomCursor; 