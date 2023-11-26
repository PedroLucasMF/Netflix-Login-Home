import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import apiFilmes from "../service/apiFilmes";
import { Button, Card, Text } from "react-native-paper";
import { Image, StyleSheet } from "react-native-web";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Principal = ({ navigation, route }) => {
  const [series, setSeries] = useState([]);
  const [favs, setFAv] = useState([]);
  const [filmes, setFilmes] = useState([]);


  useEffect(() => {
    apiFilmes.get("/tv/popular").then((resultado) => {
      setSeries(resultado.data.results);
    });

    AsyncStorage.getItem("filmes-Fav").then((resultado) => {
      const fav = JSON.parse(resultado) || [];
      setFAv(fav);
    });

    apiFilmes.get("/movie/popular").then((resultado) => {
      setFilmes(resultado.data.results);
    });
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.rowi}>
          <Text style={styles.title}>Filmes Populares</Text>
          <ScrollView horizontal>
            {"\n"}
            {filmes.map((item) => (
              <View>
                <Card
                  style={styles.card}
                  key={item.id}
                  onPress={() => navigation.push("Item", { id: item.id })}
                >
                  <Image
                    style={styles.filmesimg}
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + item.backdrop_path,
                    }}
                  />
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.rowi}>
          <Text style={styles.title}>Series Populares</Text>
          <ScrollView horizontal>
            {"\n"}
            {series.map((item) => (
              <View>
                <Card style={styles.card} key={item.id} onPress={() => navigation.push("Item", { id: item.id })}>
                  <Image
                    style={styles.filmesimg}
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + item.backdrop_path,
                    }}
                  />
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.rowi}>
          <Text style={styles.title}>Favoritos</Text>
          <ScrollView horizontal>
            {"\n"}
            {favs.map((item) => (
              <View>
                <Card style={styles.card} key={item.id} onPress={() => navigation.push("Item", { id: item.id })}>
                  <Image
                    style={styles.filmesimg}
                    source={{
                      uri:
                        "https://image.tmdb.org/t/p/w500/" + item.foto,
                    }}
                  />
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.rowi2}>
            <ScrollView horizontal>

              <Button style={styles.buttao} onPress={()=> navigation.push("Cartões")} >Pagamento</Button>
              <Button style={styles.buttao} onPress={()=> navigation.push("Filme/Serie")}>Cadastros F&S</Button>
              <Button style={styles.buttao} onPress={()=> navigation.push("Atores")}>Atores</Button>
              <Button style={styles.buttao} onPress={()=> navigation.push("Comentarios")} >Comentarios</Button>
              

            </ScrollView>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  filmesimg: {
    width: 200,
    height: 150,
    imageStyle: "fit",
    borderRadius: 10,
  },
  card: {
    width: 200,
    height: 150,
    margin: 20,
  },
  rowi: {
    backgroundColor: "#050505",
    height: 250,
    border: 1,
    borderColor: "#050505",
    borderStyle: "solid",
  },
  rowi2: {
    backgroundColor: "#050505",
    height: 80,
    border: 1,
    borderColor: "#050505",
    borderStyle: "solid",
  },
  title: {
    fontSize: 20,
    color: "#fffefa",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
  },
  buttao: {
    margin: 10,
    borderWidth: 2,
    borderColor: "#5c5c5c", // Grey border color
    borderRadius: 1,
    paddingHorizontal: 80,
    paddingVertical: 2,
    backgroundColor: "#373738",
    height: 50,
  },
});

export default Principal;
