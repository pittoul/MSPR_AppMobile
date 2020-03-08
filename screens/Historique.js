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
    let _requeteGetUser = () => {
      var myHeaders = new Headers()
      myHeaders.append("Accept", "application/json")
      myHeaders.append("Content-Type", "application/json")
      myHeaders.append("Authorization", "Bearer " + this.state.token)
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
          // console.log(result)
          let _storeUser = async () => {
            try {
              await AsyncStorage.setItem("user", result)
            } catch (error) {}
          }
          _storeUser()
        })
        .catch(error => console.log("error", error))
    }
    // Verifier si user existe(si on a modifié le profil), sinon, faire la requete
    _requeteGetUser()

    let _user = async () => {
      try {
        const value = await AsyncStorage.getItem("user")
        // console.log("ICIIIIII", JSON.parse(value))
        this.setState({
          user: JSON.parse(value)
        })
        // console.log("DANS OBJET : ", this.state.user.discounts)
        let tabDiscounts = this.state.user.discounts
        let discountsLinksProvisoire = []
        console.log(tabDiscounts)
        tabDiscounts.forEach(element => {
          var myHeaders = new Headers()
          myHeaders.append("Content-Type", "application/json")
          myHeaders.append("Authorization", "Bearer " + this.state.token)
          var file = ""
          var requestOptions = {
            method: "GET",
            headers: myHeaders,
            body: file,
            redirect: "follow"
          }
          fetch("http://qr-code-app-v2.herokuapp.com" + element, requestOptions)
            .then(response => response.text())
            .then(result => {
              // console.log(JSON.parse(result).link)
              discountsLinksProvisoire[
                discountsLinksProvisoire.length
              ] = JSON.parse(result).link
              // console.log(discountsLinksProvisoire);
              this.setState({
                discountsLinks: discountsLinksProvisoire
              })
            })
            .catch(error => console.log("error", error))
          this.setState({
            discounts: tabDiscounts
          })
          // console.log('DISCOUTSLINKS : ', this.state.discountsLinks)
          // console.log('TRUC', element)
        })
      } catch (error) {
        console.log("Error retrieving le User dans page PROFIL!", error)
      }
    }
    _user()
  }

  render() {
    return (
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <Text style={styles.titleText}>PAGE PRINCIPALE</Text> */}
          {/* <Text></Text> */}
          {/* <Text> INFOS USER EN LOCAL STORAGE: </Text> */}
          <Text style={styles.espacement}></Text>
          <Text style={(styles.texte, styles.titre1)}>
            Bienvenue {this.state.login} !{" "}
          </Text>
          <Text></Text>
          <Text style={styles.texte}>
            Vous bénéficiez déjà des discounts suivants :{" "}
          </Text>
          <Text></Text>
          {this.state.discountsLinks.map((item, key) => (
            <Text key={key} style={styles.code}>
              {item}{key}
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
              let _viderStorage = async () => {
                try {
                  await AsyncStorage.setItem("token", "")
                } catch (error) {}
          
                try {
                  await AsyncStorage.setItem("user", "")
                } catch (error) {}
          
                try {
                  await AsyncStorage.setItem("login", "")
                } catch (error) {}
              }
              _viderStorage()
              this.props.navigation.navigate("Home")
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
    // borderTopLeftRadius: 100,
    // borderBottomLeftRadius: 50,
    // borderBottomRightRadius: 50,
    borderWidth: 1
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    // borderRadius: 5,
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
