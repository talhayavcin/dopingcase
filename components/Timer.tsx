import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

const Timer = ({ initialMinutes = 100 }) => {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds(prevSeconds => {
        if (prevSeconds <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prevSeconds - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    return time < 10 ? `0${time}` : time;
  };

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return (
    <View style={styles.timerContainer}>
      <Text style={styles.timerText}>
        {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}sn
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  timerContainer: {
    padding: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    color: '#FFF', // Adjust the color according to your theme
    fontWeight: 'bold',
  }
});

export default Timer;
