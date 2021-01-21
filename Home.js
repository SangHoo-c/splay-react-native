// import React, { useEffect } from 'react';
// import { Text, View, Image } from 'react-native';
// import { useQuery } from 'react-apollo'
// import { VERSION_CHECK } from './components/queries';


// const CatApp = () => {
//   return (
//     <View>
//       <Image
//         source={{uri: "https://reactnative.dev/docs/assets/p_cat1.png"}}
//         style={{width: 200, height: 200}}
//       />
//       <Text>Hello, I am your cat!</Text>
//     </View>
//   );
// }

// const VersionCheck = () => {
    
//     const { loading, error, data } = useQuery(VERSION_CHECK);

//     console.log("============");
//     console.log(loading);
//     console.log(error);
//     console.log(data);

//     console.log("============");

//     if(loading) return <Text> loading ... </Text>
//     if(error) return <Text> error ... </Text>
    
//     return (
        
//         <Text>      {data.appConfig.iOSVersion} / {data.appConfig.aOSVersion} </Text>
//     )
    
// }

// export default VersionCheck;