import React, { Component } from "react"
import { ScrollView } from "react-native-gesture-handler"
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native"

export default class Profil extends Component {
  state = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: ""
  }

  onLogin() {
    const { email, password } = this.state

    Alert.alert("Credentials", `email: ${email} + password: ${password}`)
  }
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <TextInput
            value={this.state.email}
            keyboardType="email-address"
            onChangeText={email => this.setState({ email })}
            placeholder={"email..."}
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
          <TextInput
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            placeholder={"confirmPassword..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder={"firstName..."}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder={"lastName..."}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            placeholder={"Numéro de mobile..."}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.state.password == this.state.confirmPassword) {
                fetch("http://qr-code-app-v2.herokuapp.com/api/users", {
                  method: "POST",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    firstName: this.state.firstname,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    password: this.state.password,
                    phone: this.state.phone,
                    hasAgreed: true
                  })
                })
                  .then(response => response.json())
                  .then(json => {
                    console.log(json)
                    // if (json.authentication == "success") {
                    //   this.props.navigation.navigate("Historique")
                    // } else {
                    //   this.props.navigation.navigate("Home")
                    // }
                  })
              }
            }}
            // onPress={() => this.props.navigation.navigate("Historique")}
            // onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.buttonText}> Valider </Text>
          </TouchableOpacity>
          <Button
            style={styles.buttonPetitText}
            title="Accueil"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Button
            style={styles.buttonPetitText}
            title="Retour"
            onPress={() => this.props.navigation.goBack()}
          />
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
