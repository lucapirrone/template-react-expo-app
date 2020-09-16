import { createStackNavigator } from 'react-navigation-stack';
import CouponList from "../screens/CouponList";


export default createStackNavigator(
  {
    Home: { screen: CouponList }
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none'
  }
);
