import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'; 

const userSchema = yup.object().shape({
  nome: yup.string().required('Campo obrigatório'),
  email: yup.string().email('Email inválido').required('Campo obrigatório'),
  senha: yup.string().min(6, 'A senha deve ter no mínimo 6 caracteres').required('Campo obrigatório'),
});

const CadUser = ({ navigation, route }) => {
  let usuario = {
    nome: '',
    email: '',
    senha: '',
  };

  const id = route.params?.id;
  if (id >= 0) {
    usuario = route.params?.usuario;
  }

  function salvar(dados) {
    AsyncStorage.getItem('usuarios').then(resultado => {
      const usuarios = JSON.parse(resultado) || [];

      if (id >= 0) {
        usuarios.splice(id, 1, dados);
      } else {
        usuarios.push(dados);
      }

      AsyncStorage.setItem('usuarios', JSON.stringify(usuarios));
      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Informações do Usuário</Text>

      <Formik
        initialValues={usuario}
        validationSchema={userSchema}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome'
              value={values.nome}
              onChangeText={handleChange('nome')}
            />
            {(errors.nome && touched.nome) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.nome}</Text>
            )}

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Email'
              value={values.email}
              onChangeText={handleChange('email')}
            />
            {(errors.email && touched.email) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.email}</Text>
            )}

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Senha'
              value={values.senha}
              onChangeText={handleChange('senha')}
              secureTextEntry
            />
            {(errors.senha && touched.senha) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.senha}</Text>
            )}

            <Button style={{ marginTop: '5%' }} mode='contained' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CadUser;