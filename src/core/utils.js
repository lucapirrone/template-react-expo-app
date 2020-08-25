import { AsyncStorage } from "react-native";

export const emailValidator = email => {
  const re = /\S+@\S+\.\S+/;

  if (!email || email.length <= 0) return 'Email richiesta.';
  if (!re.test(email)) return 'Indirizzo Email non valido.';

  return '';
};

export const passwordValidator = password => {
  if (!password || password.length <= 0) return 'Password Richiesta.';
  if (password.length <= 6) return 'La password deve essere lunga almeno 6 caratteri.';

  return '';
};
export const confirmPasswordValidator = (password, confirmPassword) => {
  if (!confirmPassword || confirmPassword.length <= 0) return 'Password Richiesta.';
  if (confirmPassword.length <= 6) return 'La password deve essere lunga almeno 6 caratteri.';
  if (confirmPassword !== password) return 'Le password non coincidono.';

  return '';
};

export const confirmVerificationCode = (code) => {
  if (!code || code.length <= 0) return 'Codice di verifica richiesto.';
  if (code.length !== 6) return 'Il codice di verifica deve essere lungo 6 caratteri.';

  return '';
};

const EMAIL = 'EMAIL';
const USER_ID = 'USER_ID';
const TOKEN = 'TOKEN';

export function setEmailUserID(email, userId, callback) {
  AsyncStorage.setItem(EMAIL, email, () => {
    AsyncStorage.setItem(USER_ID, userId, () => {
      callback();
    });
  });
};
export function getEmailUserID(callback) {
  AsyncStorage.getItem(EMAIL, (err, email) => {
    AsyncStorage.getItem(USER_ID, (err, userId) => {
      callback(err, {email: email, userId: userId});
    });
  });
};
export function removeEmailUserID(callback) {
  AsyncStorage.removeItem(EMAIL, () => {
    AsyncStorage.removeItem(USER_ID, () => {
      callback();
    });
  });
};

export function setToken(token, callback) {
  AsyncStorage.setItem(TOKEN, token, () => {
    callback();
  });
};
export function getToken(callback) {
  AsyncStorage.getItem(TOKEN, (err, token) => {
    callback(err, {token: token});
  });
};
export function removeToken(callback) {
  AsyncStorage.removeItem(TOKEN, () => {
    callback();
  });
};
