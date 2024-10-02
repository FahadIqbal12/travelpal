import React, { useState,useEffect } from 'react'
import { View,Modal,Text,Image, TouchableOpacity } from 'react-native'
import { Colors } from '@/constants/Colors'


const PrefSelector = (props:any) => {

    const [data,setData] = useState([])

    const airlines = [{name:'Indigo',logo:'https://airhex.com/images/airline-logos/indigo.png'},{name:'Akasa Air',logo:'https://logos-world.net/wp-content/uploads/2022/01/Akasa-Air-Emblem.png'},
        {name:'Emirates',logo:'https://seeklogo.com/images/E/Emirates_Airlines-logo-9AF5EF6DE2-seeklogo.com.png'},
        {name:'Turkish Airline',logo:'https://companieslogo.com/img/orig/THYAO.IS-f22d40e8.png?t=1720244494'},
        {name:'Japan Airlines',logo:'https://static.wikia.nocookie.net/logopedia/images/4/4b/JapanAirlines_2011-emblem.svg/revision/latest/scale-to-width-down/250?cb=20190525164620'}
    ]
    const destinations = [{name:'Delhi',logo:''},{name:'Dubai',logo:''},{name:'Singapore',logo:''},{name:'Tokyo',logo:''},{name:'Istanbul',logo:''}]
    const classes = [{name:'Business',logo:'business.png'},
        {name:'Premium',logo:'premium.png'},
        {name:'Economy',logo:'economy.png'}]

  

    const handlePress = (n:string) =>{
        props.selection(n)
        props.close()
    }

  return (
    <Modal visible={props.open}>
        <View style={{flex:1,backgroundColor:Colors.main.bg}}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center',marginBottom:20}}>Select {props.data}:</Text>
          {props.data == 'airlines'?airlines.map((item,index)=>{
            return(
                <TouchableOpacity style={{flexDirection:'row',marginBottom:10,alignItems:"center",padding:10,borderBottomWidth:1,borderColor:'grey'}} key={index} onPress={()=>{handlePress(item.name)}}>
                    <Image source={{uri:item.logo}} style={{width:60,height:60,backgroundColor:'#fff',padding:10,borderRadius:150}}/>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"#fff",marginLeft:5}}>{item.name}</Text>
                </TouchableOpacity>
            )
          }):props.data == 'destinations'?destinations.map((item,index)=>{
            return(
                <TouchableOpacity style={{flexDirection:'row',marginBottom:10,alignItems:"center",padding:10,borderBottomWidth:1,borderColor:'grey'}} key={index} onPress={()=>{handlePress(item.name)}}>
                    <Image source={{uri:item.logo}} style={{width:60,height:60,backgroundColor:'#fff',padding:10,borderRadius:150}}/>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"#fff",marginLeft:5}}>{item.name}</Text>
                </TouchableOpacity>
            )
          }):props.data == 'classes'?classes.map((item,index)=>{
            let l = `../assets/images/${item.logo}`
            let r = '../assets/images/business.png'
            
            return(
                <TouchableOpacity style={{flexDirection:'row',marginBottom:10,alignItems:"center",padding:10,borderBottomWidth:1,borderColor:'grey'}} key={index} onPress={()=>{handlePress(item.name)}}>
                    <Image source={require(r)} style={{width:60,height:60,backgroundColor:'#fff',padding:10,borderRadius:150}}/>
                    <Text style={{fontSize:20,fontWeight:'bold',color:"#fff",marginLeft:5}}>{item.name}</Text>
                </TouchableOpacity>
            )
          }):''
          }
        </View>
    </Modal>
  )
}

export default PrefSelector