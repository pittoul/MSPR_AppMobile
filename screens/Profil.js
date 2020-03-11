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
  constructor(props) {
    super(props)
    this.state = {
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
    this.props.navigation.addListener("didFocus", payload => {
      this.setState({ is_updated: true })
    })
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

    let _token = async () => {
      try {
        const value = await AsyncStorage.getItem("token")
        // console.log(JSON.parse(value))
        this.setState({
          token: value
        })
        // console.log(this.state.user.firstName)
      } catch (error) {
        console.log("Error retrieving TOKEN dans page PROFIL!")
      }
    }
    _token()
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <Text style={styles.titleText}>VOTRE PROFIL</Text>
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
              let user = {}

              if (
                this.state.password != "" &&
                this.state.password == this.state.confirmPassword
              ) {
                this.state.user.password = this.state.password
                console.log("Le user a pour password : ", this.state.password)
              } else if (this.state.password != this.state.confirmPassword) {
                alert("Les mots de passe ne correspondent pas !")
              }

              if (this.state.firstName != "") {
                this.state.user.firstName = this.state.firstName
              }

              if (this.state.lastName != "") {
                this.state.user.lastName = this.state.lastName
              }

              if (this.state.phone != "") {
                this.state.user.phone = this.state.phone
              }

              console.log("Infos user à mettre à jour : ", this.state.user)
              console.log("Le token depuis page profil : ", this.state.token)
              // Fetch updateUser
              var myHeaders = new Headers()
              myHeaders.append("Content-Type", "application/merge-patch+json")
              myHeaders.append(
                "Authorization",
                "Bearer " + JSON.parse(this.state.token)
              )
              // console.log('les HEADERS : ', myHeaders)
              var raw = JSON.stringify(this.state.user)
              // userStorage = async 
              let userStorage = async () => {
                const value = await AsyncStorage.setItem("user", JSON.stringify(this.state.user))
                // console.log("\nvérification que user est null :\n", value)
              }
              userStorage()
              // console.log("\nRAW est de type : ", typeof raw , "\n" )
              var requestOptions = {
                method: "PATCH",
                headers: myHeaders,
                body: raw,
                redirect: "follow"
              }

              fetch(
                "http://qr-code-app-v2.herokuapp.com/api/users/" +
                  JSON.parse(this.state.user.id),
                requestOptions
              )
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log("error", error))
              // Ecran WELCOME pendant 3 secondes
              this.props.navigation.navigate("Historique")
              // } else {
              // }
            }}
          >
            <Text style={styles.buttonText}>Enregistrer les modifs</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Historique")
            }}
          >
            <Text>Retour</Text>
          </TouchableOpacity>

          <Button
            style={styles.buttonText}
            title="Accueil"
            onPress={() => this.props.navigation.navigate("Home")}
          />

          {/*<Button
            style={styles.buttonPetitText}
            title="Retour"
            onPress={() => this.props.navigation.goBack()}
          /> */}
        </View>
      </ScrollView>
    )
  }
}
const couleurs = {
  fond1: "rgb(100, 0, 0)",
  fond2: "rgb(145, 100, 0)",
  fond3: "rgba(134, 200, 100, 0.3)"
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontWeight: "100",
    fontSize: 32,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontWeight: "100",
    fontSize: 20,
    color: "rgb(0, 0, 0)"
  },
  input: {
    fontWeight: "100",
    minWidth: 220,
    height: 44,
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: couleurs.fond3,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderStyle: "solid",
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1.5
  }
})
