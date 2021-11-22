import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const Home = ({route}) => {
  const {email} = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Welcome'}</Text>
      <Text style={styles.title} testID={'userid'}>
        {email}!
      </Text>
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

export default Home;
