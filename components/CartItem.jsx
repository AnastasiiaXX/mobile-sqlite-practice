/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const CartItem = ({ item, addToCart, removeFromCart, deleteFromCart, getCountItem }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(getCountItem(item.id));
  }, [item.id, getCountItem]);

  return (
    <View style={styles.container}>
      <View style={styles.imageAndText}>
        <Image
          source={{ uri: item.image }}
          style={{
            width: '50%',
            height: undefined,
            aspectRatio: 1,
            resizeMode: 'contain',
            marginBottom: 10,
          }}
        />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      <Text style={styles.price}>${(item.price * count).toFixed(2)}</Text>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            addToCart(item);
            setCount(count + 1);
          }}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (count > 0) {
              removeFromCart(item);
              setCount(count - 1);
            }
          }}>
          <Text style={styles.buttonText}>-</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteFromCart(item)}>
          <AntDesign name="delete" size={24} color="#ff6161" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 10,
    flexDirection: 'column',
  },
  imageAndText: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    width: '50%',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0AA5FF',
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#FF4C4C',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: 'transparent',
    padding: 10,
  },
});

export default CartItem;
