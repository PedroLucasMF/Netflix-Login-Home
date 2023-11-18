import React, { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import apiFilmes from '../service/apiFilmes'
import { Card, Text } from 'react-native-paper'
import { Image, StyleSheet } from 'react-native-web'


const Principal = () => {

  const [series, setSeries] = useState([])

  useEffect(() => {
    apiFilmes.get('/tv/popular').then(resultado => {
      setSeries(resultado.data.results)
    })
  }, [])

  const [filmes, setFilmes] = useState([])

  useEffect(() => {
    apiFilmes.get('/movie/popular').then(resultado => {
      setFilmes(resultado.data.results)
    })
  }, [])

  const renderImagesRow = (data) => {
    return (
      <FlatList
        data={data}
        horizontal
        renderItem={({ item }) => (
          <View style={styles.card} key={item.id}>
            <Image style={styles.filmesimg} source={{ uri: `https://image.tmdb.org/t/p/w500/${item.backdrop_path}` }} />
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    );
  };

  return (
    <>
      <ScrollView>
        
        <View style={styles.rowi}>
          <ScrollView horizontal>
          <Text style={styles.title}>Filmes Populares</Text>
          {filmes.map(item => (
            <Card style={styles.card} key={item.id}>
              <Image style={styles.filmesimg} source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path }} />
            </Card>
          ))}
          </ScrollView>
        </View>
    

        <View>
          <Text style={styles.title}>Series Populares</Text>
          {series.map(item => (
            <Card style={styles.card} key={item.id}>
              <Image style={styles.filmesimg} source={{ uri: 'https://image.tmdb.org/t/p/w500/' + item.backdrop_path }} />
            </Card>
          ))}
        </View>

      </ScrollView>



    </>
  )
}

const styles = StyleSheet.create({
  filmesimg: {
    widht: 20,
    height: 100,
  },
  card: {
    widht: 20,
    height: 100,
    marginLeft: 80,
    marginRight: 80,
    marginTop: 10,
    marginBottom: 10,
  },
  rowi: {
    backgroundColor: '#050505',
  },
  title: {
    fontSize: 20,
    color: '#fffefa',
    fontWeight: 'bold'
  }
});

export default Principal