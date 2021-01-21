// @flow
import React, { useEffect, useState } from 'react';

import {
    View,
    StyleSheet,
    Platform,
    ActivityIndicator
} from 'react-native';

// import { useQuery, useMutation } from 'react-apollo'
import { useQuery, useMutation } from '@apollo/client';
import { VERSION_CHECK, REGISTER_ANONYMOUS_USER } from '../components/queries';
import VersionCheck from 'react-native-version-check';


import { NavigationContainer } from '@react-navigation/native';


import RootstackScreen from './RootStackScreen';
import MainTabScreen from '../screens/MainTabScreen';

import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef } from 'react';

const SplashScreen = () => {
    const { loading, error, data } = useQuery(VERSION_CHECK);
    const [registerAnonymousUser] = useMutation(REGISTER_ANONYMOUS_USER);
    const [anonymousToken, setAnonymousToken] = useState(null);
    const [flag, setFlag] = useState(null);


    // Promise 객체인 registerAnonymousUser 로 부터 dataAnonymousUser 받아오기
    const registerAnonymous = async () => {
        try {
            console.log("this is anonymous user register function ");
            let dataAnonymousUser = null;
            dataAnonymousUser = await registerAnonymousUser();
            setAnonymousToken(dataAnonymousUser.data.registerAnonymousUser.token);
        } catch (e) {
            console.log(e);
        }

        // 생성된 토큰을 asyncStorage 에 저장하는 함수
        try {
            await AsyncStorage.setItem('userToken', anonymousToken);
            console.log("succesfully set anonymous user!!");
        } catch (e) {
            console.log(e);
        }

    }

    // 사용자의 앱 방문을 asyncStorage 에 저장 & 조회하는 함수 
    // 만약 사용자가 방문한 경험이 없다면, 익명유저 생성, 
    // 사용자가 방문한 경험이 있다면, 그대로 진행, 
    const checkVisitAndCreateUser = async () => {
        let vF = "false";
        try {
            vF = await AsyncStorage.getItem('visitFlag');
        } catch (e) {
            console.log(e);
        }

        console.log("check user history :  ", vF);

        // user 방문 경험 없는 경우, 익명유저 생성
        if (vF != "true") {
            console.log("notice: anonymous user created");
            try{
                await registerAnonymous();
            }catch(e){
                console.log(e);
            }

            // user 방문 기록 저장
            try {
                await AsyncStorage.setItem('visitFlag', "true");
                console.log("notice: user history recorded!! ");
            } catch (e) {
                console.log(e);
            }
        }
    }

    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null,
    };

    const loginReducer = (prevState, action) => {
        switch (action.type) {
            case 'RETRIEVE_TOKEN':
                return {
                    ...prevState,
                    userToken: action.token,
                    isLoading: false,
                };

            case 'LOGIN':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };
            case 'LOGOUT':
                return {
                    ...prevState,
                    userName: null,
                    userToken: null,
                    isLoading: false,
                };
            case 'REGISTER':
                return {
                    ...prevState,
                    userName: action.id,
                    userToken: action.token,
                    isLoading: false,
                };

        }
    };

    const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);



    const authContext = React.useMemo(() => ({
        signIn: async (userName, password) => {

            let userToken;
            userToken = null;

            if (userToken == null) {

                // 로그인하는 경우, --> 현재 사용중인 토큰을 받아서 유저로 등록한다. 
                userToken = "anonymous token,, ";
                // to-do 현재 등록된 토큰에서 받아와야한다. 
                // null 인 경우가 없다. 
            }

            // check user name from API call
            if (userName == 'lee' && password == '123') {
                try {
                    await AsyncStorage.setItem('userToken', userToken);
                } catch (e) {
                    console.log(e);
                }
            }

            console.log('** sign in ** user TOken : ', userToken);
            dispatch({ type: 'LOGIN', id: userName, token: userToken });
        },

        // sign out 시, visitFlag 를 true 값으로 저장해서
        // 재접속시에 새로운 익명유저 생성을 막는다. 
        signOut: async () => {
            console.log("** sign out ** ");
            try {
                await AsyncStorage.removeItem('userToken');
                // await AsyncStorage.setItem( 'visitFlag', "true");
            } catch (e) {
                console.log(e);
            }
            dispatch({ type: 'LOGOUT' });
        },
        signUp: () => {
            console.log('** sign up **');
            // setUserToken('random');
            // setIsLoading(false);
        },

    }));

    // 강업 체크
    // 기기 버전값과 api 로 받아온 값을 비교
    // go to app / play store 
    useEffect( () => {
        if (!data) return;

        let version = null;
        try {
            version = data.appConfig.iOSVersion;
        } catch (e) {
            console.log(e);
        }

        // to-do 강업이 필요한 경우, 진행 중인 process 멈춤 
        if (version != null & version <= VersionCheck.getCurrentVersion()) {
            Platform.OS === 'ios' ?
                console.log("go to app store")
                : console.log("go to play store");
        }
        // register Anonymous User
        // useMutation 으로 부터 받은 promise 객체를 분해?


        // 사용자가 방문한 경험이 없을 경우에만 익명유저 생성
        checkVisitAndCreateUser();
        setFlag(true);
        

    }, [data]);


    useEffect(() => {
        if(!flag) return ; 

        async function checkTokenAndGotoMain(){
            let userToken;
            userToken = null;

            try {
                userToken = await AsyncStorage.getItem('userToken');
            } catch (e) {
                console.log(e);
            }

            console.log('user Token check : ', userToken);
            dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
        }
        checkTokenAndGotoMain();     
        
    }, [flag]);

    if (loginState.isLoading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
        )
    }

    return (
        // goToStore(data)
        // to - do  버전에 따라 다른 값 랜더링 하기
        // 만약 로딩 후에 바로 넘어가고 싶다면, 
        // loginState.isLoading == false 로 조건문을 넣어주자
        
        <AuthContext.Provider value={authContext}>
            {loginState.isLoading != true? 
            (<NavigationContainer>
                {loginState.userToken != null ?
                    <MainTabScreen />
                    :
                    <RootstackScreen />
                }
            </NavigationContainer>
            ) 
            :
            (
                <View style={styles.container}>
                <ActivityIndicator size="large" />
            </View>
            )


            }
        </AuthContext.Provider> 
        
    );
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
