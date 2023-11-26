import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Button, Card, FAB, IconButton, Text } from 'react-native-paper';

const Pags = ({ navigation }) => {
  const [cartoes, setCartoes] = useState([]);
  const [idExcluir, setIdExcluir] = useState(0);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('cartoes').then(resultado => {
      resultado = JSON.parse(resultado) || [];
      setCartoes(resultado);
    });
  }

  function excluir(index) {
    const updatedCartoes = [...cartoes];
    updatedCartoes.splice(index, 1);
    AsyncStorage.setItem('cartoes', JSON.stringify(updatedCartoes)).then(() => {
      carregarDados();
      setVisible(false);
    });
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {cartoes.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>Não há cartões registrados</Text>
        ) : (
          cartoes.map((item, i) => (
            <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
              <Card.Content>
                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }} variant="titleLarge">Número: {item.cardNumber}</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Operadora: <Text>{item.selectedOperator}</Text></Text>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon='pencil-outline'
                  onPress={() => navigation.push('Cadastro-Pag', { id: i, cartao: item })}
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
        onPress={() => navigation.push('Cadastro-Pag')}
      />
    </>
  );
};

export default Pags;