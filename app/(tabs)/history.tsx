import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Trash2, TrendingUp, Award, BarChart3, ShieldX, TrendingDown, Minus } from 'lucide-react-native';
import { useThink } from '../../hooks/think-store';
import { EvaluationCard } from '../../components/EvaluationCard';

export default function HistoryScreen() {
  const { evaluations, clearHistory, getStats, getKeepToYourselfStats } = useThink();
  const stats = getStats();
  const keepToYourselfStats = getKeepToYourselfStats();

  const handleClearHistory = () => {
    const deletableCount = evaluations.filter(e => e.canDelete).length;
    const protectedCount = evaluations.filter(e => !e.canDelete).length;
    
    if (deletableCount === 0) {
      Alert.alert(
        'Cannot Clear History',
        `All ${protectedCount} evaluations are protected by the 2-week deletion policy. Items can only be deleted after 2 weeks.`,
        [{ text: 'OK', style: 'default' }]
      );
      return;
    }
    
    Alert.alert(
      'Clear History',
      `This will delete ${deletableCount} evaluations. ${protectedCount} recent evaluations will remain (2-week protection).`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear', 
          style: 'destructive',
          onPress: clearHistory,
        },
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#F0F4FF', '#FFFFFF']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Your Progress</Text>
            {evaluations.length > 0 && (
              <View style={styles.headerActions}>
                <Text style={styles.protectionNote}>2-week protection active</Text>
                <TouchableOpacity onPress={handleClearHistory}>
                  <Trash2 size={22} color="#999" />
                </TouchableOpacity>
              </View>
            )}
          </View>

          {stats && (
            <>
              <View style={styles.statsContainer}>
                <View style={styles.statCard}>
                  <BarChart3 size={24} color="#4CAF50" />
                  <Text style={styles.statValue}>{stats.total}</Text>
                  <Text style={styles.statLabel}>Total</Text>
                </View>
                
                <View style={styles.statCard}>
                  <TrendingUp size={24} color="#2196F3" />
                  <Text style={styles.statValue}>{stats.avgPercentage}%</Text>
                  <Text style={styles.statLabel}>Average</Text>
                </View>
                
                <View style={styles.statCard}>
                  <Award size={24} color="#FFC107" />
                  <Text style={styles.statValue}>{stats.perfectRate}%</Text>
                  <Text style={styles.statLabel}>Perfect</Text>
                </View>
              </View>
              
              <View style={styles.keepToYourselfCard}>
                <View style={styles.keepToYourselfHeader}>
                  <ShieldX size={28} color="#E53935" />
                  <View style={styles.keepToYourselfTitleContainer}>
                    <Text style={styles.keepToYourselfTitle}>Keep to Yourself Score</Text>
                    <View style={styles.trendContainer}>
                      {keepToYourselfStats.recentTrend === 'improving' && (
                        <>
                          <TrendingUp size={16} color="#4CAF50" />
                          <Text style={[styles.trendText, { color: '#4CAF50' }]}>Improving</Text>
                        </>
                      )}
                      {keepToYourselfStats.recentTrend === 'declining' && (
                        <>
                          <TrendingDown size={16} color="#E53935" />
                          <Text style={[styles.trendText, { color: '#E53935' }]}>Declining</Text>
                        </>
                      )}
                      {keepToYourselfStats.recentTrend === 'stable' && (
                        <>
                          <Minus size={16} color="#999" />
                          <Text style={[styles.trendText, { color: '#999' }]}>Stable</Text>
                        </>
                      )}
                    </View>
                  </View>
                </View>
                
                <View style={styles.keepToYourselfStats}>
                  <View style={styles.keepToYourselfMainStat}>
                    <Text style={styles.keepToYourselfScore}>{keepToYourselfStats.overallScore}%</Text>
                    <Text style={styles.keepToYourselfScoreLabel}>Overall Communication Health</Text>
                  </View>
                  
                  <View style={styles.keepToYourselfDetail}>
                    <Text style={styles.keepToYourselfDetailValue}>{keepToYourselfStats.totalKeepToYourself}</Text>
                    <Text style={styles.keepToYourselfDetailLabel}>"Keep to yourself" responses</Text>
                  </View>
                </View>
                
                <Text style={styles.keepToYourselfDescription}>
                  This score reflects how often you choose appropriate communication. Higher scores indicate better judgment in when to speak.
                </Text>
              </View>
            </>
          )}

          {evaluations.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No evaluations yet</Text>
              <Text style={styles.emptyText}>
                Start evaluating your words to see your history here. All evaluations are automatically saved and protected for 2 weeks.
              </Text>
            </View>
          ) : (
            <View style={styles.listContainer}>
              {evaluations.map((evaluation) => (
                <EvaluationCard key={evaluation.id} evaluation={evaluation} />
              ))}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  headerActions: {
    alignItems: 'flex-end',
  },
  protectionNote: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 13,
    color: '#999',
    marginTop: 4,
  },
  keepToYourselfCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#E53935',
  },
  keepToYourselfHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  keepToYourselfTitleContainer: {
    flex: 1,
    marginLeft: 12,
  },
  keepToYourselfTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trendText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  keepToYourselfStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  keepToYourselfMainStat: {
    alignItems: 'center',
  },
  keepToYourselfScore: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E53935',
  },
  keepToYourselfScoreLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  keepToYourselfDetail: {
    alignItems: 'center',
  },
  keepToYourselfDetailValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  keepToYourselfDetailLabel: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  keepToYourselfDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  listContainer: {
    marginTop: 8,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});