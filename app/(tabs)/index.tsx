import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { MessageCircle, RefreshCw } from 'lucide-react-native';
import { ThinkCriteria, CRITERIA_LABELS, CRITERIA_DESCRIPTIONS } from '../../types/think';
import { CriteriaCheckbox } from '../../components/CriteriaCheckbox';
import { PercentageDisplay } from '../../components/PercentageDisplay';
import { useThink } from '../../hooks/think-store';
import { calculatePercentage } from '../../utils/think-helpers';

const CRITERIA_COLORS = {
  true: '#2196F3',
  helpful: '#4CAF50',
  important: '#FF9800',
  necessary: '#9C27B0',
  kind: '#E91E63',
};

export default function EvaluatorScreen() {
  const { saveEvaluation } = useThink();
  const [text, setText] = useState('');
  const [criteria, setCriteria] = useState<ThinkCriteria>({
    true: false,
    helpful: false,
    important: false,
    necessary: false,
    kind: false,
  });
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const toggleCriteria = (key: keyof ThinkCriteria) => {
    setCriteria(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const criteriaCount = Object.values(criteria).filter(Boolean).length;
  const percentage = calculatePercentage(criteriaCount);

  const handleSave = () => {
    if (text.trim() || criteriaCount > 0) {
      saveEvaluation({
        id: Date.now().toString(),
        text: text.trim(),
        criteria,
        percentage,
        timestamp: new Date(),
        canDelete: false,
      });
      
      // Reset form
      setText('');
      setCriteria({
        true: false,
        helpful: false,
        important: false,
        necessary: false,
        kind: false,
      });
    }
  };

  const handleReset = () => {
    setText('');
    setCriteria({
      true: false,
      helpful: false,
      important: false,
      necessary: false,
      kind: false,
    });
  };

  return (
    <LinearGradient
      colors={['#F0F4FF', '#FFFFFF']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <Animated.View style={{ opacity: fadeAnim }}>
              <View style={styles.header}>
                <Text style={styles.title}>T.H.I.N.K. Before You Speak</Text>
                <Text style={styles.subtitle}>
                  Evaluate your words before sharing them
                </Text>
              </View>

              <View style={styles.inputContainer}>
                <MessageCircle size={20} color="#999" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="What are you thinking of saying?"
                  placeholderTextColor="#999"
                  value={text}
                  onChangeText={setText}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
              </View>

              <PercentageDisplay percentage={percentage} criteriaCount={criteriaCount} />

              <View style={styles.criteriaContainer}>
                {(Object.keys(criteria) as Array<keyof ThinkCriteria>).map((key) => (
                  <CriteriaCheckbox
                    key={key}
                    label={CRITERIA_LABELS[key]}
                    description={CRITERIA_DESCRIPTIONS[key]}
                    checked={criteria[key]}
                    onToggle={() => toggleCriteria(key)}
                    color={CRITERIA_COLORS[key]}
                  />
                ))}
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity 
                  style={[styles.button, styles.saveButton]}
                  onPress={handleSave}
                  activeOpacity={0.8}
                >
                  <Text style={styles.saveButtonText}>Save Evaluation</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.button, styles.resetButton]}
                  onPress={handleReset}
                  activeOpacity={0.8}
                >
                  <RefreshCw size={20} color="#666" />
                  <Text style={styles.resetButtonText}>Reset</Text>
                </TouchableOpacity>
              </View>
            </Animated.View>
          </ScrollView>
        </KeyboardAvoidingView>
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
  keyboardView: {
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
  inputContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 10,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    minHeight: 60,
  },
  criteriaContainer: {
    marginBottom: 24,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '600',
  },
  resetButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  resetButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});