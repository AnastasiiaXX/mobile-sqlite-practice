import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ProductListItem from '../../components/ListItem';


const goodsList = ({ cartItems, setCartItems }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleAddToCart = (product) => {
        setCartItems((prevItems) => [...prevItems, product]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Product List</Text>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ListItem product={item} onAddToCart={handleAddToCart} />
                )}
                keyExtractor={(item) => item.id.toString()}
                refreshControl={
                    <RefreshControl refreshing={isLoading} onRefresh={loadProducts} />
                }
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

export default goodsList;
