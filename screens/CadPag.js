import React from 'react';
import { ScrollView, View } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as yup from 'yup'; 
import { Picker } from '@react-native-picker/picker';

const cardSchema = yup.object().shape({
  cardNumber: yup.string().min(16, 'O número do cartão deve ter 16 caracteres').required('Campo obrigatório'),
  expiryDate: yup.string().matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Formato inválido').required('Campo obrigatório'),
  cvv: yup.string().min(3, 'O CVV deve ter no mínimo 3 caracteres').required('Campo obrigatório'),
  selectedOperator: yup.string().required('Selecione a operadora'),
});

const CadPag = ({ navigation, route }) => {
  let card = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    selectedOperator: '',
  };

  const { id, card: cardParams } = route.params ?? { id: -1, card: null };
  if (id >= 0 && cardParams) {
    card = cardParams;
  }

  function salvar(dados) {
    AsyncStorage.getItem('cartoes').then(resultado => {
      const cartoes = JSON.parse(resultado) || [];

      if (id >= 0) {
        cartoes.splice(id, 1, dados);
      } else {
        cartoes.push(dados);
      }

      AsyncStorage.setItem('cartoes', JSON.stringify(cartoes));
      navigation.goBack();
    });
  }

  return (
    <ScrollView style={{ margin: 15 }}>
      <Text>Informações do Cartão</Text>

      <Formik
        initialValues={card}
        validationSchema={cardSchema}
        onSubmit={values => salvar(values)}
      >
        {({ values, handleChange, handleSubmit, errors, touched }) => (
          <View>
            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Número do Cartão'
              keyboardType='numeric'
              value={values.cardNumber}
              onChangeText={handleChange('cardNumber')}
            />
            {(errors.cardNumber && touched.cardNumber) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.cardNumber}</Text>
            )}

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='Data de Validade (MM/YY)'
              value={values.expiryDate}
              onChangeText={handleChange('expiryDate')}
            />
            {(errors.expiryDate && touched.expiryDate) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.expiryDate}</Text>
            )}

            <TextInput
              style={{ marginTop: 10 }}
              mode='outlined'
              label='CVV'
              keyboardType='numeric'
              value={values.cvv}
              onChangeText={handleChange('cvv')}
            />
            {(errors.cvv && touched.cvv) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.cvv}</Text>
            )}

            <Text style={{ marginTop: 10 }}>Operadora do Cartão</Text>
            <Picker
              selectedValue={values.selectedOperator}
              style={{ height: 50, width: '100%', marginTop: 5 }}
              onValueChange={itemValue => handleChange('selectedOperator')(itemValue)}
            >
              <Picker.Item label='Selecione a Operadora' value='' />
              <Picker.Item label='Nubank' value='nubank' />
              <Picker.Item label='Mastercard' value='mastercard' />
              <Picker.Item label='Elo' value='elo' />
              <Picker.Item label='Santander' value='santander' />
            </Picker>
            {(errors.selectedOperator && touched.selectedOperator) && (
              <Text style={{ color: 'red', marginTop: 5 }}>{errors.selectedOperator}</Text>
            )}

            <Button style={{ marginTop: '5%' }} mode='contained' onPress={handleSubmit}>Salvar</Button>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

export default CadPag;