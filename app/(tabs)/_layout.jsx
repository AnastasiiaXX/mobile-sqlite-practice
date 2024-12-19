import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GoodsList from './index';
import CartScreen from './cart';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  const [cartItems, setCartItems] = useState([]); 

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Products') {
              iconName = focused ? 'pricetag' : 'pricetag-outline';
            } else if (route.name === 'Cart') {
              iconName = focused ? 'cart' : 'cart-outline'; 
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="index">
          {() => <GoodsList cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
        <Tab.Screen name="cart">
          {() => <CartScreen cartItems={cartItems} setCartItems={setCartItems} />}
        </Tab.Screen>
      </Tab.Navigator>
  );
};

export default Tabs;
