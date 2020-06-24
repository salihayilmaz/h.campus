import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar,
         TextInput, SafeAreaView, Keyboard, TouchableOpacity,
         KeyboardAvoidingView } from 'react-native'

export default class LogOut extends Component {
  //logout -> splash screen -> loginpage
  render() {
    return (
      <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content"/>
          <KeyboardAvoidingView behaviour='padding' style={styles.container}>
            <TouchableWithoutFeedback style={styles.container} onPress={Keyboard.dismiss}>
            <View style={styles.logoContainer}>
              <View style={styles.logoContainer}>
                <Image style={styles.logo}
                  source={require('../images/healthy_.png')}>
                </Image>
                <Text style={styles.title}>Healthy Campus</Text>
              </View>
              <View style={styles.infoContainer}>
                <TextInput style={styles.input}
                    placeholder="Phone number or email"
                    placeholderTextColor="black"
                    keyboardType='email-address'
                    returnKeyType='next'
                    autoCorrect={false}
                    onSubmitEditing={()=> this.refs.txtPassword.focus()}
                />
                <TextInput style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="black"
                    returnKeyType='go'
                    secureTextEntry
                    autoCorrect={false}
                    ref={"txtPassword"}
                />
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text style={styles.buttonText}> LOGIN </Text>
                </TouchableOpacity>
                
                <View style={styles.signupTextContent}>
                    <Text>Don't have an account yet?  </Text>
                    <Text style={styles.signupButton}>Sign Up</Text>
                </View>

              </View>
             </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
      </SafeAreaView>
      )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'rgba(240, 240, 240, 0.2)',
    flexDirection: 'column',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logo: {
    width: 570,
    height: 570,
    alignItems: 'center'
  },
  title: {
    color: 'rgba(170, 0, 0, 0.0)',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 25,
    opacity: 0.9
  },
  infoContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    padding: 20,
    marginBottom: 255,
    // backgroundColor: 'lightgray'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(180, 180, 180, 0.1)',
    color: 'black',
    marginBottom: 20,
    paddingHorizontal: 10
  },
  buttonContainer: {
    backgroundColor: 'rgba(88, 121, 155, 0.4)',
    paddingVertical: 10
  },
  buttonText: {
    textAlign: 'center',
    color: 'rgb(32, 53, 70)',
    fontWeight: 'bold',
    fontSize: 12
  },
  signupTextContent: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 9,
    flexDirection: "row"
  },
  signupButton: {
    color: 'rgb(179, 0, 0)',
    fontSize: 14,
    fontWeight: '500'
  }
})
