import React, {Component, memo} from "react";
import { Auth } from "aws-amplify";
import Button from "../Button";
import {t} from '../../services/i18n';
import enviroment from "../../config/enviroment";
import * as Facebook from 'expo-facebook';
import {ErrorManager} from "../../helpers/ErrorManager";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import {StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";


const FacebookButton = ({onChangeLoading, ...props}) => {
  async function nativeLogin() {
    try {
      await Facebook.initializeAsync(enviroment.social.Facebook.APP_ID);
      const {
        type,
        token,
        expires
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: enviroment.social.Facebook.scopes,
      });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const r = await fetch(`https://graph.facebook.com/me?fields=email&access_token=${token}`);
        const response = await r.json();
        await Auth.federatedSignIn("facebook", { token: token, expires_at: expires }, {email: response.email});
      } else {
        new ErrorManager().error("LoginNotCompleted");
      }
    } catch (err) {
      new ErrorManager().error(err);
    }
  }
  async function login() {
    onChangeLoading(true);
    try {
      await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Facebook});
    } catch (err) {
      new ErrorManager().error(err);
      return onChangeLoading(false)
    }
    onChangeLoading(false);
  }
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={async () => await login()}>
      <Icon name="facebook" style={styles.icon}/>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(9,183,50,1)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 28,
    shadowColor: "#111",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.2,
    elevation: 2,
    minWidth: 40,
    minHeight: 40
  },
  icon: {
    color: "#fff",
    fontSize: 24,
    alignSelf: "center"
  }
});
export default memo(FacebookButton);
