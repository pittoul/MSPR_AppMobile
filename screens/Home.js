import React, { Component } from "react"
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native"
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
        <Text style={styles.espacement}></Text>
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
          <Text style={styles.buttonPetitText}>- Informations Légales -</Text>
        </TouchableOpacity>
        <Text></Text>
        <Image style={{ width: 150, height: 150 }} source={logo} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  espacement: {
    paddingTop: 10
  },
  grosTexte: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderStyle: "solid",
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1.5
  },
  buttonText: {
    fontWeight: "100",
    fontSize: 20,
    color: "rgb(0, 0, 0)"
  },
  buttonPetitText: {
    fontWeight: "100",
    fontSize: 10,
    color: "rgb(0, 0, 0)"
  },
  buttonPetit: {
    paddingTop: 30,
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1
  }
})
