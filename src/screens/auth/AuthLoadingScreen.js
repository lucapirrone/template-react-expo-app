import React, {memo, useEffect} from 'react';
import { Auth, Hub } from 'aws-amplify';
import Loading from "../../components/Loading";
import {Alert} from "react-native";
import {ErrorManager} from "../../helpers/ErrorManager";

const AuthLoadingScreen = ({navigation}) => {
  useEffect(() =>  {
    Auth.signOut();
    async function _checkIfAuthenticated() {
      let currentSession = null;
      try {
        currentSession = await Auth.currentSession();
      } catch(err) {
      }
      navigation.navigate(currentSession ? 'Main' : 'Auth');
    };

    _checkIfAuthenticated();
    Hub.listen('auth', async (data) => {
      switch (data.payload.event) {
        case 'signIn':
          navigation.navigate('Main');
          break;
        case 'signOut':
          navigation.navigate('Auth');
          break;
        case 'customState_failure':
          if (data.payload.data.toString().includes("EmailAlreadyExists")){
            new ErrorManager().error({code: "EmailAlreadyExists"});
            //navigation.navigate('Auth');
          }
          break;
        default:
          break;
      }
    });
  });
  return (
    <Loading/>
  );

};
export default memo(AuthLoadingScreen);
