import { AppRegistry } from 'react-native';
import App from './App';
import appConfig from './app.json'; // Đường dẫn đúng vì index.tsx ở root

AppRegistry.registerComponent(appConfig.expo.name, () => App);