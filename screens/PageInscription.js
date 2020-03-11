import React, { Component } from "react"
import { ScrollView } from "react-native-gesture-handler"
import { Form, TextValidator } from "react-native-validator-form"
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image
} from "react-native"
import ValidationComponent from "react-native-form-validator"
import logo from "../assets/logo.png"

export default class Profil extends ValidationComponent {
  constructor(props) {
    super(props)
    this.state = {
      hasAgreed: true,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: ""
    }
    this.reponse = {}
  }

  submit = () => {
    this.createUser()
  }

  handleSubmit = () => {
    this.refs.form.submit()
  }

  UNSAFE_componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    Form.addValidationRule("isPasswordMatch", value => {
      if (value !== this.state.password) {
        return false
      }
      return true
    })
  }

  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
          <Text style={styles.espacement} ></Text>

        <Form ref="form" onSubmit={this.submit} style={styles.container}>
          <Image style={{ width: 90, height: 90 }} source={logo} />
          <TextValidator
            validators={["required", "isEmail"]}
            errorMessages={["Ce champ est requis", "Adresse mail incorrecte"]}
            placeholder={"Adresse mail"}
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            style={styles.input}
          />
          <TextValidator
            secureTextEntry
            validators={["required"]}
            errorMessages={["Ce champ est requis."]}
            type="text"
            value={this.state.password}
            placeholder={"Mot de passe"}
            onChangeText={password => this.setState({ password })}
            style={styles.input}
          />
          <TextValidator
            secureTextEntry
            validators={["isPasswordMatch", "required"]}
            errorMessages={["Mot de passe différent.", "Ce champ est requis."]}
            placeholder={"Confirmation"}
            value={this.state.confirmPassword}
            onChangeText={confirmPassword => this.setState({ confirmPassword })}
            style={styles.input}
          />
          <TextValidator
            validators={["required"]}
            errorMessages={["Ce champ est requis"]}
            placeholder={"Prénom"}
            value={this.state.firstName}
            onChangeText={firstName => this.setState({ firstName })}
            style={styles.input}
          />
          <TextValidator
            validators={["required"]}
            errorMessages={["Ce champ est requis"]}
            placeholder={"Nom"}
            value={this.state.lastName}
            onChangeText={lastName => this.setState({ lastName })}
            style={styles.input}
          />
          <TextValidator
            validators={["required", "isNumber"]}
            errorMessages={["Ce champ est requis", "Ce n'est pas un numéro"]}
            placeholder={"Téléphone"}
            keyboardType="phone-pad"
            value={this.state.phone}
            onChangeText={phone => this.setState({ phone })}
            style={styles.input}
          />
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>
          
          <TouchableOpacity style={styles.button} onPress={this.handleSubmit}>
            <Text style={styles.buttonText}> Valider </Text>
          </TouchableOpacity>
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>
          <Image style={{ width: 40, height: 40 }} source={logo} />
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>
          <TouchableOpacity 
          style={styles.button} 
          onPress={() => {
            this.props.navigation.navigate("Home")
          }}
          >
            <Text style={styles.buttonText}> Retour </Text>
          </TouchableOpacity>
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>
          <Text style={styles.espacement} ></Text>


        </Form>
      </ScrollView>
    )
  }
  createUser() {
    fetch("http://qr-code-app-v2.herokuapp.com/api/users", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(response => response.json())
      .then(json => {
        this.reponse = json
        // On vérifie si l'email est bien renvoyé par l'API
        //Si elle est bien renvoyé alors l'inscription à fonctionné
        console.log("1 : ", this.reponse.detail)
        // console.log("2 : ", this.reponse.detail.email);
        // console.log("3 : ", this.reponse.violations[0].message);
        if (this.reponse.detail) {
          alert(this.reponse.violations[0].message)
        } else if (this.reponse.detail === undefined) {
          this.props.navigation.navigate("Home")
        }
      })
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
    justifyContent: "center",
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    padding: 10,
    borderRadius: 5,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderStyle: "solid",
    borderColor: "rgb(0, 0, 0)",
    borderWidth: 1
  },
  buttonText: {
    fontWeight: "100",
    alignItems: "center",
    justifyContent: "center"
  },
  espacement: {
    paddingTop: 10
  },
  input: {
    minWidth: 200,
    height: 46,
    textAlign: "center",
    marginVertical: 15,
    borderBottomWidth: 0.4
  },
  errorMessage: {
    color: "#db1702"
  }
})
