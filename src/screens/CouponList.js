import React, {useEffect} from "react";
import { View, ScrollView, BackHandler, Alert} from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import AddButton from "../components/AddButton";
import {addCoupon, getCoupons} from "../services/coupon/coupon";
import {Auth} from "aws-amplify";
import AuthHeader from "../components/auth/AuthHeader";

const coupon = [
  {
    name: "Sconto Android",
    avatar: "https://assets.brandfetch.io/fa0a8671000d415.png",
    company: "Google",
    color: "#DB4437",
  },
  {
    name: "Amazon Frullatore",
    avatar:
      "https://www.ariannamicrochip.it/wp-content/uploads/logo-amazon.png",
    company: "Amazon",
    color: "#FF9900",
  },
];

export default function CouponList({ navigation }) {

  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={{ flex: 1, borderColor: "white", width: "100%" }}>
      <View>
        <AuthHeader type="red"/>
      </View>

      <AddButton onPress={async () => {await Auth.signOut(); navigation.navigate("HomeScreen")}}/>
      <AddButton onPress={async () => console.log((await Auth.currentAuthenticatedUser()))}/>
      <AddButton onPress={async () => addCoupon({
        "societa": {
          "nome": "Carrefour Italia",
          "logo": "logo",
          "colore": "912839"
        },
        "categoria": {
          "nome": "Cibo"
        },
        "descrizione": "Buono sconto cliente",
        "tipo": "alfanumerico",
        "codice": "A4CD8D77S9X990V9",
        "importo": 10,
        "valuta": "%",
        "scadenza": "15/06/2022"
      })}/>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        {coupon.map((u, i) => {
          return null;
        })}
      </ScrollView>
    </View>
  )
}
