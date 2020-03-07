import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from "react-native"
import { StackNavigator } from "react-navigation"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import coca from "../assets/coca.jpg"
import logo from "../assets/logo.png"

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={{ width: 150, height: 150 }} source={logo} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("PageConnexion")}
        >
          <Text style={styles.buttonText}>Se Connecter</Text>
        </TouchableOpacity>
        <Text>ou</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("PageInscription")}
        >
          <Text style={styles.buttonText}>Créer un compte</Text>
        </TouchableOpacity>
        <Text></Text>

        <TouchableOpacity
          style={styles.buttonPetit}
          title="Informations Légales"
          onPress={() => this.props.navigation.navigate("InfosLegales")}
        >
          <Text style={styles.buttonPetitText}>Informations Légales</Text>
        </TouchableOpacity>
        <Text></Text>

        {/* <Text>Bouton provisoire:</Text>
        <TouchableOpacity
          style={styles.buttonPetit}
          title="Informations Légales"
          onPress={() => this.props.navigation.navigate("Historique")}
        >
          <Text style={styles.buttonPetitText}>-Historique des promos-</Text>
        </TouchableOpacity>
        <Text></Text> */}

        <Image style={{ width: 150, height: 150 }} source={logo} />
        {/* <Image
          style={{ width: 220, height: 75 }}
          source={require("../assets/williamS.png")}
        /> */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#acf",
    alignItems: "center",
    justifyContent: "center"
  },
  grosTexte: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    backgroundColor: "#acbf",
    padding: 10,
    borderRadius: 5,
    borderTopRightRadius: 12
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  },
  buttonPetitText: {
    fontSize: 10,
    color: "#bfcf"
    // marginBottom:10,
    // paddingBottom: 5
  },
  buttonPetit: {
    backgroundColor: "#acbf",
    padding: 10,
    borderRadius: 5
  }
})
