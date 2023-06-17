import React, { useState } from 'react';
import Timer from './Timer';

const TimerTest = () => {
  const [timerStarted, setTimerStarted] = useState(false);

  const handleStartTest = () => {
    setTimerStarted(true);
    // Additional logic to start the test
  };

  const handleTimeout = () => {
    // Logic to handle timer timeout
    console.log('Time is up!');
  };

  return (
    <div>
      {!timerStarted ? (
        <button onClick={handleStartTest} className='btn btn-warning'>Start Test</button>
      ) : (
        <Timer duration={300} onTimeout={handleTimeout} />
        // Replace 300 with the desired duration in seconds
      )}
    </div>
  );
};

export default TimerTest;
