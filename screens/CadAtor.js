import React, { useState } from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup';
import * as ImagePicker from 'expo-image-picker';

const actorSchema = yup.object().shape({
  name: yup.string().required('Campo obrigatório'),
  photoURL: yup.string().nullable(),
});

const CadAtor = ({ navigation, route }) => {
  const [image, setImage] = useState(null);

  let actor = {
    name: '',
    photoURL: null,
  };

  const { id, actor: actorParams } = route.params ?? { id: -1, actor: null };
  if (id >= 0 && actorParams) {
    actor = actorParams;
  }

  function salvar(dados) {
    if (image) {
      dados.photoURL = image;
    }

    AsyncStorage.getItem('actors').then(resultado => {
      const actors = JSON.parse(resultado) || [];

      if (id >= 0) {
        actors.splice(id, 1, dados);
      } else {
        actors.push(dados);
      }

      AsyncStorage.setItem('actors', JSON.stringify(actors));
      navigation.goBack();
    });
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Informações do Ator</Text>

      <Formik
        initialValues={actor}
        validationSchema={actorSchema}
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

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
              {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
              <Button onPress={pickImage}>Selecionar Imagem</Button>
            </View>
            {(errors.photoURL && touched.photoURL) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.photoURL}</Text>
            )}

            <Button style={{ marginTop: '5%' }} mode='contained' onPress={handleSubmit}>
              Salvar
            </Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CadAtor;