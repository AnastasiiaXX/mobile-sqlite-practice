import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Link, Stack } from 'expo-router';

export default function NotFoundScreen() {
  return (
    <Stack>
      <Stack.Screen options={{ title: 'Something went wrong' }} />
      <View style={styles.container}>
        <Link href="/" style={styles.button}>
          Page not found. Please, return to home page.
        </Link>
      </View>
    </Stack>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    fontSize: 20,
    textDecorationLine: 'underline',
    color: '#fff',
  },
});