import { Flight } from '@/context'
import React, { useContext } from 'react'
import { View,Text,StyleSheet, ScrollView, TouchableOpacity,Image, Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Airports } from '@/constants/Airports'
import { FontAwesome5 } from '@expo/vector-icons'
import QRCode from 'react-native-qrcode-svg'
import axios from 'axios'
import { useRouter } from 'expo-router'
import { URL } from '@/constants/URL'

const ticket = () => {
    const router = useRouter()
    const f:any = useContext(Flight)
    console.log(f.flight)

    let tplogo = require('../../assets/images/tplogo.png')


    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    let bookingId= f.flight.booking_id
    let data = f.flight.data
    let depAirportDetails = Airports[Airports.findIndex(x=>x.code === data.flight.from)]
    let desAirportDetails = Airports[Airports.findIndex(x=>x.code === data.flight.to)]
    let depTime = new Date(data.flight.departure_time)
    let desTime = new Date(data.flight.arrival_time)
    let flightId = data.flight_id.substring(0,5).toUpperCase()
    let barVal = {booking_id:bookingId,flight_id:data.flight_id,user_id:data.user_id}

    const checkpoint = ['Check In','Security','Boarding','On Board','N/A']
    const past_checkpoint = ['Not Checked In','Checked In','Security Done', 'Boarding', 'On Board']

    const currentStatus = past_checkpoint[past_checkpoint.indexOf(data.status)]
    const nextCheckpoint = checkpoint[past_checkpoint.indexOf(data.status)]

    const refresh = async() =>{
      await axios.post(`${URL}/get-specific-bookings`,{booking_id:bookingId}).then((res)=>{
        f.setFlight(res.data)
      }).catch((e)=>{
        console.log(e)
        Alert.alert('Error',"Something went wrong")
      })
    }

  return (
    <View style={styles.container}>
        <View style={{marginTop:30,padding:20}}>
          <View style={{backgroundColor:'#fff',padding:10,borderRadius:20}}>
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <View>
                <Text style={{fontSize:60,fontWeight:'bold',color:Colors.main.bg}}>{depAirportDetails.code}</Text>
                <Text style={{fontSize:10,color:Colors.main.bg,width:100}}>{depAirportDetails.name}</Text>
                </View>

                <View>
                <FontAwesome5 name="plane" size={20} color={Colors.main.bg} />
                <Text style={{fontSize:10,color:Colors.main.bg}}>{(data.flight.duration/60).toFixed(2)}h</Text>
                </View>

                <View>
                <Text style={{fontSize:60,fontWeight:'bold',color:Colors.main.bg}}>{desAirportDetails.code}</Text>
                <Text style={{fontSize:10,color:Colors.main.bg,width:100}}>{desAirportDetails.name}</Text>
                </View>
            </View>

            <View style={{borderWidth:1,borderColor:Colors.main.bg,marginVertical:10}} />

            <View>
              <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>Flight Details:</Text>
              <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap'}}>

                <View style={{width:'45%',marginTop:10}}>
                  <Text style={{fontSize:15,color:'grey'}}>Departure:</Text>
                  <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{('0'+depTime.getDate()).slice(-2)} {month[depTime.getMonth()]} {('0'+depTime.getHours()).slice(-2)}:{('0'+depTime.getMinutes()).slice(-2)}</Text>
                </View>

                <View style={{width:'45%',marginTop:10}}>
                  <Text style={{fontSize:15,color:'grey'}}>Arrival:</Text>
                  <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{('0'+desTime.getDate()).slice(-2)} {month[desTime.getMonth()]} {('0'+desTime.getHours()).slice(-2)}:{('0'+desTime.getMinutes()).slice(-2)}</Text>
                </View>

                <View style={{width:'45%',marginTop:10}}>
                  <Text style={{fontSize:15,color:'grey'}}>Flight:</Text>
                  <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{flightId}</Text>
                </View>

                <View style={{width:'45%',marginTop:10}}>
                  <Text style={{fontSize:15,color:'grey'}}>Passengers:</Text>
                  <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{data.passengers.length}</Text>
                </View>

                <View style={{width:'45%',marginTop:10}}>
                  <Text style={{fontSize:15,color:'grey'}}>Terminal:</Text>
                  <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{Math.floor(Math.random() * 11)}</Text>
                </View>

                <View style={{width:'45%',marginTop:10}}>
                  <Text style={{fontSize:15,color:'grey'}}>Gate:</Text>
                  <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{Math.floor(Math.random() * 30)}</Text>
                </View>
              </View>
            </View>

            <View style={{borderWidth:1,borderColor:Colors.main.bg,marginVertical:10}} />

            <View>
              <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>Passenger Details:</Text>
              <ScrollView style={{height:100}}>
              {data.passengers.map((item,index)=>{
                return(
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:10}} key={index}>
                    <View>
                      <Text style={{fontSize:15,color:'grey'}}>Name:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{item.name}</Text>
                    </View>
                    <View>
                      <Text style={{fontSize:15,color:'grey'}}>Seat:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{item.seats}</Text>
                    </View>
                  </View>
                )
              })}
              </ScrollView>
            </View>
            <View style={{borderWidth:1,borderColor:Colors.main.bg,marginVertical:10}} />
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
            <TouchableOpacity>
            <QRCode 
            value={JSON.stringify(barVal)}
            size={150}
            />
            </TouchableOpacity>
            <View>
              <View>
              <Text style={{fontSize:15,color:'grey'}}>Next checkpoint:</Text>
              <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{nextCheckpoint}</Text>
              </View>
              <View style={{marginTop:10}}>
              <Text style={{fontSize:15,color:'grey'}}>Current Status:</Text>
              <Text style={{fontSize:20,fontWeight:'bold',color:Colors.main.bg}}>{currentStatus}</Text>
              </View>
            </View>
            </View>
          </View>
          
        </View>
        <View style={{padding:20,position:'absolute',bottom:1,width:'100%'}}>
          <View style={{flexDirection:'row',backgroundColor:Colors.main.dark,padding:10,justifyContent:'space-between',borderWidth:1,borderRadius:20,borderColor:Colors.main.text}} >
          <TouchableOpacity style={{width:50,height:50,borderWidth:1,borderColor:Colors.main.text,borderRadius:50,alignItems:"center",justifyContent:'center'}} onPress={()=>{router.push('/(flight)/flightShop')}}>
            <FontAwesome5 name="shopping-bag" size={20} color={Colors.main.text} />
          </TouchableOpacity>

          <TouchableOpacity style={{width:50,height:50,borderWidth:1,borderColor:Colors.main.text,borderRadius:50,alignItems:"center",justifyContent:'center'}} onPress={()=>{router.push('/(flight)/ai')}}>
            <Image source={require('../../assets/images/201.gif')} style={{width:35,height:35,borderRadius:100}}/>
          </TouchableOpacity>

          <TouchableOpacity style={{width:50,height:50,borderWidth:1,borderColor:Colors.main.text,borderRadius:50,alignItems:"center",justifyContent:'center'}} onPress={()=>{router.push('/(flight)/BagTrack')}}>
            <FontAwesome5 name="luggage-cart" size={20} color={Colors.main.text} />
          </TouchableOpacity>

          <TouchableOpacity style={{width:50,height:50,borderWidth:1,borderColor:Colors.main.text,borderRadius:50,alignItems:"center",justifyContent:'center'}} onPress={()=>{refresh()}}>
            <FontAwesome5 name="spinner" size={20} color={Colors.main.text} />
          </TouchableOpacity>
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
  

export default ticket