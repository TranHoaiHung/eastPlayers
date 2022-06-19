import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { ProductDetailScreen } from '../Containers';
const Stack = createStackNavigator();

const ProductStack = ()  => {
    return (
      <Stack.Navigator headerMode={"none"} >
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
      </Stack.Navigator>
    );
  }


const MainNavigation = () => {

    return(
        <SafeAreaProvider style={{ flex: 1, backgroundColor: "#fff"}}>
            <NavigationContainer>
            {ProductStack()}
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default MainNavigation;