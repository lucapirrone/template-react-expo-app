import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { theme } from '../core/theme';

function Button({size, type, children, onPress, style, ...props}) {
  let newStyle = {};
  if (size === "big") {
    newStyle.container = {
      minWidth: 170,
      height: 50
    };
    newStyle.button = {
      fontSize: 15,
      lineHeight: 25,
    }
  }
  if (size === "small") {
    newStyle.container = {
      width: 125,
      height: 35
    };
    newStyle.button = {
      fontSize: 13,
      lineHeight: 25,
    }
  }
  if (type==="primaryLight") {
    newStyle.container.backgroundColor = theme.colors.primaryLight;
    newStyle.button.color = "#fff";
  }
  if (type==="primary") {
    newStyle.container.backgroundColor = theme.colors.primary;
    newStyle.button.color = "#fff";
  }
  if (type==="grey") {
    newStyle.container.backgroundColor = theme.colors.grey;
    newStyle.button.color = theme.colors.primary;
  }
  if (type==="white") {
    newStyle.container.backgroundColor = "#fff";
    newStyle.button.color = theme.colors.primary;
  }
  if (type==="green") {
    newStyle.container.backgroundColor = theme.colors.green;
    newStyle.button.color = "#fff";
  }
  const _newStyle = StyleSheet.create(newStyle);
  return (
    <PaperButton
      style={[styles.container, _newStyle.container, style]}
      contentStyle={[styles.container, _newStyle.container]}
      labelStyle={[styles.button, _newStyle.button]}
      onPress={() => onPress()}
      {...props}>
      {children}
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 0,
    alignSelf: 'center',
    justifyContent: 'center'
  },
  button: {
    color: "rgba(166,50,18,1)",
    fontSize: 20,
    lineHeight: 25,
    fontFamily: "Montserrat-SemiBold"
  }
});

export default Button;
