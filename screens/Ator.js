import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import { Button, Card, FAB, IconButton, Text } from 'react-native-paper';

const defaultImage = require('../imagem/treco.jpg'); // Substitua pelo caminho da imagem padrão

const Ator = ({ navigation }) => {
  const [atores, setAtores] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('actors').then(resultado => {
      resultado = JSON.parse(resultado) || [];
      setAtores(resultado);
    });
  }

  function excluir(index) {
    const updatedAtores = [...atores];
    updatedAtores.splice(index, 1);
    AsyncStorage.setItem('actors', JSON.stringify(updatedAtores)).then(() => {
      carregarDados();
    });
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {atores.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>Não há atores registrados</Text>
        ) : (
          atores.map((ator, i) => (
            <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
              <Card.Content>
                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }} variant="titleLarge">
                  Nome: {ator.name}
                </Text>
                {ator.photoURL ? (
                  <Image source={{ uri: ator.photoURL }} style={{ width: 100, height: 100, marginBottom: 10 }} />
                ) : (
                  <Image source={defaultImage} style={{ width: 100, height: 100, marginBottom: 10 }} />
                )}
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon='pencil-outline'
                  onPress={() => navigation.push('Cadastro-Ator', { id: i, ator })}
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
        onPress={() => navigation.push('Cadastro-Ator')}
      />
    </>
  );
};

export default Ator;