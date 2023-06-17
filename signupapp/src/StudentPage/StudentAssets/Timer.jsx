import React, { useState, useEffect } from 'react';

const Timer = ({ duration, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState(duration);

  useEffect(() => {
    if (timeRemaining === 0) {
      onTimeout();
    } else {
      const timer = setTimeout(() => {
        setTimeRemaining(prevTime => prevTime - 1);
      }, 1000);
  
      return () => clearTimeout(timer);
    }
  }, [timeRemaining, onTimeout]);

  // Format the remaining time to display mm:ss
  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div>
      Time Remaining: {formatTime(timeRemaining)}
    </div>
  );
};

export default Timer;
