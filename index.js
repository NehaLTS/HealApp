/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { enableScreens } from 'react-native-screens';
import './i18n.tsx';
enableScreens(true)

AppRegistry.registerComponent(appName, () => App);
