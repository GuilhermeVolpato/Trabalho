import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Movimentacao from './src/Pages/Movimentacao';
import Home from './src/Pages/Home';
import Calculadora from './src/Pages/Calculadora';
import AddTarefa from './src/Pages/AdicionarTarefa';

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{header: () => null}}/>
        <Stack.Screen name="Calculadora" component={Calculadora} options={{header: () => null}}/>
        <Stack.Screen name="Movimentacao" component={Movimentacao} options={{header: () => null}}/>
        <Stack.Screen name="AddTarefa" component={AddTarefa} options={{header: () => null}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
