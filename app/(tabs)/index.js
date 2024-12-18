
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import goodsList from './goodsList'; // экран с товарами
import CartScreen from './cart'; // экран с корзиной

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [cartItems, setCartItems] = useState([]); // Состояние для корзины

  return (
      <Tab.Navigator>
        <Tab.Screen name="Products">
          {() => <goodsList cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
        <Tab.Screen name="Cart">
          {() => <CartScreen cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
};

export default Tabs;
