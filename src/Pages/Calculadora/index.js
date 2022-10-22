import React, {useState} from 'react';
import { View, StyleSheet, TextInput, Text, ScrollView, Keyboard} from 'react-native';

import Header from '../../components/Header';

export default function Calculadora() {
    const [primeiroNumero, setPrimeiroNumero] = useState(0)
    const [segundoNumero, setSegundoNumero] = useState(0)

    const x = parseFloat(primeiroNumero);
    const y = parseFloat(segundoNumero);

    const soma = x + y;

 return (
   <ScrollView style={styles.container} onPress={Keyboard.dismiss}>
        <Header name="Calculadora" simbolo="caretleft"></Header>
        <Text style={styles.title}> Calculadora Soma</Text>
        <TextInput
            keyboardType="numeric"
            style={styles.formContainer}
            value={primeiroNumero}
            onChangeText={setPrimeiroNumero}
            placeholder="Numero aqui"
        />
        <TextInput
            keyboardType="numeric"
            style={styles.formContainer}
            value={segundoNumero}
            onChangeText={setSegundoNumero}
            placeholder="Numero aqui"
        />
        <Text style={styles.subTitle}>  Resultado </Text>
        <Text style={styles.resultado}>{soma}</Text>
   </ScrollView>
  );
}
const styles = StyleSheet.create({
    container:{
        flex: 1
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 6,
        marginBottom: 18,
      },
      subTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 10,
        marginBottom: 18,
      },
      resultado: {
        fontSize: 17,
        fontWeight: "bold",
        marginTop: 1,
        marginBottom: 18,
        paddingLeft: 15
      },
      formContainer: {
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 16,
        paddingTop: 5,
        paddingBottom: 6,
        marginTop: 8,
        marginHorizontal: 6,
        borderRadius: 10,
        shadowColor: "#000",
        fontSize: 18,
        marginBottom: 10,
      },
})