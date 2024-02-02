import React from 'react';
import { Controller } from 'react-hook-form';
import { View,TextInput,StyleSheet,Text } from 'react-native';

function CustomInput({rules={},control,name,placeholder,secureTextEntry,rightIcon}) {
    return (
        <Controller
        control={control}
        name={name}
        rules={rules}
        render={({field:{value,onChange,onBlur},fieldState:{error}})=>(
            <>
            <View style={[styles.container,{borderColor:error?'red':'#e8e8e8'}]}>
            <TextInput 
            placeholder={placeholder}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            secureTextEntry={secureTextEntry}
            style={styles.input}/>
      </View>
            {error && (
            <Text style={{color:"red",alignSelf:"stretch"}}>{error.message||'Error'}</Text>
            )}
            </>
        )}
        />
    );
}

const styles = StyleSheet.create({
    container:{
    backgroundColor:"white",
    width:"100%",
    borderColor:"#e8e8e8",
    borderWidth:1,
    borderRadius:5,
    padding:12,
    marginVertical:5,
    },
    input:{
fontSize:15
    }
})

export default CustomInput;