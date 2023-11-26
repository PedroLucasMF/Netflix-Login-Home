import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';

const movieSchema = yup.object().shape({
  movieName: yup.string().required('Campo obrigatório'),
  comment: yup.string().required('Campo obrigatório'),
});

const CadCom = ({ navigation, route }) => {
  let comment = {
    movieName: '',
    comment: '',
  };

  const { id, comment: commentParams } = route.params ?? { id: -1, comment: null };
  if (id >= 0 && commentParams) {
    comment = commentParams;
  }

  function salvar(dados) {
    AsyncStorage.getItem('comments').then(resultado => {
      const comments = JSON.parse(resultado) || [];

      if (id >= 0) {
        comments.splice(id, 1, dados);
      } else {
        comments.push(dados);
      }

      AsyncStorage.setItem('comments', JSON.stringify(comments));
      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Comentar Filme</Text>

      <Formik
        initialValues={comment}
        validationSchema={movieSchema}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Nome do Filme'
              value={values.movieName}
              onChangeText={handleChange('movieName')}
            />
            {(errors.movieName && touched.movieName) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.movieName}</Text>
            )}

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Comentário'
              multiline
              numberOfLines={4}
              value={values.comment}
              onChangeText={handleChange('comment')}
            />
            {(errors.comment && touched.comment) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.comment}</Text>
            )}

            <Button style={{ marginTop: '5%' }} mode='contained' onPress={handleSubmit}>
              Salvar Comentário
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CadCom;