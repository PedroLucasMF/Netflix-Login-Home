import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import { Picker } from '@react-native-picker/picker';

const movieSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  description: yup.string().required('Campo obrigatório'),
  type: yup.string().required('Selecione o tipo'),
});

const CadFS = ({ navigation, route }) => {
  let movie = {
    name: '',
    description: '',
    type: '',
  };

  const { id, movie: movieParams } = route.params ?? { id: -1, movie: null };
  if (id >= 0 && movieParams) {
    movie = movieParams;
  }

  function salvar(dados) {
    AsyncStorage.getItem('movies').then(resultado => {
      const movies = JSON.parse(resultado) || [];

      if (id >= 0) {
        movies.splice(id, 1, dados);
      } else {
        movies.push(dados);
      }

      AsyncStorage.setItem('movies', JSON.stringify(movies));
      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Informações do Filme/Série</Text>

      <Formik
        initialValues={movie}
        validationSchema={movieSchema}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome'
              value={values.name}
              onChangeText={handleChange('name')}
            />
            {(errors.name && touched.name) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.name}</Text>
            )}

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Descrição'
              value={values.description}
              onChangeText={handleChange('description')}
            />
            {(errors.description && touched.description) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.description}</Text>
            )}

            <Text style={{ marginTop: 10 }}>Tipo</Text>
            <Picker
              selectedValue={values.type}
              style={{ height: 50, width: '100%', marginTop: 5 }}
              onValueChange={itemValue => handleChange('type')(itemValue)}
            >
              <Picker.Item label='Selecione o Tipo' value='' />
              <Picker.Item label='Filme' value='filme' />
              <Picker.Item label='Série' value='serie' />
            </Picker>
            {(errors.type && touched.type) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.type}</Text>
            )}

            <Button style={{ marginTop: '5%' }} mode='contained' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CadFS;