import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Principal from './Principal'
import Login from './Login'
import Filme from './Filme'
import UserCadastro from './UserCadastro'
import Users from './Users'
import PagamentoAdd from './PagamentoAdd'
import Pagamentos from './Pagamentos'


const Stack = createNativeStackNavigator()

const FilmesStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Principal" component={Principal}/>
                <Stack.Screen name="Item" component={Filme}/>
                <Stack.Screen name="Cadastro-User" component={UserCadastro}/>
                <Stack.Screen name="Users-feitos" component={Users}/>
                <Stack.Screen name="Cadastro-Pag" component={PagamentoAdd}/>
                <Stack.Screen name="Pagamentos" component={Pagamentos}/>
            </Stack.Navigator>
        </>
    )
}

export default FilmesStack