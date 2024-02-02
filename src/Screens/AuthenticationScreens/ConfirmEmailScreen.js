import React, { useState } from 'react';
import { View ,StyleSheet,Text,Alert} from 'react-native';
import CustomButton from '../../Components/AuthenticationComponents/CustomButton';
import CustomInput from '../../Components/AuthenticationComponents/CustomInput';
import { useNavigation, useRoute } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import {Auth} from 'aws-amplify';

const EMAIL_REGEX=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

function ConfirmEmailScreen(props) {
    const route=useRoute();
    const {control ,handleSubmit,watch}=useForm({defaultValues:{username:route?.params?.username}});
    const username=watch('username');
    const [code,setCode]=useState('');

    const navigation = useNavigation();

    const onConfirmPressed=async(data)=>{
try{
await Auth.confirmSignUp(data.username,data.code)
navigation.navigate('SignIn');
}catch(e){
Alert.alert("Oops",e.message)
}

    }
    const onResendCodePressed=async()=>{
try{
await Auth.resendSignUp(username)
Alert.alert("Success",'Code is resent to your mail');
}catch(e){
    Alert.alert("Oops",e.message)
}
    }
    const onSignInPressed=()=>{
        navigation.navigate('SignIn');    }

    return (
       <View style={styles.container}>
        <Text style={styles.title}>Confirm your Email</Text>
        <CustomInput 
        name='username'
        control={control}
        placeholder='Enter Email'
        rules={{required:'Email is required',
               pattern:{value:EMAIL_REGEX,message:"Email is invalid"}}}
        />
        <CustomInput 
        name='code'
        control={control}
        rules={{required:'Confirmation Code is required'}}
        placeholder='Enter your confirmation code' 
        />
        <CustomButton text='Confirm' onPress={handleSubmit(onConfirmPressed)}/>
            <CustomButton text='Resend Code' type='SECONDARY' onPress={onResendCodePressed}/>
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

export default ConfirmEmailScreen;