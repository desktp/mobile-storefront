import React from 'react';
import { Text, View, Button } from 'react-native';

export default ({ navigation }) => (
  <View>
    <Text>Product list page</Text>
    <Button onPress={() => navigation.navigate('Cart')} title='Go to Cart' />
  </View>
);
