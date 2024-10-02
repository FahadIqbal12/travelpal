import React, { useContext, useState } from 'react'
import { View,Text,StyleSheet,TextInput,TouchableOpacity,KeyboardAvoidingView, Alert } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import Loader from '@/components/Loader';
import { Link,useNavigation,useRouter } from 'expo-router';
import Cal from '@/components/Calendar';
import AirportList from '@/components/AirportList';
import { Main } from '@/context';

const search = () => {
  const main = useContext(Main)
  const navigation = useNavigation()
  const router = useRouter()

  const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const [depart,setDepart] = useState(new Date());
  const [showDepCal,setShowDepCal] = useState(false);
  const [ret,setRet] = useState(new Date())
  const [showRetCal,setShowRetCal] = useState(false);
  const [route,setRoute] = useState(false)
  
  const [showAirportList,setShowAirportList] = useState(false)
  const [from,setFrom] = useState(null)
  const [to,setTo] = useState(null)
  const [setter,setSetter] = useState('')

  const [passengers,setPassengers] = useState(0)



  const handleSearch = () =>{
    //depart.getTime() -> for coverting new Date() to timestamp
    // 8,63,99,000 milliseconds in one day
    let trip;
    if(from!==null&&to!==null&&passengers!==0){
      
      trip = {
        from:from,to:to,route:route==false?'one way':'round trip',departure:depart.getTime(),returning:ret.getTime(),passengers:passengers
      }

      let data = {
        trip:trip
      }

      main.setContext(data)
      router.push({pathname:'/(bookings)/trip'})
    }
    
  }



  return (
    
   <KeyboardAvoidingView style={styles.container}>
    <Loader open={false} />
    <View style={{marginTop:50,padding:20}}>
      <AirportList visible={showAirportList} setter={setter=='from'?setFrom:setTo} close={()=>{setShowAirportList(false)}}/>
        <View style={{flexDirection:'row',backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text}}>
          <FontAwesome5 name="plane-departure" size={15} color={'#fff'} />
            <View style={{marginLeft:20,width:'90%'}}>
              <Text style={{color:'#fff'}}>From</Text>
              <Text style={{color:from==null?'grey':'#fff',fontSize:20,fontWeight:'bold'}} onPress={()=>{setShowAirportList(true);setSetter('from')}}>{from==null?'New Delhi':`${from.city}, ${from.country}`}</Text>
              
            </View>
        </View>

        <View style={{flexDirection:'row',backgroundColor:'#01021c',padding:20,marginTop:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text}}>
          <FontAwesome5 name="plane-arrival" size={15} color={'#fff'} />
            <View style={{marginLeft:20,width:"90%"}}>
              <Text style={{color:'#fff'}}>To</Text>
              <Text style={{color:to==null?'grey':'#fff',fontSize:20,fontWeight:'bold'}} onPress={()=>{setShowAirportList(true);setSetter('to')}}>{to==null?'Destination':`${to.city}, ${to.country}`}</Text>
            </View>
        </View>

        <View style={{flexDirection:'row',marginTop:20,justifyContent:'center'}}>
          <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:Colors.main.text,backgroundColor:route==true?Colors.main.dark:Colors.main.bg,borderTopLeftRadius:20,borderBottomLeftRadius:20,width:100,alignItems:'center'}} onPress={()=>{setRoute(false)}}>
           <Text style={{color:"#fff",fontWeight:'bold'}}>One way</Text> 
          </TouchableOpacity>
          <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:Colors.main.text,backgroundColor:route==false?Colors.main.dark:Colors.main.bg,borderTopRightRadius:20,borderBottomRightRadius:20,width:100,alignItems:'center'}} onPress={()=>{setRoute(true)}}>
           <Text style={{color:"#fff",fontWeight:'bold'}}>Round Trip</Text> 
          </TouchableOpacity>
        </View>

        <View style={{marginTop:20,backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Text style={{color:'#fff'}}>Depart</Text>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}} onPress={()=>{setShowDepCal(true)}}>{depart.getDate()} {month[depart.getMonth()]}</Text>
            <Cal visible={showDepCal} title='Select Departure Date' setter={setDepart} close={()=>{setShowDepCal(false)}} minDate={new Date()}/>
          </View>
          <FontAwesome5 name="arrow-right" size={24} color="#fff" />
          <View>
            <Text style={{color:'#fff'}}>Return</Text>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}} onPress={()=>{route==true?setShowRetCal(true):setShowRetCal(false)}}>{route==true?`${ret.getDate()} ${month[ret.getMonth()]}`:`N/A`}</Text>
            <Cal visible={showRetCal} title='Select Return Date' setter={setRet} close={()=>{setShowRetCal(false)}} minDate={depart}/>
          </View>
        </View>

        

        <View style={{marginTop:20,backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text,flexDirection:'row',justifyContent:'space-between'}}>
          <View>
            <Text style={{color:'#fff'}}>Passengers</Text>
            <TextInput placeholder='0' placeholderTextColor={'grey'} value={passengers} onChangeText={(text)=>{Number(text)<10?setPassengers(text):Alert.alert('You can select 9 passengers maximum.')}} keyboardType='number-pad' style={{color:'#fff',fontWeight:'bold',fontSize:20,width:200}} />
          </View>
          
          
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{handleSearch()}} >
          <Text style={{color:'#fff',fontSize:15,fontWeight:'bold'}}>Search Flights</Text>
        </TouchableOpacity>

    </View>
   </KeyboardAvoidingView>

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

export default search