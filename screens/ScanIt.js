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

  useEffect(() => {
    ;(async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === "granted")
    })()
  }, [])

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true)
    async function getUser() {
      const value = await AsyncStorage.getItem("user")
      console.log(JSON.parse(value))
      alert(
        `Type de code ${type}\ndata du code : ${data} du user : ${
          JSON.parse(value).id
        }`
      )

      let discountAAjouter = "/api/discounts/" + data
      let user = JSON.parse(value)
      let tabDisc = user.discounts
      console.log("TAB", tabDisc)
      tabDisc[tabDisc.length] = discountAAjouter

      console.log("TAB", tabDisc)
      user.discounts = tabDisc
      console.log(user)

      // Remettre user dans le storage
      let _storeUser = async () => {
        try {
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
        .then(result => console.log(result))
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
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
    </View>
  )
}
