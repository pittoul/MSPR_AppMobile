import React, { Component } from "react"
import {
  createStackNavigator,
  createAppContainer
} from "react-navigation-stack"
import PageInscription from "./screens/PageInscription"
import PageConnexion from "./screens/PageConnexion"
import Home from "./screens/Home"
// import { createAppContainer } from "react-navigation"
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from "react-native"
import coca from "./assets/coca.jpg"



export default function App() {
  return (
    <View style={styles.container}>
    {/* <AppContainer/> */}
      <Text>- expoApp04 -</Text>
      <Text style={styles.grosTexte}>Offres-Top</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Hello!")}
      >
        <Text style={styles.buttonText}>Se Connecter</Text>
      </TouchableOpacity>
      <Text>Et l'app de vos rêves existe enfin !</Text>
      <Image
        style={{ width: 80, height: 80 }}
        source={coca}
      />
      <Image
        style={{ width: 220, height: 75 }}
        source={require("./assets/williamS.png")}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => alert("Hello, world!")}
      >
        <Text style={styles.buttonText}>Créer un compte</Text>
      </TouchableOpacity>
    </View>
  )
}

// Création de la Stack('pile') de navigation:
// une variable contenant un tableau qui répertorie tous les liens
// chaque élément du tableau est une route (dont le fichier est mentioné dans les imports)
const maListeDeNavigation = createStackNavigator(
  {
    Home: { 
      screen: Home, 
      navigationOptions: { title: "Page Home" } 
    },
    PageConnexion: {
      screen: PageConnexion,
      navigationOptions: { title: "Page Connexion" }
    },
    PageInscription: {
      screen: PageInscription,
      navigationOptions: { title: "Page Inscription" }
    }
  },
  {
    initialRouteName: "Home"
  }
)

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
    padding: 20,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    color: "#fff"
  }
})
