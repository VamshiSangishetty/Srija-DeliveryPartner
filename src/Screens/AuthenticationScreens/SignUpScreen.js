import React, { useState } from 'react';
import { View,Text,StyleSheet, Alert } from 'react-native';
import CustomButton from '../../Components/AuthenticationComponents/CustomButton';
import CustomInput from '../../Components/AuthenticationComponents/CustomInput';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

function SignUpScreen(props) {

    const {control ,handleSubmit,watch}=useForm();
    const pwd=watch('password');
    const em=watch('username');

    const navigation = useNavigation();

    const onRegisterPressed=async (data)=>{
        const {username,password,email}=data;
        try{
            await Auth.signUp({
                username,
                password,
                attributes:{email}
            });
            navigation.navigate('confirmEmail',{username}); 
        }catch(e){
Alert.alert('Oops',e.message)
        }
    };
const onSignInPressed=()=>{
    navigation.navigate('SignIn');    }
const onConfirmPress=({username})=>{
    navigation.navigate('confirmEmail',{username});    }



    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create an Account</Text>
        <CustomInput 
        name='username'
        control={control}
        placeholder='Enter Email'
        rules={{required:'Email is required',
               pattern:{value:EMAIL_REGEX,message:"Email is invalid"}}}
        />
        <CustomInput 
        name='email'
        control={control}
        placeholder='Confirm Email'
        rules={{required:'Email is required',
        validate:value=>
            value==em|| 'Email do not match'}}
         />
        <CustomInput 
        name='password'
        control={control}
        placeholder='Set Password'
        rules={{required:"Password is required", minLength:{
            value:8,
            message:'Password should be minimum of 8 characters long'
        }}}
        secureTextEntry/>
        <CustomInput 
        name='password-repeat'
        control={control}
        placeholder='Confirm Password'
        rules={{validate:value=>
            value==pwd|| 'Password do not match',
        }}
        secureTextEntry/>
        <CustomButton text='Register'onPress={handleSubmit(onRegisterPressed)}/>
        <CustomButton text='Have an Account? Sign In' type='TERTIARY' onPress={onSignInPressed}/>
        <CustomButton text='Confirm Email' type='TERTIARY' onPress={onConfirmPress}/>
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

export default SignUpScreen;