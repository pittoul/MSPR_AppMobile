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

// MOCK USER:
// let mockUser = {"firstName":"adminMock","lastName":"admin","email":"admin@admin.fr","phone":"0101010101","hasAgreed":true,"discounts":["\/api\/discounts\/201","\/api\/discounts\/204","\/api\/discounts\/206"],"apiRoles":["\/api\/api_roles\/3"]}

export default class Profil extends Component {

  state = {
    token: "",
    login: "",
    user: {firstName: "toto"},
    userName: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: ""
  }
  // leUser = async () => await AsyncStorage.getItem("user")

  componentDidMount() {
    let _user = async () => {
      try {
        const value = await AsyncStorage.getItem("user")
        console.log('ICIIIIII', (JSON.parse(value)))
        this.setState({
          user:(JSON.parse(value))
        })
        console.log('DANS OBJET : ', this.state.user.firstName)
        // if (value !== null) {
        //   console.log("\nUSER FROM ASYNCSTORAGE PROFIL:")
        //   console.log(JSON.parse(value))
        //   this.setState({
        //     user: JSON.parse(JSON.parse(value))
        //   })
        // }
      } catch (error) {
        console.log("Error retrieving le User dans page PROFIL!")
      }
    }
    _user()

  }

  render() {
    // while (this.state.user == null) {
    //   let _infosUser = async () => {
    //     try {
    //       const value = await AsyncStorage.getItem("user")

    //       if (value !== null && value !== undefined) {
    //         console.log("\nUser loggué:")
    //         console.log(JSON.parse(JSON.parse(value)))
    //         this.setState({
    //           user: JSON.parse(JSON.parse(value))
    //         })
    //         console.log(
    //           "dans le state de la page settings: ",
    //           this.state.user.email
    //         )
    //       }
    //     } catch (error) {
    //       console.log("Error retrieving data")
    //     }
    //   }

    //   // Rajouter await pour rendre le système SYNCHRONE !!! (NON, ca marche po)
    //   // _infosUser()
    // }

    return (
      // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          {/* PAS LE MAIL !!!! */}
          {/* <TextInput
            // mettre la value dans le place holder !!! Sinon c'est non modifiable !
            value={this.state.userName}
            keyboardType="email-address"
            onChangeText={username => this.setState({ username })}
            placeholder={this.leUser.lastName}
            placeholderTextColor="gray"
            style={styles.input}
          /> */}
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
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            placeholder={this.state.user.lastName}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            placeholder={this.state.user.phone}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              if (this.state.password != "" && this.state.password == this.state.confirmPassword) {
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
            // onPress={this.onLogin.bind(this)}
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
      /* </KeyboardAvoidingView> */
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
    // width: 200,
    // height: 44,
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
    // height: 44,
    // borderWidth: 0,
    borderBottomWidth: 1,
    borderColor: "green",
    marginVertical: 10,
    textAlign: "center",
    marginVertical: 10
    // borderRadius: 5
  }
})
