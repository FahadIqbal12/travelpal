import React, { useContext, useState } from 'react'
import { View,Text,StyleSheet,TextInput,ScrollView, TouchableOpacity,Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Main, Profile } from '@/context'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import Loader from '@/components/Loader';
import { URL } from '@/constants/URL';
import { useRouter } from 'expo-router';

const book = () => {
    const router = useRouter()
    const main:any = useContext(Main)
    const p:any = useContext(Profile)
    let user_id = p.profile.user_id

   
    const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    const isReturning = main.context.flights.returning==null?false:true
    const depFlight = {flight_id:main.context.flights.departure.flight_id,data:main.context.flights.departure.data}
    const retFlight = main.context.flights.returning!==null?{flight_id:main.context.flights.returning.flight_id,data:main.context.flights.returning.data}:{flight_id:'000000',data:null}
    const trip = main.context.trip
    const depSeat = main.context.seats.departure_seat
    const retSeat = main.context.seats.returning_seat
    const c = main.context.class.name
    const cBenefits = main.context.class.benefits
    const cRate = main.context.class.rate
    const passengers = main.context.trip.passengers

    

    const fee = isReturning==false? [
      {name:`${depFlight.data.from}-${depFlight.data.to}`,value:depFlight.data.price},
      {name:`${c} Fee for ${passengers} passengers`,value:passengers*cRate},
    ]:[
      {name:`${depFlight.data.from}-${depFlight.data.to}`,value:depFlight.data.price},
      {name:`${retFlight.data.from}-${retFlight.data.to}`,value:retFlight.data.price},
      {name:`${c} Fee for ${passengers} passengers`,value:2*(passengers*cRate)}
    ]
    


    const Departure = () =>{
      let dep = new Date(depFlight.data.departure_time)
      let arr = new Date(depFlight.data.arrival_time)
      return(
        <View style={{flexDirection:'row',backgroundColor:Colors.main.dark,justifyContent:'space-between',marginTop:20,padding:20,alignItems:'center',borderWidth:1,borderRadius:20,borderColor:Colors.main.text}}>
          <View>
          <Text style={{color:'grey',fontSize:12}}>{('0'+dep.getDate()).slice(-2)} {month[dep.getMonth()]}, {('0'+dep.getHours()).slice(-2)}:{('0'+dep.getMinutes()).slice(-2)} </Text>
          <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>{depFlight.data.from}</Text>
          <Text style={{fontSize:15,color:'#fff'}}>{trip.from.city}</Text>
          </View>
          <View style={{alignItems:'center'}}>
          <FontAwesome5 name="plane" size={20} color="#fff" />
          <Text style={{color:'#fff',fontSize:10,marginTop:10}} >{depFlight.flight_id.substring(0,5).toUpperCase()} | {(depFlight.data.duration/60).toFixed(2)}h </Text>
          <Text style={{color:'#fff',fontSize:10}}>{depFlight.data.airline}</Text>
          </View>
          <View>
          <Text style={{color:'grey',fontSize:12}}>{('0'+arr.getDate()).slice(-2)} {month[arr.getMonth()]}, {('0'+arr.getHours()).slice(-2)}:{('0'+arr.getMinutes()).slice(-2)}</Text>
          <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>{depFlight.data.to}</Text>
          <Text style={{fontSize:15,color:'#fff'}}>{trip.to.city}</Text>
          </View>
        </View>
      )
    }

    const Return = ()=>{
      let dep = new Date(retFlight.data.departure_time)
      let arr = new Date(retFlight.data.arrival_time)
      return(
        <View style={{flexDirection:'row',backgroundColor:Colors.main.dark,justifyContent:'space-between',marginTop:20,padding:20,alignItems:'center',borderWidth:1,borderRadius:20,borderColor:Colors.main.text}}>
          <View>
          <Text style={{color:'grey',fontSize:12}}>{('0'+dep.getDate()).slice(-2)} {month[dep.getMonth()]}, {('0'+dep.getHours()).slice(-2)}:{('0'+dep.getMinutes()).slice(-2)} </Text>
          <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>{retFlight.data.from}</Text>
          <Text style={{fontSize:15,color:'#fff'}}>{trip.to.city}</Text>
          </View>
          <View style={{alignItems:'center'}}>
          <FontAwesome5 name="plane" size={20} color="#fff" />
          <Text style={{color:'#fff',fontSize:10,marginTop:10}} >{retFlight.flight_id.substring(0,5).toUpperCase()} | {(retFlight.data.duration/60).toFixed(2)}h</Text>
          <Text style={{color:'#fff',fontSize:10}}>{retFlight.data.airline}</Text>
          </View>
          <View>
          <Text style={{color:'grey',fontSize:12}}>{('0'+arr.getDate()).slice(-2)} {month[arr.getMonth()]}, {('0'+arr.getHours()).slice(-2)}:{('0'+arr.getMinutes()).slice(-2)}</Text>
          <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>{retFlight.data.to}</Text>
          <Text style={{fontSize:15,color:'#fff'}}>{trip.from.city}</Text>
          </View>
        </View>
      )
    }

    let t = []

    function adder (myNums:any){
      let sum = 0;
      myNums.forEach( num => {
        sum += num;
      })
    return sum
    }


    const [loader,setLoader] = useState(false)

    let data = {name:[],passport_num:[],age:[]}
    const handlePassengerChange = (index,event,cat)=>{
      if(cat=='name'){
        data.name[index] = event
      } else if (cat == 'passport_num'){
        data.passport_num[index] = event
      } else if (cat == 'age'){
        data.age[index] = event
      }
      
    }


    function makeid(length) {
      let result = '';
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      let counter = 0;
      while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
      }
      return result;
  }


    const handleBooking =async () =>{
     if(data.name.length==passengers&&data.passport_num.length==passengers&&data.age.length==passengers){
      let name = data.name 
      let passport_num = data.passport_num
      let age = data.age 

      let depData = []
      let retData = []

      for (let index = 0; index < name.length; index++) {
        let id = makeid(9)
        if((name[index]&&passport_num[index]&&age[index])!==undefined && (name[index]&&passport_num[index]&&age[index])!==''){
        if(isReturning==false){
        depData.push({passenger_id:id,name:name[index],passport_num:passport_num[index],age:age[index],seats:depSeat[index]})
        }else{
          depData.push({passenger_id:id,name:name[index],passport_num:passport_num[index],age:age[index],seats:depSeat[index]})
          retData.push({passenger_id:id,name:name[index],passport_num:passport_num[index],age:age[index],seats:retSeat[index]})
        }
        }else{
          Alert.alert('Warning','Some fields are missing!')
          break
        }
      }
    
      
      if(isReturning==false){
        setLoader(true)
        axios.post(`${URL}/book-flight`,{
          user_id:user_id,
          flight_id:depFlight.flight_id,
          flight:depFlight.data,
          passengers:depData,
        }).then(async(res)=>{
          let r = cRate*10
          await axios.post(`${URL}/add-credits`,{
            user_id:user_id,
            credits:r,
            title:'Booked one way flight'
          })
          setLoader(false)
          router.push('/(profile)/my-bookings')
       
        }).catch((e)=>{
          Alert.alert('Error','Something went wrong!')
        })
      }else{
        setLoader(true)
        await axios.post(`${URL}/book-flight`,{
          user_id:user_id,
          flight_id:depFlight.flight_id,
          flight:depFlight.data,
          passengers:depData,
        }).then(async()=>{
          await axios.post(`${URL}/book-flight`,{
            user_id:user_id,
            flight_id:retFlight.flight_id,
            flight:retFlight.data,
            passengers:retData,
          }).then(async(res)=>{
            let r = (2*(cRate*10))
            await axios.post(`${URL}/add-credits`,{
              user_id:user_id,
              credits:r,
              title:'Booked round flights'
            })
            setLoader(false)
            router.push('/(profile)/my-bookings')
          }).catch((e)=>{
            Alert.alert('Error','Something went wrong!')
          })
        }).catch((e)=>{
          Alert.alert('Error','Something went wrong!')
        })
      }

     }else{
      Alert.alert('Warning','Some fields might be missing!')
     }
  
    }

  return (
    <ScrollView style={styles.container}>
        <View style={{padding:20,marginTop:40}}>
          <Loader open={loader} />
        <Text style={{fontSize:20,color:'#fff',fontWeight:'bold',textAlign:'center'}}>Book</Text>
        <Departure/>
        {trip.route=='round trip'?<Return/>:''}
        <View style={{marginTop:20}}>
          <View style={{backgroundColor:Colors.main.dark,borderWidth:1,borderColor:Colors.main.text,padding:20,borderRadius:20}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Passenger Details:</Text>
            {depSeat.map((item,index)=>{
             
              return(
                <View key={index} style={{marginBottom:25}}>
                  <View>
                    <TextInput placeholder={`Passenger ${index+1}`} placeholderTextColor={'grey'} style={{width:'100%',color:'#fff',fontWeight:'bold',fontSize:15,borderBottomWidth:1,borderColor:"grey",marginTop:15}} onChangeText={(text)=>{handlePassengerChange(index,text,'name')}}/>
                    <TextInput placeholder={`Passport Number`} placeholderTextColor={'grey'} style={{width:'100%',color:'#fff',fontWeight:'bold',fontSize:15,borderBottomWidth:1,borderColor:"grey",marginTop:15}}  onChangeText={(text)=>{handlePassengerChange(index,text,'passport_num')}}/>
                    <TextInput placeholder={`Age`} placeholderTextColor={'grey'} style={{width:'100%',color:'#fff',fontWeight:'bold',fontSize:15,borderBottomWidth:1,borderColor:"grey",marginTop:15}}  onChangeText={(text)=>{handlePassengerChange(index,text,'age')}}/>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                  <View style={{padding:5}}>
                      <Text style={{fontSize:10,color:'#fff',textAlign:'left'}}>Class:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>{c}</Text>
                    </View>
                    <View style={{padding:5}}>
                      <Text style={{fontSize:10,color:'#fff',textAlign:'left'}}>Departure Seat:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>{depSeat[index]}</Text>
                    </View>
                    <View style={{padding:5}}>
                      <Text style={{fontSize:10,color:'#fff',textAlign:'left'}}>Returning Seat:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>{retSeat.length!==0?retSeat[index]:'N/A'}</Text>
                    </View>
                  </View>
                 
                </View>
              )
            })}
          </View>
            <View style={{padding:20,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,marginTop:20,backgroundColor:Colors.main.dark}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',marginBottom:10}}>Benefits: </Text>
            {cBenefits.map((item,index)=>{
             
              return(
                <View key={index} style={{flexDirection:'row',alignItems:'center'}}>
                  <FontAwesome5 name="diaspora" size={10} color="#fff" />
                  <Text style={{fontSize:15,color:'#fff',marginLeft:5,fontWeight:'bold'}}>{item}</Text>
                </View>
              )
            })}
            </View>
        
          <View style={{marginTop:20,padding:20,borderWidth:1,borderColor:Colors.main.text,backgroundColor:Colors.main.dark,borderRadius:20,borderBottomLeftRadius:0,borderBottomRightRadius:0}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Fee Breakup:</Text>
            <View>
              {fee.map((item,index)=>{
                 t.push(item.value)
                return(
                <View key={index} style={{flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{fontSize:15,color:'grey',marginTop:10}}>{item.name}</Text>
                  <Text style={{fontSize:15,color:'#fff',marginTop:10}}>${item.value}</Text>
                </View>
                )
              })}
            </View>
          </View>
          <View style={{flexDirection:'row',justifyContent:"space-between",padding:20,borderWidth:1,borderColor:Colors.main.text,backgroundColor:Colors.main.dark,borderRadius:20,borderTopLeftRadius:0,borderTopRightRadius:0}} >
              <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Total</Text>
              <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>${adder(t)}</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={()=>{handleBooking()}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>Complete Booking</Text>
          </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
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

export default book