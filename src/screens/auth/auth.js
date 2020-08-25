import {AsyncStorage} from "react-native";
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from "amazon-cognito-identity-js";
import {cognito} from "../../config/cognito";
import * as utils from "../../core/utils";
import JWT from 'expo-jwt';

const AWS_COGNITO = {
    UserPoolId: cognito.UserPoolId, //Enter your User Pool Id here
    ClientId: cognito.ClientId //Enter your Client Id here
};

export const onLogIn = (userName, password, callback) => {
    const userPool = new CognitoUserPool(AWS_COGNITO);
    const authDetails = new AuthenticationDetails({
        Username: userName,
        Password: password
    });
    const cognitoUser = new CognitoUser({
        Username: userName,
        Pool: userPool
    });

    cognitoUser.authenticateUser(authDetails, {
        onSuccess: (result) => {
            utils.setEmailUserID(userName, result.getIdToken().payload.sub, () => {
                callback(null);
            });
            utils.setToken(result.getAccessToken().getJwtToken(), () => {
                callback(null);
            });
        },
        onFailure: (err) => {
            callback(err)
        }
    });
};

export const onRegister = (userName, password, callback) => {
    const userPool = new CognitoUserPool(AWS_COGNITO);
    const attributeList = [
        new CognitoUserAttribute({ Name: 'email', Value: userName })
    ];
    userPool.signUp(
      userName,
      password,
      attributeList,
      null,
      (err, result) => {
          if (err) {
              callback(err);
          } else {
              callback(null);
          }
      }
    );
};

export const onVerify = (userName, code, callback) => {
    const userPool = new CognitoUserPool(AWS_COGNITO);
    const cognitoUser = new CognitoUser({
        Username: userName,
        Pool: userPool
    });

    cognitoUser.confirmRegistration(code, true, function(err, result) {
        if (err) {
            console.log('onVerify', err);
            callback(err);
        } else {
            console.log('onVerify', result);
            callback(null);
        }
    });
};

export const onReset = (userName, callback) => {
    const userPool = new CognitoUserPool(AWS_COGNITO);
    const cognitoUser = new CognitoUser({
        Username: userName,
        Pool: userPool
    });

    cognitoUser.forgotPassword({
        onSuccess: function (result) {
            console.log('onReset', result);
            callback(null);
        },
        onFailure: function(err) {
            console.log('onReset', err);
            callback(err);
        }
    });
};

export const onRecoveryPassword_SendCode = (userName, callback) => {

    const userPool = new CognitoUserPool(AWS_COGNITO);
    const cognitoUser = new CognitoUser({
        Username: userName,
        Pool: userPool
    });

    console.log("recovery pw for ", userName);

    cognitoUser.forgotPassword({
        onSuccess: function(data) {
            // successfully initiated reset password request
            console.log('CodeDeliveryData from forgotPassword: ' + data);
            callback(null);
        },
        onFailure: function(err) {
            console.log(err);
            callback(err);
        }
    });

}
export const onRecoveryPassword_ChangePassword = (userName, verificationCode, newPassword, callback) => {

    const userPool = new CognitoUserPool(AWS_COGNITO);
    const cognitoUser = new CognitoUser({
        Username: userName,
        Pool: userPool
    });

    cognitoUser.confirmPassword(verificationCode, newPassword, {
        onSuccess() {
            callback(null)
        },
        onFailure(err) {
            callback(err);
        },
    });
}


export const onChangePassword = (userName, code, password, callback) => {
    const userPool = new CognitoUserPool(AWS_COGNITO);
    const cognitoUser = new CognitoUser({
        Username: userName,
        Pool: userPool
    });

    cognitoUser.confirmPassword(code, password, {
        onSuccess: function (result) {
            console.log('onChangePassword', result);
            callback(null);
        },
        onFailure: function(err) {
            console.log('onChangePassword', err);
            callback(err);
        }
    });
}

export const isSignedIn = (callback) => {
    AsyncStorage.getItem('USER_ID', (err, result) => {
        callback(err, result);
    });
};
