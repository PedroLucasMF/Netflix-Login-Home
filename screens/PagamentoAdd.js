import React, { useState } from 'react';
import { View, Text, TextInput, Picker, StyleSheet, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const PagamentoAdd = ({ navigation, route }) => {
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [selectedOperator, setSelectedOperator] = useState('');

    const handlePaymentRegistration = async () => {
        if (!cardNumber || !expiryDate || !cvv || !selectedOperator) {
            alert('Erro Por favor, preencha todos os campos');
            return;
        }
        if (cardNumber.replace(/\D/g, '').length !== 16) {
            alert('Erro Número do cartão inválido. Insira um número de 16 dígitos');
            return;
        }

        if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)) {
            alert('Erro Data de validade inválida. Use o formato MM/YY');
            return;
        }

        if (cvv.length !== 3) {
            alert('Erro CVV inválido. Insira um código de 3 dígitos');
            return;
        }



        const paymentData = {
            cardNumber,
            expiryDate,
            cvv,
            selectedOperator,
        };

        try {

            await AsyncStorage.setItem('paymentData', JSON.stringify(paymentData));

            setCardNumber('');
            setExpiryDate('');
            setCVV('');
            setSelectedOperator('');

            alert('Sucesso', 'Dados do pagamento salvos com sucesso');
            navigation.push('Pagamentos');
        } catch (error) {
            alert('Erro', 'Ocorreu um erro ao salvar os dados');
            console.error('Erro ao salvar os dados:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Número do Cartão</Text>
            <TextInput
                style={styles.input}
                placeholder="1234 5678 9012 3456"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={(text) => setCardNumber(text)}
            />

            <Text style={styles.label}>Data de Validade</Text>
            <TextInput
                style={styles.input}
                placeholder="MM/YY"
                keyboardType="numeric"
                value={expiryDate}
                onChangeText={(text) => setExpiryDate(text)}
            />

            <Text style={styles.label}>CVV</Text>
            <TextInput
                style={styles.input}
                placeholder="123"
                keyboardType="numeric"
                value={cvv}
                onChangeText={(text) => setCVV(text)}
            />

            <Text style={styles.label}>Operadora do Cartão</Text>
            <Picker
                selectedValue={selectedOperator}
                style={styles.input}
                onValueChange={(itemValue, itemIndex) => setSelectedOperator(itemValue)}
            >
                <Picker.Item label="Selecione a Operadora" value="" />
                <Picker.Item label="Elo" value="elo" />
                <Picker.Item label="MasterCard" value="mastercard" />
                <Picker.Item label="Nubank" value="nubank" />
                <Picker.Item label="Santander" value="santander" />
            </Picker>

            <Button title="Registrar Pagamento" onPress={handlePaymentRegistration} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 15,
    },
});

export default PagamentoAdd;
