import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import CartItem from '../../components/CartItem';
import { onAddToCart, onRemoveFromCart, getCartItems, deleteItem } from '../../db/database';
import { SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async () => {
        try {
            const cartItemsFromDB = await getCartItems();
            setCartItems(cartItemsFromDB);
        } catch (error) {
            console.error('Error fetching items from cart:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchCartItems = async () => {
        setRefreshing(true);
        try {
            const cartItemsFromDB = await getCartItems();
            setCartItems(cartItemsFromDB);
        } catch (error) {
            console.error('Error fetching items from cart:', error);
        } finally {
            setRefreshing(false);
        }
    };

    const handlePlusCount = async (item) => {
        await onAddToCart(item);
        await fetchData();
    };

    const handleMinusCount = async (item) => {
        await onRemoveFromCart(item.id);
        await fetchData();
    };


    const handleDeleteFromCart = async (item) => {
        setLoading(true);
        await deleteItem(item.id); 
        await fetchData();
    };

      const renderItem = ({ item }) => (
        <CartItem
            item={item}
            onAddToCart={handlePlusCount}
            onRemoveFromCart={handleMinusCount}
            onDeleteFromCart={handleDeleteFromCart}
        />
    );

  
    const renderEmptyComponent = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Корзина пуста</Text>
        </View>
    );

     if (loading) {
        return (
            <View style={styles.container}>
                <SafeAreaView style={[styles.container, styles.horizontal]}>
                    <ActivityIndicator size="large" color="#0000ff" />
                </SafeAreaView>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            <FlatList
                data={cartItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshing={refreshing}
                onRefresh={fetchCartItems}
                ListEmptyComponent={renderEmptyComponent}
                contentContainerStyle={cartItems.length === 0 ? styles.emptyList : null}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 25,
        color: '#999',
    },
    emptyList: {
        flexGrow: 1,
        justifyContent: 'center',
        textAlign: 'center',
    },
    horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
});

export default CartScreen;
