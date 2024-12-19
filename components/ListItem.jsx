/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProductListItem = ({ item, onAddToCart, onRemoveFromCart, getQuantity }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        setCount(getQuantity(item.id));
    }, [item.id, getQuantity]);

    const increaseQuantity = () => {
        onAddToCart(item);
        setCount(getQuantity(item.id));
    };

    const decreaseQuantity = () => {
        if (count > 0) {
            onRemoveFromCart(item.id);
            setCount(getQuantity(item.id));
        }
    };

    return (
        <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            <View style={styles.quantityContainer}>
                <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{count}</Text>
                <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 150,
        borderRadius: 8,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 8,
    },
    price: {
        fontSize: 16,
        color: '#888',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    quantityButton: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 4,
    },
    quantityButtonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    quantityText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 16,
    },
});

export default ProductListItem;
