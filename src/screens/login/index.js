import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  View,
  Alert,
  TextInput,
  Text,
  TouchableOpacity,
  ToastAndroid, ActivityIndicator
} from 'react-native';

import { ImageOverlay } from './../../shared/image-overlay.component';
import { KeyboardAvoidingView } from './../../shared/3rd-party';
import { AuthContext } from './../../context/authProvider';
import { sha512 } from 'react-native-sha512';

export const LoginScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { login } = useContext(AuthContext);

  const onSignInButtonPress = async () => {
    setLoading(true);
    const pass = await sha512(password);
    const response = await login(email, pass);

    if(response !== undefined) {
      setLoading(false);
      ToastAndroid.showWithGravityAndOffset(
          `Error! ${response}`,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50
      );
    }
  };

  const onSignUpButtonPress = () => {
    navigation && navigation.navigate('Signup');
  };

  const validateEmail = text => {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(text);
  };

  const checkTextInputIsEmptyOrNot = () => {
    if (password === '' || email === '') {
      Alert.alert('Error!', 'Please fill in all the fields');
    } else {
      if (!validateEmail(email)) {
        Alert.alert('Error!!!', 'Invalid Email');
      } else {
        onSignInButtonPress();
      }
    }
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
      <ImageOverlay style={styles.container} source={Constant.images.loginBackground}>
        <View style={styles.headerContainer}>
          <Text style={{color: Constant.colors.whiteColor, fontSize: 38, fontWeight: 'bold'}}>
            Hello
          </Text>
          <Text style={styles.signInLabel}>Sign in to your account</Text>
        </View>
        <View style={styles.formContainer}>
          <TextInput
            placeholder="Email"
            style={styles.passwordInput}
            value={email}
            onChangeText={setEmail}
            placeholderTextColor={Constant.colors.whiteColor}
          />
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            secureTextEntry={!passwordVisible}
            onChangeText={setPassword}
            placeholderTextColor={Constant.colors.whiteColor}
          />
        </View>
        <TouchableOpacity
          style={styles.signInButton}
          onPress={checkTextInputIsEmptyOrNot}>
          <Text style={{color: Constant.colors.whiteColor, fontSize: 18, fontWeight: 'bold'}}>
            SIGN IN
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onSignUpButtonPress}
          style={styles.signUpButton}>
          <Text style={{color: Constant.colors.whiteColor}}>Don't have an account? Sign Up</Text>
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
    minHeight: 216,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
    color: Constant.colors.whiteColor,
    fontSize: 18,
  },
  passwordInput: {
    marginTop: 16,
    color: Constant.colors.whiteColor,
    fontWeight: 'bold',
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  signInButton: {
    marginHorizontal: 16,
    backgroundColor: '#3463f9',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  socialAuthContainer: {
    marginTop: 32,
  },
  socialAuthButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  socialAuthHintText: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  activityStyles: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Constant.colors.backgroundColorPrimary
  },
});
