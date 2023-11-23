import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Avatar, Button, Card, IconButton } from "react-native-paper";
import { StyleSheet } from "react-native-web";

const Users = ({ navigation, route }) => {
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem("userData");
      if (userDataString) {
        const parsedUserData = JSON.parse(userDataString);
        setUserData(parsedUserData);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados do usuário:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const confirmExclusion = async () => {
    try {
      await AsyncStorage.removeItem("userData");
      setUserData([]);
      navigation.push("Login");
    } catch (error) {
      console.error("Erro ao excluir o usuário:", error);
    }
  };

  return (
    <>
      <ScrollView style={styles.view}>
        {userData && (
          <View>
            <Card style={styles.card}>
              <Card.Title style={styles.title} title={userData.name || "Nome do Usuário"} />
              <Card.Actions>
                <Button
                  icon="pencil-outline"
                  onPress={() => navigation.push("Cadastro-User", { userData })}
                >
                  Editar
                </Button>
                <Button icon="trash-can-outline" onPress={confirmExclusion}>
                  Deletar
                </Button>
              </Card.Actions>
            </Card>
          </View>
        )}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
card:{
    height: 105,
    borderRadius: 0,
},
view: {
    height: 540,
    backgroundColor: "#000",
}


})

export default Users;
