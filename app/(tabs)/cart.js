import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import CartItem from '../../components/CartItem';

const CartScreen = ({ cartItems, onRemoveFromCart }) => {
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
