import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const AddButton = ({ onPress }) => (
  <View style={style.AddButton}>
    {/*Button Add*/}
    <Button
      type="clear"
      icon={<Icon name="plus-circle" size={40} color="black" />}
      onPress={onPress}
    />
  </View>
);

const style = StyleSheet.create({
  AddButton: {
    position: "relative",
  }
});


export default memo(AddButton);
