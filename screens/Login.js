import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native-web";

const Login = ({ navigation }) => {



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
            
          />
          <TextInput
            style={styles.forms}
            placeholder="Password"
            secureTextEntry={true}
            
          />
          <Button
            style={styles.buttao}
            onPress={()=> navigation.push("Principal")}
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
            onPress={() => navigation.push("Users")}
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
