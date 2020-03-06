import React, { Component } from "react"
import { ScrollView } from "react-native-gesture-handler"
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  AsyncStorage,
  KeyboardAvoidingView
} from "react-native"

export default class Profil extends Component {
  state = {
    token: "",
    login: "",
    user: { firstName: "toto" },
    userName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: ""
  }

  componentDidMount() {
    let _user = async () => {
      try {
        const value = await AsyncStorage.getItem("user")
        // console.log(JSON.parse(value))
        this.setState({
          user: JSON.parse(value)
        })
        // console.log(this.state.user.firstName)
      } catch (error) {
        console.log("Error retrieving le User dans page PROFIL!")
      }
    }
    _user()
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <Text>VOTRE PROFIL</Text>
          <TextInput
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
            placeholder={"Nouveau mot de passe..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            placeholder={"Confirmez mot de passe..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            placeholder={this.state.user.firstName}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder={this.state.user.lastName}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            placeholder={this.state.user.phone}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (
                this.state.password != "" &&
                this.state.password == this.state.confirmPassword
              ) {
                let user = {
                  email: this.state.userName,
                  firstName: this.state.firstName,
                  lastName: this.state.lastName,
                  password: this.state.password,
                  phone: this.state.phone,
                  hasAgreed: true
                }
                // Fetch updateUser
                // Ecran WELCOME pendant 3 secondes
                this.props.navigation.navigate("Historique")
              } else {
                alert("Les mots de passe ne correspondent pas !")
              }
            }}
          >
            <Text style={styles.buttonText}> Enregistrer les modifs</Text>
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
    borderBottomWidth: 1,
    borderColor: "green",
    marginVertical: 10,
    textAlign: "center",
    marginVertical: 10
  }
})
