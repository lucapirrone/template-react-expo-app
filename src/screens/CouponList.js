import React from "react";
import { View, ScrollView } from "react-native";
import { ListItem } from "react-native-elements";
import TouchableScale from "react-native-touchable-scale";
import { Header } from "../components/Header";
import AddButton from "../components/AddButton";

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

export default function CouponList() {
  return (
    <View style={{ flex: 1, borderColor: "white", width: "100%" }}>
      <View>
        <Header/>
      </View>

      <AddButton onPress={() => navigation.navigate('')}/>

      <ScrollView style={{ flex: 1, padding: 10 }}>
        {coupon.map((u, i) => {
          return (
            <ListItem
              containerStyle={{
                paddingBottom: 15,
                borderWidth: 2,
                marginBottom: 15,
                borderRadius: 0,
                borderColor: u.color,
              }}
              Component={TouchableScale}
              friction={90} //
              tension={100} // These props are passed to the parent component (here TouchableScale)
              activeScale={0.95} //
              key={i}
              roundAvatar
              title={u.name}
              leftAvatar={{ source: { uri: u.avatar } }}
              subtitle={u.company}
            />
          );
        })}
      </ScrollView>
    </View>
  )
}
