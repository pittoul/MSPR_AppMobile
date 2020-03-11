import React, { useState, useEffect } from "react"
import { Text, View, StyleSheet, Button, AsyncStorage } from "react-native"
import { BarCodeScanner } from "expo-barcode-scanner"
/**
 *
 *
 * Un QR CODE CONTIENT L'ID DU DISCOUNT
 *
 *
 *
 */
export default function ScanIt() {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)
  console.log("\n* * * * * * * * On est dans le ScanIt() ! * * * * * * * * \n")
  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    console.log(
      "\n\n\n* * * * * * * * * * * * * * * * * * \n*\n* DANS 'handleBarCodeScanned()'\n*\n* * * * * * * * * * * * * * * * * * \n"
    )

    async function getUser() {
      const value = await AsyncStorage.getItem("user")
      console.log(
        "\nAu clic, Voici ce qu'on récupère du storage :\n",
        JSON.parse(value)
      )
      alert(
        `Type de code ${type}\ndata du code : ${data}, id du user : ${
          JSON.parse(value).id
        }`
      )

      let discountAAjouter = "/api/discounts/" + data
      let user = JSON.parse(value)
      console.log(
        "\nAu clic, vérifions ce qu'on récupère comme user depuis le storage :\n",
        user
      )
      let tabDisc = user.discounts

      /**
       * VERIFIER QUE LE CODE N'EST PAS DEJA DANS LA LISTE !!!!
       */

      if (!tabDisc.includes(discountAAjouter)){
        console.log("\nOn a un nouveau discount !\n")
        tabDisc[tabDisc.length] = discountAAjouter
        console.log("\nOn ajoute le nouveau code : \n", tabDisc)
        user.discounts = tabDisc
        console.log(
          "\nOn modifie le user pour lui ajouter ce nouveau discount...\n",
          user
        )
      }
     
      
      console.log("\nVoici donc le détail de ses discounts...\n", tabDisc)
      
      let _majUserState = async () => {
        let leUser = await AsyncStorage.getItem("user")
        console.log("\nuser from storage APRES SCAN\n", JSON.parse(leUser))
        console.log("\n******************************\n*********************************\n**********************\nVoir le user updaté depuis le storage, pas la base :\n", leUser)
      }
      _majUserState()
      // console.log("user que l'on va renvoyer (en ayant supprimé le password !!!):", user)

      // Remettre user dans le storage
      let _storeUser = async () => {
        try {
          console.log(
            "\nVoici donc le user en string que l'on remt en storage : \n",
            JSON.stringify(user)
          )
          // await AsyncStorage.setItem("user", JSON.stringify(result))
          await AsyncStorage.setItem("user", JSON.stringify(user))
        } catch (error) {}
      }
      _storeUser()

      const valueT = await AsyncStorage.getItem("token")
      let token = JSON.parse(valueT)

      var myHeaders = new Headers()
      myHeaders.append("Content-Type", "application/merge-patch+json")
      myHeaders.append("Authorization", "Bearer " + token)

      var raw = JSON.stringify(user)
      let userStorage = async () => {
        const value = await AsyncStorage.setItem("user", JSON.stringify(user))
        // console.log("\nvérification que user est null :\n", value)
      }
      userStorage()

      var requestOptions = {
        method: "PATCH",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      }

      fetch(
        "http://qr-code-app-v2.herokuapp.com/api/users/" + JSON.parse(value).id,
        requestOptions
      )
        .then(response => response.text())
        .then(result =>
          console.log("\nLe user à jour retourné par l'API :\n", result)
        )
        .catch(error => console.log("error", error))

      return JSON.parse(value)
    }
    let user = getUser()
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <Button
          title={"Flasher un autre code"}
          onPress={() => setScanned(false)}
        />
      )}
    </View>
  )
}
