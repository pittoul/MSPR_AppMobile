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
            hasAgreed: true,
            email: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            phone: ""
        };
        this._onPressButton = this._onPressButton.bind(this);
        this.reponse = {}
    }

    _onPressButton() {
        console.log(this.state.email);
        const validationResult = validate({addressEmail: this.state.email}, constraints);
        console.log(validationResult);
        // validationResult is undefined if there are no errors
        if (validationResult == undefined) {
            //Inscription retour au menu
            console.log("STATE :", this.state);
            this.createUser();
            console.log("REPONSE : ", this.reponse);
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
                this.reponse = json;
                console.log("EMAIL :",this.reponse.email);
                if (this.reponse.email === "" || this.reponse.email === null || this.reponse.email === undefined) {
                    alert("Erreur de l'inscription");
                    this.props.navigation.navigate('Home');
                }else
                    this.props.navigation.navigate('Home');
                console.log("REPONSE PROMISE :", this.reponse)
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
