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
import { AuthSession } from "expo"
import logo from "../assets/logo.png"

export default class HomeScreen extends Component {

  
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      login: null,
      user: null,
      discounts: [],
      discountsLinks: []
    }
  }

  /**
   *
   * Recupération des variables du storage dans le 'state' de la page:
   *
   */
  componentDidMount() {
    console.log(
      "\n\n\n* * * * * * * * * * * * * * * * * * \n*\n* DANS 'componentDidMount()'\n*\n* * * * * * * * * * * * * * * * * * \n"
    )
    // On vide le User du AsyncStorage :
    // let _viderStorage = async () => {
    //   try {
    //     await AsyncStorage.setItem("user", "")
    //   } catch (error) {}
    // }
    let _getUser = async () => {
      const value = await AsyncStorage.getItem("user")
      console.log("\nvérification que user est null :\n", value)
    }
    // _viderStorage()
    // _getUser()

    // Création des variables (qui sont des fonctions !)
    let _infosToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token")
        if (value !== null) {
          // console.log("\nToken FROM ASYNCSTORAGE:")
          // console.log(JSON.parse(value))
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
          // console.log("\nLOGIN FROM ASYNCSTORAGE:")
          // console.log(JSON.parse(value))
          this.setState({
            login: JSON.parse(value)
          })
          // if (!_getUser()) {
          //   console.log("LE USER EST VIDE DANS LE STORAGE, DONC ON LE GET")
            _requeteGetUser()
          // } else {
          //   console.log("LE USER EXISTE DEJA, QU'EST CE QU'ON FAIT ?")
          //   this.setState({
          //     user: JSON.parse(_getUser())
          //   })
          }
        // }
      } catch (error) {
        console.log("Error retrieving user")
      }
    }
    // Récupération du login
    _infoLogin()

    // DEBUT REQUETE GET USER BY MAIL:
    let _requeteGetUser = async () => {
      let myHeaders = new Headers()
      myHeaders.append("Accept", "application/json")
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", "Bearer " + this.state.token)
      let raw = JSON.stringify({ username: this.state.login })
      let requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      }
      let response = await fetch(
        "http://qr-code-app-v2.herokuapp.com/api/users/find_by_email",
        requestOptions
      )
      let data = await response.text()
      console.log("\nMéthode AWAIT on a le password : ", data)
      this.setState({
        user: JSON.parse(data)
      })

      console.log(
        "\n\nle user from bdd avec son password et qui va aller\ndans le storage sans son mot depasse...\n",
        this.state.user
      )
      delete this.state.user.password // pour qu'il ne soit pas remplacé par son propre hash !!!
      let _storeUser = async () => {
        try {
          await AsyncStorage.setItem("user", JSON.stringify(this.state.user))
        } catch (error) {}
      }

      if (this.state.user) {
        _storeUser()
      }
      // Vérifier que le usr est bien dans le storage
      const value = await AsyncStorage.getItem("user")
      console.log(
        "\nLe user qui revient du AsyncStorage :\n",
        JSON.parse(value)
      )

      myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", "Bearer " + this.state.token)

      var file = ""
      requestOptions = {
        method: "GET",
        headers: myHeaders,
        body: file,
        redirect: "follow"
      }

      // A METTRE DANS UNE FONCTION:
      let fetchDiscount
      let tabDiscounts = this.state.user.discounts
      let discountsLinksProvisoire = []
      console.log("\nles discounts issus du user :\n", tabDiscounts)
      tabDiscounts.forEach(async element => {
        // fetchDiscount()
        fetchDiscount = await fetch(
          "http://qr-code-app-v2.herokuapp.com" + element,
          requestOptions
        )
        let unDiscount = await fetchDiscount.text()
        console.log("id du discount :", JSON.parse(unDiscount).id, " - texte : ", JSON.parse(unDiscount).link)
        discountsLinksProvisoire[discountsLinksProvisoire.length] = JSON.parse(
          unDiscount
        ).link
        // console.log(discountsLinksProvisoire);
        this.setState({
          discountsLinks: discountsLinksProvisoire
        })
      })
    }
    // console.log("les discounts : ", this.state.user.discounts)
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* {this.state.loaded ? <Text>YOOOOOOOOOOOOOOO</Text> : <Text>Loading....</Text>} */}
          <Text style={styles.espacement}></Text>
          <Text style={(styles.texte, styles.titre1)}>
            Bienvenue {this.state.login} !{" "}
          </Text>
          <Text></Text>
          <Text style={styles.texte}>
            Vous bénéficiez déjà des discounts suivants :{" "}
          </Text>
          <Text></Text>
          {/* AFFICHER UN MESSAGE SI AUCUN DISCOUNT N'EXISTE !!! */}
          {this.state.discountsLinks.map((item, key) => (
            <Text key={key} style={styles.code}>
              {item}
            </Text>
          ))}
          <Text></Text>
          <Image style={{ width: 150, height: 150 }} source={logo} />
          <Text></Text>
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
              // vider storage:
              
              let _getUser = async () => {
                await AsyncStorage.setItem("user", "")
                await AsyncStorage.setItem("login", "")
                await AsyncStorage.setItem("token", "")
                let userVide = await AsyncStorage.getItem("user")
                if(!userVide){
                  console.log("\n\n\nle user est bien vidé lors de la déconnexion !\n")
                } else {
                  console.log("\n\n\t! ! ! !\nErreur - le user est toujours là : \n", userVide)
                }

                this.props.navigation.navigate("Home")
              }
              _getUser()
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
  titre1: {
    fontWeight: "100",
    fontSize: 32
  },

  code: {
    fontWeight: "100",
    height: "auto",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: couleurs.fond3,
    borderWidth: 1
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderStyle: "solid",
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1.5
  },
  buttonText: {
    fontWeight: "100",
    fontSize: 20,
    color: "rgb(0, 0, 0)"
  },
  texte: {
    fontWeight: "100"
  },
  espacement: {
    paddingTop: 10
  }
})
