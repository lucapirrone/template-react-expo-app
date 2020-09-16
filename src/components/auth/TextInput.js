import React, { memo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput as Input } from 'react-native';
import { theme } from '../../core/theme';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TextInput = ({ errorText, icon, ...props }) => (
  <View style={styles.container}>
    <View style={styles.inputContainer}>
      <Icon name={icon} style={styles.iconStyle}/>
      <Input
        style={styles.input}
        selectionColor="transparent"
        underlineColor="transparent"
        mode="flat"
        {...props}
      />
    </View>
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  inputContainer: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.grey,
    paddingLeft: 20,
    paddingRight: 15,

  },
  input: {
    color: "#898989",
    fontFamily: "Montserrat-Regular",
    height: 70,
    flex: 1,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: theme.colors.grey,
    fontSize: 14,
    alignSelf: "stretch",
  },
  iconStyle: {
    color: theme.colors.primary,
    fontSize: 30,
  },
  error: {
    fontSize: 14,
    fontFamily: 'Montserrat-Regular',
    color: theme.colors.error,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
