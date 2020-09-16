import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { theme } from "../../core/theme"

function AuthHeader({type, style}) {
  let _colorStyle = {};
  if (type==="red") {
    _colorStyle.title = {
      color: theme.colors.primary
    };
  }
  if (type==="white") {
    _colorStyle.title = {
      color: "#fff"
    };
  }
  const colorStyle = StyleSheet.create(_colorStyle);
  return (
    <View style={[styles.group, style]}>
      <Text style={[styles.title, colorStyle.title]}>COUPON{"\n"}KEEPER</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  group: {
    alignSelf: "stretch",
    justifyContent: "flex-end",
  },
  title: {
    fontFamily: "Montserrat-SemiBold",
    fontSize: 30,
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0,
    alignSelf: "center"
  }
});

export default AuthHeader;
