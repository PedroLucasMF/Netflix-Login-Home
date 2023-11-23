import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native-web";
import * as yup from "yup";
import { MaskService } from "remask";

const UserCadastro = ({ navigation }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const validationSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .required("Campo obrigatório"),
    name: yup.string().required("Campo obrigatório"),
  });

  const saveForm = async () => {
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await AsyncStorage.setItem("userData", JSON.stringify(formData));
      navigation.push("Login");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        error.errors.forEach((errorMsg) => alert(errorMsg));
      } else {
        console.error("Erro ao salvar os dados:", error);
      }
    }
  };

  const maskEmail = (value) => {
    const maskedValue = MaskService.toMask("email", value);
    handleInputChange("email", maskedValue);
  };

  const maskPassword = (value) => {
    const maskedValue = MaskService.toMask("credit-card", value);
    handleInputChange("password", maskedValue);
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
          <Text style={styles.redLogo}>Preecha os Campos abaixo</Text>
          <TextInput
            style={styles.forms}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email}
            onChangeText={(text) => handleInputChange("email", text)}
          />
          <TextInput
            style={styles.forms}
            placeholder="Senha"
            keyboardType="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TextInput
            style={styles.forms}
            placeholder="Nome"
            keyboardType="Text"
            autoCapitalize="none"
            value={formData.name}
            onChangeText={(text) => handleInputChange("name", text)}
          />

          <Button style={styles.buttao} onPress={saveForm}>
            <Text style={styles.bigBlue}>Entrar</Text>
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
    color: "white",
    fontSize: 20,
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

export default UserCadastro;
