import React, {memo, useState} from 'react';
import {StyleSheet, Text, View, Alert, ScrollView, TouchableOpacity} from 'react-native';
import {theme} from '../../core/theme';
import {emailValidator, passwordValidator} from '../../core/utils';
import {ErrorManager} from "../../helpers/ErrorManager";
import {t} from "../../services/i18n";
import {Auth} from "aws-amplify";
import Loading from "../../components/Loading";
import AuthHeader from "../../components/auth/AuthHeader";
import Button from "../../components/Button";
import FacebookButton from "../../components/auth/FacebookButton";
import GoogleButton from "../../components/auth/GoogleButton";
import TextInput from "../../components/auth/TextInput";

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);

  const onLoginClick = async () => {
    setLoading(true);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return setLoading(false);
    }

    try {
      await Auth.signIn(email.value, password.value);
      setLoading(false);
      navigation.navigate('CouponList');
    } catch (err) {
      setLoading(false);
      if (err.code === "UserNotConfirmedException") {
        return Alert.alert(
          t("LoginScreen:user-not-confirmed-title"),
          t("LoginScreen:user-not-confirmed-message"),
          [
            {
              text: t("LoginScreen:send-new-confirmation-link"),
              onPress: async () => await Auth.resendSignUp(email.value),
              style: "default"
            }
          ],
          {cancelable: true}
        );
      } else {
        new ErrorManager().error(err);
      }
    }
  };

  if (loading) {
    return (<Loading/>);
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
          <AuthHeader type="red"/>
          <View style={styles.navButtons}>
            <Button
              size="small"
              type="primary"
              disabled>
              {t("LoginScreen:login")}
            </Button>
            <Button
              size="small"
              type="grey"
              onPress={() => navigation.navigate('Register')}>
              {t("LoginScreen:register")}
            </Button>
          </View>
          <View style={styles.form}>
            <TextInput
              icon="at"
              label={t("form:email")}
              placeholder={t("form:insert-email")}
              returnKeyType="next"
              value={email.value}
              onChangeText={text => setEmail({value: text, error: ''})}
              error={!!email.error}
              errorText={email.error}
              autoCapitalize="none"
              autoCompleteType="email"
              textContentType="emailAddress"
              keyboardType="email-address"
            />
            <TextInput
              icon="lock"
              label={t("form:password")}
              placeholder={t("form:insert-password")}
              returnKeyType="done"
              value={password.value}
              onChangeText={text => setPassword({value: text, error: ''})}
              error={!!password.error}
              errorText={password.error}
              secureTextEntry
            />
            <View style={styles.forgotPassword}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordLabel}>{t("LoginScreen:forgot-password")}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Button
            style={styles.submitButton}
            size="big"
            type="green"
            onPress={onLoginClick}>
            {t("LoginScreen:login")}
          </Button>
          <View style={styles.socialButtons}>
            <Text style={styles.oProcediCon1}>O procedi con:</Text>
            <View style={styles.group7}>
              <View style={styles.materialButtonShare1Row}>
                <FacebookButton
                  onLogin={() => navigation.navigate('CouponList')}
                  onChangeLoading={(loading) => setLoading(loading)}/>
                <GoogleButton
                  onLogin={() => navigation.navigate('CouponList')}
                  onChangeLoading={(loading) => setLoading(loading)}/>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    width: '100%',
    paddingLeft: 40,
    paddingRight: 40,
    height: '100%',
  },
  body: {
    marginTop: 100,
    marginBottom: 20,
    alignSelf: "center",
    alignItems: "center",
    width: '100%',
    maxWidth: 400,
    justifyContent: 'space-between'
  },
  navButtons: {
    marginTop: 50,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%'
  },
  form: {
    marginTop: 20,
    justifyContent: "flex-start",
    marginBottom: 0,
    width: '100%',
  },
  submitButton: {
    marginTop: 40
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  forgotPasswordLabel: {
    fontFamily: 'Montserrat-Regular'
  },
  socialButtons: {
    width: 114,
    height: 67,
    marginBottom: 0,
    marginTop: 30
  },
  oProcediCon1: {
    fontFamily: "Montserrat-SemiBold",
    color: "rgba(0,0,0,1)",
    fontSize: 14,
    alignSelf: "center"
  },
  group7: {
    width: 114,
    height: 40,
    marginTop: 10,
    flexDirection: "row"
  },
  materialButtonShare1Row: {
    height: 38,
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
    marginTop: 1
  }
});

export default memo(LoginScreen);
