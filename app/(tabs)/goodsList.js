import React, { useState, useEffect } from 'react';
import { Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import ProductListItem from '../../components/ListItem';
import { initDatabase, onAddToCart, onRemoveFromCart } from '../../db/database';
import { SafeAreaView } from 'react-native';


const GoodsList = () => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, catchError] = useState(null)

    useEffect(() => {
      initDatabase();
      loadProducts();
    }, [])

    const loadProducts = async () => {
        setIsLoading(true);
        try {
            const response = await fetch('https://fakestoreapi.com/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching products:', error);
            catchError(error);
        }
        setIsLoading(false);
    };

    const handleAddToCart = async (product) => {
        try {
          await onAddToCart(product);
          catchError(null);
        } catch (error) {
          catchError(error);
        }
    };

    const handleRemoveFromCart = async (id) => {
      try {
        await onRemoveFromCart(id);
        catchError(null);
      } catch (error) {
        catchError(error);
      }
    };

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
});

export default GoodsList;
