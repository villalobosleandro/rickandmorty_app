// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
//
// import { Home } from './../screens/home';
// import { LoginScreen } from './../screens/login';
// import { SingUp } from './../screens/singUp';
// import { CharacterDetail } from './../screens/characterDetail'
//
// const { Navigator, Screen } = createStackNavigator();
//
// const HomeNavigator = () => (
//     <Navigator headerMode='none'>
//         <Screen name='Login' component={LoginScreen} />
//         <Screen name='Home' component={Home} />
//         <Screen name='SingUp' component={SingUp} />
//         <Screen name='Detail' component={CharacterDetail} />
//
//
//     </Navigator>
// );
//
//
// export const AppNavigator = () => (
//     <NavigationContainer>
//         <HomeNavigator/>
//     </NavigationContainer>
// );

import React from 'react';

import { AuthProvider } from './../context/authProvider';
import { Routes } from './routes';

const Providers = () => {
    return (
        <AuthProvider>
            <Routes />
        </AuthProvider>
    );
}

export default Providers;

