import React, { useContext, useState } from 'react'
import { View,Text,StyleSheet, TouchableOpacity,ScrollView, Alert} from 'react-native'
import { Main } from '@/context'
import { Colors } from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import {  useRouter } from 'expo-router'

const Seat = () => {
  const router = useRouter()
 const main:any = useContext(Main)



 const month = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
 let r = main.context.flights.returning
 const depDate = new Date(main.context.trip.departure)
 const retDate = new Date(main.context.trip.returning)
 const depFlight = {flight_id:main.context.flights.departure.flight_id,airline:main.context.flights.departure.data.airline}
 const retFlight = main.context.flights.returning!==null?{flight_id:main.context.flights.returning.flight_id,airline:main.context.flights.returning.data.airline}:{flight_id:'000000',airline:'Airline'}
 const depSeatMap = main.context.flights.departure.data.seats_map
 const retSeatMap = main.context.flights.returning!==null?main.context.flights.departure.data.seats_map:[]
 const passengers = main.context.trip.passengers
 const c = main.context.class.name.substring(0,3).toLowerCase()


 const [selected,setSelected] = useState('depart')


 const [selectedDepSeat,setSelectedDepSeat] = useState([])
 const [selectedRetSeat,setSelectedRetSeat] = useState([])

 const handleDone = () =>{
  if(selectedDepSeat.length ==passengers){
    if((main.context.flights.returning!==null && selectedRetSeat.length == passengers)||( main.context.flights.returning==null&&selectedRetSeat.length==0)){
      let data = {
        trip:main.context.trip,
        flights:main.context.flights,
        class:main.context.class,
        seats:{departure_seat:selectedDepSeat,returning_seat:selectedRetSeat}
      }
      main.setContext(data);
      router.push({pathname:'/(bookings)/book'})
    }
  
  }else{
    Alert.alert('Alert',`Please select seat(s) for ${passengers} people.`)
  }
 }


 const Depart = () =>{
  return(
    <View style={{padding:20}}>
    <ScrollView style={{marginBottom:300}}>
      <View style={{marginBottom:20,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color="#ffd800" />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Business Class</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color="#e1ff00" />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Premium Class</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color="#fff" />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Economy</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color={Colors.main.text} />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Selected</Text>
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row'}}>
      {
        depSeatMap[0].left.map((item,index)=>{
          let row = item.row
          return(
            <View key={index} style={{margin:5,alignItems:'center'}}>
              <Text style={{color:'#fff'}}>{item.col}</Text>
              {row.map((i,n)=>{
                let seat = `${item.col}${n+1}`
                const handleSelect=()=>{
                  if(selectedDepSeat.length !== passengers && selectedDepSeat.length < passengers){
                   if(c=='bus'){
                      if(n<2){
                        setSelectedDepSeat([...selectedDepSeat,`${item.col}${n+1}`])
                      }else{
                        Alert.alert('Please select seat from the business class')
                      }
                   }else if(c=='pre'){
                    if(n<8&&n>=2){
                      setSelectedDepSeat([...selectedDepSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the premium class')
                    }
                   }else if(c=='eco'){
                    if(n>7){
                      setSelectedDepSeat([...selectedDepSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the economy class')
                    }
                   } 
                  

                }
                
                }

                return(
                  <TouchableOpacity key={n} style={{backgroundColor:selectedDepSeat.includes(seat)?Colors.main.text:(n<8&&n>=2?'#e1ff00':n<2?'#ffd800':'#fff'),marginTop:(n==8?30:n==2?30:10),width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:5}} onPress={()=>{handleSelect()}}>
                      <Text>{item.col}{n+1}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        })
      }
      </View>
      <View style={{flexDirection:'row'}}>
      {
        depSeatMap[0].right.map((item,index)=>{
          let row = item.row
          return(
            <View key={index} style={{margin:5,alignItems:'center'}}>
              <Text style={{color:'#fff'}}>{item.col}</Text>
              {row.map((i,n)=>{
                let seat = `${item.col}${n+1}`
                const handleSelect=()=>{
                  if(selectedDepSeat.length !== passengers && selectedDepSeat.length < passengers){
                   if(c=='bus'){
                      if(n<2){
                        setSelectedDepSeat([...selectedDepSeat,`${item.col}${n+1}`])
                      }else{
                        Alert.alert('Please select seat from the business class')
                      }
                   }else if(c=='pre'){
                    if(n<8&&n>=2){
                      setSelectedDepSeat([...selectedDepSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the premium class')
                    }
                   }else if(c=='eco'){
                    if(n>7){
                      setSelectedDepSeat([...selectedDepSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the economy class')
                    }
                   } 
                  

                }
                console.log(selectedDepSeat)
                }
                return(
                  <TouchableOpacity key={n} style={{backgroundColor:selectedDepSeat.includes(seat)?Colors.main.text:(n<8&&n>=2?'#e1ff00':n<2?'#ffd800':'#fff'),marginTop:(n==8?30:n==2?30:10),width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:5}} onPress={()=>{handleSelect()}}>
                      <Text>{item.col}{n+1}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        })
      }
      </View>
    </View>
    </ScrollView>
    </View>
  )
 }

 const Return = ()=>{
  return(
    <View style={{padding:20}}>
    <ScrollView style={{marginBottom:300}}>
      <View style={{marginBottom:20,flexDirection:'row',flexWrap:'wrap',justifyContent:'space-around'}}>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color="#ffd800" />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Business Class</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color="#e1ff00" />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Premium Class</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color="#fff" />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Economy</Text>
        </View>
        <View style={{flexDirection:'row',alignItems:'center',width:150}}>
        <FontAwesome5 name="square-full" size={24} color={Colors.main.text} />
        <Text style={{color:'#fff',fontSize:15,fontWeight:'bold',marginLeft:10}} >Selected</Text>
        </View>
      </View>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
      <View style={{flexDirection:'row'}}>
      {
        retSeatMap[0].left.map((item,index)=>{
          let row = item.row
          return(
            <View key={index} style={{margin:5,alignItems:'center'}}>
              <Text style={{color:'#fff'}}>{item.col}</Text>
              {row.map((i,n)=>{
                let seat = `${item.col}${n+1}`
                const handleSelect=()=>{
                  if(selectedRetSeat.length !== passengers && selectedRetSeat.length < passengers){
                   if(c=='bus'){
                      if(n<2){
                        setSelectedRetSeat([...selectedRetSeat,`${item.col}${n+1}`])
                      }else{
                        Alert.alert('Please select seat from the business class')
                      }
                   }else if(c=='pre'){
                    if(n<8&&n>=2){
                      setSelectedRetSeat([...selectedRetSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the premium class')
                    }
                   }else if(c=='eco'){
                    if(n>7){
                      setSelectedRetSeat([...selectedRetSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the economy class')
                    }
                   } 
                  

                }
                console.log(selectedRetSeat)
                }

                return(
                  <TouchableOpacity key={n} style={{backgroundColor:selectedRetSeat.includes(seat)?Colors.main.text:(n<8&&n>=2?'#e1ff00':n<2?'#ffd800':'#fff'),marginTop:(n==8?30:n==2?30:10),width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:5}} onPress={()=>{handleSelect()}}>
                      <Text>{item.col}{n+1}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        })
      }
      </View>
      <View style={{flexDirection:'row'}}>
      {
        retSeatMap[0].right.map((item,index)=>{
          let row = item.row
          return(
            <View key={index} style={{margin:5,alignItems:'center'}}>
              <Text style={{color:'#fff'}}>{item.col}</Text>
              {row.map((i,n)=>{
                let seat = `${item.col}${n+1}`
                const handleSelect=()=>{
                  if(selectedRetSeat.length !== passengers && selectedRetSeat.length < passengers){
                   if(c=='bus'){
                      if(n<2){
                        setSelectedRetSeat([...selectedRetSeat,`${item.col}${n+1}`])
                      }else{
                        Alert.alert('Please select seat from the business class')
                      }
                   }else if(c=='pre'){
                    if(n<8&&n>=2){
                      setSelectedRetSeat([...selectedRetSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the premium class')
                    }
                   }else if(c=='eco'){
                    if(n>7){
                      setSelectedRetSeat([...selectedRetSeat,`${item.col}${n+1}`])
                    }else{
                      Alert.alert('Please select seat from the economy class')
                    }
                   } 
                  

                }
                console.log(selectedRetSeat)
                }
                return(
                  <TouchableOpacity key={n} style={{backgroundColor:selectedRetSeat.includes(seat)?Colors.main.text:(n<8&&n>=2?'#e1ff00':n<2?'#ffd800':'#fff'),marginTop:(n==8?30:n==2?30:10),width:40,height:40,alignItems:'center',justifyContent:'center',borderRadius:5}} onPress={()=>{handleSelect()}}>
                      <Text>{item.col}{n+1}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        })
      }
      </View>
    </View>
    </ScrollView>
    </View>
  )
 }



  return (
    <View style={styles.container}>
      <View style={{backgroundColor:Colors.main.dark}}>
        <View style={{marginTop:40,alignItems:'center'}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Seat Selection</Text>
            <View style={{flexDirection:'row',width:'100%',padding:20,marginTop:20,justifyContent:'space-between',alignItems:'center'}}>
              <TouchableOpacity style={{borderBottomColor:Colors.main.text,borderBottomWidth:selected=='depart'?3:0,padding:10}} onPress={()=>{setSelected('depart')}}>
                  <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:10,color:'grey'}} >{depDate.getDate()} {month[depDate.getMonth()]}</Text>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Departure</Text>
                    <Text style={{fontSize:10,color:'grey'}} >{depFlight.flight_id.substring(0,5).toUpperCase()}, {depFlight.airline}</Text>
                  </View>
              </TouchableOpacity>
              <Text style={{color:'grey',fontSize:30}} >|</Text>
              <TouchableOpacity style={{borderBottomColor:Colors.main.text,borderBottomWidth:selected=='return'?3:0,padding:10}} onPress={()=>{r!==null?setSelected('return'):setSelected('depart')}}>
                  <View style={{alignItems:'center'}}>
                    <Text style={{fontSize:10,color:'grey'}} >{retDate.getDate()} {month[retDate.getMonth()]}</Text>
                    <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Returning</Text>
                    <Text style={{fontSize:10,color:'grey'}} >{retFlight.flight_id.substring(0,5).toUpperCase()}, {retFlight.airline}</Text>
                  </View>
              </TouchableOpacity>
            </View>
            <View style={{width:'100%',padding:20}}>
            <TouchableOpacity style={{width:'100%',alignItems:'center',backgroundColor:Colors.main.text,padding:5,borderRadius:10}} onPress={()=>{handleDone()}}>
              <Text style={{fontSize:20,color:'#fff',fontWeight:'bold'}}>Done</Text>
            </TouchableOpacity>
            </View>
        </View>
        </View>
        {selected=='depart'?<Depart/>:<Return/>}
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

export default Seat