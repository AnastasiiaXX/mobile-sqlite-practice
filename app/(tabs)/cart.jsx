import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartItem from '../../components/CartItem';
import { onAddToCart, onRemoveFromCart, getCartItems, deleteItem } from '../../db/database';
import { SafeAreaView } from 'react-native';

const CartScreen = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, catchError] = useState(null)

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={({ item }) => (
                    <CartItem item={item} onRemove={onRemoveFromCart} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default CartScreen;
