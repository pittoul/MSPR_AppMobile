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
  StatusBar
} from "react-native"

export default class PageConnexion extends Component {
  state = {
    username: "",
    password: ""
  }

  onLogin() {
    const { username, password } = this.state
    Alert.alert("Credentials", `username: ${username} + password: ${password}`)
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "rgb(0, 234, 12)" }}>
        <View style={styles.container}>
          <Text>Connexion : </Text>
          <TextInput
            value={this.state.username}
            keyboardType="email-address"
            onChangeText={username => this.setState({ username })}
            placeholder="email..."
            placeholderTextColor="gray"
            style={styles.input}
            // validators={['required', 'isEmail']}
          />
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"password..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
            // validators={['required', 'isString']}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var myHeaders = new Headers()
              myHeaders.append("Content-Type", "application/json")

              var raw = JSON.stringify({
                // username: "admin@admin.fr",
                // password: "admin"
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
                  // console.log(result.token)

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
                  // console.log(this.state.username)
                  _storeLogin()
                  // Redirection:
                  this.props.navigation.navigate("Historique")
                })
                .catch(error => {
                  this.props.navigation.navigate("Home")
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
  fond2: "rgb(145, 100, 0)",
  fond3: "rgb(134, 200, 100)"
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
