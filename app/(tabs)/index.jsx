import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ProductListItem from '../../components/ListItem';
import { initDatabase, onAddToCart, onRemoveFromCart, getCartItems } from '../../db/database';
import { SafeAreaView } from 'react-native';

const GoodsList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState({});

    useEffect(() => {
        initDatabase();
        loadProducts();
        loadCartItems();
    }, []);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            setError(error);
        }
        setIsLoading(false);
    };

    const loadCartItems = async () => {
        try {
            const items = await getCartItems();
            const cartMap = items.reduce((acc, item) => {
                acc[item.id] = item.quantity;
                return acc;
            }, {});
            setCartItems(cartMap);
        } catch (error) {
            console.error('Error loading cart items:', error);
        }
    };

    const handleAddToCart = async (product) => {
        try {
            await onAddToCart(product);
            await loadCartItems();
        } catch (error) {
            setError(error);
        }
    };

    const handleRemoveFromCart = async (id) => {
        try {
            await onRemoveFromCart(id);
            await loadCartItems();
        } catch (error) {
            setError(error);
        }
    };

    const getQuantity = (id) => cartItems[id] || 0;

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Product List</Text>
            {error && <Text style={styles.error}>{error.message}</Text>}
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ProductListItem
                        product={item}
                        onAddToCart={handleAddToCart}
                        onRemoveFromCart={handleRemoveFromCart}
                        getQuantity={getQuantity}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadProducts} />
                }
            />
        </SafeAreaView>
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
    error: {
        color: 'red',
        marginBottom: 10,
    },
});

export default GoodsList;
