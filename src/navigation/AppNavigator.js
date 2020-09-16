import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator';
import AuthLoadingScreen from "../screens/auth/AuthLoadingScreen";

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainNavigator,
    Auth: AuthNavigator
  },
  {
    initialRouteName: 'AuthLoading',
    headerMode: 'none'
  }
  )
);
