import React, {Component, memo, useEffect, useState} from "react";
import Button from "../Button";
import {t} from '../../services/i18n';
import * as Google from 'expo-google-app-auth';
import {ErrorManager} from "../../helpers/ErrorManager";
import enviroment from "../../config/enviroment";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";
import {  Hub } from 'aws-amplify';
import {StyleSheet, TouchableOpacity} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const GoogleButton = ({onChangeLoading, ...props}) => {
  async function nativeLogin() {
    try{
      const response = await Google.logInAsync(enviroment.social.Google);
      if (response.type === 'success') {
        let signInResposne = await Auth.federatedSignIn("google", { token: response.idToken, expires_at: 1603962947 }, {email: response.user.email});
        console.log(signInResposne);
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
      console.log("prima del login");
      await Auth.federatedSignIn({provider: CognitoHostedUIIdentityProvider.Google});
      console.log("tutto ok");
    } catch (err) {
      console.log("errore 1");
      //new ErrorManager().error(err);
      return onChangeLoading(false)
    }
    onChangeLoading(false);
  }
  return (
    <TouchableOpacity
      style={[styles.container, props.style]}
      onPress={async () => await login()}>
      <Icon name="google" style={styles.icon}/>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(198,48,28,1)",
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

export default memo(GoogleButton);
