import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CartItem = ({ item, onRemoveFromCart }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <Text style={styles.quantity}>Qty: {item.quantity}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onRemoveFromCart(item)}>
                <Text style={styles.buttonText}>Remove from Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        padding: 10,
        marginVertical: 10,
        flexDirection: 'column',
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        width: '50%'
    },
    price: {
        fontSize: 18,
        fontWeight: '600',
        color: '#007BFF',
    },
    quantity: {
        fontSize: 16,
        color: '#666',
        marginVertical: 6,
    },
    button: {
        backgroundColor: '#FF4C4C',
        borderRadius: 8,
        paddingVertical: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default CartItem;
