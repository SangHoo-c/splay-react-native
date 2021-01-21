import React, { useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import { useQuery } from 'react-apollo'
import { VERSION_CHECK } from './components/queries';


const SpMain = () => {
    const initialLoginState = {
        isLoading: true,
        userName: null,
        userToken: null
      };
    
      const loginReducer = (prevState, action) => {
        switch(action.type) {
    
          // 이미 토큰을 갖고 있는 경우
          case 'AL_TOKEN':
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
              isLoading: false
            };
          case 'REGISTER':
            return {
              ...prevState,
              userName: action.id,
              userToken: action.token,
              isLoading: false
            };
        }
      };
    
      const [loginState, dispatch] = React.useReducer (loginReducer, initialLoginState);
    
    
      const authContext = React.useMemo(() => ({
        
        signIn: async(userName, password) => { 
          let userToken;
          userToken = null;
    
          if(userName == 'lee' && password == 'pass'){
            try{
              userToken = 'lee';
              await AsyncStorage.setItem('userToken', userToken);
            }catch(e){
              console.log(e);
            }
          }
          dispatch({ type : 'LOGIN', id: userName, token : userToken});
        },
    
        signOut: async() => {
          try{
            await AsyncStorage.removeItem('userToken');
          }catch(e){
            console.log(e);
          }
          dispatch({ type: 'LOGOUT'});
        },
    
        signUp: () => {
          // to-do 
        }
      }), []);
    
      // const getAnonymousUser = () => {
      //   let data;
      //   const [registerAnonymousUser, {token}] = useMutation(REGISTER_ANONYMOUS_USER);
      //   console.log(token);
      //   return token;
      // }
      
    useEffect( () => {
    setTimeout(async() => {
      
      // to-do list
      // 1. 강업 체크 

      console.log(VersionCheck.getCurrentVersion());     // 1.0 
      if(VersionCheck.getCurrentVersion() == "1.0"){
        // api 로 부터 불러온 version 과 비교. 
      }
      // 1-1. 앱 배포 후에 사용할 코드
      // VersionCheck.getLatestVersion({
      //   provider : 'appStore'
      // })
      // .then(latestVersion => {
      //   console.log(latestVersion);
      // });

      // VersionCheck.getLatestVersion({
      //   provider : 'playStore'
      // })
      // .then(latestVersion => {
      //   console.log(latestVersion);
      // });

      let tmp;

      // 2. token 유무 체크 
      // 2-1. ture -> go to main
      // 2-2. flase -> get anonymousUser
      let userToken;
      userToken = null;
      try{
        userToken = await AsyncStorage.getItem('userToken');
      }catch(e){
        console.log(e);
      }
      
      // token 이 없는 경우, 익명유저 생성 
      if(userToken == null) {
        // by using API, get token for anonymousUser 
        
        
        // const [registerAnonymousUser, {token}] = useMutation(REGISTER_ANONYMOUS_USER);
        
        // userToken = {token};
        // console.log("token", userToken);

        userToken = "1234";
        AsyncStorage.setItem('userToken', userToken);
      }

      dispatch({ type: 'AL_TOKEN', token: userToken});
    }, 1000);
  }, []);



}

export default SpMain;