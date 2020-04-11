import React, { useState } from 'react';
import { Card, CardItem, Text, Body, Button, View, Icon, Input, Item } from 'native-base';
import { Image, StyleSheet } from 'react-native';

export default ({ product = {}, addToCart }) => {
  const [qtyToAdd, setQtyToAdd] = useState(1);

  const increaseQty = () => setQtyToAdd(Number(qtyToAdd) + 1);
  const decreaseQty = () => setQtyToAdd(Number(qtyToAdd) - 1);

  const handleSetQtyToAdd = (qty) => {
    const nQty = Number(qty);
    if (nQty === NaN || nQty < 0) return;
    setQtyToAdd(Number(qty));
  }


  const submitAddToCart = () => addToCart(product.sku, qtyToAdd);

  const splitPrice = (product.price.toString() || '').split('.');

  return (
    <Card>
      <CardItem cardBody>
        <Image source={{ uri: product.imageURL }} style={styles.image}/>
      </CardItem>
      <CardItem>
        <Body>
          <Text style={styles.category}>{product.category}</Text>
          <Text style={styles.maker}>{product.maker}</Text>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.sku}>{product.sku}</Text>
          <Text>
            Quantidade: {product.quantityAvailable}
          </Text>
          {product.quantityAvailable < 10 && <Text style={styles.lastUnitsWarning}>Últimas unidades!</Text>}
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              R$ {splitPrice[0]}
            </Text>
            <View style={styles.priceCentsContainer}>
              <Text style={styles.priceCents}>{splitPrice[1] || '00'}</Text>
            </View>
          </View>
        </Body>
      </CardItem>
      <CardItem>
        <View style={styles.cartQtyContainer}>
          <Button transparent small onPress={decreaseQty}>
            <Icon ios='ios-arrow-down' android='ios-arrow-down' />
          </Button>
          <Item>
            <Input
              value={qtyToAdd.toString()}
              onChangeText={handleSetQtyToAdd}
              keyboardType='numeric'
              style={styles.qtyInput}
            />
          </Item>
          <Button transparent small onPress={increaseQty}>
            <Icon ios='ios-arrow-up' android='ios-arrow-up' />
          </Button>
        </View>
        <Button primary disabled={product.quantityAvailable === 0} style={styles.addToCartBtn} onPress={submitAddToCart}>
          <Text>{product.quantityAvailable === 0 ? 'Indisponível :(' : 'Adicionar ao carrinho'}</Text>
        </Button>
      </CardItem>
    </Card>
  );
}


const styles = StyleSheet.create({
  image: {
    height: 200,
    width: null,
    flex: 1,
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
    fontSize: 18,
  },
  sku: {
    fontSize: 8,
    marginVertical: 10
  },
  lastUnitsWarning: {
    color: 'red',
    fontWeight: 'bold'
  },
  priceContainer: {
    flexDirection: 'row',
    marginTop: 10,
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
  cartQtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  qtyInput: {
    maxWidth: 40
  },
});
