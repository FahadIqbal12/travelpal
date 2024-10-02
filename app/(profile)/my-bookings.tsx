import React, { useContext, useEffect, useState } from 'react'
import { View,Text, Alert,StyleSheet, TouchableOpacity,ScrollView } from 'react-native'
import axios from 'axios'
import { URL } from '@/constants/URL'
import { Flight, Profile } from '@/context'
import Loader2 from '@/components/loader2'
import { Colors } from '@/constants/Colors'
import { Airports } from '@/constants/Airports'
import { FontAwesome5 } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const MyBookings = () => {
  const router = useRouter()
  const f:any = useContext(Flight)
  const p:any = useContext(Profile)
  let user_id = p.profile.user_id
  console.log(f)
  const [bookings,setBookings] = useState(null)
  const [loader,setLoader] = useState(true)

  const fetchBookings = async() =>{
    setLoader(true)
    await axios.post(`${URL}/get-bookings`,{
      user_id:user_id
    }).then((res)=>{
      setLoader(false)
      setBookings(res.data)
    }).catch((e)=>{
      Alert.alert('Error','Something went wrong!')
      console.log(e)
      setLoader(false)
    })
  }

  useEffect(()=>{
    fetchBookings()
    
  },[])


  const handlePress = (item:any,id:string) =>{
    f.setFlight({data:item,booking_id:id})
    router.push('/(flight)/ticket')
  }


  return (
    <View style={styles.container}>
      <Loader2 open={loader} />
        <View style={{padding:20,marginTop:40}} >
          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}} >My Bookings</Text>
          <ScrollView>
          {
            bookings!==null
            ?
            bookings.map((i,index)=>{
              let id = i.booking_id
              let item = i.data
              let f_id = item.flight_id.substring(0,5).toUpperCase()
              let dur = (item.flight.duration/60).toFixed(2)
              let bk = new Date(item.createdAt)
              let bkDate = `${('0'+bk.getDate()).slice(-2)}.${('0'+bk.getMonth()).slice(-2)}.${bk.getFullYear()}`
              let depTime = new Date(item.flight.departure_time)
              let departure_time = `On ${('0'+depTime.getDate()).slice(-2)}.${('0'+depTime.getMonth()).slice(-2)}.${('0'+depTime.getFullYear()).slice(-2)}, at ${('0'+depTime.getHours()).slice(-2)}:${('0'+depTime.getMinutes()).slice(-2)}`
              let arrTime = new Date(item.flight.arrival_time)
              let arrival_time = `On ${('0'+arrTime.getDate()).slice(-2)}.${('0'+arrTime.getMonth()).slice(-2)}.${('0'+arrTime.getFullYear()).slice(-2)}, at ${('0'+arrTime.getHours()).slice(-2)}:${('0'+arrTime.getMinutes()).slice(-2)}`
              return(
                <TouchableOpacity key={index} style={{marginTop:20}} onPress={()=>{handlePress(item,id)}}>
                   <View style={{backgroundColor:Colors.main.dark,padding:20,borderRadius:20,borderBottomLeftRadius:0,borderBottomRightRadius:0,borderWidth:1,borderColor:Colors.main.text}}>
                      <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
                        <View>
                        <Text style={{fontWeight:'bold',fontSize:40,color:'#fff'}}>{item.flight.from}</Text>
                        </View>
                        <FontAwesome5 name="plane" size={20} color="#fff" />
                        <View>
                        <Text style={{fontWeight:'bold',fontSize:40,color:'#fff'}}>{item.flight.to}</Text>
                        </View>
                      </View>
                      <View>
                        <Text style={{color:'#fff',textAlign:'center',fontSize:10}}>{f_id} | {item.flight.airline} | {dur}h</Text>
                      </View>
                      <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}}>
                        <View>
                          <Text style={{color:'#fff',fontWeight:'bold'}}>Departure:</Text>
                          <Text style={{color:'#fff',fontSize:10}}>{departure_time}</Text>
                        </View>
                        <View>
                          <Text style={{color:'#fff',fontWeight:'bold',textAlign:'right'}}>Arrival:</Text>
                          <Text style={{color:'#fff',fontSize:10}}>{arrival_time}</Text>
                        </View> 
                      </View>
                    </View>
                    <View style={{flexDirection:'row',justifyContent:'space-between',padding:20,backgroundColor:Colors.main.dark,borderBottomLeftRadius:20,borderBottomRightRadius:20,borderWidth:1,borderTopWidth:0,borderColor:Colors.main.text}}>
                      <Text style={{color:'#fff',fontSize:12}}>Booked on: {bkDate}</Text>
                      <Text style={{color:Colors.main.text,fontWeight:'bold',fontSize:12}}>{item.status}</Text>
                    </View>
                  </TouchableOpacity>
              )
            })
            
            :
            <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
              <FontAwesome5 name="exclamation-circle" size={50} color="#fff" />
              <Text style={{color:'#fff',marginTop:10}}>No bookings found</Text>
            </View>
          }
          
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



export default MyBookings