import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { router } from 'expo-router';
import { MessageSquare, Target, Shield, Clock } from 'lucide-react-native';
import { useThink } from '../hooks/think-store';
import Colors from '../constants/colors';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const { createUserSession } = useThink();
  const [showLogin, setShowLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGetStarted = () => {
    setShowLogin(true);
  };

  const handleLogin = async () => {
    if (!name.trim()) {
      Alert.alert('Name Required', 'Please enter your name to continue.');
      return;
    }

    setIsLoading(true);
    try {
      await createUserSession(name.trim(), email.trim() || undefined);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Failed to create session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (showLogin) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loginContainer}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/qw1ucadf89onx8uqtfhwr' }}
              style={styles.loginLogo}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.loginTitle}>Create Your Session</Text>
          <Text style={styles.loginSubtitle}>
            Your progress is tracked locally and privately on your device.
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
              autoCapitalize="words"
              testID="name-input"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email (Optional)</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              testID="email-input"
            />
          </View>

          <TouchableOpacity
            style={[styles.button, isLoading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={isLoading}
            testID="start-button"
          >
            <Text style={styles.buttonText}>
              {isLoading ? 'Creating Session...' : 'Start Training'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.privacyNote}>
            🔒 All data stays on your device. No cloud storage or tracking.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Image 
            source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/qw1ucadf89onx8uqtfhwr' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.subtitle}>Master Thoughtful Communication</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            A metacognitive pause button that forces a System-2 check before your System-1 impulse goes out. Train yourself to communicate with intention, clarity, and kindness.
          </Text>

          <View style={styles.featuresContainer}>
            <View style={styles.feature}>
              <MessageSquare size={32} color={Colors.light.tint} />
              <Text style={styles.featureTitle}>T.H.I.N.K. Framework</Text>
              <Text style={styles.featureDescription}>
                Evaluate every statement: Is it True, Helpful, Important, Necessary, and Kind?
              </Text>
            </View>

            <View style={styles.feature}>
              <Target size={32} color={Colors.light.tint} />
              <Text style={styles.featureTitle}>Progressive Learning</Text>
              <Text style={styles.featureDescription}>
                Unlock advanced modules (PLEASE & REALLY) as you build consistent habits.
              </Text>
            </View>

            <View style={styles.feature}>
              <Shield size={32} color={Colors.light.tint} />
              <Text style={styles.featureTitle}>Privacy First</Text>
              <Text style={styles.featureDescription}>
                All your data stays on your device. No cloud storage, no tracking.
              </Text>
            </View>

            <View style={styles.feature}>
              <Clock size={32} color={Colors.light.tint} />
              <Text style={styles.featureTitle}>14-Day Protection</Text>
              <Text style={styles.featureDescription}>
                Your evaluation history is protected for 2 weeks to track progress.
              </Text>
            </View>
          </View>

          <View style={styles.howItWorks}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            <Text style={styles.howItWorksText}>
              T.H.I.N.K. is a metacognitive pause button. It forces a short System-2 check before a System-1 impulse goes out.
            </Text>
            <Text style={styles.howItWorksText}>
              Each gate maps to a human control loop:
            </Text>
            <View style={styles.gatesList}>
              <Text style={styles.gateItem}>• <Text style={styles.gateBold}>True:</Text> Epistemic hygiene - how sure are we?</Text>
              <Text style={styles.gateItem}>• <Text style={styles.gateBold}>Helpful:</Text> Goal alignment - does this help someone?</Text>
              <Text style={styles.gateItem}>• <Text style={styles.gateBold}>Important:</Text> Attentional economics - worth the attention?</Text>
              <Text style={styles.gateItem}>• <Text style={styles.gateBold}>Necessary:</Text> Counterfactual check - what if unsaid?</Text>
              <Text style={styles.gateItem}>• <Text style={styles.gateBold}>Kind:</Text> Affect regulation - can it be received well?</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          testID="get-started-button"
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    paddingTop: 20,
  },
  logo: {
    width: width * 0.6,
    height: 120,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    textAlign: 'center',
    marginBottom: 40,
  },
  featuresContainer: {
    marginBottom: 40,
  },
  feature: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#666',
    textAlign: 'center',
  },
  howItWorks: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 12,
    marginBottom: 40,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  howItWorksText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 12,
  },
  gatesList: {
    marginTop: 8,
  },
  gateItem: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
    marginBottom: 6,
  },
  gateBold: {
    fontWeight: '600',
    color: Colors.light.tint,
  },
  getStartedButton: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  getStartedText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  // Login styles
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  loginLogo: {
    width: width * 0.5,
    height: 100,
  },
  loginTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  loginSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: Colors.light.tint,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  privacyNote: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 24,
    lineHeight: 20,
  },
});