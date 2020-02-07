import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  TouchableOpacity
} from "react-native"
import React, { Component } from "react"

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>PAGE PRINCIPALE</Text>
        <Text></Text>
        <Text>Historique des promos</Text>
        <Text> et </Text>
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
