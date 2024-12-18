import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const ProductListItem = ({ product, onAddToCart }) => {
    return (
        <View style={styles.card}>
            <Image source={{ uri: product.image }} style={styles.image} />
            <Text style={styles.name}>{product.ntitle}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.button} onPress={() => onAddToCart(product)}>
                <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#F5F5F5',
        borderRadius: 16,
        padding: 16,
        marginVertical: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 8,
    },
    image: {
        width: '100%',
        height: 300,
        borderRadius: 12,
        marginBottom: 12,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 6,
    },
    price: {
        fontSize: 28,
        color: '#1E90FF',
        marginBottom: 12,
    },
    button: {
        backgroundColor: '#1E90FF',
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default ProductListItem;
