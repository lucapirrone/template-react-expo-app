import React, { memo } from 'react';
import Background from '../../components/Background';
import Logo from '../../components/auth/Logo';
import Header from '../../components/auth/Header';
import Button from '../../components/Button';
import Paragraph from '../../components/Paragraph';

const HomeScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Coupon Keeper</Header>

    <Paragraph>
      Accedi ora per avere sincronizzati i tuoi coupon.
    </Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Accedi
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('RegisterScreen')}>
      Registrati
    </Button>
  </Background>
);

export default memo(HomeScreen);
