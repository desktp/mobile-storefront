import React, { useState } from 'react';
import { Card, CardItem, Text, Left, Right, Body, Button, View, Icon, Input, Item } from 'native-base';
import { Image, StyleSheet } from 'react-native';

import { addToCart } from '../../actions';
import { useStateValue } from '../../state';

export default ({ cartItem = {}, removeFromCart, updateCart }) => {
  const { product, quantity = 0 } = cartItem;

  const [qtyToAdd, setQtyToAdd] = useState(quantity);

  const increaseQty = () => handleSetQtyToAdd(Number(qtyToAdd) + 1);
  const decreaseQty = () => handleSetQtyToAdd(Number(qtyToAdd) - 1);

  const handleSetQtyToAdd = (qty) => {
    const nQty = Number(qty);
    if (nQty === NaN || nQty < 0) return;
    setQtyToAdd(Number(qty));
  }

  const submitRemoveFromCart = () => removeFromCart(product.sku);
  const submitUpdateCart = () => qtyToAdd === 0 ? submitRemoveFromCart() : updateCart(product.sku, qtyToAdd);

  const splitPrice = (product.price.toString() || '').split('.');

  const pendingChanges = quantity !== qtyToAdd;

  return (
    <Card style={styles.container}>
      <Image source={{ uri: product.imageURL }} style={styles.image}/>
      <View style={styles.detailsWrapper}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.maker}>{product.maker}</Text>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.sku}>{product.sku}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            R$ {splitPrice[0]}
          </Text>
          <View style={styles.priceCentsContainer}>
            <Text style={styles.priceCents}>{splitPrice[1] || '00'}</Text>
          </View>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <View style={styles.cartQtyContainer}>
          <Button transparent small onPress={increaseQty}>
            <Icon ios='ios-arrow-up' android='ios-arrow-up' />
          </Button>
          <Item>
            <Input
              value={qtyToAdd.toString()}
              onChangeText={handleSetQtyToAdd}
              keyboardType='numeric'
              style={styles.qtyInput}
            />
          </Item>
          <Button transparent small onPress={decreaseQty}>
            <Icon ios='ios-arrow-down' android='ios-arrow-down' />
          </Button>
        </View>
        <View style={styles.cartActionsContainer}>
          <Button transparent disabled={!pendingChanges} onPress={submitUpdateCart}>
            <Icon style={{ color: !pendingChanges ? 'grey' : '#32CD32', fontSize: 34 }} name='ios-checkmark' />
          </Button>
          <Button transparent onPress={submitRemoveFromCart}>
            <Icon style={{ color: 'red' }} name='ios-trash' />
          </Button>
        </View>
      </View>
    </Card>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  detailsWrapper: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    flex: 1
  },
  actionContainer: {
    flexDirection: 'row'
  },
  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain'
  },
  category: {
    backgroundColor: 'grey',
    color: 'white',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 2,
    fontSize: 10,
    overflow: 'hidden', // Workaround for iOS devices
    marginBottom: 5
  },
  maker: {
    fontSize: 12,
    color: 'grey',
  },
  name: {
    fontSize: 16,
  },
  sku: {
    fontSize: 8,
    marginTop: 10
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'flex-end'
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  priceCentsContainer: {
    justifyContent: 'flex-start'
  },
  priceCents: {
    fontSize: 10,
    fontWeight: 'bold'
  },
  cartQtyContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyInput: {
    maxWidth: 30,
    maxHeight: 20
  },
});
