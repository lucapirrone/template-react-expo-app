import React, {memo, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Button from '../../components/Button';
import TextInput from "../../components/auth/TextInput";
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from '../../core/utils';
import {ErrorManager} from "../../helpers/ErrorManager";
import {t} from "../../services/i18n";
import {Auth} from "aws-amplify";
import Loading from "../../components/Loading";
import AuthHeader from "../../components/auth/AuthHeader";
import GoogleButton from "../../components/auth/GoogleButton";
import FacebookButton from "../../components/auth/FacebookButton";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange as loc,
  removeOrientationListener as rol
} from 'react-native-responsive-screen';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState({value: 'lpirrone2000@', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [confirmPassword, setConfirmPassword] = useState({value: '', error: ''});
  const [loading, setLoading] = useState(false);


  const onRegisterClick = async () => {
    setLoading(true);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);
    const confirmPasswordError = confirmPasswordValidator(password.value, confirmPassword.value);

    if (emailError || passwordError || confirmPasswordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      setConfirmPassword({...confirmPassword, error: confirmPasswordError});
      return setLoading(false);
      ;
    }

    try {
      await Auth.signUp(email.value, password.value);
      alert(t("RegisterScreen:code-sended"));
      setLoading(false);
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
            <View style={styles.navButtons}>
              <Button
                size="small"
                type="grey"
                onPress={() => navigation.navigate('Login')}>
                {t("RegisterScreen:login")}
              </Button>
              <Button
                size="small"
                type="primary"
                disabled>
                {t("RegisterScreen:register")}
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
            </View>
            <Button
              style={styles.submitButton}
              size="big"
              type="green"
              onPress={onRegisterClick}>
              {t("RegisterScreen:register")}
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
    marginTop: 40,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "space-between",
    width: '100%'
  },
  form: {
    minHeight: 200,
    marginTop: 20,
    justifyContent: "flex-start",
    marginBottom: 0,
    width: '100%',
  },
  submitButton: {
    marginTop: 40
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
export default memo(RegisterScreen);
