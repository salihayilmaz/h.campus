import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, StatusBar,
         TextInput,TouchableOpacity,
         KeyboardAvoidingView } from 'react-native';

export default class RewardSystem extends React.Component {
  render() {
    return (
      <View style={styles.RewardSystem}>
          <Text style={styles.header}>Rewards</Text>

           {/* Checkbox will be added */}
          <Text> <Image style={styles.image} source={require("../images/one.png")} />
            <Text>  YY Kapalı Yüzme Havuzu 1 Hafta Ücretsiz </Text>
          </Text>
          <Text> <Image style={styles.image} source={require("../images/two.png")} />
            <Text>  TT Spor Salonunda İlk Ay %50 İndirim </Text>
          </Text>
          <Text> <Image style={styles.image} source={require("../images/three.png")} />
            <Text>  10-17 Nisan arası XX AKM Biletleri Ücretsiz </Text>
          </Text>
          

          <TouchableOpacity style={styles.button}>
              <Text style={styles.btntext}> SEÇ </Text>
          </TouchableOpacity>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  RewardSystem: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f0f0f0',
    paddingLeft: 40,
    paddingRight: 60,
  },
  header: {
    fontSize: 22,
    color: '#5f9ea0',
    paddingBottom: 10,
    marginBottom: 50,
    borderBottomColor: '#199187',
    borderBottomWidth: 1,
    textAlign: 'center',
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
  },
  image: {
    width: 18,
    height: 18,
  }
});