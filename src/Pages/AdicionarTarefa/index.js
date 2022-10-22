import React, {useState, useEffect} from 'react';
import { View, StyleSheet,ScrollView, Text, TextInput, TouchableOpacity} from 'react-native';
import Header from '../../components/Header';

import { Button } from 'react-native-paper';
import { executeSql, inserir} from "../../../db";

export default function AddTarefa() {
  const [titulo, setTitulo] = useState("")
  const [texto, setTexto] = useState("")

  async function inserir() {
    try {
      const rs = await executeSql(`INSERT INTO tarefas (titulo, descricao) VALUES(?,?)`);
      setLista(rs.rows._array);
    } catch (err) {
      console.error(err);
    }
  }



 return (
  
   <View style={styles.container}>
    <Header name="Adicionar Tarefas" simbolo="leftcircleo"></Header>
          <View style={styles.container}>
            <Text style={styles.title}>Tarefa Nova</Text>
            <Text style={styles.subTitle}>Titulo</Text>
            <TextInput 
                style={styles.formContainer}
                multiline={true}
                numberOfLines={3}
                onChangeText={novoTitulo => setTitulo(novoTitulo)}
                placeholder="Título aqui"
                value={titulo}
                />
            <Text style={styles.subTitle}>Descrição</Text>
            <TextInput
             style={styles.formContainer}
             multiline={true}
             numberOfLines={99}
             onChangeText={novoTexto => setTexto(novoTexto)}
             placeholder="Descrição da tarefa"
             value={texto}
           /> 
          </View>
          <View style={styles.bottomView}>
            <Button mode="contained" style={styles.touchableOpacityStyle} onPress={(inserir)}>
              Adicionar nova nota
             </Button>
        </View>
    </View> 
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 15,
    marginTop: 8,
    marginHorizontal: 6,
    borderRadius: 10,
    shadowColor: "#000",
    fontSize: 18,
    marginBottom: 10,
  },
  formInputError: {
    fontSize: 13,
    color: "#C00",
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  title: {
    paddingTop: 9,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
  },
  subTitle: {
    paddingTop: 9,
    paddingHorizontal: 10,
    fontSize: 15,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 8,
  },
  touchableOpacityStyle: {
    width: '100%',
    height: 50 ,
    justifyContent: 'center',
    alignItems: 'center',
},
bottomView: {
  flex: 1,
  width: '100%',
  alignItems: 'center',
},
});
