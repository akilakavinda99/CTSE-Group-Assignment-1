/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { notificationSetup } from './src/services/notificationServices';

notificationSetup();
AppRegistry.registerComponent(appName, () => App);
