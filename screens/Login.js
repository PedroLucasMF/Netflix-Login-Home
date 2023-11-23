import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native-web";

const Login = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      const userData = await AsyncStorage.getItem("userData");
      const parsedUserData = JSON.parse(userData);

      if (
        parsedUserData &&
        parsedUserData.email === formData.email &&
        parsedUserData.password === formData.password
      ) {
        // Login successful
        alert("Login bem-sucedido!");
        navigation.push("Principal")
        // Aqui você pode navegar para a próxima tela após o login ser bem-sucedido
      } else {
        alert("Credenciais inválidas. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
    }
  };

  const handleInputChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  return (
    <>
      <ScrollView>
        <View style={styles.tela}>
          <Text style={styles.redLogo}>Netflix</Text>
          <TextInput
            style={styles.forms}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <TextInput
            style={styles.forms}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <Button
            style={styles.buttao}
            onPress={(handleLogin)}
          >
            <Text style={styles.bigBlue}>Entrar</Text>
          </Button>

          <Button
            style={styles.buttao}
            onPress={() => navigation.push("Cadastro-User")}
          >
            <Text style={styles.bigBlue}>Cadastrar</Text>
          </Button>

          <Button
            style={styles.buttao}
            onPress={() => navigation.push("Users-feitos")}
          >
            <Text style={styles.bigBlue}>Usuarios</Text>
          </Button>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "#696868",
    fontWeight: "bold",
    fontSize: 15,
  },
  redLogo: {
    color: "red",
    fontSize: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  forms: {
    margin: 20,
    marginBottom: 0,
    marginTop: 5,
    backgroundColor: "#ddd",
    color: "#9c9c9c",
    backgroundColor: "#373738",
  },
  tela: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#000",
    height: 540,
  },
  buttao: {
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#5c5c5c", // Grey border color
    borderRadius: 1,
    paddingHorizontal: 80,
    paddingVertical: 2,
    backgroundColor: "#373738",
  },
});

export default Login;
