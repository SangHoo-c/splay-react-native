import React from 'react';

import { 
    View,
    Text,
    Button,
    StyleSheet
} from 'react-native';

import { AuthContext } from '../components/context';

const SignInScreen =({navigation}) => {

    const [data, setData] = React.useState({
        username: '',
        password: ''
    });

    const { signIn } = React.useContext(AuthContext);
    

    const loginHandle = (username, password) => {
        signIn(username, password);
    }

    return(
        <View style = {styles.container}>
            <Text> SignInScreen </Text>
            <Button
                // get auth 
                title = " sign in button "
                // to-do login 화면 구성
                onPress= {() => loginHandle("lee", "123")} />
        </View>
    );
}

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    },
});