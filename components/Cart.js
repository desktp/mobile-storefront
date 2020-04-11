import React from 'react';
import { Container, Text } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';

import { useStateValue } from '../state';
import { updateCart, removeFromCart, loadCart } from '../actions';

import { CartItem } from './common';

export default () => {
  const [{ cart, loadingCart }, dispatch] = useStateValue();

  if (!cart.length) return (
    <Container style={styles.empty}>
      <Text>:(</Text>
      <Text>Seu carrinho está vazio!</Text>
      <Text>Que tal adicionar alguns produtos?</Text>
    </Container>
  );

  return (
    <Container>
      <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem cartItem={item} updateCart={updateCart(dispatch)} removeFromCart={removeFromCart(dispatch)} />}
        keyExtractor={item => item.product.sku}
        onRefresh={() => loadCart(dispatch)}
        refreshing={loadingCart}
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