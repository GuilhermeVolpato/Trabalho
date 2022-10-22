import { useState, useEffect } from "react";
import { StyleSheet, TouchableOpacity, Keyboard, View, Text } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { Formik } from "formik";
import { executeSql } from "../../../db";

function MyTextInput({ error = null, ...props }) {
  return (
    <View style={{ paddingBottom: 6 }}>
      <TextInput error={!!error} {...props} />
      {!!error && typeof error === "string" && <Text style={styles.formInputError}>{error}</Text>}
    </View>
  );
}

export default function SqlAddScreen({ navigation }) {
  return (

      <Formik
        initialValues={{
          name: "",
          qtd: 1,
        }}

        onSubmit={async (values, actions) => {
          try {
            const rs = await executeSql("INSERT INTO tarefas (name, qtd) VALUES(?, ?)", [values.name, values.qtd]);
            navigation.navigate("Home", { novoItem: rs.insertId });
          } catch (err) {
            // se pararmos aqui é porque algo não deu certo, por exemplo escrevemos o script/query SQL errado
            // ai nesse caso podemos analisar a variável `err` para ver e entender o que deu errado
            console.error(err);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, setFieldValue, touched, errors, values }) => {
          return (
            <View style={styles.formContainer}>
              <Text style={styles.title}>Adicionar item</Text>
              <MyTextInput
                autoCorrect={false}
                label="Produto desejado"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                error={touched.name && errors.name}
              />
     
              <Button onPress={handleSubmit} mode="contained" style={{ marginTop: 12 }}>
                Adicionar na Lista
              </Button>
              <View style={{ backgroundColor: "#fff", marginTop: 32, padding: 12 }}>
                <Text style={{ fontSize: 18 }}>Dados do Formulário: {`\n\n` + JSON.stringify(values, null, 2)}</Text>
              </View>
            </View>
          );
        }}
      </Formik>

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
  formQtdInput: {
    backgroundColor: "rgba(231, 224, 236, 1)",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(121, 116, 126, 1)",
  },
  formQtdLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#666",
  },
  formQtdShadow: {
    fontSize: 15,
    fontWeight: "600",
    color: "#363636",
    backgroundColor: "#ddd",
    paddingVertical: 2,
    paddingHorizontal: 9,
    marginHorizontal: 3,
    borderRadius: 9,
    textAlign: "center",
    overflow: "hidden",
  },
  formQtdAction: {
    backgroundColor: "rgba(103, 80, 164, 1)",
    paddingVertical: 2,
    paddingHorizontal: 9,
    borderRadius: 9,
    overflow: "hidden",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 6,
    marginBottom: 18,
  },
});
