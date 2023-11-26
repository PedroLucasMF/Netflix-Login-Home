import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Principal from './Principal'
import Login from './Login'
import Filme from './Filme'
import CadUser from './CadUser'
import User from './User'
import CadPag from './CadPag'
import Pags from './Pags'
import CadFS from './CadFS'
import FilmeseSeries from './FilmeseSeries'
import CadAtor from './CadAtor'
import Ator from './Ator'
import CadCom from './CadCom'
import Comentarios from './Comentarios'



const Stack = createNativeStackNavigator()

const FilmesStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Principal" component={Principal}/>
                <Stack.Screen name="Item" component={Filme}/>
                <Stack.Screen name="Cadastro-User" component={CadUser}/>
                <Stack.Screen name="Users" component={User}/>
                <Stack.Screen name="Cadastro-Pag" component={CadPag}/>
                <Stack.Screen name="Cartões" component={Pags}/>
                <Stack.Screen name="Cadstro-Filme/Serie" component={CadFS}/>
                <Stack.Screen name="Filme/Serie" component={FilmeseSeries}/>
                <Stack.Screen name="Cadastro-Ator" component={CadAtor}/>
                <Stack.Screen name="Atores" component={Ator}/>
                <Stack.Screen name="Comentarios" component={Comentarios}/>
                <Stack.Screen name="Cadastro-Comentarios" component={CadCom}/>
                
            </Stack.Navigator>
        </>
    )
}

export default FilmesStack