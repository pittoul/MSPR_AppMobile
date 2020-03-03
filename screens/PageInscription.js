import React, {Component} from "react"
import {ScrollView} from "react-native-gesture-handler"
import {
    View,
    Text,
    Button,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native"
import {validate} from 'validate.js';
import ValidationComponent from 'react-native-form-validator';
import constraints from "../constraints";

export default class Profil extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phone: ""
        };
        this._onPressButton = this._onPressButton.bind(this)
    }


    // onLogin() {
    //     const {email, password} = this.state
    //
    //     Alert.alert("Credentials", `email: ${email} + password: ${password}`)
    // }

    _onPressButton() {
        console.log(this.state.email);
        const validationResult = validate({addressEmail: this.state.email}, constraints);
        console.log(validationResult)
        // validationResult is undefined if there are no errors
        if (validationResult == undefined) {
            //Inscription retour au menu
            // this.createUser();
            console.log("INSCRIPTION")
        }
        this.setState({errors: validationResult});
    }

    render() {
        return (
            <ScrollView style={{flex: 1, backgroundColor: "white"}}>
                <View style={styles.container}>
                    <Text style={styles.errorMessage}>
                        {this.getErrorMessages()}
                    </Text>
                    <TextInput
                        value={this.state.email}
                        keyboardType="email-address"
                        onChangeText={email => this.setState({email})}
                        placeholder={"email..."}
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.password}
                        onChangeText={password => this.setState({password})}
                        placeholder={"password..."}
                        secureTextEntry={true}
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.confirmPassword}
                        onChangeText={confirmPassword => this.setState({confirmPassword})}
                        placeholder={"confirmPassword..."}
                        secureTextEntry={true}
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.firstName}
                        onChangeText={firstName => this.setState({firstName})}
                        placeholder={"firstName..."}
                        // secureTextEntry={true}
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.lastName}
                        onChangeText={lastName => this.setState({lastName})}
                        placeholder={"lastName..."}
                        // secureTextEntry={true}
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TextInput
                        value={this.state.phone}
                        onChangeText={phone => this.setState({phone})}
                        placeholder={"Numéro de mobile..."}
                        // secureTextEntry={true}
                        placeholderTextColor="gray"
                        style={styles.input}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._onPressButton}
                        // onPress={() => {
                        //   // if (this.state.password == this.state.confirmPassword) {
                        //   //   var myHeaders = new Headers()
                        //   //   myHeaders.append("Content-Type", "application/json")
                        //   //   myHeaders.append("Accept", "application/json")
                        //   //   myHeaders.append("Authorization", "Bearer " + this.state.token)
                        //
                        //   //   // var raw = JSON.stringify({"firstName":"Denis","lastName":"Brognard","email":"denis@brognard.fr","password":"admin","phone":"0606060606","hasAgreed":true,"discounts":["/api/discounts/201","/api/discounts/204","/api/discounts/206"],"apiRoles":["/api/api_roles/3"]});
                        //   //   var raw = JSON.stringify({
                        //   //     firstName: this.state.firstname,
                        //   //     lastName: this.state.lastName,
                        //   //     email: this.state.email,
                        //   //     password: this.state.password,
                        //   //     phone: this.state.phone,
                        //   //     hasAgreed: true
                        //   //   })
                        //   //   var requestOptions = {
                        //   //     method: "POST",
                        //   //     headers: myHeaders,
                        //   //     body: raw,
                        //   //     redirect: "follow"
                        //   //   }
                        //
                        //   //   fetch(
                        //   //     "http://qr-code-app-v2.herokuapp.com/api/users",
                        //   //     requestOptions
                        //   //   )
                        //   //     .then(response => response.text())
                        //   //     .then(result => console.log(result))
                        //   //     .catch(error => console.log("error", error))
                        //   // } else {
                        //   //   // a mettre en onblur ce sera plus classe!
                        //   //   alert("Les mots de passe ne correspondent pas !")
                        //   // }
                        //
                        //   if (this.state.password == this.state.confirmPassword) {
                        //
                        //
                        //     var myHeaders = new Headers();
                        //     myHeaders.append("Content-Type", "application/json");
                        //     myHeaders.append("Accept", "application/json");
                        //
                        //     // var raw = JSON.stringify({"firstName":"Denis","lastName":"Brognard","email":"denis@brognard.fr","password":"admin","phone":"0606060606","hasAgreed":true,"discounts":["/api/discounts/201","/api/discounts/204","/api/discounts/206"],"apiRoles":["/api/api_roles/3"]});
                        //     var raw = JSON.stringify({
                        //           firstName: this.state.firstname,
                        //           lastName: this.state.lastName,
                        //           email: this.state.email,
                        //           password: this.state.password,
                        //           phone: this.state.phone,
                        //           hasAgreed: true,
                        //           discounts: ["/api/discounts/201","/api/discounts/204","/api/discounts/206"],
                        //           apiRoles: ["/api/api_roles/3"]
                        //         })
                        //     var requestOptions = {
                        //       method: 'POST',
                        //       headers: myHeaders,
                        //       body: raw,
                        //       redirect: 'follow'
                        //     };
                        //
                        //     fetch("http://qr-code-app-v2.herokuapp.com/api/users", requestOptions)
                        //       .then(response => response.text())
                        //       .then(result => console.log(result))
                        //       .catch(error => console.log('error', error));
                        //
                        //
                        //
                        //     // fetch("http://qr-code-app-v2.herokuapp.com/api/users", {
                        //     //   method: "POST",
                        //     //   headers: {
                        //     //     Accept: "application/json",
                        //     //     "Content-Type": "application/json"
                        //     //   },
                        //     //   body: JSON.stringify({
                        //     //     firstName: this.state.firstname,
                        //     //     lastName: this.state.lastName,
                        //     //     email: this.state.email,
                        //     //     password: this.state.password,
                        //     //     phone: this.state.phone,
                        //     //     hasAgreed: true
                        //     //   })
                        //     // })
                        //     //   .then(response => response.json())
                        //     //   .then(json => {
                        //     //     console.log(json)
                        //     //     // if (json.authentication == "success") {
                        //     //     //   this.props.navigation.navigate("Historique")
                        //     //     // } else {
                        //     //     //   this.props.navigation.navigate("Home")
                        //     //     // }
                        //     //   })
                        //   }
                        //}}
                        // onPress={() => this.props.navigation.navigate("Historique")}
                        // onPress={this.onLogin.bind(this)}
                    >
                        <Text style={styles.buttonText}> Valider </Text>
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
        );
    }

    getErrorMessages(separator = "\n") {
        const {errors} = this.state;
        if (!errors) return [];

        return Object.values(errors).map(it => it.join(separator)).join(separator);
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
                console.log(json)
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
        // borderWidth: 1,
        borderBottomWidth: 1,
        borderColor: "green",
        textAlign: "center",
        marginVertical: 10
        // borderRadius: 5
    },
    errorMessage: {
        color: '#db1702'
    }
})
