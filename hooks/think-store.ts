import createContextHook from '@nkzw/create-context-hook';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { ThinkEvaluation, KeepToYourselfStats, ProgressionState } from '../types/think';

const STORAGE_KEY = 'think-evaluations';
const PROGRESSION_KEY = 'think-progression';

export const [ThinkProvider, useThink] = createContextHook(() => {
  const [evaluations, setEvaluations] = useState<ThinkEvaluation[]>([]);
  const [progression, setProgression] = useState<ProgressionState>({
    startDate: new Date(),
    consecutiveDays: 0,
    lastActiveDate: null,
    pleaseUnlocked: false,
    reallyUnlocked: false
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadEvaluations();
    loadProgression();
  }, []);

  const loadEvaluations = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const now = new Date();
        const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
        
        setEvaluations(parsed.map((e: any) => {
          const timestamp = new Date(e.timestamp);
          return {
            ...e,
            timestamp,
            canDelete: timestamp < twoWeeksAgo
          };
        }));
      }
    } catch (error) {
      console.error('Error loading evaluations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadProgression = async () => {
    try {
      const stored = await AsyncStorage.getItem(PROGRESSION_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setProgression({
          ...parsed,
          startDate: new Date(parsed.startDate),
          lastActiveDate: parsed.lastActiveDate ? new Date(parsed.lastActiveDate) : null
        });
      } else {
        // Initialize progression for new users
        const initialProgression = {
          startDate: new Date(),
          consecutiveDays: 0,
          lastActiveDate: null,
          pleaseUnlocked: false,
          reallyUnlocked: false
        };
        setProgression(initialProgression);
        await AsyncStorage.setItem(PROGRESSION_KEY, JSON.stringify(initialProgression));
      }
    } catch (error) {
      console.error('Error loading progression:', error);
    }
  };

  const updateProgression = useCallback(async (activityDate: Date) => {
    const today = new Date(activityDate.getFullYear(), activityDate.getMonth(), activityDate.getDate());
    const lastActive = progression.lastActiveDate ? 
      new Date(progression.lastActiveDate.getFullYear(), progression.lastActiveDate.getMonth(), progression.lastActiveDate.getDate()) : null;
    
    let newConsecutiveDays = progression.consecutiveDays;
    
    if (!lastActive) {
      // First activity
      newConsecutiveDays = 1;
    } else {
      const daysDiff = Math.floor((today.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysDiff === 0) {
        // Same day, no change
        return;
      } else if (daysDiff === 1) {
        // Consecutive day
        newConsecutiveDays = progression.consecutiveDays + 1;
      } else {
        // Missed days, reset streak
        newConsecutiveDays = 1;
      }
    }
    
    const newProgression = {
      ...progression,
      consecutiveDays: newConsecutiveDays,
      lastActiveDate: activityDate,
      pleaseUnlocked: newConsecutiveDays >= 14,
      reallyUnlocked: newConsecutiveDays >= 42
    };
    
    setProgression(newProgression);
    
    try {
      await AsyncStorage.setItem(PROGRESSION_KEY, JSON.stringify(newProgression));
    } catch (error) {
      console.error('Error updating progression:', error);
    }
  }, [progression]);

  const saveEvaluation = useCallback(async (evaluation: ThinkEvaluation) => {
    const now = new Date();
    const evaluationWithMeta = {
      ...evaluation,
      timestamp: now,
      canDelete: false
    };
    
    const updated = [evaluationWithMeta, ...evaluations].slice(0, 100); // Keep last 100
    setEvaluations(updated);
    
    // Update progression
    await updateProgression(now);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error saving evaluation:', error);
    }
  }, [evaluations, updateProgression]);

  const clearHistory = useCallback(async () => {
    const deletableEvaluations = evaluations.filter(e => e.canDelete);
    const remainingEvaluations = evaluations.filter(e => !e.canDelete);
    
    if (deletableEvaluations.length === 0) {
      console.log('No evaluations can be deleted (2-week protection)');
      return;
    }
    
    setEvaluations(remainingEvaluations);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(remainingEvaluations));
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }, [evaluations]);

  const deleteEvaluation = useCallback(async (id: string) => {
    const evaluation = evaluations.find(e => e.id === id);
    if (!evaluation?.canDelete) {
      console.log('Evaluation cannot be deleted (2-week protection)');
      return;
    }
    
    const updated = evaluations.filter(e => e.id !== id);
    setEvaluations(updated);
    
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (error) {
      console.error('Error deleting evaluation:', error);
    }
  }, [evaluations]);

  const getStats = useCallback(() => {
    if (evaluations.length === 0) return null;
    
    const total = evaluations.length;
    const avgPercentage = evaluations.reduce((sum, e) => sum + e.percentage, 0) / total;
    const perfect = evaluations.filter(e => e.percentage === 100).length;
    
    return {
      total,
      avgPercentage: Math.round(avgPercentage),
      perfectCount: perfect,
      perfectRate: Math.round((perfect / total) * 100)
    };
  }, [evaluations]);

  const getKeepToYourselfStats = useCallback((): KeepToYourselfStats => {
    const keepToYourselfEvaluations = evaluations.filter(e => e.percentage === 0);
    const totalKeepToYourself = keepToYourselfEvaluations.length;
    
    if (evaluations.length === 0) {
      return {
        totalKeepToYourself: 0,
        overallScore: 100,
        recentTrend: 'stable'
      };
    }
    
    const overallScore = Math.round(100 - ((totalKeepToYourself / evaluations.length) * 100));
    
    // Calculate trend based on recent vs older evaluations
    const midpoint = Math.floor(evaluations.length / 2);
    const recentEvaluations = evaluations.slice(0, midpoint);
    const olderEvaluations = evaluations.slice(midpoint);
    
    const recentKeepToYourself = recentEvaluations.filter(e => e.percentage === 0).length;
    const olderKeepToYourself = olderEvaluations.filter(e => e.percentage === 0).length;
    
    const recentRate = recentEvaluations.length > 0 ? recentKeepToYourself / recentEvaluations.length : 0;
    const olderRate = olderEvaluations.length > 0 ? olderKeepToYourself / olderEvaluations.length : 0;
    
    let recentTrend: 'improving' | 'declining' | 'stable' = 'stable';
    if (recentRate < olderRate - 0.1) recentTrend = 'improving';
    else if (recentRate > olderRate + 0.1) recentTrend = 'declining';
    
    return {
      totalKeepToYourself,
      overallScore,
      recentTrend
    };
  }, [evaluations]);

  // Auto-save functionality - update canDelete status periodically
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const twoWeeksAgo = new Date(now.getTime() - (14 * 24 * 60 * 60 * 1000));
      
      setEvaluations(prev => prev.map(e => ({
        ...e,
        canDelete: e.timestamp < twoWeeksAgo
      })));
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, []);

  return useMemo(() => ({
    evaluations,
    progression,
    isLoading,
    saveEvaluation,
    clearHistory,
    deleteEvaluation,
    getStats,
    getKeepToYourselfStats
  }), [evaluations, progression, isLoading, saveEvaluation, clearHistory, deleteEvaluation, getStats, getKeepToYourselfStats]);
});