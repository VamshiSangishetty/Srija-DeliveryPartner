import React from 'react';
import { SafeAreaView } from 'react-native';
import { Image } from 'react-native';
import { View,Text,StyleSheet,StatusBar } from 'react-native';
import srijalogobg from '../../../assets/images/srijalogoside.png'

function HeaderComponent(props) {
    return (
       <SafeAreaView style={styles.header}>
        <Image source={srijalogobg} style={styles.image}/>
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header:{
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        height:89,
alignItems:"center",
justifyContent:"center",
flexDirection:"row"
    },
    image:{
        height:"100%",
        width:250
    }
})
export default HeaderComponent;