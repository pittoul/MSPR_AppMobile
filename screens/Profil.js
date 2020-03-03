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
let mockUser = {"firstName":"admin","lastName":"admin","email":"admin@admin.fr","phone":"0101010101","hasAgreed":true,"discounts":["\/api\/discounts\/201","\/api\/discounts\/204","\/api\/discounts\/206"],"apiRoles":["\/api\/api_roles\/3"]}


export default class Profil extends Component {
  constructor(props) {
    super(props)
    this.state = {
      utilisateur: null
    }
  }

  componentDidMount() {
  //   let infosUser = async () => {
  //     try {
  //       const value = await AsyncStorage.getItem("gadjio")
  //       if (value !== null) {
  //         // console.log("\nEmail du user loggué:")
  //         // console.log(JSON.parse(value).email)
  //         this.setState({
  //           utilisateur: JSON.parse(value)
  //         })
  //       }
  //     } catch (error) {
  //       console.log("Error retrieving data")
  //     }
  //   }
  //   infosUser()
  }

  render() {

    return (
      // <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
        <ScrollView style={{ flex: 1, backgroundColor: "white" }} >
          <View style={styles.container}>
            <TextInput
            // mettre la value dans le place holder !!! Sinon c'est non modifiable !
              value=""
              keyboardType="email-address"
              onChangeText=""
              placeholder={mockUser.email}
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
              value=""
              onChangeText=""
              placeholder={mockUser.firstName}
              // secureTextEntry={true}
              placeholderTextColor="gray"
              style={styles.input}
            />
            <TextInput
              value=""
              onChangeText=""
              placeholder={mockUser.lastName}
              // secureTextEntry={true}
              placeholderTextColor="gray"
              style={styles.input}
            />
            <TextInput
              value=""
              onChangeText=""
              placeholder={mockUser.phone}
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
    // width: 200,
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
