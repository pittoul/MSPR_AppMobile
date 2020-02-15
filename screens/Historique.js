import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  AsyncStorage
} from "react-native"

import React, { Component } from "react"

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      utilisateur: null,
      discounts: null
    }
  }

  componentDidMount() {

    let infosUser = async () => {
      try {
        const value = await AsyncStorage.getItem("gadjio")
        if (value !== null) {
          // console.log("\nEmail du user loggué:")
          // console.log(JSON.parse(value).email)
          this.setState({
            utilisateur: JSON.parse(value)
          })
        }
      } catch (error) {
        console.log("Error retrieving data")
      }
    }

    let infosDiscounts = async () => {
      try {
        const value = await AsyncStorage.getItem("discounts")
        if (value !== null) {
          // console.log("\nDiscounts du user loggué:")
          // console.log(JSON.parse(value).email)
          this.setState({
            discounts: JSON.parse(value)
          })
        }
      } catch (error) {
        console.log("Error retrieving data")
      }
    }

    // Initialisation des variables 'this.state : user et discounts'
    infosUser()
    infosDiscounts()
  }

  render() {
    const { utilisateur } = this.state
    if (utilisateur === null) {
      return null
    }
    const { discounts } = this.state
    if (discounts == null) {
      return null
    }

    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>PAGE PRINCIPALE</Text>
        <Text></Text>
        <Text> INFOS USER EN LOCAL STORAGE: </Text>
        <Text></Text>
        <Text>{this.state.utilisateur.email}</Text>
        <Text>
          Prénom: {this.state.utilisateur.firstName} / Nom:{" "}
          {this.state.utilisateur.lastName}
        </Text>
        <Text>tél: {this.state.utilisateur.phone}</Text>
        <Text>Discounts : {typeof this.state.discounts}</Text>
        <Text>ici</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("ScanIt")}
        >
          <Text style={styles.buttonText}> Scanner QR Code </Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Profil")}
        >
          <Text style={styles.buttonText}>Settings</Text>
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.props.navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Déconnexion</Text>
        </TouchableOpacity>
        <Text></Text>
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
  titleText: {
    alignItems: "center",
    justifyContent: "center"
  },
  button: {
    alignItems: "center",
    backgroundColor: "powderblue",
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 10
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    borderWidth: 1,
    borderColor: "green",
    marginVertical: 10
  }
})
