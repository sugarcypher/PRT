import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { getPercentageColor, getPercentageMessage } from '@/utils/think-helpers';

interface PercentageDisplayProps {
  percentage: number;
  criteriaCount: number;
}

export function PercentageDisplay({ percentage, criteriaCount }: PercentageDisplayProps) {
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, [percentage]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const color = getPercentageColor(percentage);
  const message = getPercentageMessage(percentage);

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.circle,
          { 
            backgroundColor: color,
            transform: [{ scale: scaleAnim }, { rotate: spin }],
          }
        ]}
      >
        <Text style={styles.percentage}>{percentage}%</Text>
      </Animated.View>
      <Text style={styles.criteria}>{criteriaCount}/5 criteria met</Text>
      <Text style={[styles.message, { color }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 24,
  },
  circle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  percentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  criteria: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
    fontWeight: '600',
  },
});