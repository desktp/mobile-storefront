import React, { useEffect } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';


import { useStateValue } from '../state';
import { loadProducts, loadCart } from '../actions';

export default ({ navigation }) => {
  const [{ cart, loadingProducts }, dispatch] = useStateValue();

  return (
    <Container>
      <Text>{JSON.stringify(cart)}</Text>
    </Container>
  );
}