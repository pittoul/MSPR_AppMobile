import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage
} from "react-native"
import React, { Component } from "react"


// MOCK USER:
// let mockUser = {"firstName":"admin","lastName":"admin","email":"admin@admin.fr","phone":"0101010101","hasAgreed":true,"discounts":["\/api\/discounts\/201","\/api\/discounts\/204","\/api\/discounts\/206"],"apiRoles":["\/api\/api_roles\/3"]}
// console.log(mockUser.firstName)
// console.log(Object.keys(mockUser));

export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      login: null,
      user: null
      // discounts: null
    }
  }

  /**
   *
   * Recupération des variables du storage dans le 'state' de la page:
   *
   */
  componentDidMount() {
    // Création des variables (qui sont des fonctions !)
    let _infosToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token")
        if (value !== null) {
          console.log("\nToken FROM ASYNCSTORAGE:")
          console.log(JSON.parse(value))
          this.setState({
            token: JSON.parse(value)
          })
        }
      } catch (error) {
        console.log("Error retrieving token")
      }
    }
    // et initialisation de celles ci
    _infosToken()

    let _infoLogin = async () => {
      try {
        const value = await AsyncStorage.getItem("login")
        if (value !== null) {
          console.log("\nLOGIN FROM ASYNCSTORAGE:")
          console.log(JSON.parse(value))
          this.setState({
            login: JSON.parse(value)
          })
          _requeteGetUser()
        }
      } catch (error) {
        console.log("Error retrieving user")
      }
    }
    // Récupération du login
    _infoLogin()

    // DEBUT REQUETE GET USER BY MAIL:
    let _requeteGetUser = () => {
      console.log("avant requete")
      var myHeaders = new Headers()
      myHeaders.append("Accept", "application/json")
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", "Bearer " + this.state.token)
      console.log('Le login est  : ' , this.state.login)
      var raw = JSON.stringify({ username: this.state.login })
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      }

      fetch(
        "http://qr-code-app-v2.herokuapp.com/api/users/find_by_email",
        requestOptions
      )
        .then(response => response.text())
        .then(result => {
          console.log(result)

          let _storeUser = async () => {
            try {
              // await AsyncStorage.setItem("user", JSON.stringify(result))
              await AsyncStorage.setItem("user", result)
            } catch (error) {}
          }
          _storeUser()
          console.log("Le fetch a eu lieu et le user loggué est : " , result.email)
        })
        .catch(error => console.log("error", error))
    }
    _requeteGetUser()

    let _user = async () => {
      try {
        const value = await AsyncStorage.getItem("user")
        if (value !== null) {
          console.log("\nUSER FROM ASYNCSTORAGE:")
          console.log(JSON.parse(value))
          this.setState({
            user: JSON.parse(value)
          })
        }
      } catch (error) {
        console.log("Error retrieving le User dans page PROFIL!")
      }
    }
    _user()

    // this.setState({
    //   user: mockUser
    // })

    // let infosDiscounts = async () => {
    //   try {
    //     const value = await AsyncStorage.getItem("discounts")
    //     if (value !== null) {
    //       // console.log("\nDiscounts du user loggué:")
    //       // console.log(JSON.parse(value).email)
    //       this.setState({
    //         discounts: JSON.parse(value)
    //       })
    //     }
    //   } catch (error) {
    //     console.log("Error retrieving data")
    //   }
    // }

    // Initialisation des variables 'this.state : user et discounts'
    // J'imagine que le _ est pour les variables qui sont des fonctions
    // infosDiscounts()
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "rgb(0, 234, 12)" }}>
        <View style={styles.container}>
          <Text style={styles.titleText}>PAGE PRINCIPALE</Text>
          <Text></Text>
          <Text> INFOS USER EN LOCAL STORAGE: </Text>
          <Text>{this.state.login}</Text>
          <Text>et le token est : </Text>
          <Text>{this.state.token}</Text>
          {/* <Text>{this.state.user}</Text> */}
          {/* <Text>
          Prénom: {this.state.utilisateur.firstName} / Nom:{" "}
          {this.state.utilisateur.lastName}
        </Text>
        <Text>tél: {this.state.utilisateur.phone}</Text>
        <Text>Discounts : {typeof this.state.discounts}</Text> */}
          <Text>ici</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("ScanIt")}
          >
            <Text style={styles.buttonText}> Scanner QR Code </Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate("Profil")}
          >
            <Text style={styles.buttonText}>Voir/Modifier Profil</Text>
          </TouchableOpacity>
          <Text></Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              console.log("ici")
            }}
          >
            <Text style={styles.buttonText}>Déconnexion</Text>
          </TouchableOpacity>
          <Text></Text>
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
    marginVertical: 10
  }
})
