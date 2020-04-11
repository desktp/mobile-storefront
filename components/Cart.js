import React from 'react';
import { Container, Text } from 'native-base';
import { FlatList } from 'react-native';

import { useStateValue } from '../state';

import { CartItem } from './common';

export default ({ navigation }) => {
  const [{ cart }] = useStateValue();

  if (!cart.length) return <Text>Loading</Text>;

  return (
    <Container>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        keyExtractor={item => item.product.sku}
      />
    </Container>
  );
}