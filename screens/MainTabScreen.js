import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import HomeScreen from './HomeScreen';
import DeatailScreen from './DetailScreen';
import ExtraScreen from './ExtraScreen';


const Tab = createBottomTabNavigator();

const MainTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            tabBarOptions={{
                activeTintColor: '#252526',
            }}>
            <Tab.Screen
                name="HOME"
                component={HomeScreen}
                options={{
                    tabBarLabel: '홈',
                    tabBarIcon: ({focused}) => (
                        <Image
                            source={focused ? require('../icons/btn_tabbar_home.png') : require('../icons/btn_tabbar_home_off.png')}
                            style={{ width: 30, height: 30, resizeMode: "stretch" }}
                        />
                    )
                }} />
            
            <Tab.Screen
                name="Details"
                component={DeatailScreen}
                options={{
                    tabBarLabel: '내 작품',
                    tabBarIcon: ({focused}) => (
                        <Image
                            // to-do image fouces-on 된 상태를 받아서 처리 해줘야함
                            source={require('../icons/btn_tabbar_history_off.png')}
                            style={{ width: 30, height: 30, resizeMode: "stretch" }}
                        />
                    )
                }} />

            <Tab.Screen
                name="EXTRA"
                component={ExtraScreen}
                options={{
                    tabBarLabel: '더보기',
                    tabBarIcon: () => (
                        <Image
                            // to-do image fouces-on 된 상태를 받아서 처리 해줘야함
                            source={require('../icons/btn_tabbar_more_off.png')}
                            style={{ width: 30, height: 30, resizeMode: "stretch" }}
                        />
                    )
                }} />
            
        </Tab.Navigator>
    );
}

export default MainTab;