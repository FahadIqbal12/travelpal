import React,{useEffect, useState} from 'react'
import { View,Text,StyleSheet,ScrollView,TouchableOpacity,ActivityIndicator,Image } from 'react-native'
import { Colors } from '@/constants/Colors'

const Returning = (props:{flights:any,setSelected:any}) => {

  const [flights,setFlights] = useState(props.flights)
  const [num,setnum] = useState(null)

  useEffect(()=>{
    setFlights(flights)
  })

  return (
    <ScrollView style={styles.container}>
       
          {flights.length !== 0?flights.map((item,index)=>{
            let i = item.data
            let dt = `${('0'+new Date(i.departure_time).getHours()).slice(-2)} : ${('0'+new Date(i.departure_time).getMinutes()).slice(-2)}`
            let at = `${('0'+new Date(i.arrival_time).getHours()).slice(-2)} : ${('0'+new Date(i.arrival_time).getMinutes()).slice(-2)}`
            let flight_id = item.flight_id.substring(0,5).toUpperCase()
            return(
              <TouchableOpacity key={index} style={{marginTop:10,backgroundColor:index!==num?Colors.main.dark:Colors.main.bg,borderWidth:1,borderColor:Colors.main.text,borderRadius:20}} onPress={()=>{props.setSelected(item);setnum(index)}}>
                <View style={{flexDirection:"row",justifyContent:'space-between',padding:20}}>
                  <View>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>{dt}</Text>
                    <Text style={{color:'grey'}}>{i.from}</Text>
                  </View>
                  <View style={{alignItems:'center'}}>
                    <View style={{padding:5,backgroundColor:'#fff',width:30,height:30,alignItems:'center',justifyContent:"center",borderRadius:20}}>
                      <Image source={{uri:i.airline_logo}} style={{width:20,height:20}} />
                    </View>
                    <Text style={{color:'grey',fontSize:10,marginTop:10}}>Non Stop | {(i.duration/60).toFixed(2)}h | {i.aircraft}</Text>
                  </View>
                  <View>
                    <Text style={{color:'#fff',fontWeight:'bold',fontSize:20}}>{at}</Text>
                    <Text style={{color:'grey',textAlign:'right'}}>{i.to}</Text>
                  </View>
                </View>
                <View style={{borderTopWidth:1,borderColor:Colors.main.text}}>
                  <View style={{padding:20,flexDirection:'row',justifyContent:'space-between'}}>
                  <Text style={{color:'#fff'}}>{flight_id}</Text>
                  <Text style={{color:'grey'}}>{i.airline}</Text>
                  <Text style={{color:'#fff',fontWeight:'bold'}}>$ {i.price} +</Text>
                  </View>
                </View>
                  
              </TouchableOpacity>
            )
          }):<Text style={{color:'#fff',textAlign:'center'}}>No Flights Found</Text>}
          
    
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#16183D',
    padding:10,
    marginBottom:300
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
export default Returning