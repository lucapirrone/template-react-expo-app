import {Amplify} from 'aws-amplify';
import {Updates} from 'expo';
import React, {Component, memo, useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  I18nManager as RNI18nManager, StyleSheet
} from 'react-native';
import i18n from '../src/services/i18n';
import config from "./config/enviroment";
import AppNavigator from "./navigation/AppNavigator";
import { useFonts } from 'expo-font';

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    oauth: config.cognito.OAUTH,
  },
  API: {
    endpoints: [
      {
        name: "coupons",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});
const App = () => {
  const [isI18nInitialized, setIsI18nInitialized] = useState(false);
  let [fontsLoaded] = useFonts({
    'Montserrat-SemiBold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
    'Montserrat-Regular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
  });

  useEffect( () => {
    i18n.init()
      .then(() => {
        const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
        // RN doesn't always correctly identify native
        // locale direction, so we force it here.
        if (i18n.dir !== RNDir) {
          const isLocaleRTL = i18n.dir === 'RTL';
          RNI18nManager.forceRTL(isLocaleRTL);
          // RN won't set the layout direction if we
          // don't restart the app's JavaScript.
          Updates.reloadFromCache();
        }
        setIsI18nInitialized(true);
      })
      .catch((error) => console.warn(error));
  });

    if (isI18nInitialized && fontsLoaded) {
      return <AppNavigator/>;
    }
    return (
      <View style={styles.loadingScreen}>
        <ActivityIndicator/>
      </View>
    );
};
const styles = StyleSheet.create({
  loadingScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
export default memo(App);

