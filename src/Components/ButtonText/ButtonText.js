import React from 'react';
import { View,Text,StyleSheet, TouchableOpacity } from 'react-native';

function ButtonText({text,onPress,style}) {
    return (
        <TouchableOpacity style={[style, styles.button]} onPress={onPress}>
        <Text style={styles.buttonText} >{text}</Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    button:{
        backgroundColor:"black",
        marginTop:"auto",
        alignItems:"center",
        marginBottom:6,
        padding:12,
        borderRadius:27
      },   
      buttonText:{
        color:"white",
        fontSize:16,
        fontWeight:"600",
    },
})
export default ButtonText;