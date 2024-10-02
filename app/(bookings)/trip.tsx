import React, { useContext, useEffect, useState } from 'react';
import { View,Text,StyleSheet,TouchableOpacity,ScrollView, Alert } from 'react-native';
import { Colors } from '@/constants/Colors';
import Depart from './depart';
import Returning from './returning';
import Loader from '@/components/Loader';
import { Booking,GloboAI,Main } from '@/context';
import { URL } from '@/constants/URL';
import axios from 'axios';
import { useRouter } from 'expo-router';

const trip = () => {
  const main = useContext(Main)
  const g:any = useContext(GloboAI)
  const bkg:any = main.context.trip
  console.log(bkg)

  const router = useRouter()

  const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  const [activeScreen,setActiveScreen] = useState('depart')
  const [loader,setLoader] = useState(false)

  const [depFlights,setDepFlights] = useState([])
  const [retFlights,setRetFlights] = useState([])
  const [selectedDep,setSelectedDep] = useState(null)
  const [selectedRet,setSelectedRet] = useState(null)
  

  const d = new Date(bkg.departure)
  const r = new Date(bkg.returning)
  
  const searchFlights =async(set,from,to,time)=>{
    setLoader(true)
    await axios.post(`${URL}/get-flights`,{
        passengers:Number(bkg.passengers),
        from:from,
        to:to,
        startTime:time
    }).then((res)=>{
      set(res.data)
      setLoader(false)
    }).catch((e)=>{
      console.log(e)
      setLoader(false)
    })
  }

  const handleDone =()=>{
  if(selectedDep !== null){
    if((bkg.route !== 'round trip'&&selectedRet==null)||(bkg.route == 'round trip'&&selectedRet!==null)){
    let data = {
      trip:main.context.trip,
      flights:{departure:selectedDep,returning:selectedRet}
    }
      main.setContext(data)
      router.push({pathname:'/(bookings)/class'})
    }else{
      Alert.alert('Select returning flight')
    }
  }else{
    Alert.alert('Please select flights')
  }
  }

  useEffect(()=>{
    
    searchFlights(setDepFlights,bkg.from.code,bkg.to.code,bkg.departure)
    if(bkg.route == 'round trip')
      {
    searchFlights(setRetFlights,bkg.to.code,bkg.from.code,bkg.returning)
    }
  },[])
  

  return (
    <Booking.Provider value={main.context}>
    <View style={styles.container}>
      <Loader open={loader} />
      <View style={{backgroundColor:Colors.main.dark}} >
        <View style={{marginTop:40,padding:20,paddingBottom:0}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}}>Your Trip</Text>

          <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:20}}>
            <TouchableOpacity onPress={()=>{setActiveScreen('depart')}}>
            <View style={{alignItems:'center',borderBottomWidth:activeScreen=='depart'?3:0,borderColor:Colors.main.text,paddingBottom:20}} >
              <Text style={{color:'grey',fontSize:10}}>{d.getDate()} {month[d.getMonth()]}</Text>
              <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>Departure</Text>
              <Text style={{color:'grey',fontSize:10}}>{selectedDep == null ? '00000':selectedDep.flight_id.substring(0,5).toUpperCase()}, {selectedDep == null ? 'Airline':selectedDep.data.airline}</Text>
            </View>
            </TouchableOpacity>
            <Text style={{color:'grey',fontSize:30}} >|</Text>
            <TouchableOpacity onPress={()=>{bkg.route=='round trip'?setActiveScreen('return'):setActiveScreen('depart')}} >
            <View style={{alignItems:'center',borderBottomWidth:activeScreen=='return'?3:0,borderColor:Colors.main.text,paddingBottom:20}}>
              <Text style={{color:'grey',fontSize:10}}>{r.getDate()} {month[r.getMonth()]}</Text>
              <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>Returning</Text>
              <Text style={{color:'grey',fontSize:10}}>{selectedRet == null ? '00000':selectedRet.flight_id.substring(0,5).toUpperCase()}, {selectedRet == null ? 'Airline':selectedRet.data.airline}</Text>
            </View>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={{width:'100%',padding:10,alignItems:'center',backgroundColor:Colors.main.light,borderRadius:20,marginTop:10,marginBottom:10}} onPress={()=>{handleDone()}}>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}} >Done</Text>
          </TouchableOpacity>
          
        </View>
        <ScrollView>
        {activeScreen=='depart'?<Depart flights={depFlights} setSelected={setSelectedDep}/>:<Returning flights={retFlights} setSelected={setSelectedRet}/>}
        </ScrollView>
        
      </View>
    </View>
    </Booking.Provider>
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

export default trip