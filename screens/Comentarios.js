import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, FAB, IconButton, Text } from 'react-native-paper';

const Comentarios = ({ navigation }) => {
  const [comentarios, setComentarios] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('comments').then(resultado => {
      resultado = JSON.parse(resultado) || [];
      setComentarios(resultado);
    });
  }

  function excluir(index) {
    const updatedComentarios = [...comentarios];
    updatedComentarios.splice(index, 1);
    AsyncStorage.setItem('comments', JSON.stringify(updatedComentarios)).then(() => {
      carregarDados();
    });
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {comentarios.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>Não há comentários registrados</Text>
        ) : (
          comentarios.map((item, i) => (
            <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
              <Card.Content>
                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }} variant="titleLarge">Filme: {item.movieName}</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Comentário: <Text>{item.comment}</Text></Text>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon='pencil-outline'
                  onPress={() => navigation.push('Cadastro-Comentarios', { id: i, comentario: item })}
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
        onPress={() => navigation.push('Cadastro-Comentarios')}
      />
    </>
  );
};

export default Comentarios;