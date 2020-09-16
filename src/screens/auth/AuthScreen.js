import React, {memo} from 'react';
import Button from "../../components/Button";
import {t} from "../../services/i18n";
import { theme } from "../../core/theme"
import { View} from "react-native";
import AuthHeader from "../../components/auth/AuthHeader";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';


const AuthScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
    <View style={styles.body}>
      <AuthHeader type="white"/>
      <View style={styles.viewButtons}>
        <Button
          size="big"
          type="white"
          onPress={() => navigation.navigate('Login')}>
          {t("AuthScreen:login")}
        </Button>
        <Button
          size="big"
          type="primaryLight"
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}>
          {t("AuthScreen:register")}
        </Button>
      </View>
      </View>
    </View>
  );
};

export default memo(AuthScreen);

let styles = {
  container: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    height: '100%',
  },
  body: {
    marginTop: 100,
    marginBottom: 100,
    alignSelf: "center",
    alignItems: "center",
    width: '100%',
    maxWidth: 400,
  },
  viewButtons: {
    height: '100%',
    alignSelf: "center",
    justifyContent: "center"
  },
  registerButton: {
    marginTop: 20,
    marginBottom: 50
  }
};
