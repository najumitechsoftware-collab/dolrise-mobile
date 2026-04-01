import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.najumitech.app',
  appName: 'DolRise',

  webDir: 'out', // (ba lallai ba ne amma bari ya zauna)

  server: {
    url: 'https://dolrise.com', // 🔥 MAIN FIX
    cleartext: true,
  },
};

export default config;
