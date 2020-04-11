import React from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Root, Container, Header, Item, Input, Icon, Button, Text } from 'native-base';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ProductList from './components/ProductList';
import Cart from './components/Cart'

import { StateProvider } from './state';
import reducer, { initialState } from './reducer';

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });

    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Root>
        <StateProvider reducer={reducer} initialState={initialState}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="ProductList"
                component={ProductList}
                options={{
                  header: props => (
                    <Header searchBar rounded>
                      <Item>
                        <Icon name="ios-search" />
                        <Input placeholder="Buscar..." />
                      </Item>
                      <Button onPress={() => props.navigation.navigate('Cart')}><Text>Cart</Text></Button>
                    </Header>
                  )
                }}
              />
              <Stack.Screen name="Cart" component={Cart} />
            </Stack.Navigator>
          </NavigationContainer>
        </StateProvider>
      </Root>
    );
  }
}

// export default function App() {
//   return (
//     <StateProvider reducer={reducer} initialState={initialState}>
//       <NavigationContainer>
//         <Stack.Navigator>
//           <Stack.Screen name="ProductList" component={ProductList} />
//           <Stack.Screen name="Cart" component={Cart} />
//         </Stack.Navigator>
//       </NavigationContainer>
//     </StateProvider>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
