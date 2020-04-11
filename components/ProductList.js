import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Container, Text } from 'native-base';

import { Product, LoadingPlaceholder } from './common';

import { useStateValue } from '../state';
import { loadProducts, loadCart, addToCart } from '../actions';

export default () => {
  const [{ products, filteredProducts, loadingProducts, searchingProducts }, dispatch] = useStateValue();

  useEffect(() => {
    initialize();
  }, [loadProducts, loadCart]);

  const initialize = () => {
    loadProducts(dispatch);
    loadCart(dispatch);
  }

  if (!products.length) return (
    <Container>
      <LoadingPlaceholder />
      <LoadingPlaceholder />
    </Container>
  );

  const data = searchingProducts ? filteredProducts : products;

  if (searchingProducts && !filteredProducts.length) return (
    <Container style={styles.empty}>
      <Text>Nenhum produto encontrado!</Text>
    </Container>
  );

  return (
    <Container>
      <FlatList
        data={data}
        renderItem={({ item }) => <Product product={item} addToCart={addToCart(dispatch)} />}
        keyExtractor={item => item.sku}
        onRefresh={initialize}
        refreshing={loadingProducts}
      />
    </Container>
  );
}

const styles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})