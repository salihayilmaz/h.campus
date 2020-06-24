import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar,
         TextInput, SafeAreaView, Keyboard, TouchableOpacity,
         KeyboardAvoidingView } from 'react-native';

export default class Register extends React.Component {
  render() {
    return (
      <View style={styles.Register}>
          <Text style={styles.header}>Registration</Text>

          <TextInput style={styles.textinput} placeholder ="Full Name"
          underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textinput} placeholder ="Weight"
          underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textinput} placeholder ="Age"
          underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textinput} placeholder ="Phone number"
          underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textinput} placeholder ="Email"
          underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textinput} placeholder ="Password"
          secureTextEntry={true} underlineColorAndroid={'transparent'} />
          <TextInput style={styles.textinput} placeholder ="Again Password"
          secureTextEntry={true} underlineColorAndroid={'transparent'} />
          <TouchableOpacity style={styles.button}>
              <Text style={styles.btntext}> SIGN UP</Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  Register: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingLeft: 60,
    paddingRight: 60,
  },
  header: {
    fontSize: 22,
    color: '#5f9ea0',
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  textinput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 14,
    color: '#000000',
    borderBottomColor: '#a9a9a9',
    borderBottomWidth: 1,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 11,
    backgroundColor: '#8b0000',
    marginTop: 30,
  },
  btntext: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
