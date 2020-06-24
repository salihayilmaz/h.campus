import React, { Component } from 'react'
import {StyleSheet, Text, View, SafeAreaView, Image, ScrollView} from 'react-native';


export default class Profile extends React.Component {
  render() {
    return(
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.titleBar}>
          </View>

          <View style={{alignSelf: "center"}}>
            <View style={styles.profileImage}>
                <Image source={require("../images/profilepicture.png")} style={styles.image} resizeMode="center"></Image>
            </View>
            <View style={styles.active}></View>
            </View>

            <View style={styles.infoContainer}>
                <Text style={[styles.text, {color: "black", fontWeight: "200", fontSize: 14}]}>Saliha Yılmaz</Text>
                <Text style={[styles.text, {color: "black", fontSize: 12}]}>Kilo: 52 kg</Text>
            </View>
            <View style={styles.challangeContainer}>
                <Image source={require("../images/challange.png")} style={styles.challangeimage} resizeMode="contain"></Image>
                <Text style={[styles.challangetext, {color: "black", fontSize: 14}]}> ARKADAŞLARINA MEYDAN OKU!</Text>
            </View>
            <View style={styles.friendsContainer}>
                <Image source={require("../images/user.png")} style={styles.friendsimage} resizeMode="contain"></Image>
                <Text style={[styles.friendstext, {color: "black", fontSize: 12}]}>Saliha Yılamaz</Text>

            </View>

        </ScrollView>
      </SafeAreaView>
    )
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0"
  },
  text: {
    fontFamily: "HelveticaNeue",
    color: "#52575D"
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    marginHorizontal: 16
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 100
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined
  },
  active: {
    backgroundColor: "#34FF89",
    position: "absolute",
    bottom: 25,
    left: 2,
    padding: 4,
    height: 15,
    width: 15,
    borderRadius: 10
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16
  },
  challangeContainer: {
    flex: 1,
    backgroundColor: "#EFEFEF"

  },
  challangeimage: {
    flex: 1,
    width: 60,
    height: 50,
    left: 70,
    marginTop: 20
  },
  challangetext: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    marginTop: -32,
    left: 130
  },
  friendsContainer: {
    width: 60,
    height: 50,
    marginTop: 25

  },
  friendsimage: {
    width: 40,
    height: 40,
    left: 30,

  },
  friendstext: {
    fontFamily: "HelveticaNeue",
    color: "#52575D",
    marginTop: -25,
    left: 85
  }
});
