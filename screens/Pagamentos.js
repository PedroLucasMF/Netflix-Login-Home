import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { Alert } from 'react-native-web';

const Pagamentos = ({navigation}) => {
    const [savedCard, setSavedCard] = useState(null);

    useEffect(() => {
        const fetchSavedCard = async () => {
            try {
                const paymentData = await AsyncStorage.getItem('paymentData');
                if (paymentData !== null) {
                    const parsedPaymentData = JSON.parse(paymentData);
                    setSavedCard(parsedPaymentData);
                }
            } catch (error) {
                console.error('Erro ao recuperar dados do cartão:', error);
            }
        };



        fetchSavedCard();
    }, []);

    const deleteCard = async () => {
        try {
            await AsyncStorage.removeItem('paymentData');
            setSavedCard(null);
            Alert.alert('Sucesso', 'Cartão removido com sucesso');
        } catch (error) {
            console.error('Erro ao deletar cartão:', error);
            Alert.alert('Erro', 'Ocorreu um erro ao deletar o cartão');
        }
    };

    const addNewCard = () => {

        Alert.alert('Adicionar Novo Cartão', 'Funcionalidade de adição de novo cartão ainda não implementada');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Detalhes do Cartão</Text>
            {savedCard ? (
                <View style={styles.cardInfo}>
                    <Text>Operadora: {savedCard.selectedOperator}</Text>
                    <Text>Número do Cartão: **** **** **** {savedCard.cardNumber.slice(-4)}</Text>

                    <Button
                        icon="pencil-outline"
                        onPress={() => navigation.push("Cadastro-Pag", { savedCard })}
                    >
                        Editar
                    </Button>
                    <Button icon="trash-can-outline" onPress={deleteCard}>
                        Deletar
                    </Button>
                </View>

            ) : (
                <Text>Nenhum cartão salvo</Text>
            )}

            <Button onPress={() => navigation.push("Cadastro-Pag")}>Adicionar Cartão</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    cardInfo: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 15,
        height: 150
    },
});

export default Pagamentos;