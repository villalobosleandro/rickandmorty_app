import React, { useState, useCallback, useContext } from 'react';
import {
    View, Alert, TextInput,
    StyleSheet, ActivityIndicator, TouchableOpacity, Text
} from 'react-native';

import { sha512 } from 'react-native-sha512';
import { ImageOverlay } from './../../shared/image-overlay.component';
import { KeyboardAvoidingView } from './../../shared/3rd-party';
import { AuthContext } from '../../context/authProvider';

export const SingUp = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const { register } = useContext(AuthContext);


    const onSignUpButtonPress = async () => {
        setLoading(true);
        const pass = await sha512(password);
        const data = {
            email,
            firstName,
            lastName,
            password: pass
        };

        const response = await register(data);
        if(response === undefined) {
            setLoading(false);

        }else {
            Alert.alert('Error!!!', 'There is already an account with the email provided');
            setLoading(false);
        }
    };

    const onSignInButtonPress = () => {
        navigation && navigation.navigate('Login');
    };


    if(loading) {
        return(
            <View style={styles.activityStyles}>
                <ActivityIndicator size="large" color={Constant.colors.whiteColor}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView>

                    <ImageOverlay
                        style={styles.container}
                        source={Constant.images.loginBackground}>

                        <View style={styles.formContainer}>
                            <TextInput
                                style={styles.formInput}
                                autoCapitalize='none'
                                placeholder='First Name'
                                value={firstName}
                                onChangeText={setFirstName}
                                placeholderTextColor={Constant.colors.whiteColor}
                            />
                            <TextInput
                                style={styles.formInput}
                                autoCapitalize='none'
                                placeholder='Last Name'
                                value={lastName}
                                onChangeText={setLastName}
                                placeholderTextColor={Constant.colors.whiteColor}
                            />
                            <TextInput
                                style={styles.formInput}
                                autoCapitalize='none'
                                placeholder='Email'
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={Constant.colors.whiteColor}
                            />
                            <TextInput
                                style={styles.formInput}
                                autoCapitalize='none'
                                secureTextEntry={!passwordVisible}
                                placeholder='Password'
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={Constant.colors.whiteColor}
                            />
                        </View>
                        <TouchableOpacity
                            style={styles.signUpButton}
                            onPress={onSignUpButtonPress}
                        >
                            <Text style={{color: Constant.colors.whiteColor, fontSize: 18, fontWeight: 'bold'}}>SIGN UP</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.signInButton}
                            onPress={onSignInButtonPress}
                        >
                            <Text style={{color: Constant.colors.whiteColor}}>Already have an account? Sign In</Text>
                        </TouchableOpacity>
                    </ImageOverlay>


        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: 216,
    },
    profileAvatar: {
        width: 116,
        height: 116,
        borderRadius: 58,
        alignSelf: 'center',
    },
    editAvatarButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    formContainer: {
        flex: 1,
        paddingTop: 32,
        paddingHorizontal: 16,
    },
    formInput: {
        marginTop: 16,
        backgroundColor: 'rgba(255,255,255,0.16)',
        color: Constant.colors.whiteColor,
        fontWeight: 'bold'
    },
    termsCheckBox: {
        marginTop: 24,
    },
    termsCheckBoxText: {
        marginLeft: 10,
    },
    signUpButton: {
        marginHorizontal: 16,
        backgroundColor: '#3463f9',
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },
    signInButton: {
        marginVertical: 12,
        marginHorizontal: 16,
        width: '90%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    activityStyles: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Constant.colors.backgroundColorPrimary
    },
});
