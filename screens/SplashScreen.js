import React from 'react';

import { 
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

const SplashScreen =({navigation}) => {
    return(
        <View style = {styles.container}>
            <Text> SplashScreen </Text>
            <Button
                title = " click! "
                onPress= {() => navigation.navigate('SignInScreen')} />
        </View>
    );
}


export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
});