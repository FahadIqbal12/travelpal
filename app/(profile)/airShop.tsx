import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const airShop = () => {
  return (
    <View style={styles.container}>
      <View style={{padding:20,marginTop:40}}>
       <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Airport Shop</Text>
        <View style={{marginTop:100,alignItems:'center'}} >
          <FontAwesome5 name="exclamation-circle" size={50} color="#fff" />
          <Text style={{fontSize:20,fontWeight:'bold',color:"#fff"}} >Service unavailable at the moment.</Text>
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

export default airShop