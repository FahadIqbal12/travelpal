import React, { useContext, useState } from 'react'
import { View,Text,StyleSheet,Image, ScrollView, TouchableOpacity } from 'react-native'
import { Main } from '@/context'
import { Colors } from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'


const Class = () => {
const main:any = useContext(Main)
let trip = main.context.trip

const router = useRouter()

    const classes = [
        {name:'Economy',rate:0,benefits:['Earn 100 credits','Flexibility to make 1 changes', 'Cancellation within 1 hours for free','1 Checked bags- 12kg','1 Handbag - 7kg','Seat Selection']},
        {name:'Premium',rate:50,benefits:['Earn 600 credits','Flexibility to make 2 changes', 'Cancellation within 24 hours for free','2 Checked bags- 12 kg x 2','1 Handbag - 7kg','Seat Selection']},
        {name:'Business',rate:100,benefits:['Earn 1000 credits','Flexibility to make 4 changes', 'Cancellation within 48 hours for free','3 Checked bags- 15 kg x 3','1 Handbag - 7kg','Seat Selection']}
    ]

    

    const handleSelect = (item) =>{
     
        let data = {
            trip:main.context.trip,
            flights:main.context.flights,
            class:item
          }
          main.setContext(data)
          router.push({pathname:'/(bookings)/seat'})
    }

  return (
    <View style={styles.container}>
        <View style={{marginTop:40,padding:20}}>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{trip.from.code} </Text>
                <FontAwesome5 name="arrow-right" size={15} color="#fff" />
                <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}> {trip.to.code}</Text>
                
            </View>
            <View style={{marginTop:30,alignItems:'center'}}>
            <Image source={require('../../assets/images/class.gif')} style={{width:250,height:300}}/>
            </View>
            <ScrollView horizontal={true} style={{marginTop:30}}>
                {classes.map((item,index)=>{
                    return(
                        <View key={index} style={{width:300,padding:20,borderWidth:1,margin:10,backgroundColor:Colors.main.dark,borderColor:Colors.main.text,borderRadius:20}}>
                            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{item.name}</Text>
                            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>+ ${item.rate}</Text>
                            </View>
                            <View style={{marginTop:20}}>
                            {item.benefits.map((i,num)=>{
                                return(
                                    <View key={num} style={{marginBottom:20}}>
                                        <Text style={{fontSize:15,color:'#fff'}}>- {i}</Text>
                                    </View>
                                )
                            })}
                            </View>
                            <TouchableOpacity style={{alignItems:'center',width:'100%',backgroundColor:Colors.main.light,padding:10,borderRadius:10}} onPress={()=>{handleSelect(item)}}>
                                <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Select</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </ScrollView>
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

export default Class