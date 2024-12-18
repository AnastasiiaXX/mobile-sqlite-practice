import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const CartItem = ({ product, onRemove }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <Text style={styles.quantity}>Qty: {product.quantity}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => onRemove(product)}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
        borderRadius: 10,
        padding: 14,
        marginVertical: 12,
        flexDirection: 'column',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    image: {
        width: 90,
        height: 90,
        borderRadius: 10,
        marginBottom: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
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
    removeButton: {
        backgroundColor: '#FF4C4C',
        borderRadius: 8,
        paddingVertical: 6,
        alignItems: 'center',
        marginTop: 12,
    },
    removeButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 14,
    },
});

export default CartItem;
