import React, { memo } from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import { Button as PaperButton } from 'react-native-paper';
import { theme } from '../core/theme';

const Loading = () => (
  <View style={styles.loadingScreen}>
    <ActivityIndicator/>
  </View>
);

const styles = StyleSheet.create({
  loadingScreen: {
  flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default memo(Loading);
