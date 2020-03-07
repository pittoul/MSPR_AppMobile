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
  AsyncStorage,
  StatusBarPropsIOS,
  StatusBarIOS,
  StatusBar,
  Image
} from "react-native"
import ValidationComponent from "react-native-form-validator"
import logo from "../assets/logo.png"

export default class PageConnexion extends ValidationComponent {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    }
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>

          <Text style={styles.titre1}>Connexion : </Text>
          <Text style={styles.errorMessage}>{this.state.error}</Text>
          <TextInput
            value={this.state.username}
            keyboardType="email-address"
            onChangeText={username => this.setState({ username })}
            placeholder="email..."
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
              var myHeaders = new Headers()
              myHeaders.append("Content-Type", "application/json")
              var raw = JSON.stringify({
                username: this.state.username,
                password: this.state.password
              })

              var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
              }

              fetch(
                "http://qr-code-app-v2.herokuapp.com/api/login_check",
                requestOptions
              )
                .then(response => response.json())
                .then(result => {
                  console.log(result)
                  if (result.token) {
                    console.log("Code 200 ! C'est bon ça !!!")
                    let _storeToken = async () => {
                      try {
                        await AsyncStorage.setItem(
                          "token",
                          JSON.stringify(result.token)
                        )
                      } catch (error) {}
                    }
                    // pour lancer la sauvegarde du token:
                    _storeToken()

                    let _storeLogin = async () => {
                      try {
                        await AsyncStorage.setItem(
                          "login",
                          JSON.stringify(this.state.username)
                        )
                      } catch (error) {}
                    }
                    _storeLogin()
                    // Redirection:
                    console.log("RESULT :", result)
                    if (result.token || result.token !== undefined)
                      this.props.navigation.navigate("Historique")
                    else
                      this.setState({
                        error: "Adresse mail ou mot de passe incorrect."
                      })
                  } else {
                    this.setState({
                      error: "Quelque chose s'est mal passé..."
                    })
                    console.log("Pas de code 200, ça ne va pas !!!!")
                  }
                })
                .catch(error => {
                  console.log(error)
                  this.props.navigation.navigate("Home")
                })
            }}
          >
            <Text style={styles.buttonText}> Valider </Text>
          </TouchableOpacity>
          <Image style={{ width: 200, height: 200 }} source={logo} />

        </View>
      </ScrollView>
    )
  }
}

const couleurs = {
  fond1: "rgb(100, 0, 0)",
  fond2: "rgb(145, 100, 0)",
  fond3: "rgb(134, 200, 100)"
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titre1: {
    fontWeight: "100",
    fontSize: 32,
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
    fontWeight: "100",
    alignItems: "center",
    justifyContent: "center"
  },
  input: {
    fontWeight: "100",
    width: 200,
    height: 44,
    borderWidth: 1,
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: couleurs.fond3
  },
  errorMessage: {
    color: "#db1702"
  }
})
