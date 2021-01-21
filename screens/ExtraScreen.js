import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import { AuthContext } from '../components/context';

const ExtraScreen = ({navigation}) => {

    const { signOut } = React.useContext(AuthContext);
    console.log("===this is extra screen===");
    return (
      <View style={styles.container}>
        <Text>Extra Screen</Text>
        <Button 
          title= "goto detail screen "
          onPress= {() => navigation.navigate("Details")}>
        </Button>
        <Button
            title = "sign out button"
            onPress = {() => {signOut()}}>        
        </Button>
      </View>
    );
  }

  export default ExtraScreen;

  const styles = StyleSheet.create({
      container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
      }
  })
