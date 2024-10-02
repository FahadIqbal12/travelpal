import React from 'react'
import { View,Text,Modal,StyleSheet,TextInput,TouchableOpacity,ScrollView } from 'react-native'
import { Airports } from '@/constants/Airports'
import { Colors } from '@/constants/Colors'


const AirportList = (props:{visible:boolean,input:string,setter:any,close:any}) => {


  return (
   <Modal visible={props.visible}>
    <View style={styles.container}>
        <View style={{padding:20}}>
            <TextInput placeholder='Enter city' placeholderTextColor={'grey'} style={{backgroundColor:Colors.main.dark,borderWidth:1,borderColor:Colors.main.text,height:60,borderRadius:20,color:'#fff',padding:10}}/>
            <ScrollView style={{marginBottom:50}}>
                {Airports.map((item,index)=>{
                    return(
                        <TouchableOpacity key={index} style={{marginTop:10,borderBottomWidth:1,borderColor:'grey',padding:10}} onPress={()=>{props.setter(item);props.close()}}>
                            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{item.city}, {item.country}</Text>
                            <Text style={{color:'grey'}}>{item.name} ({item.code})</Text>
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </View>
    </View>
   </Modal>
  )
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      backgroundColor:'#16183D',
  
    },
    
  })

export default AirportList