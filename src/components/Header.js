import React from "react";
import { Header as ReactHeader } from "react-native-elements";

export class Header extends React.Component {
  render() {
    return (
      <ReactHeader
        leftComponent={{ icon: "settings", color: "#fff" }}
        centerComponent={{
          text: "COUPON KEEPER",
          style: { color: "#fff" },
          fontFamily: "Montserrat",
        }}
        rightComponent={{ icon: "search", color: "#fff" }}
        containerStyle={{
          backgroundColor: "#AD2B07",
          borderBottomColor: "#AD2B07",
        }}
      />
    );
  }
}
