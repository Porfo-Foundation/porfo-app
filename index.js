/**
 * @format
 */

import {AppRegistry} from 'react-native';
// Import the crypto getRandomValues shim (**BEFORE** the shims)
import 'react-native-get-random-values';
// Import the the ethers shims (**BEFORE** ethers)
import '@ethersproject/shims';
import App from './src/App.tsx';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
