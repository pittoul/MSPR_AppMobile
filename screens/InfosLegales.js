import * as React from 'react';
import { Button, View, Text, ScrollView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class InfosLegalesScreen extends React.Component {
    render() {
      return (
        <ScrollView style={{flex:1, backgroundColor:'white'}}>

        
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Infos légales :</Text>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec pharetra, dui sit amet elementum sagittis, erat mauris sollicitudin lacus, eu interdum nisl elit sed velit. Fusce finibus eget lacus sit amet consectetur. Integer blandit varius lectus eu dapibus. Ut eu leo a quam lobortis convallis. Vestibulum ultricies aliquet urna eget gravida. Duis pretium dapibus ipsum, ac vestibulum sem ultrices ac. Nam maximus sed augue non rhoncus. Pellentesque volutpat dignissim lacus, ac ultricies turpis viverra in. Duis a diam quis tellus condimentum gravida. Pellentesque enim tellus, interdum quis nunc non, feugiat ultricies est. Quisque mattis ante id nunc condimentum, sit amet sollicitudin massa ultrices. Aliquam iaculis orci non quam laoreet fermentum.</Text>
          <Button
            title="Infos légales... Again !"
            onPress={() => this.props.navigation.push('Details')}
          />
          <Button
            title="Accueil"
            onPress={() => this.props.navigation.navigate('Home')}
          />
          <Button
            title="Retour"
            onPress={() => this.props.navigation.goBack()}
          />
        </View>
        </ScrollView>
      );
    }
  }