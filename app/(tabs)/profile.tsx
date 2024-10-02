import React, { useContext } from 'react'
import { View,Text,StyleSheet,Image, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useRouter } from 'expo-router';
import { Profile } from '@/context';

const profile = () => {
  const router = useRouter()
  const p:any = useContext(Profile)

  let name = p.profile.user_data.name
  let email = p.profile.user_data.email

  let options = [
    {name:'Account',url:'/account',icon:'user-alt'},
    {name:'Wallet',url:'/wallet',icon:'wallet'},
    {name:'My Bookings',url:'/my-bookings',icon:'book'},
    {name:'Airport Shop',url:'/airShop',icon:'shopping-bag'},
    {name:'Airport Lounge',url:'/airLounge',icon:'hotel'},
  ]
  let options2 = [
    {name:'Notifications',icon:'bell'},
    {name:'Change password',icon:'asterisk'},
    {name:'Logout',icon:'sign-out-alt'},
    
  ]

  return (
   <View style={styles.container}>
    <View style={{padding:20,marginTop:50}}>
      <View style={{alignItems:'center'}}>
          <Image source={{uri:'https://cdn-icons-png.freepik.com/512/219/219988.png'}} style={{width:80,height:80}}/>
          <Text style={{fontSize:25,fontWeight:'bold',color:'#fff',marginTop:10}} >{name || 'User'}</Text>
          <Text style={{color:'grey',fontSize:12}}>{email}</Text>
      </View>
      <View style={{marginTop:20,backgroundColor:Colors.main.dark,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,alignItems:'center'}}>
        {options.map((item,index)=>{
          return(
            <TouchableOpacity key={index} style={{flexDirection:'row',padding:20,borderBottomWidth:index==4?0:1,borderColor:'grey',justifyContent:'space-between',width:'90%'}} onPress={()=>{router.push(`/(profile)${item.url}`)}}>
              <View style={{flexDirection:'row'}}>
              <FontAwesome5 name={item.icon} size={20} color="#fff" />
              <Text style={{fontSize:16,fontWeight:'bold',color:'#fff',marginLeft:10}}>{item.name}</Text>
              </View>
              <FontAwesome5 name="arrow-right" size={20} color="#fff" />
            </TouchableOpacity>
          )
        })}
      </View>
      <View style={{marginTop:20,backgroundColor:Colors.main.dark,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,alignItems:'center'}}>
        {options2.map((item,index)=>{
          return(
            <TouchableOpacity key={index} style={{flexDirection:'row',padding:20,borderBottomWidth:index==2?0:1,borderColor:'grey',justifyContent:'space-between',width:'90%'}} >
              <View style={{flexDirection:'row'}}>
              <FontAwesome5 name={item.icon} size={20} color={index==2?"red":"#fff"} />
              <Text style={{fontSize:16,fontWeight:'bold',color:index==2?"red":"#fff",marginLeft:10}}>{item.name}</Text>
              </View>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
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
    marginTop:20,
    borderWidth:1,
    borderRadius:20,
    borderColor:Colors.main.text
  }
})

export default profile