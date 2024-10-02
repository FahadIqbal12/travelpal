import React, { useContext, useEffect, useRef, useState } from 'react'
import { View,Text,StyleSheet,TextInput, TouchableOpacity, Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { Profile } from '@/context'
import { URL } from '@/constants/URL'
import Loader2 from './loader2'
import Wakeup from './Wakeup'

const Authentication = () => {
  const profile = useContext(Profile)
  const [active,setActive] = useState('signup')
  const [email,setEmail] = useState(null)
  const [password,setPassword] = useState(null)
  const [loader,setLoader] = useState(false)
  const [wakeup,setWakeup] = useState(true)

  const auth = async(email:string,pass:string,isNewUser:boolean) =>{
    if(email!==null&&pass!==null){
      setLoader(true)
      await axios.post(`${URL}/auth`,{
          email:email,
          password:pass,
          isNewUser:isNewUser 
      }).then((res)=>{
        profile.setProfile(res.data[0])
        setLoader(false)
      }).catch((e)=>{
        console.log(e)
        Alert.alert('Some problem with your email or password')
        setLoader(false)
      })
    }else{
      Alert.alert('Warning','Please enter email and password.')
    }
  }
  
  return (
    <View style={styles.container}>
      <Loader2 open={loader} />
      <Wakeup open={wakeup} close={()=>{setWakeup(false)}}/>
      {active=='signup'?
      <View>
      <View style={{backgroundColor:Colors.main.dark}}>
          <View style={{padding:20,marginTop:80}}>
              <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>Create your Account</Text>
              <Text style={{color:'grey',marginTop:20}}>Trust me, you won't regret this!</Text>
          </View>
        </View>
        <View style={{padding:20,marginTop:10}}>
          <View style={{backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{width:'100%'}}>
              <Text style={{color:'#fff'}}>Email</Text>
              <TextInput placeholder='abc@example.com' placeholderTextColor={'grey'} onChangeText={(text)=>{setEmail(text)}} style={{color:'#fff',fontWeight:'bold',fontSize:20,width:'100%'}} />
            </View>
          </View>
          <View style={{backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text,flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <View style={{width:'100%'}}>
              <Text style={{color:'#fff'}}>Password</Text>
              <TextInput placeholder='password' placeholderTextColor={'grey'}  onChangeText={(text)=>{setPassword(text)}} secureTextEntry style={{color:'#fff',fontWeight:'bold',fontSize:20,width:200}} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>{auth(email,password,true)}}>
            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginTop:50,justifyContent:'center'}}>
            <Text style={{color:'#fff'}}>Already have an account?</Text>
            <Text style={{color:Colors.main.text,marginLeft:5}} onPress={()=>{setActive('signin')}}>Login</Text>
        </View>
    </View>
    :
    <View>
      <View style={{backgroundColor:Colors.main.dark}}>
          <View style={{padding:20,marginTop:80}}>
              <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>Sign in to your Account</Text>
              <Text style={{color:'grey',marginTop:20}}>Woow, you're back!</Text>
          </View>
        </View>
        <View style={{padding:20,marginTop:10}}>
          <View style={{backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{width:'100%'}}>
              <Text style={{color:'#fff'}}>Email</Text>
              <TextInput placeholder='abc@example.com' placeholderTextColor={'grey'} onChangeText={(text)=>{setEmail(text)}} style={{color:'#fff',fontWeight:'bold',fontSize:20,width:200}} />
            </View>
          </View>
          <View style={{backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text,flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
            <View style={{width:'100%'}}>
              <Text style={{color:'#fff'}}>Password</Text>
              <TextInput placeholder='password' placeholderTextColor={'grey'}  onChangeText={(text)=>{setPassword(text)}} secureTextEntry style={{color:'#fff',fontWeight:'bold',fontSize:20,width:200}} />
            </View>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>{auth(email,password,false)}}>
            <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Sign In</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',marginTop:50,justifyContent:'center'}}>
            <Text style={{color:'#fff'}}>Don't have an account?</Text>
            <Text style={{color:Colors.main.text,marginLeft:5}} onPress={()=>{setActive('signup')}}>Register</Text>
        </View>
    </View>}
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#16183D',
      
    },
    button:{
      backgroundColor:'#01021c',
      width:"100%",
      alignItems:'center',
      textAlign:'center',
      padding:20,
      marginTop:50,
      borderWidth:1,
      borderRadius:20,
      borderColor:Colors.main.text
    }
  })

export default Authentication
