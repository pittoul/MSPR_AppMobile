// PageConnexion.js

import React, { Component } from "react"
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  AsyncStorage
} from "react-native"
import * as SecureStore from "expo-secure-store"
export default class PageConnexion extends Component {
  state = {
    email: "",
    password: ""
  }

  onLogin() {
    const { email, password } = this.state

    Alert.alert("Credentials", `email: ${email} + password: ${password}`)
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "rgb(0, 234, 12)" }}>
        <View style={styles.container}>
          <Text>Connexion : </Text>
          <TextInput
            value={this.state.email}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            placeholder="xxxemail..."
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"password..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              fetch("http://qr-code-app-v2.herokuapp.com/authentication", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  email: "admin@admin.fr",
                  password: "admin"
                  // email: this.state.email,
                  // password: this.state.password,
                })
              })
                .then(response => response.json())
                .then(json => {
                  console.log('\nHisorique de discounts: ', json.user.discounts)
                  if (json.user) {
                    AsyncStorage.setItem("discounts", JSON.stringify(json.user.discounts)).then(
                    AsyncStorage.setItem("gadjio", JSON.stringify(json.user)).then(
                      () => {
                        this.props.navigation.navigate("Historique")
                      }
                    )
                )
                  } else {
                    this.props.navigation.navigate("Home")
                  }
                })
            }}
          >

            <Text style={styles.buttonText}> Valider </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

const couleurs = {
  fond1: "rgb(100, 0, 0)",
  fond2: "rgb(0, 100, 0)",
  fond3: "rgb(0, 0, 100)"
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
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: couleurs.fond2
  },
  buttonText: {
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    width: 200,
    height: 44,
    borderWidth: 1,
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: couleurs.fond3
  }
})
