
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GoodsList from './goodsList';
import CartScreen from './cart';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [cartItems, setCartItems] = useState([]); 

  return (
      <Tab.Navigator>
        <Tab.Screen name="Products">
          {() => <GoodsList cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
        <Tab.Screen name="Cart">
          {() => <CartScreen cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
};

export default Tabs;
