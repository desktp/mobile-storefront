import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductList from './components/ProductList';
import Cart from './components/Cart'
import Header from './components/Header';

const Stack = createStackNavigator();

export default () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        header: props => <Header {...props} />
      }}
    >
      <Stack.Screen name='ProductList' options={{ title: 'Produtos' }} component={ProductList} />
      <Stack.Screen name='Cart' options={{ title: 'Carrinho' }} component={Cart} />
    </Stack.Navigator>
  </NavigationContainer>
);
