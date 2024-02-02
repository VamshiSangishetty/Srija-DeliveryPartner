import React, { useState } from 'react';
import { View ,StyleSheet,Text,Alert} from 'react-native';
import CustomButton from '../../Components/AuthenticationComponents/CustomButton';
import CustomInput from '../../Components/AuthenticationComponents/CustomInput';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

function NewPasswordScreen(props) {
    const {control ,handleSubmit}=useForm();

    const navigation = useNavigation();

    const onSubmitPressed= async data=>{
        try {
            await Auth.forgotPasswordSubmit(data.username,data.code,data.password)  
            navigation.navigate('SignIn');   
          } catch (e) {
             Alert.alert("Oops",e.message); 
          }

    }
    
    const onSignInPressed=()=>{
        navigation.navigate('SignIn');   
     }


    return (
        <View style={styles.container}>
        <Text style={styles.title}>Reset your Password</Text>
        <CustomInput 
        name='username'
        control={control}
        placeholder='Enter your email'
         rules={{required:'Email is required'}}/>
        <CustomInput 
        name='code'
        control={control}
        placeholder='Enter your Confirmation Code'
         rules={{required:'Confirmation Code is required'}}/>
        <CustomInput 
        name='password'
        control={control}
        placeholder='Enter your new Password'
        rules={{required:"Password is required", minLength:{
            value:8,
            message:'Password should be minimum of 8 characters long'
        }}}
        secureTextEntry/>
        <CustomButton text='Submit' onPress={handleSubmit(onSubmitPressed)}/>
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

export default NewPasswordScreen;