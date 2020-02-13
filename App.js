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
// import Constants from 'expo-constants';

//   const styles = StyleSheet.create({
//     statusBar: {
//       backgroundColor: "rgb(0, 200, 123)",
//       height: Constants.statusBarHeight,
//     }
//   });

// const MyComponent = () => {
//   <View>
//     <View style={styles.statusBar} />
//     {/* rest of the content */}
//   </View>
// }


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

// import { ApplicationProvider, Layout, Text } from "@ui-kitten/components"
// import { mapping, light as lightTheme } from "@eva-design/eva"

// const HomeScreen = () => (
//   <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//     <Text category="h1">HOME</Text>
//   </Layout>
// )

// const App = () => (
//   <ApplicationProvider mapping={mapping} theme={lightTheme}>
//     <HomeScreen />
//   </ApplicationProvider>
// )

// export default App
