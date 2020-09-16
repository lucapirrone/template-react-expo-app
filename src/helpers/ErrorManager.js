import {Alert} from "react-native";
import {t} from "../services/i18n";

export class ErrorManager {
  constructor() {}
  error(err) {
    console.log("errormanager", err);
    if (typeof err.code === "undefined" || err.code === "" || err.code === null) {
      return setTimeout(() => {Alert.alert(t('errors:GenericError:title'), t('errors:GenericError:message'));}, 500);
    }
    if (t(code+":title") !== code+".title" && t(code+":message") !== code+".message"){
      return setTimeout(() => {Alert.alert(t("errors:"+code+':title'), t("errors:"+code+':message'));}, 500);
    } else {
      return setTimeout(() => {Alert.alert(t('errors:GenericError:title'), t('errors:GenericError:message'));}, 500);
    }
  }
}
