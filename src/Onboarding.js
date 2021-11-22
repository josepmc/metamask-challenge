import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';

const Onboarding = ({navigation}) => {
  const onSignUp = () => navigation.navigate('SignUp');

  return (
    <View style={styles.container} testID={'onboarding-screen'}>
      <Text style={styles.title} testID={'metamask-demo'}>
        {'MetaMask Demo'}
      </Text>
      <Button onPress={onSignUp} title="Sign Up" testID={'signup'} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Onboarding;
