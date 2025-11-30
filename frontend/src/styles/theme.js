import { MD3LightTheme as DefaultTheme } from 'react-native-paper';

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563EB', 
    onPrimary: '#FFFFFF',
    secondary: '#10B981', 
    onSecondary: '#FFFFFF',
    tertiary: '#F59E0B', 
    background: '#F3F4F6', 
    surface: '#FFFFFF',
    error: '#EF4444',
    text: '#1F2937',
    onSurface: '#1F2937',
    disabled: '#9CA3AF',
    placeholder: '#6B7280',
    backdrop: 'rgba(0, 0, 0, 0.5)',
    notification: '#EC4899',
    cardGradientStart: '#3B82F6',
    cardGradientEnd: '#1D4ED8',
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

export const customStyles = {
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  card: {
    borderRadius: 16,
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 0.5,
  },
};
