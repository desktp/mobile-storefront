import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Header, Item, Input, Icon, Button, Text, Body, Right, Left, Badge } from 'native-base';

import { useStateValue } from '../state';

import { filterProducts, filterCart } from '../actions';

export default ({ scene, previous, navigation }) => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [{ cart }, dispatch] = useStateValue();

  const { options } = scene.descriptor;
  const title =
    options.headerTitle !== undefined
      ? options.headerTitle
      : options.title !== undefined
      ? options.title
      : scene.route.name;

  const closeSearch = () => {
    setSearchOpen(false);
    scene.route.name === 'Cart' ? filterCart(dispatch)() : filterProducts(dispatch)();
  }

  if (searchOpen) return (
    <Header searchBar>
      <Item>
        <Icon name='ios-search' />
        <Input placeholder='Search' onChangeText={scene.route.name === 'Cart' ? filterCart(dispatch) : filterProducts(dispatch) } />
        <Button transparent onPress={closeSearch}>
          <Icon name='ios-close' />
        </Button>
      </Item>
    </Header>
  )

  return (
    <Header noLeft={!previous}>
      <Left>
        {previous &&
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' />
            <Text>Back</Text>
          </Button>
        }
      </Left>
      <Body>
        <Text style={styles.title}>{title}</Text>
      </Body>
        <Right>
          <Button transparent onPress={() => setSearchOpen(true)}>
            <Icon name='ios-search' />
          </Button>
          {scene.route.name !== 'Cart' && 
            <Button transparent onPress={() => navigation.navigate('Cart')}>
              <Icon name='ios-cart' />
              {cart.length ? <Badge style={styles.badge} /> : <></>}
            </Button>
          }
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: 8,
    top: 8,
    width: 10,
    height: 12,
  },
  title: {
    color: Platform.OS === 'ios' ? 'black' : 'white'
  }
});