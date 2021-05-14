import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {AppTabNavigator} from './AppTabNavigator'
import CustomSideBarMenu from './CustomSideBarMenu';
import SettingScreen from '../screens/SettingScreen';
import { Screen, screensEnabled } from 'react-native-screens';

export const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    setting:{screen:SettingScreen},

},
{
    contentComponent:CustomSideBarMenu
},
{
    initalRouteName:'Home'
}
)
