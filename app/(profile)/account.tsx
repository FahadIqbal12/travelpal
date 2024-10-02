import React, { useContext, useState } from 'react'
import { View,Text,StyleSheet,Image,TextInput, TouchableOpacity, Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import PrefSelector from '@/components/PrefSelection'
import { Profile } from '@/context'
import axios from 'axios'
import { URL } from '@/constants/URL'
import Loader2 from '@/components/loader2'

const account = () => {
  const profile:any = useContext(Profile)
  const [editMode,setEditMode] = useState(false)
  const [loader,setLoader] = useState(false)
  



    let d = profile.profile.user_data
  const [editedData,setEditedData] = useState(d)
  const [selection,setSlection] = useState('')

  const handleUpdate =async () =>{
    setLoader(true)
    await axios.post(`${URL}/update-user-info`,{user_id:profile.profile.user_id,data:editedData}).then((res)=>{
      setLoader(false)
      setEditMode(false)
      Alert.alert(res.data)
    }).catch((e)=>{
      setLoader(false)
      console.log(e)
    })
  }
  
  const [showSelector,setShowSelector] = useState(false)
  const [selectorType,setSelectorType] = useState({name:''})

  if(selection!==''){
    if(selectorType.name=='airlines'){
      editedData.travelPrefrences.airline = selection
      setSlection('')
    } else if(selectorType.name=='destinations'){
      editedData.travelPrefrences.destinations.push(selection)
      setSlection('')
    }else if(selectorType.name=='classes'){
      editedData.travelPrefrences.class=selection
      setSlection('')
    }
  }

  return (
    <View style={styles.container}>
      <Loader2 open={loader} />
      <PrefSelector open={showSelector} data={selectorType.name} selection={setSlection} close={()=>{setShowSelector(false)}} />
        <View style={{padding:20,marginTop:50}}>
        <View style={{alignItems:'center'}}>
          <Image source={{uri:'https://cdn-icons-png.freepik.com/512/219/219988.png'}} style={{width:80,height:80}}/>
        </View>
        <View style={{padding:20,backgroundColor:Colors.main.dark,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,marginTop:20}}>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Name as per passport</Text>
            {editMode==true?<TextInput placeholder={editedData.name || 'Type here'} placeholderTextColor={'grey'} onChangeText={(text)=>{editedData.name=text}} style={{fontSize:20,color:"#fff",fontWeight:'bold'}}/>:
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{d.name}</Text>}
            
            </View>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Email</Text>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{d.email}</Text>
            </View>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Age</Text>
            {editMode==true?<TextInput placeholder={editedData.age.toString()} placeholderTextColor={'grey'} onChangeText={(text)=>{editedData.age=Number(text)}} keyboardType='numeric' style={{fontSize:20,color:"#fff",fontWeight:'bold'}}/>:
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{d.age}</Text>}
            </View>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Passport Number</Text>
            {editMode==true?<TextInput placeholder={(editedData.passport_number).toString()} placeholderTextColor={'grey'} onChangeText={(text)=>{editedData.passport_number=text}} style={{fontSize:20,color:"#fff",fontWeight:'bold'}}/>:
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{d.passport_number}</Text>}
            
            </View>
            <Text style={{color:"#fff",fontWeight:'bold',fontSize:20,marginTop:25}} >Prefrences:</Text>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Airline</Text>
            {editMode==true?<Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}} onPress={()=>{setSelectorType({name:'airlines'});setShowSelector(true)}}>{editedData.travelPrefrences.airline || 'Select here'}</Text>:
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{d.travelPrefrences.airline || 'Not Selected'}</Text>}
            
            </View>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Destinations</Text>
            <View style={{flexDirection:'row'}}>
                {d.travelPrefrences.destinations.map((item:string,index:number)=>{
                    return(
                        <Text style={{padding:5,color:'#fff',backgroundColor:"grey",marginLeft:5,borderRadius:10}} key={index}>{item}</Text>
                    )
                })}
                
            </View>
            </View>
            <View style={{marginTop:10}}>
            <Text style={{color:"#fff"}} >Class Choice</Text>
            {editMode==true?<Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}} onPress={()=>{setSelectorType({name:'classes'});setShowSelector(true)}}>{editedData.travelPrefrences.class || 'Select here'}</Text>:
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{d.travelPrefrences.class || 'Not Selected'}</Text>}
            </View>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{editMode==false?setEditMode(true):handleUpdate()}}>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{editMode==false?'Edit':'Update'}</Text>
        </TouchableOpacity>
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
  

export default account