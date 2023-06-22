import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'projet-pwa',
  webDir: 'dist/projet-pwa',
  server: {
    androidScheme: 'https'
  }
};

export default config;
