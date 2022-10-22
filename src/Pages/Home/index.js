import { useState, useEffect } from "react";
import { StyleSheet, Keyboard, View, Text,RefreshControl, ScrollView} from "react-native";
import { TextInput, Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Formik } from "formik";
import Header from "../../components/Header";
import React from 'react';


const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const salvarAnotacao = async usuarioData => {
  try {
   
    const jsonValue = JSON.stringify(usuarioData);

    await AsyncStorage.setItem("@usuario", jsonValue);

    return true;
  } catch (err) {
    console.log(err)
  }

  return false;
};

const getAnotacao = async () => {
  try {
    
    const jsonValue = await AsyncStorage.getItem("@usuario");
    if (jsonValue !== null) {

      const usuarioRecuperado = JSON.parse(jsonValue);

      return usuarioRecuperado;
    }
  } catch (err) {
    
  }


  return {

  };
};


export default function Home({ navigation }) {
  const [notaSalva, setNotaSalva] = useState(null);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  async function restoreUsuarioSalvo() {
    const restoreNota = await getAnotacao();
    setNotaSalva(restoreNota);
  }

  async function salvaNota(formData) {

    const success = await salvarAnotacao(formData);

    if (success) {
      setNotaSalva(formData);
    }
  }

  useEffect(() => {
    restoreUsuarioSalvo();
  }, []);

  const removeNota = async () => {
    try {
    await AsyncStorage.removeItem('@usuario')
    setNotaSalva(null);
    } catch(e) {
    // remove error
    }
    console.log('Removido com Sucesso')
    }

  return (
    <ScrollView 
        refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
        }
    >
      <Formik
        initialValues={{
          nome: "",
          email: "",
        }}

        onSubmit={async (values, actions) => {
          await salvaNota(values);
          // limpando os campos do formulário para deixar o form pronto para outra interação
          actions.resetForm();
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => {
          return (
            <View style={styles.container}>
                <Header name="Anotações"></Header>
                <View style={{flexDirection : 'row', flex: 1}}>
                  <Button onPress={() => navigation.navigate('Calculadora')}> Ir para Calculadora Soma</Button>
                  <Button onPress={() => navigation.navigate('Movimentacao')}> Ir para Lista de Gastos</Button>
                </View>
              <Text style={styles.title}>Suas anotações ficarão salvas!</Text>
              <TextInput 
                style={styles.formContainer}
                multiline={true}
                numberOfLines={2}
                onChangeText={handleChange("nome")}
                onBlur={handleBlur("nome")}
                value={values.nome}
                placeholder="Título aqui"
                />
              <TextInput
                style={styles.formContainer}
                multiline={true}
                numberOfLines={10}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                placeholder="Descrição"
              />
              <Button onPress={handleSubmit} mode="contained" style={{ marginTop: 12 }}>
                Registrar em Async
              </Button>
              <View style={{ backgroundColor: "#fff", marginTop: 32, padding: 12 }}>
                <Text style={{ fontSize: 18 }}>
                  Anotação: {`\n\n` + JSON.stringify(notaSalva, null,1)}
                </Text>
                <Button onPress={removeNota}  mode="contained" style={{ marginTop: 12 }}>
                    delete
              </Button>
              </View>
            </View>
          );
        }}
      </Formik>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  formContainer: {
    padding: 21,
  },
  formInputError: {
    fontSize: 13,
    color: "#C00",
    paddingVertical: 5,
    paddingHorizontal: 9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
    paddingLeft: 15,
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
});
