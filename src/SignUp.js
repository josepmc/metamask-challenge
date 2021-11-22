import React, {useState} from 'react';
import {Button, View, StyleSheet, Text, TextInput} from 'react-native';

const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = () => {
    if (email.length === 0) {
      setEmailError('You need to enter your email');
      return false;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const validatedEmail = reg.test(email);
    setEmailError(validatedEmail ? '' : 'Email is not correct');
    return validatedEmail;
  };

  const validatePassword = () => {
    if (password.length === 0) {
      setPasswordError('You need to enter your password');
      return false;
    }
    if (password.length < 12) {
      setPasswordError(
        'You need to enter your password with more than 11 characters',
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const onPressNext = () => {
    const validatedEmail = validateEmail();
    const validatedPassword = validatePassword();
    if (validatedEmail && validatedPassword) {
      navigation.navigate('Home', {email});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.sectionTitle}>{'Enter an email'}</Text>
          <TextInput
            style={styles.textInput}
            value={email}
            autoCompleteType="email"
            placeholder={'Email'}
            onChangeText={setEmail}
            testID={'email'}
          />
          <Text style={styles.validationErrorText} testID={'emailValidation'}>
            {emailError}
          </Text>
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.sectionTitle}>{'Enter your password'}</Text>
          <TextInput
            style={styles.textInput}
            value={password}
            autoCompleteType="password"
            placeholder={'Password'}
            onChangeText={setPassword}
            secureTextEntry
            testID={'password'}
          />
          <Text
            style={styles.validationErrorText}
            testID={'passwordValidation'}>
            {passwordError}
          </Text>
        </View>
        <Button onPress={onPressNext} title="Next" testID={'next'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  sectionTitle: {
    fontSize: 16,
    alignItems: 'flex-start',
  },
  validationErrorText: {
    fontSize: 16,
    alignItems: 'flex-start',
    color: 'red',
  },
  textInput: {
    fontSize: 16,
    backgroundColor: 'white',
    width: '100%',
    marginVertical: 4,
    padding: 8,
    borderRadius: 4,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  inputContainer: {
    width: '100%',
    marginVertical: 20,
  },
  inputWrapper: {
    marginVertical: 10,
  },
});

export default SignUp;
