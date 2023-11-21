import React, { useEffect, useState } from "react";
import {ScrollView, StyleSheet, Text, View } from "react-native";
import { Avatar, Button, Card, Icon, IconButton } from "react-native-paper";
import apiFilmes from "../service/apiFilmes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Filme = ({ navigation, route }) => {
  const [filme, setFilme] = useState({});
  const [atores, setAtores] = useState([]);

  



  function salvar(dados) {
    AsyncStorage.getItem("filmes-Fav").then((resultado) => {
      const fav = JSON.parse(resultado) || [];

      fav.push({id: filme.id, foto: filme.backdrop_path})
        console.log(fav);
      console.log(filme)

      AsyncStorage.setItem("filmes-Fav", JSON.stringify(fav));
      

    //   navigation.goBack();
    });
  }


  useEffect(() => {
    const id = route.params.id;
    apiFilmes.get(`/movie/${id}?language=pt-BR`).then((resultado) => {
      setFilme(resultado.data);
    });
    apiFilmes.get(`/movie/${id}/credits?language=pt-BR`).then((resultado) => {
      setAtores(resultado.data.cast);
    });
    apiFilmes.get(`/tv/${id}?language=pt-BR`).then((resultado) => {
      setFilme(resultado.data);
    });
    apiFilmes.get(`/tv/${id}/credits?language=pt-BR`).then((resultado) => {
      setAtores(resultado.data.cast);
    });
  }, []);

  return (
    <>
      <ScrollView>
        <View style={styles.view}>
          <Card style={styles.card}>
            <Card.Cover
              style={styles.cover}
              source={{
                uri: "https://image.tmdb.org/t/p/w500/" + filme.backdrop_path,
              }}
            />
            <Card.Content>
              <Text variant="Bodylarge" style={styles.titulo}>
                {filme.title}
              </Text>
              <Text variant="bodyMedium" style={styles.desc}>
                {filme.overview}
              </Text>
             
            </Card.Content>
            <Card.Actions style={styles.acbtt}>
               <IconButton style={styles.btt} icon="star-outline" onPress={salvar}></IconButton>
               {/* star-face */}
               
            </Card.Actions>
          </Card>
        
        <View>
          <ScrollView horizontal>
          {atores.map((item) => (
            <Card style={styles.ator}
              key={item.id}
            >
              <Card.Title titleStyle={{ color: "#fffefa", width: "100%", height: 20 }}
                title={item.name}
                left={(props) => (
                  <Avatar.Image
                    {...props}
                    size={44}
                    source={{
                      uri: `https://image.tmdb.org/t/p/w500${item.profile_path}`,
                    }}
                  />
                )}
              />
            </Card>
          ))}
          </ScrollView>
          </View>


        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#050505",
    width: "100%",
    height: "100%",
  },
  card: {
    borderRadius: 0,
    height: 500,
    backgroundColor: "#050505",
  },
  cover: {
    margin: 0,
    borderRadius: 0,
  },
  titulo: {
    fontSize: 30,
    color: "#fffefa",
    fontWeight: "bold",
    width: "100%",
    textAlign: "center",
    margin: 10,
  },
  desc: {
    fontSize: 12,
    color: "#fffefa",
    fontWeight: "normal",
    width: "100%",
    textAlign: "center",
    margin: 5,
  },

  ator:{
    margin: 5,
    width: 220,
    backgroundColor: "#050505"
  },

  btt: {
    backgroundColor: "#fffefa",
    width: 50,
    height: 50,
    margin: 10,
    borderRadius: "50%"
  },

  acbtt: {
    width: '100%',
    alignItems: 'center'
  }
});



export default Filme;
