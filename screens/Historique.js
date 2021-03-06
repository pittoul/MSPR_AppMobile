import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
  RefreshControl
} from "react-native"
import React, { Component } from "react"
import { AuthSession } from "expo"
import logo from "../assets/logo.png"
import Swipeable from "react-native-swipeable-row"
import { Ionicons, FontAwesome } from "@expo/vector-icons"

import { withNavigation } from "react-navigation"

const leftContent = <Text>Pull to activate</Text>

// const[refreshing,setRefreshing]= useState(false);
export default class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      token: null,
      login: null,
      user: null,
      discounts: [],
      discountsLinks: [],
      refreshing: false
    }
    this.rightButtons = [
      <TouchableOpacity
        onPress={() => this._delete()}
        style={styles.buttonDelete}
      >
        <FontAwesome
          name="trash-o"
          backgroundColor="red"
          style={styles.iconDelete}
          size={18}
        >
          {" "}
        </FontAwesome>
      </TouchableOpacity>
    ]
  }

  /**
   *
   * Recupération des variables du storage dans le 'state' de la page:
   *
   */
  componentDidMount() {
    console.log(
      "\n\n\n* * * * * * * * * * * * * * * * * * \n*\n* DANS 'UNSAFE_componentDidMount()'\n*\n* * * * * * * * * * * * * * * * * * \n"
    )

    let _getUser = async () => {
      const value = await AsyncStorage.getItem("user")
      console.log("\nvérification que user est null :\n", value)
    }

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
          _requeteGetUser()
        }
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
      this.setState({
        nomUser: JSON.parse(value).firstName
      })

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
        console.log(
          "id du discount :",
          JSON.parse(unDiscount).id,
          " - texte : ",
          JSON.parse(unDiscount).link
        )
        discountsLinksProvisoire[discountsLinksProvisoire.length] = JSON.parse(
          unDiscount
        ).link
        this.setState({
          discountsLinks: discountsLinksProvisoire
        })
      })
      
    }
  }

  render() {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh.bind(this)}
          />
        }
      >
        <View style={styles.container}>
          <Text style={styles.espacement}></Text>

          <Text style={styles.espacement}></Text>
          <Text style={(styles.texte, styles.titre1)}>
            Bienvenue {this.state.nomUser} !{" "}
          </Text>
          <Text></Text>
          <Text style={styles.texte}>
            Vous bénéficiez déjà des discounts suivants :{" "}
          </Text>
          <Text></Text>
          {/* AFFICHER UN MESSAGE SI AUCUN DISCOUNT N'EXISTE !!! */}
          {this.state.discountsLinks.map((item, key) => (
            // <Swipeable
            //   key={key}
            //   leftContent={leftContent}
            //   rightButtons={this.rightButtons}
            // >
              <Text key={key} style={styles.code}>
                {item}
              </Text>
            // </Swipeable>
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
                if (!userVide) {
                  console.log(
                    "\n\n\nle user est bien vidé lors de la déconnexion !\n"
                  )
                } else {
                  console.log(
                    "\n\n\t! ! ! !\nErreur - le user est toujours là : \n",
                    userVide
                  )
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

  _onRefresh() {
    this.setState({ refreshing: true })
    this.componentDidMount()
    this.setState({ refreshing: false })
  }

  _delete() {
    alert("DELETE", this.item)
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
  swipable: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },
  code: {
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "100",
    // width: 250,
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
  buttonDelete: {
    // alignItems: "center",
    justifyContent: "center",
    width: 2000,
    height: 42,
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    borderStyle: "solid",
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1.5
  },
  iconDelete: {},
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
