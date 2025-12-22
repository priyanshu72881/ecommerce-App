import React from 'react';
import { FlatList, View, Text, Image, StyleSheet } from 'react-native';
import products from '../assets/products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ProductList: React.FC = () => {
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    margin: 10,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
});

export default ProductList;