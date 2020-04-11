import React from 'react';
import { Container, Text, View } from 'native-base';
import { FlatList, StyleSheet } from 'react-native';

import { useStateValue } from '../state';
import { updateCart, removeFromCart, loadCart } from '../actions';

import { CartItem } from './common';

export default () => {
  const [{ cart, filteredCart, loadingCart, searchingCart }, dispatch] = useStateValue();

  if (!cart.length) return (
    <Container style={styles.empty}>
      <Text>:(</Text>
      <Text>Seu carrinho está vazio!</Text>
      <Text>Que tal adicionar alguns produtos?</Text>
    </Container>
  );

  const data = searchingCart ? filteredCart : cart;

  if (searchingCart && !filteredCart.length) return (
    <Container style={styles.empty}>
      <Text>Nenhum produto encontrado!</Text>
    </Container>
  );

  const cartTotal = data.reduce((acc, current) => {
    return acc + (current.product.price * current.quantity);
  }, 0);
  const splitPrice = cartTotal.toFixed(2).toString().split('.');

  return (
    <Container>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          Total: R$ {splitPrice[0]}
        </Text>
        <View style={styles.priceCentsContainer}>
          <Text style={styles.priceCents}>{splitPrice[1] || '00'}</Text>
        </View>
      </View>
      <FlatList
        data={data}
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
  },
  priceContainer: {
    flexDirection: 'row',
    marginVertical: 10,
    marginRight: 10,
    justifyContent: 'flex-end'
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  priceCentsContainer: {
    justifyContent: 'flex-start'
  },
  priceCents: {
    fontSize: 10,
    fontWeight: 'bold'
  },
})