import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

import Product from './common/Product';

import { useStateValue } from '../state';
import { loadProducts, loadCart } from '../actions';

export default ({ navigation }) => {
  const [{ products, loadingProducts }, dispatch] = useStateValue();

  useEffect(() => {
    initialize();
  }, [loadProducts, loadCart]);

  const initialize = () => {
    loadProducts(dispatch);
    loadCart(dispatch);
  }

  if (!products.length) return <Text>Loading</Text>;

  return (
    <Container>
      <FlatList
        data={products}
        renderItem={({ item }) => <Product product={item} />}
        keyExtractor={item => item.sku}
        onRefresh={initialize}
        refreshing={loadingProducts}
      />
    </Container>
  );
}