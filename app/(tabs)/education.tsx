import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { 
  BookOpen, 
  Brain, 
  Users, 
  Shield, 
  ChevronRight,
  Lightbulb,
  Target,
  Heart,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  Lock,
  Clock,
  Zap,
  Eye
} from 'lucide-react-native';
import { useThink } from '../../hooks/think-store';

const { width } = Dimensions.get('window');

interface EducationSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  content: string[];
  examples?: { good: string; bad: string; }[];
  locked?: boolean;
  daysToUnlock?: number;
  acronym?: string;
}



export default function EducationScreen() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const { progression } = useThink();
  
  const daysUntilPlease = Math.max(0, 14 - progression.consecutiveDays);
  const daysUntilReally = Math.max(0, 42 - progression.consecutiveDays);

  const educationSections: EducationSection[] = [
    {
      id: 'cognitive-science',
      title: 'The Science Behind T.H.I.N.K.',
      icon: <Brain size={24} color="#2196F3" />,
      description: 'Understanding the cognitive psychology that makes T.H.I.N.K. effective',
      content: [
        'T.H.I.N.K. is a metacognitive pause button that forces a System-2 check before a System-1 impulse.',
        'Each gate maps to a human control loop that helps regulate communication.',
        'Context reshapes the gates - high stakes situations raise the weight of Important/Necessary.',
        'The framework mirrors how humans naturally up-regulate caution when harm or status loss is plausible.'
      ]
    },
    {
      id: 'criteria-deep-dive',
      title: 'Understanding Each Criterion',
      icon: <Target size={24} color="#4CAF50" />,
      description: 'Deep dive into what each T.H.I.N.K. criterion really means',
      content: [
        'TRUE: Epistemic hygiene - estimate how sure you are, not just what you believe',
        'HELPFUL: Goal alignment - does this change someone\'s state (clarity, time saved, risk reduced)?',
        'IMPORTANT: Attentional economics - does this compete successfully for limited attention now?',
        'NECESSARY: Counterfactual check - if unsaid, does anything break (decision, safety, duty)?',
        'KIND: Affect regulation - can the message be received without defensiveness?'
      ],
      examples: [
        {
          good: 'Your presentation was solid, and adding two visuals would make the key point land faster.',
          bad: 'That presentation was boring and hard to follow.'
        },
        {
          good: 'I spotted smoke in the break room; we should evacuate.',
          bad: 'There might be something wrong somewhere, not sure though.'
        }
      ]
    },
    {
      id: 'context-matters',
      title: 'Why Context Changes Everything',
      icon: <Users size={24} color="#FF9800" />,
      description: 'How situational factors influence communication appropriateness',
      content: [
        'Stakes: High-stakes situations (safety, health, finance) raise the bar for truth confidence',
        'Timing: Bad timing can make good content inappropriate',
        'Consent: Unsolicited advice often fails the Necessary test',
        'Audience: Public vs private contexts change the Kind requirement',
        'Power dynamics: Speaking up vs down requires different approaches'
      ]
    },
    {
      id: 'enterprise-privacy',
      title: 'Enterprise Security & Privacy',
      icon: <Shield size={24} color="#9C27B0" />,
      description: 'How your data is protected in enterprise environments',
      content: [
        'All evaluations are stored locally on your device only',
        'No data is transmitted to external servers without explicit consent',
        '2-week deletion protection prevents accidental data loss',
        'Enterprise deployments can configure custom retention policies',
        'Zero-knowledge architecture ensures your thoughts remain private',
        'Optional encrypted backup to enterprise-approved cloud storage',
        'Audit logs for compliance without exposing evaluation content'
      ]
    },
    {
      id: 'improvement-strategies',
      title: 'Strategies for Improvement',
      icon: <TrendingUp size={24} color="#E91E63" />,
      description: 'Practical techniques to improve your communication scores',
      content: [
        'Start with the Truth criterion - build confidence in your facts first',
        'Practice the "permission ask" for unsolicited advice',
        'Use "I" language to increase kindness scores',
        'Consider timing - defer non-urgent communications',
        'Develop empathetic openers for difficult conversations',
        'Link advice to concrete benefits or constraints'
      ]
    },
    {
      id: 'please-framework',
      title: 'P.L.E.A.S.E. Framework',
      icon: <Eye size={24} color={progression.pleaseUnlocked ? "#FF6B35" : "#CCC"} />,
      description: 'Advanced reflection tool for post-conversation analysis',
      locked: !progression.pleaseUnlocked,
      daysToUnlock: daysUntilPlease,
      acronym: 'Personal, Lie, Exposing, Aggressive, Snide, Egoic',
      content: [
        'PERSONAL: Was this about my personal agenda rather than mutual benefit?',
        'LIE: Did I stretch the truth or omit important context?',
        'EXPOSING: Did I share information that wasn\'t mine to share?',
        'AGGRESSIVE: Was my tone or approach unnecessarily forceful?',
        'SNIDE: Did I include subtle digs or passive-aggressive elements?',
        'EGOIC: Was this more about looking good than being helpful?'
      ],
      examples: [
        {
          good: 'I noticed some concerns in the project timeline - would it help to discuss alternatives?',
          bad: 'This project is obviously going to fail, just like I predicted last time.'
        }
      ]
    },
    {
      id: 'really-framework',
      title: 'R.E.A.L.L.Y. Framework',
      icon: <Zap size={24} color={progression.reallyUnlocked ? "#8B5CF6" : "#CCC"} />,
      description: 'Master-level framework for high-stakes communication',
      locked: !progression.reallyUnlocked,
      daysToUnlock: daysUntilReally,
      acronym: 'Relevant, Ethical, Appropriate, Legal, Lasting, Yours-to-say',
      content: [
        'RELEVANT: Does this directly relate to the current situation and goals?',
        'ETHICAL: Does this align with moral principles and cause no harm?',
        'APPROPRIATE: Is this suitable for the context, audience, and setting?',
        'LEGAL: Does this comply with laws, regulations, and policies?',
        'LASTING: Will this have positive long-term consequences?',
        'YOURS-TO-SAY: Do you have the authority and responsibility to say this?'
      ],
      examples: [
        {
          good: 'I have concerns about this approach based on my experience with similar projects.',
          bad: 'The CEO told me confidentially that this department might be restructured.'
        }
      ]
    }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
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
            <Text style={styles.title}>Learn T.H.I.N.K.</Text>
            <Text style={styles.subtitle}>
              Master the art of thoughtful communication
            </Text>
          </View>

          <View style={styles.introCard}>
            <Lightbulb size={32} color="#FFC107" />
            <Text style={styles.introTitle}>Why T.H.I.N.K. Works</Text>
            <Text style={styles.introText}>
              T.H.I.N.K. isn't just a checklist—it's a scientifically-backed framework that helps you pause, evaluate, and communicate more effectively. Each criterion serves a specific psychological function.
            </Text>
          </View>

          <View style={styles.progressCard}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressTitle}>Your Learning Journey</Text>
              <Text style={styles.streakBadge}>{progression.consecutiveDays} day streak</Text>
            </View>
            
            <View style={styles.progressTrack}>
              <View style={styles.progressMilestone}>
                <View style={[styles.milestoneCircle, { backgroundColor: '#4CAF50' }]}>
                  <CheckCircle size={16} color="white" />
                </View>
                <Text style={styles.milestoneLabel}>T.H.I.N.K.</Text>
                <Text style={styles.milestoneSubtext}>Unlocked</Text>
              </View>
              
              <View style={styles.progressLine} />
              
              <View style={styles.progressMilestone}>
                <View style={[styles.milestoneCircle, { 
                  backgroundColor: progression.pleaseUnlocked ? '#FF6B35' : '#E0E0E0' 
                }]}>
                  {progression.pleaseUnlocked ? (
                    <CheckCircle size={16} color="white" />
                  ) : (
                    <Lock size={16} color="#999" />
                  )}
                </View>
                <Text style={[styles.milestoneLabel, !progression.pleaseUnlocked && styles.lockedText]}>P.L.E.A.S.E.</Text>
                <Text style={[styles.milestoneSubtext, !progression.pleaseUnlocked && styles.lockedText]}>
                  {progression.pleaseUnlocked ? 'Unlocked' : `${daysUntilPlease} days`}
                </Text>
              </View>
              
              <View style={styles.progressLine} />
              
              <View style={styles.progressMilestone}>
                <View style={[styles.milestoneCircle, { 
                  backgroundColor: progression.reallyUnlocked ? '#8B5CF6' : '#E0E0E0' 
                }]}>
                  {progression.reallyUnlocked ? (
                    <CheckCircle size={16} color="white" />
                  ) : (
                    <Lock size={16} color="#999" />
                  )}
                </View>
                <Text style={[styles.milestoneLabel, !progression.reallyUnlocked && styles.lockedText]}>R.E.A.L.L.Y.</Text>
                <Text style={[styles.milestoneSubtext, !progression.reallyUnlocked && styles.lockedText]}>
                  {progression.reallyUnlocked ? 'Unlocked' : `${daysUntilReally} days`}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.sectionsContainer}>
            {educationSections.map((section) => (
              <View key={section.id} style={[
                styles.sectionCard,
                section.locked && styles.lockedCard
              ]}>
                <TouchableOpacity
                  style={styles.sectionHeader}
                  onPress={() => !section.locked && toggleSection(section.id)}
                  activeOpacity={section.locked ? 1 : 0.7}
                  disabled={section.locked}
                >
                  <View style={styles.sectionHeaderLeft}>
                    {section.icon}
                    <View style={styles.sectionTitleContainer}>
                      <View style={styles.titleRow}>
                        <Text style={[
                          styles.sectionTitle,
                          section.locked && styles.lockedText
                        ]}>{section.title}</Text>
                        {section.locked && (
                          <View style={styles.lockContainer}>
                            <Lock size={16} color="#999" />
                          </View>
                        )}
                      </View>
                      {section.locked ? (
                        <View style={styles.countdownContainer}>
                          <Clock size={14} color="#FF6B35" />
                          <Text style={styles.countdownText}>
                            {section.daysToUnlock === 0 ? 'Unlocks today!' : 
                             section.daysToUnlock === 1 ? '1 day to unlock' :
                             `${section.daysToUnlock} days to unlock`}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.sectionDescription}>{section.description}</Text>
                      )}
                      {section.acronym && (
                        <Text style={[
                          styles.acronymText,
                          section.locked && styles.lockedText
                        ]}>{section.acronym}</Text>
                      )}
                    </View>
                  </View>
                  {!section.locked && (
                    <ChevronRight 
                      size={20} 
                      color="#999" 
                      style={[
                        styles.chevron,
                        expandedSection === section.id && styles.chevronExpanded
                      ]}
                    />
                  )}
                </TouchableOpacity>

                {expandedSection === section.id && !section.locked && (
                  <View style={styles.sectionContent}>
                    {section.content.map((item, index) => (
                      <View key={index} style={styles.contentItem}>
                        <CheckCircle size={16} color="#4CAF50" />
                        <Text style={styles.contentText}>{item}</Text>
                      </View>
                    ))}
                    
                    {section.examples && (
                      <View style={styles.examplesContainer}>
                        <Text style={styles.examplesTitle}>Examples:</Text>
                        {section.examples.map((example, index) => (
                          <View key={index} style={styles.examplePair}>
                            <View style={styles.goodExample}>
                              <CheckCircle size={14} color="#4CAF50" />
                              <Text style={styles.goodExampleText}>{example.good}</Text>
                            </View>
                            <View style={styles.badExample}>
                              <AlertTriangle size={14} color="#E53935" />
                              <Text style={styles.badExampleText}>{example.bad}</Text>
                            </View>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                )}
                
                {section.locked && (
                  <View style={styles.lockedContent}>
                    <Text style={styles.lockedMessage}>
                      Keep using T.H.I.N.K. daily to unlock this advanced framework!
                    </Text>
                    <Text style={styles.streakInfo}>
                      Current streak: {progression.consecutiveDays} days
                    </Text>
                  </View>
                )}
              </View>
            ))}
          </View>

          <View style={styles.practiceCard}>
            <Heart size={28} color="#E91E63" />
            <Text style={styles.practiceTitle}>Practice Makes Perfect</Text>
            <Text style={styles.practiceText}>
              The more you use T.H.I.N.K., the more automatic it becomes. Start with low-stakes conversations and gradually apply it to more important communications.
            </Text>
          </View>
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
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  introCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  introTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 12,
    marginBottom: 8,
  },
  introText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  sectionsContainer: {
    marginBottom: 24,
  },
  sectionCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionTitleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
  },
  chevron: {
    transform: [{ rotate: '0deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '90deg' }],
  },
  sectionContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  contentItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  contentText: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
    flex: 1,
    lineHeight: 22,
  },
  examplesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  examplesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  examplePair: {
    marginBottom: 16,
  },
  goodExample: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F1F8E9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  goodExampleText: {
    fontSize: 14,
    color: '#2E7D32',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  badExample: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFEBEE',
    padding: 12,
    borderRadius: 8,
  },
  badExampleText: {
    fontSize: 14,
    color: '#C62828',
    marginLeft: 8,
    flex: 1,
    lineHeight: 20,
  },
  practiceCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#E91E63',
  },
  practiceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginTop: 12,
    marginBottom: 8,
  },
  practiceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  lockedCard: {
    opacity: 0.7,
  },
  lockedText: {
    color: '#999',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lockContainer: {
    marginLeft: 8,
  },
  countdownContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  countdownText: {
    fontSize: 14,
    color: '#FF6B35',
    marginLeft: 6,
    fontWeight: '600',
  },
  acronymText: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
    fontStyle: 'italic',
  },
  lockedContent: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    alignItems: 'center',
  },
  lockedMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  streakInfo: {
    fontSize: 16,
    color: '#FF6B35',
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  streakBadge: {
    backgroundColor: '#FF6B35',
    color: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: '600',
  },
  progressTrack: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  progressMilestone: {
    alignItems: 'center',
    flex: 1,
  },
  milestoneCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  milestoneLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  milestoneSubtext: {
    fontSize: 12,
    color: '#666',
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 10,
  },
});