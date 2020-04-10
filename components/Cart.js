import React, { useEffect } from 'react';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';


import { useStateValue } from '../state';
import { loadProducts, loadCart } from '../actions';

export default ({ navigation }) => {
  const [{ products, loadingProducts }, dispatch] = useStateValue();

  return (
    <Container>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Buscar..." />
        </Item>
      </Header>
      <Text>Cartpage</Text>
    </Container>
  );
}