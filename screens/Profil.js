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
  AsyncStorage
} from "react-native"

export default class Profil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      utilisateur: null,
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
    infosUser()
  }


  

  
  render() {
    const { utilisateur } = this.state
    if (utilisateur === null) {
      return null
    }

    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View style={styles.container}>
          <TextInput
            value={this.state.utilisateur.email}
            keyboardType="email-address"
            onChangeText=""
            placeholder={"email..."}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value=""
            onChangeText=""
            placeholder={"Nouveau mot de passe..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value=""
            onChangeText=""
            placeholder={"Confirmez mot de passe..."}
            secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.utilisateur.firstName}
            onChangeText=""
            placeholder={"Prénom..."}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.utilisateur.lastName}
            onChangeText=""
            placeholder={"Nom..."}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TextInput
            value={this.state.utilisateur.phone}
            onChangeText=""
            placeholder={"Numéro de mobile..."}
            // secureTextEntry={true}
            placeholderTextColor="gray"
            style={styles.input}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Historique")}
            // onPress={this.onLogin.bind(this)}
          >
            <Text style={styles.buttonText}> Enregistrer les modifs </Text>
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
    marginVertical: 10,
    textAlign: "center",
    marginVertical: 10,
    borderRadius: 5
  }
})
