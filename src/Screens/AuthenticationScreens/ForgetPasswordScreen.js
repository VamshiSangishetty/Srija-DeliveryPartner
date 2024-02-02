import React, { useState } from 'react';
import { View ,StyleSheet,Text, Alert} from 'react-native';
import CustomButton from '../../Components/AuthenticationComponents/CustomButton';
import CustomInput from '../../Components/AuthenticationComponents/CustomInput';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

function ForgetPasswordScreen(props) {

const {control ,handleSubmit}=useForm();
    const navigation = useNavigation();

    const onSendPressed=async data=>{
try {
  await Auth.forgotPassword(data.username)  
  navigation.navigate('NewPassword');
} catch (e) {
   Alert.alert("Oops",e.message); 
}

    }
    
    const onSignInPressed=()=>{
        navigation.navigate('SignIn');    }

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput 
        name="username"
        placeholder='Enter your Email' 
        control={control}
        rules={{required:'Email is required',
        pattern:{value:EMAIL_REGEX,message:"Email is invalid"}}}/>
        <CustomButton text='Send' onPress={handleSubmit(onSendPressed)}/>
            <CustomButton text='Back to Sign In' type='TERTIARY' onPress={onSignInPressed}/>
       </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop:50,
        padding:20,
alignItems:"center",
        backgroundColor:"#F9FBFC"
    },
    title:{
        color:"#051C60",
        fontWeight:"bold",
        fontSize:27,
        marginVertical:10,
    }
})

export default ForgetPasswordScreen;