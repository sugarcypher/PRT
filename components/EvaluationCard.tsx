import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Shield } from 'lucide-react-native';
import { ThinkEvaluation, CRITERIA_LABELS } from '@/types/think';
import { getPercentageColor } from '@/utils/think-helpers';

interface EvaluationCardProps {
  evaluation: ThinkEvaluation;
}

export function EvaluationCard({ evaluation }: EvaluationCardProps) {
  const color = getPercentageColor(evaluation.percentage);
  
  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days} day${days !== 1 ? 's' : ''} ago`;
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={[styles.percentageBadge, { backgroundColor: color }]}>
          <Text style={styles.percentageText}>{evaluation.percentage}%</Text>
        </View>
        <View style={styles.timestampContainer}>
          {!evaluation.canDelete && (
            <View style={styles.protectionBadge}>
              <Shield size={12} color="#666" />
              <Text style={styles.protectionText}>Protected</Text>
            </View>
          )}
          <Text style={styles.timestamp}>{formatDate(evaluation.timestamp)}</Text>
        </View>
      </View>
      
      {evaluation.text && (
        <Text style={styles.text} numberOfLines={2}>{evaluation.text}</Text>
      )}
      
      <View style={styles.criteria}>
        {Object.entries(evaluation.criteria).map(([key, value]) => (
          <View key={key} style={[styles.criteriaItem, value && styles.criteriaActive]}>
            <Text style={[styles.criteriaLabel, value && styles.criteriaLabelActive]}>
              {CRITERIA_LABELS[key as keyof typeof CRITERIA_LABELS]}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  percentageBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  percentageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  timestampContainer: {
    alignItems: 'flex-end',
  },
  timestamp: {
    fontSize: 13,
    color: '#999',
  },
  protectionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 2,
  },
  protectionText: {
    fontSize: 10,
    color: '#666',
    marginLeft: 2,
    fontWeight: '500',
  },
  text: {
    fontSize: 15,
    color: '#333',
    marginBottom: 12,
    lineHeight: 20,
  },
  criteria: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  criteriaItem: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
  },
  criteriaActive: {
    backgroundColor: '#E8F5E9',
  },
  criteriaLabel: {
    fontSize: 12,
    color: '#999',
  },
  criteriaLabelActive: {
    color: '#4CAF50',
    fontWeight: '500',
  },
});