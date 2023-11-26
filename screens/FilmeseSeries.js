import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, FAB, IconButton, Text } from 'react-native-paper';

const FilmeseSeries = ({ navigation }) => {
  const [filmesSeries, setFilmesSeries] = useState([]);
  const [idExcluir, setIdExcluir] = useState(0);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('movies').then(resultado => {
      resultado = JSON.parse(resultado) || [];
      setFilmesSeries(resultado);
    });
  }

  function excluir(index) {
    const updatedFilmesSeries = [...filmesSeries];
    updatedFilmesSeries.splice(index, 1);
    AsyncStorage.setItem('movies', JSON.stringify(updatedFilmesSeries)).then(() => {
      carregarDados();
      setVisible(false);
    });
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {filmesSeries.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>Não há filmes ou séries registrados</Text>
        ) : (
          filmesSeries.map((item, i) => (
            <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
              <Card.Content>
                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }} variant="titleLarge">Nome: {item.name}</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Descrição: <Text>{item.description}</Text></Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Tipo: <Text>{item.type}</Text></Text>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon='pencil-outline'
                  onPress={() => navigation.push('Cadstro-Filme/Serie', { id: i, filmeSerie: item })}
                  iconColor='black'
                />
                <IconButton
                  icon='trash-can-outline'
                  onPress={() => excluir(i)}
                  style={{ backgroundColor: '#FF512C' }}
                  iconColor='black'
                />
              </Card.Actions>
            </Card>
          ))
        )}

      </ScrollView>

      <FAB
        icon="plus"
        size='small'
        style={{ position: 'absolute', right: 10, bottom: 10 }}
        onPress={() => navigation.push('Cadstro-Filme/Serie')}
      />
    </>
  );
};

export default FilmeseSeries