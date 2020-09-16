import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from "../screens/auth/AuthScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import ForgotPasswordScreen from "../screens/auth/ForgotPasswordScreen";


export default createStackNavigator(
  {
    Auth: { screen: AuthScreen },
    Login: { screen: LoginScreen },
    Register: { screen: RegisterScreen },
    ForgotPassword: { screen: ForgotPasswordScreen }
  },
  {
    initialRouteName: 'Auth',
    headerMode: 'none'
  }
);
