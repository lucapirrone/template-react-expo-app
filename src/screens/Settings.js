import React, {useEffect} from "react";
import { View, ScrollView, BackHandler, Alert} from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { Header } from "../components/Header";
import AddButton from "../components/AddButton";
import {addCoupon, getCoupons} from "../services/coupon/coupon";
import {Auth} from "aws-amplify";



export default function CouponList({ navigation }) {

  return (
    <View style={{ flex: 1, borderColor: "white", width: "100%" }}>
      <View>
        <Header/>
      </View>

    </View>
  )
}
