import * as React from "react"
import { Button, View, Text, StyleSheet } from "react-native"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"
import PageInscription from "./screens/PageInscription"
import PageConnexion from "./screens/PageConnexion"
import HomeScreen from "./screens/Home"
import InfosLegalesScreen from "./screens/InfosLegales"
import HistoriqueScreen from "./screens/Historique"
import ScanIt from "./screens/ScanIt"
import Profil from "./screens/Profil"

// Les routes:
const RootStack = createStackNavigator(
  {
    // Modèle :
    // NomDuLien: NomDuScreenImporté
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
        title: "Accueil"
      }
    },
    PageConnexion: {
      screen: PageConnexion,
      navigationOptions: {
        header: null,
        title: "Retour"
      }
    },
    PageInscription: {
      screen: PageInscription,
      navigationOptions: {
        header: null
      }
    },
    InfosLegales: {
      screen: InfosLegalesScreen,
      navigationOptions: { header: null }
    },
    Historique: {
      screen: HistoriqueScreen,
      navigationOptions: {
        // headerLeft: () => {console.log('zbeuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuub')}

        // header: null
      }
    },
    ScanIt: {
      screen: ScanIt,
      navigationOptions: {
        // headerLeft: console.log('zbeuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuub')

        // headerStyle: {backgroundColor:'#3c3c3c'}
      }
    },
    Profil: {
      screen: Profil,
      header: null
    }
  },
  {
    // Page par défaut :
    initialRouteName: "Home"
  }
)

// L'application devient ces routes...
export default createAppContainer(RootStack)
