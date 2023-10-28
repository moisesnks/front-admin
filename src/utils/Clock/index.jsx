// Clock.jsx
import React, { useState, useEffect } from 'react';
import './Clock.css';

export default function Clock() {
    const [time, setTime] = useState(getCurrentTime);
    const [showSeconds, setShowSeconds] = useState(true);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime());
        }, 1000);

        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, []);

    function getCurrentTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        return {
            hours,
            minutes,
            seconds,
        };
    }

    const handleHoursClick = () => {
        setShowSeconds(!showSeconds);
    };

    const handleMinutesClick = () => {
        setShowSeconds(!showSeconds);
    };

    const handleSecondsClick = () => {
        setShowSeconds(false);
    };

    return (
        <div className="clock">
            <p>
                <span className="time-part" id="hours" onClick={handleHoursClick}>
                    {time.hours}
                </span>
                :
                <span className="time-part" id="minutes" onClick={handleMinutesClick}>
                    {time.minutes}
                </span>
                {showSeconds && (
                    <>
                        :
                        <span
                            className="time-part"
                            id="seconds"
                            onClick={handleSecondsClick}
                        >
                            {time.seconds}
                        </span>
                    </>
                )}
            </p>
        </div>
    );
}
