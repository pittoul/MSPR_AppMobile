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
  ScrollView
} from "react-native"

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
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <Text>Connexion : </Text>
          <TextInput
            value={this.state.email}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
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
              if (this.state.password == "admin") {
                fetch("http://qr-code-app-v2.herokuapp.com/api/companies/22")
                  .then(response => response.json())
                  .then(json => console.log(json.contact))
              } else {
                alert("stopppppp")
              }
            }}
            // onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.buttonText}> Valider </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 5
  }
})
