import React, {createContext, useState} from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);

    const login = async (email, password) => {
        try {
            await auth().signInWithEmailAndPassword(email, password);
        } catch (e) {
            console.log('Errorrrrrrrrrr => ', e);
            return e;
        }
    };

    const register = async (data) => {
        const { email, password, firstName, lastName } = data;

        try {
            await auth().createUserWithEmailAndPassword(email, password)
                .then((response) => {
                    console.log('response => ', response);
                })
                .catch(error => {
                    console.log('error ', error);
                })
        } catch (e) {
            console.log('eeeeeee', e);
            return e
        }
    };

    const logout = async () => {
        try {
            await auth().signOut();
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login,
                register,
                logout
            }}>
            {children}
        </AuthContext.Provider>
    );
};
