import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Principal from './Principal'
import Login from './Login'


const Stack = createNativeStackNavigator()

const FilmesStack = () => {
    return (
        <>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Principal" component={Principal}/>
            </Stack.Navigator>
        </>
    )
}

export default FilmesStack