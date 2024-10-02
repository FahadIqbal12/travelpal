import { GloboAI, Profile } from '@/context'
import React, { useContext, useEffect, useState } from 'react'
import { View,Text,StyleSheet, TouchableOpacity,TextInput,ScrollView,Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import axios from 'axios';
import { URL } from '@/constants/URL';
import { useRouter } from 'expo-router';
import Loader from '@/components/Loader';

const AiBook = () => {
  const router = useRouter()
  const p:any = useContext(Profile)
  const g:any = useContext(GloboAI) 

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  console.log(p.profile)
  let data = g.globoAi.d
  const trip = g.globoAi.r
  const profile = p.profile

  let i = data.findIndex(x=>x.data.airline===profile.user_data.travelPrefrences.airline)
  let depFlight = data[i]

  const [passengers,setPassengers] = useState([{name:profile.user_data.name,passport_num:profile.user_data.passport_number,age:profile.user_data.age}])
  const [newPassenger,setNewPassenger] = useState({name:'',passport_num:'',age:18})
  const [loader,setLoader] = useState(false)


  const upadtePassengersName = (i,newName) =>{
    setPassengers(array=>array.map((item,index)=>
      index==i?{...item,name:newName}:item
    ))
  }
  const upadtePassengersPassNum = (i,passNum) =>{
    setPassengers(array=>array.map((item,index)=>
      index==i?{...item,passport_num:passNum}:item
    ))
  }
  const upadtePassengersAge = (i,newAge) =>{
    setPassengers(array=>array.map((item,index)=>
      index==i?{...item,age:newAge}:item
    ))
  }
  const classes = [
    {name:'Economy',rate:0,benefits:['Earn 100 credits','Flexibility to make 1 changes', 'Cancellation within 1 hours for free','1 Checked bags- 12kg','1 Handbag - 7kg','Seat Selection']},
    {name:'Premium',rate:50,benefits:['Earn 600 credits','Flexibility to make 2 changes', 'Cancellation within 24 hours for free','2 Checked bags- 12 kg x 2','1 Handbag - 7kg','Seat Selection']},
    {name:'Business',rate:100,benefits:['Earn 1000 credits','Flexibility to make 4 changes', 'Cancellation within 48 hours for free','3 Checked bags- 15 kg x 3','1 Handbag - 7kg','Seat Selection']}
  ]

  let selectedClass = classes[classes.findIndex(x=>x.name.toLowerCase()===profile.user_data.travelPrefrences.class.toLowerCase())]

  const fee = [
    {name:`${depFlight.data.from} - ${depFlight.data.to}`,value:depFlight.data.price},
    {name:`${selectedClass.name} Fee for ${passengers.length} passengers`,value:passengers.length*selectedClass.rate},
  ]

  let t = []

    function adder (myNums:any){
      let sum = 0;
      myNums.forEach( num => {
        sum += num;
      })
    return sum
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
        let depData = []
        for (let index = 0; index < passengers.length; index++) {
          let id = makeid(9)
          if(passengers[index].name!==''&&passengers[index].passport_num!==''&&passengers[index].age!==''){
          depData.push({passenger_id:id,name:passengers[index].name,passport_num:passengers[index].passport_num,age:passengers[index].age,seats:'A5'})
          }else{
            Alert.alert('Warning','Some fields are missing!')
            break
          }
        }
        
        if(depData.length == passengers.length){
          setLoader(true)
          axios.post(`${URL}/book-flight`,{
            user_id:profile.user_id,
            flight_id:depFlight.flight_id,
            flight:depFlight.data,
            passengers:depData
          }).then(async(res)=>{
            let r = (selectedClass.rate*10)
            await axios.post(`${URL}/add-credits`,{
              user_id:profile.user_id,
              credits:r,
              title:'Booked one way flight'
            })
            setLoader(false)
            router.push('/(profile)/my-bookings')
         
          }).catch((e)=>{
            setLoader(false)
            Alert.alert('Error','Something went wrong!')
          })
        }
    }
  
  useEffect(()=>{
   console.log(passengers) 
   
  })


  const Departure = () =>{
    let dep = new Date(depFlight.data.departure_time)
    let arr = new Date(depFlight.data.arrival_time)
    return(
      <View style={{flexDirection:'row',backgroundColor:Colors.main.dark,justifyContent:'space-between',marginTop:20,padding:20,alignItems:'center',borderWidth:1,borderRadius:20,borderColor:Colors.main.text}}>
        <View>
        <Text style={{color:'grey',fontSize:12}}>{('0'+dep.getDate()).slice(-2)} {month[dep.getMonth()]}, {('0'+dep.getHours()).slice(-2)}:{('0'+dep.getMinutes()).slice(-2)} </Text>
        <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>{depFlight.data.from}</Text>
        <Text style={{fontSize:15,color:'grey'}}>{trip.depCity}</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <FontAwesome5 name="plane" size={20} color="#fff" />
        <Text style={{color:'#fff',fontSize:10,marginTop:10}} >{depFlight.flight_id.substring(0,5).toUpperCase()} | {(depFlight.data.duration/60).toFixed(2)}h </Text>
        <Text style={{color:'#fff',fontSize:10}}>{depFlight.data.airline}</Text>
        </View>
        <View>
        <Text style={{color:'grey',fontSize:12}}>{('0'+arr.getDate()).slice(-2)} {month[arr.getMonth()]}, {('0'+arr.getHours()).slice(-2)}:{('0'+arr.getMinutes()).slice(-2)}</Text>
        <Text style={{fontSize:40,fontWeight:'bold',color:'#fff'}}>{depFlight.data.to}</Text>
        <Text style={{fontSize:15,color:'grey'}}>{trip.desCity}</Text>
        </View>
      </View>
    )
  }


  return (
    <ScrollView style={styles.container}>
      <Loader open={loader} />
        <View style={{padding:20,marginTop:40}}>
          <Departure/>
          <View style={{marginTop:20,flexDirection:'row',justifyContent:'space-between',alignItems:'center'}} >
            <Text style={{fontWeight:'bold',color:'#fff',fontSize:20}}>Passenger Details:</Text>
            <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:Colors.main.text,borderRadius:10}} onPress={()=>{setPassengers((passengers)=>[...passengers,newPassenger])}}>
              <Text style={{fontSize:15,fontWeight:'bold',color:'#fff'}}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {passengers.map((item,index)=>{
            return(
              <View key={index} style={{marginBottom:0}}>
                  <View>
                    <TextInput placeholder={`Passenger ${index+1}`} placeholderTextColor={'grey'} style={{width:'100%',color:'#fff',fontWeight:'bold',fontSize:15,borderBottomWidth:1,borderColor:"grey",marginTop:15}} value={item.name} onChangeText={(text)=>{upadtePassengersName(index,text)}}/>
                    <TextInput placeholder={`Passport Number`} placeholderTextColor={'grey'} style={{width:'100%',color:'#fff',fontWeight:'bold',fontSize:15,borderBottomWidth:1,borderColor:"grey",marginTop:15}} value={item.passport_num} onChangeText={(text)=>{upadtePassengersPassNum(index,text)}}/>
                    <TextInput placeholder={`Age`} placeholderTextColor={'grey'} style={{width:'100%',color:'#fff',fontWeight:'bold',fontSize:15,borderBottomWidth:1,borderColor:"grey",marginTop:15}} value={item.age.toString()} keyboardType='numeric' onChangeText={(text)=>{upadtePassengersAge(index,text)}}/>
                  </View>
                  <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
                  <View style={{padding:5}}>
                      <Text style={{fontSize:10,color:'#fff',textAlign:'left'}}>Class:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>{profile.user_data.travelPrefrences.class}</Text>
                    </View>
                    <View style={{padding:5}}>
                      <Text style={{fontSize:10,color:'#fff',textAlign:'left'}}>Departure Seat:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>A5</Text>
                    </View>
                    <View style={{padding:5}}>
                      <Text style={{fontSize:10,color:'#fff',textAlign:'left'}}>Returning Seat:</Text>
                      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>{'N/A'}</Text>
                    </View>
                  </View>
                 
                </View>
            )
          })}
          <View style={{padding:20,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,marginTop:20,backgroundColor:Colors.main.dark}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',marginBottom:10}}>Benefits: </Text>
            {selectedClass.benefits.map((item,index)=>{
             
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
    padding:20,
    marginTop:20,
    borderWidth:1,
    borderRadius:20,
    borderColor:Colors.main.text
  }
})


export default AiBook