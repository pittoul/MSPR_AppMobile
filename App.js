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
    // NomDuLien: NomDuScreenImporté
    Home: HomeScreen,
    PageConnexion: PageConnexion,
    PageInscription: PageInscription,
    InfosLegales: InfosLegalesScreen,
    Historique: HistoriqueScreen,
    ScanIt: ScanIt,
    Profil: Profil
  },
  {
    initialRouteName: "Home"
  }
)

// L'application devient ces routes...
export default createAppContainer(RootStack)

