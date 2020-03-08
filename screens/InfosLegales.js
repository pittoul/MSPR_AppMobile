import * as React from "react"
import { Button, View, Text, ScrollView, StyleSheet } from "react-native"
import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

export default class InfosLegalesScreen extends React.Component {
  render() {
    return (
      <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={styles.espacement}></Text>
          <Text style={styles.grosTexte}>Infos légales :</Text>
          <Text style={styles.espacement}></Text>
          <Text style={styles.button}>
            Editeur du site Agence Idéematic 26 rue du Kochersberg 67200
            Strasbourg
            {`\n`}
            {`\n`}
            Tel : +33 3 88 23 71 53 Fax : +33 3 88 23 70 00 Email : contact (at)
            ideematic.com
            {`\n`}
            {`\n`}
            RCS Strasbourg 532 776 218 00010 Capital de 25 000 euros
            {`\n`}
            {`\n`}
            Siège social Agence Idéematic 26 rue du Kochersberg 67200 Strasbourg
            {`\n`}
            {`\n`}
            Responsable de la publication Nom et prénom : Grégory TOUCAS
            {`\n`}
            {`\n`}
            Hébergement du site Online SAS BP 438 75366 Paris – CEDEX 08
            {`\n`}
            {`\n`}
            Réalisation technique et graphique Agence Idéematic
            {`\n`}
            {`\n`}
            Droits d’auteur L’ensemble de ce site relève de la législation
            française et internationale sur le droit d’auteur et la propriété
            intellectuelle. Les informations ainsi que les outils d’aide à la
            décision contenus dans ce site sont la propriété intellectuelle de
            l’agence Idéematic. Le contenu des informations ne peut être utilisé
            qu’à des fins strictement privées. La reproduction des textes est
            autorisée sous réserve des conditions suivantes :{`\n`}
            {`\n`}
            respect de l’intégralité des documents reproduits (Sans modification
            ni altération) citation explicite de la (ou les) source(s) du
            document Exemple : « Ce document provient du site Internet de
            l’Agence Idéematic. Les droits de reproduction sont réservés et
            strictement limités « , Gratuité de la diffusion. Toute autre
            utilisation devra faire l’objet d’une autorisation express du
            directeur de publication.
            {`\n`}
            {`\n`}
            L’utilisation du logo de l’agence Idéematic est autorisée sous
            réserve des conditions suivantes :{`\n`}
            {`\n`}
            autorisation écrite formelle de la direction d’Idéematic utilisation
            dans son intégralité et sans aucune modification Une autorisation
            tacite est donnée lorsque le logo est utilisé pour faire un lien sur
            la page d’accueil du site Internet www.ideematic.com Crédit photo,
            tous droits réservés Agence Idéematic.
          </Text>
          <Text style={styles.espacement}></Text>
          <Button
            title="Retour"
            onPress={() => this.props.navigation.goBack()}
            style={styles.button}
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
  espacement: {
    paddingTop: 10
  },
  grosTexte: {
    fontSize: 20,
    fontWeight: "bold"
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 250,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    padding: 10,
    borderRadius: 5,
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
  buttonPetitText: {
    fontWeight: "100",
    fontSize: 10,
    color: "rgb(0, 0, 0)"
  },
  buttonPetit: {
    paddingTop: 30,
    padding: 10,
    borderRadius: 5,
    borderBottomWidth: 1
  }
})
