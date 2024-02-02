import React,{useState,useEffect} from 'react';
import { ActivityIndicator,View } from 'react-native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OrderListScreen from "../Screens/OrderListScreen/OrderListScreen";
import OrderDetailsScreen from "../Screens/OrderDetailsScreen/OrderDetailsSreen";
import HeaderComponent from '../Components/HeaderComponent/HeaderComponent';
import { Auth,Hub } from 'aws-amplify';
import SignInScreen from '../Screens/AuthenticationScreens/SignInScreen';
import SignUpScreen from '../Screens/AuthenticationScreens/SignUpScreen';
import ConfirmEmailScreen from '../Screens/AuthenticationScreens/ConfirmEmailScreen';
import ForgetPasswordScreen from '../Screens/AuthenticationScreens/ForgetPasswordScreen';
import NewPasswordScreen from '../Screens/AuthenticationScreens/NewPasswordScreen';

const AuthStack=createNativeStackNavigator();

const AuthStackNavigator=()=>{
    const [user,setUser]=useState(undefined);
    const checkUser=async()=>{
        try{
            const authUser = await Auth.currentAuthenticatedUser({bypassCache:true});
            setUser(authUser);
        }catch(e){
            setUser(null);
        }
    };
    useEffect(()=>{
        checkUser();
    },[]);
    
    useEffect(()=>{
        const listener = data=>{
            if(data.payload.event==='signIn' || data.payload.event==='signOut'){
                checkUser();
            }
        }
        Hub.listen('auth',listener);
        return () => Hub.remove('auth', listener);
    },[]);
    
    if (user===undefined) {
        return(
            <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <ActivityIndicator size={"large"}/>
        </View>
    )
}

return(
    <AuthStack.Navigator screenOptions={{headerShown:false}}>
        {user?(<AuthStack.Screen name ='HomeScreen' component={Navigation}/>
        ):(
            <>
            <AuthStack.Screen name ='SignIn' component={SignInScreen} />
            <AuthStack.Screen name ='SignUp' component={SignUpScreen}/>
            <AuthStack.Screen name ='confirmEmail' component={ConfirmEmailScreen}/>
            <AuthStack.Screen name ='ForgetPassword' component={ForgetPasswordScreen}/>
            <AuthStack.Screen name ='NewPassword' component={NewPasswordScreen}/>
            </>
        )
        }

    </AuthStack.Navigator>
);
};

const Stack = createNativeStackNavigator();

const Navigation = ()=>{
    return(
    <Stack.Navigator screenOptions={{header:()=><HeaderComponent/>}}>
        <Stack.Screen name='OrderList' component={OrderListScreen}/>
        <Stack.Screen name="OrderDetail" component={OrderDetailsScreen}/>
    </Stack.Navigator>
    );
};

export default AuthStackNavigator;