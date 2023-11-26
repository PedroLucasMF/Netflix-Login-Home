import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import {  Card, FAB, IconButton, Text } from 'react-native-paper';

const User = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [idExcluir, setIdExcluir] = useState(0);
  const [visible, setVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      carregarDados();
    }, [])
  );

  function carregarDados() {
    AsyncStorage.getItem('usuarios').then(resultado => {
      resultado = JSON.parse(resultado) || [];
      setUsuarios(resultado);
    });
  }


  function excluir() {
    usuarios.splice(idExcluir, 1);
    AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
    carregarDados();
    setVisible(false);
  }

  return (
    <>
      <ScrollView style={{ padding: 15 }}>
        {usuarios.length === 0 ? (
          <Text style={{ textAlign: 'center', marginTop: '50%', fontSize: 20 }}>Não há usuários cadastrados</Text>
        ) : (
          usuarios.map((item, i) => (
            <Card key={i} mode='outlined' style={{ marginBottom: 10 }}>
              <Card.Content>
                <Text style={{ marginBottom: '2%', fontWeight: 'bold' }} variant="titleLarge">{item.nome}</Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Email: <Text>{item.email}</Text></Text>
                <Text variant="bodyMedium" style={{ fontWeight: 'bold' }}>Senha: <Text>{item.senha}</Text></Text>
              </Card.Content>
              <Card.Actions>
                <IconButton
                  icon='pencil-outline'
                  onPress={() => navigation.push('Cadastro-User', { id: i, usuario: item })}
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
        onPress={() => navigation.push('Cadastro-User')}
      />
    </>
  );
};

export default User;