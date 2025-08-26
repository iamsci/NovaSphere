import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.novasphere.app',
  appName: 'NovaSphere',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    // Uncomment to point at a local dev server
    // url: 'http://10.0.0.5:3000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      backgroundColor: '#ffffffff',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP'
    }
  },
  android: {
    path: 'android',
    webContentsDebuggingEnabled: true
  },
  ios: {
    path: 'ios',
    contentInset: 'always'
  }
};

export default config;
