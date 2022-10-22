import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList} from 'react-native';
import React, { useEffect } from 'react';

import Header from '../../components/Header';
import Movements from '../../components/Lista';

const list = [{
  id: 1,
  label: 'Boleto conta luz',
  value: '300,90',
  date: '17/09/2022',
  type: 0 // saída de dinheiro
},
{ 
  id: 2,
  label: 'Pix cliente',
  value: '3.235,90',
  date: '15/02/2022',
  type: 1 // entrada dinheiro
},
{
  id: 3,
  label: 'Salário',
  value: '15.000,00',
  date: '05/09/2022',
  type: 1 // entrada dinheiro
}
]

export default function Movimentacao(navigation){
  return (
    <View style={styles.container}>
      <Header name="Componente lista reutilizado" simbolo="caretleft"/>
      <Text style={styles.title}>Ultimas movimentações</Text>
      <FlatList 
        style={styles.list}
        data={list}
        keyExtractor={(item) => String(item.id)} // tratando ID de int para string, pois precisa ser string
        showsVerticalScrollIndicator={false}
        renderItem={ ({item}) => <Movements data={item}/>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  title:{
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 14,
    marginRight: 14,    // se quiser usar margem igual para todos os lados, usar -> margin: 14,
    marginTop: 14,
    marginBottom: 14,
  },
  list:{
    marginStart: 14,
    marginEnd: 14,
  }
});
