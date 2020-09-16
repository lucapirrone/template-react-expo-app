import React, {memo, useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, ScrollView} from 'react-native';
import {confirmPasswordValidator, confirmVerificationCode, emailValidator, passwordValidator} from '../../core/utils';
import TextInput from '../../components/auth/TextInput';
import {theme} from '../../core/theme';
import Button from '../../components/Button';
import {ErrorManager} from "../../helpers/ErrorManager";
import {t} from "../../services/i18n";
import {Auth} from "aws-amplify";
import Loading from "../../components/Loading";
import AuthHeader from "../../components/auth/AuthHeader";

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: 'lpirrone2000@gmail.com', error: ''});
  const [emailValid, setEmailValid] = useState(false);

  const [verificationCode, setVerificationCode] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: 'cisco,123', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({value: 'cisco,123', error: ''});
  const [loading, setLoading] = useState(false);


  const sendCodeClick = async () => {
    setLoading(true);
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({...email, error: emailError});
      return setLoading(false);
    }


    try {
      await Auth.forgotPassword(email.value);
      setEmailValid(true);
      alert(t("ForgotPasswordScreen:insert-verification-code"));
      setLoading(false);
    } catch (err) {
      new ErrorManager().error(err);
      return setLoading(false);
    }

  };

  const changePasswordClick = async () => {
    setLoading(true);
    const verificationCodeError = confirmVerificationCode(verificationCode.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);

    if (passwordError || confirmPasswordError || verificationCodeError) {
      setPassword({...password, error: passwordError});
      setConfirmPassword({...confirmPassword, error: confirmPasswordError});
      setVerificationCode({...verificationCode, error: verificationCodeError});
      return setLoading(false);
    }


    try {
      await Auth.forgotPasswordSubmit(email.value, verificationCode.value, password.value);
      alert(t("ForgotPasswordScreen:password-changed"));
      navigation.navigate('LoginScreen');
    } catch (err) {
      new ErrorManager().error(err);
      return setLoading(false);
    }
  };

  if (loading) {
    return (<Loading/>);
  } else {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.body}>
        <AuthHeader type="red"/>
          {!emailValid ? (
            <View style={styles.responsive}>
              <TextInput
                icon="at"
                label={t("form:email")}
                placeholder={t("form:insert-email")}
                returnKeyType="done"
                value={email.value}
                onChangeText={text => setEmail({value: text, error: ''})}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
              />

              <Button
                size="big"
                type="green"
                onPress={() => sendCodeClick()} style={styles.button}>
                {t("ForgotPasswordScreen:send-code")}
              </Button>
            </View>
          ) : (
            <View style={styles.responsive}>
              <TextInput
                icon="numeric"
                label={t("form:verification-code")}
                placeholder={t("form:insert-verification-code")}
                returnKeyType="done"
                value={verificationCode.value}
                onChangeText={text => setVerificationCode({value: text, error: ''})}
                error={!!verificationCode.error}
                errorText={verificationCode.error}
                autoCapitalize="none"
                textContentType="oneTimeCode"
                keyboardType="numeric"
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
              <TextInput
                icon="lock"
                label={t("form:confirm-password")}
                placeholder={t("form:insert-confirm-password")}
                returnKeyType="done"
                value={confirmPassword.value}
                onChangeText={text => setConfirmPassword({value: text, error: ''})}
                error={!!confirmPassword.error}
                errorText={confirmPassword.error}
                secureTextEntry
              />

              <Button
                size="big"
                type="green"
                onPress={() => changePasswordClick()} style={styles.button}>
                {t("ForgotPasswordScreen:change-password")}
              </Button>
            </View>
          )}

          <TouchableOpacity
            style={styles.back}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.label}>{t("ForgotPasswordScreen:come-back-login")}</Text>
          </TouchableOpacity>
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
  responsive: {
    marginTop: 30,
    width: '100%'
  },
  back: {
    width: '100%',
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
    fontFamily: 'Montserrat-Regular'
  },
});

export default memo(ForgotPasswordScreen);
