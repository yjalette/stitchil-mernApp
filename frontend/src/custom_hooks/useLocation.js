import React, { useEffect } from 'react';
import { usePosition } from 'use-position';

export const useLocation = () => {
    const { latitude, longitude, error } = usePosition();

    useEffect(() => {
        if (latitude && longitude && !error) {
            // Fetch weather data here.
        }
    }, []);

    console.log(latitude)

    return {
        latitude,
        longitude,
        error
    }
};
