import React from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';

function CustomButton({onPress,text,type="PRIMARY"}) {
    return (
       <TouchableOpacity onPress={onPress} style={[styles.container,styles[`container_${type}`]]}>
        <Text style={[styles.text,styles[`text_${type}`]]}>{text}</Text>
       </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container:{
   
    width:"100%",
    padding:12,
    borderRadius:6,
    marginVertical:5,
    alignItems:"center"
    },
    container_PRIMARY:{
        backgroundColor:"#3B71F3",
    },
    container_SECONDARY:{
    borderColor:"#3B71F3",
    borderWidth:2
    },
    container_TERTIARY:{},
    text:{
fontWeight:"bold",
color:"white",
fontSize:15
    },
    text_TERTIARY:{
        color:"grey"
    },
    text_SECONDARY:{
        color:"#3B71F3"
    }
})

export default CustomButton;