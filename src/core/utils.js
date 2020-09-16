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

const INFO = 'INFO';

export function setUserInfo(payload, callback) {
  AsyncStorage.setItem(INFO, JSON.stringify(payload), () => {
    callback();
  });
};
export function getUserInfo(callback) {
  AsyncStorage.getItem(INFO, (err, payload) => {
    if (payload)
      return callback(err, JSON.parse(payload));
    else
      return callback(null, false);
  });
};
export function removeUserInfo(callback) {
  AsyncStorage.removeItem(INFO, (err) => {
    if (err)
      return callback(err);
    else
      return callback(null)
  });
};
