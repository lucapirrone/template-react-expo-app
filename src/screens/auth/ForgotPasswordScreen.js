import React, { memo, useState } from 'react';
import {Text, StyleSheet, TouchableOpacity, View} from 'react-native';
import {confirmPasswordValidator, confirmVerificationCode, emailValidator, passwordValidator} from '../../core/utils';
import Background from '../../components/Background';
import BackButton from '../../components/BackButton';
import Logo from '../../components/auth/Logo';
import Header from '../../components/auth/Header';
import TextInput from '../../components/TextInput';
import { theme } from '../../core/theme';
import Button from '../../components/Button';
import {onRecoveryPassword_ChangePassword, onRecoveryPassword_SendCode} from "./auth";
import {ErrorManager} from "../../helpers/ErrorManager";

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState({ value: 'lpirrone2000@gmail.com', error: '' });
  const [emailValid, setEmailValid] = useState(false);

  const [verificationCode, setVerificationCode] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: 'cisco,123', error: '' });
  const [confirmPassword, setConfirmPassword] = useState({ value: 'cisco,123', error: '' });


  const sendCodeClick = () => {
    console.log("sendCodeClick");
    const emailError = emailValidator(email.value);

    if (emailError) {
      setEmail({ ...email, error: emailError});
      return;
    }

    onRecoveryPassword_SendCode(email.value, (err) => {
      console.log("onRecoveryPassword_SendCode");
      if (err) {
        return new ErrorManager().error(err);
      }
      setEmailValid(true)
      alert("Inserisci il codice di verifica ricevuto tramite Email");
    })

  };

  const changePasswordClick = () => {
    console.log("changePasswordClick");
    const verificationCodeError = confirmVerificationCode(verificationCode.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);

    if (passwordError || confirmPasswordError || verificationCodeError) {
      setPassword({ ...password, error: passwordError});
      setConfirmPassword({ ...confirmPassword, error: confirmPasswordError});
      setVerificationCode({ ...verificationCode, error: verificationCodeError});
      return;
    }

    onRecoveryPassword_ChangePassword(email.value, verificationCode.value, password.value, (err) => {
      console.log("onRecoveryPassword_ChangePassword");
      if (err) {
        return new ErrorManager().error(err);
      }
      alert("Password cambiata correttamente");
      navigation.navigate('LoginScreen');
    });
  }

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('LoginScreen')} />

      <Logo />

      <Header>Reimposta Password</Header>

      {!emailValid ? (
        <View style={styles.label}>
          <TextInput
            label="Email"
            returnKeyType="done"
            style={styles.label}
            value={email.value}
            onChangeText={text => setEmail({ value: text, error: '' })}
            error={!!email.error}
            errorText={email.error}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
          />

          <Button mode="contained" onPress={() => sendCodeClick()} style={styles.button}>
            Invia Codice per il Reset
          </Button>
        </View>
      ) : (
        <View style={styles.label}>
          <TextInput
            label="Codice di Verifica"
            returnKeyType="done"
            style={styles.label}
            value={verificationCode.value}
            onChangeText={text => setVerificationCode({ value: text, error: '' })}
            error={!!verificationCode.error}
            errorText={verificationCode.error}
            autoCapitalize="none"
            textContentType="oneTimeCode"
            keyboardType="numeric"
          />
          <TextInput
            label="Password"
            returnKeyType="done"
            style={styles.label}
            value={password.value}
            onChangeText={text => setPassword({ value: text, error: '' })}
            error={!!password.error}
            errorText={password.error}
            secureTextEntry
          />
          <TextInput
            label="Conferma Password"
            returnKeyType="done"
            style={styles.label}
            value={confirmPassword.value}
            onChangeText={text => setVerificationCode({ value: text, error: '' })}
            error={!!confirmPassword.error}
            errorText={confirmPassword.error}
            secureTextEntry
          />

          <Button mode="contained" onPress={() => changePasswordClick()} style={styles.button}>
            Cambia Password
          </Button>
        </View>
      )}

      <TouchableOpacity
        style={styles.back}
        onPress={() => navigation.navigate('LoginScreen')}
      >
        <Text style={styles.label}>← Torna al Login</Text>
      </TouchableOpacity>
    </Background>
  );
};

const styles = StyleSheet.create({
  back: {
    width: '100%',
    marginTop: 12,
  },
  button: {
    marginTop: 12,
  },
  label: {
    color: theme.colors.secondary,
    width: '100%',
  },
});

export default memo(ForgotPasswordScreen);
