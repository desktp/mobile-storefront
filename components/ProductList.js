import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

import Product from './common/Product';

import { useStateValue } from '../state';
import { loadProducts, loadCart } from '../actions';

export default ({ navigation }) => {
  const [{ products, loadingProducts }, dispatch] = useStateValue();
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    loadProducts(dispatch);
    loadCart(dispatch);
  }, [loadProducts, loadCart]);

  // useLayoutEffect(() => {
  //   navigation.setOptions(() => ({
  //     header: () => (
  //       <Header searchBar rounded>
  //         <Item>
  //           <Icon name="ios-search" />
  //           <Input placeholder="Buscar..." />
  //         </Item>
  //       </Header>
  //     )
  //   }));
  // }, [navigation, setSearchText, searchText]);

  if (!products.length) return <Text>Loading</Text>;

  return (
    <Container>
      {/* <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input placeholder="Buscar..." />
        </Item>
      </Header> */}
      <FlatList
        data={products}
        renderItem={({ item }) => <Product product={item} />}
        keyExtractor={item => item.sku}
      />
    </Container>
  );
}