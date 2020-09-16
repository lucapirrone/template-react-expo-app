export default {
  apiGateway: {
    REGION: "eu-central-1",
    URL: "https://qtuk6iqkw0.execute-api.eu-central-1.amazonaws.com/dev"
  },
  cognito: {
    REGION: "eu-central-1",
    USER_POOL_ID: "eu-central-1_ZZMqlCpuL",
    APP_CLIENT_ID: "3uvn6s208ekg3mos7f9ffcfcs7",
    IDENTITY_POOL_ID: "eu-central-1:38bb0d7c-7d6e-41b6-b9ce-f61d1db08199",
    OAUTH: {
      "domain": "couponkeeper.auth.eu-central-1.amazoncognito.com",
      "scope": [
        "email",
        "openid",
        "profile",
        "aws.cognito.signin.user.admin"
      ],
      "redirectSignIn": "exp://192.168.128.118:19000/--/",
      "redirectSignOut": "exp://192.168.128.118:19000/--/",
      "responseType": "code"
    },
  },
  social: {
    Facebook: {
      APP_ID: "416378142650981",
      scopes: ['public_profile', 'email']
    },
    Google: {
      androidClientId: `21169545494-mfgef7j4mvhv4m9nshn71sas11rar8a3.apps.googleusercontent.com`,
      scopes: ['profile', 'email', 'openid']
    }
  }
};



