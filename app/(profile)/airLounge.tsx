import React, { useState } from 'react'
import { View,Text,StyleSheet, Image, BackHandler } from 'react-native'
import { Colors } from '@/constants/Colors'
import AirportList from '@/components/AirportList'
import { FontAwesome5 } from '@expo/vector-icons'

const airLounge = () => {   
   
  const [showAirportList,setShowAirportList] = useState(false)
  const [selectedAirport,setSelectedAirport] = useState('')

  const lounges = [
    {
      name:'New Delhi',
      lounge:'https://www.gett.com/wp-content/uploads/2023/02/airport-lounge.png',
      assistant:'Adarash Kumar',
      assis_pic:'https://t4.ftcdn.net/jpg/03/80/58/23/360_F_380582318_5lJ52eVLcePphpM4pMHdew3wgopfhQSc.jpg',
      description:'Delhi Airport lounges offer a peaceful escape from the crowded terminal. Enjoy comfortable seating, refreshments, and a tranquil atmosphere.'
    },
    {
      name:'Tokyo',
      lounge:'https://www.rd.com/wp-content/uploads/2023/08/airport-lounge-GettyImages-982730420.jpg',
      assistant:'Sakura Han',
      assis_pic:'https://img.freepik.com/premium-photo/confident-japanese-girl-suit-office-daylight-photoshoot_878783-18454.jpg',
      description:'Tokyo airport lounges offer a serene escape. Enjoy traditional Japanese hospitality, comfortable seating, and amenities like Wi-Fi and workspaces. Relax and unwind in these tranquil havens.'
    },
    {
      name:'Singapore',
      lounge:'https://media.architecturaldigest.com/photos/646d351809e3ebb3b1687dbb/3:2/w_2499,h_1666,c_limit/qatar-airways-welcomes-passengers-to-the-new-al-mourjan-business-lounge--the-garden_52831426142_o.jpg',
      assistant:'Ethan Matthew',
      assis_pic:'https://img.freepik.com/premium-photo/portrait-young-asian-man-smiling-isolated-gray-background_96943-2321.jpg',
      description:'Singapore Airport lounges are renowned for their luxurious amenities and impeccable service. Indulge in gourmet food, premium beverages, and serene relaxation areas.'
    },
    {
      name:'Dubai',
      lounge:'https://media.tacdn.com/media/attractions-splice-spp-674x446/0a/24/72/c3.jpg',
      assistant:'Mohammad Hasan',
      assis_pic:'https://media.istockphoto.com/id/471247592/photo/portrait-of-arab-businessman.jpg?s=612x612&w=0&k=20&c=g4Ass1bmp7FFwE60w8sCgP2ws8eQeBfoCzD8EP4YoZY=',
      description:'Dubai airport lounges are known for their luxurious amenities and impeccable service. Indulge in gourmet food, premium beverages, and relax in stylish surroundings.'
    },
    {
        name:'Istanbul',
        lounge:'https://www.travelandleisure.com/thmb/G4LeQsYR5mQqkq9yacwOgLNlWQM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/TAL-header-turkish-airlines-business-lounge-istanbul-airport-TURKLOUNGE0423-9fd5c80044f948c887c5151685c57bca.jpg',
        assistant:'Ayesha Karim',
        description:'Turkish airport lounges offer a luxurious experience with stunning views of the Mediterranean. Relax in stylish seating, enjoy gourmet food and drinks, and take advantage of premium amenities.',
        assis_pic:'https://img.freepik.com/premium-photo/hijab-woman-business-executive_841014-9020.jpg'
    }
  ]

  const selectedLounge = selectedAirport !== '' ?lounges[lounges.findIndex(x=>x.name==selectedAirport.city)]:null

  return (
   <View style={styles.container}>
    <AirportList visible={showAirportList} setter={setSelectedAirport} close={()=>{setShowAirportList(false)}} input=''/>
    <View style={{padding:20,marginTop:40}} >
      <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}} >Find Lounge</Text>
      <View style={{marginTop:20,padding:10,borderWidth:1,borderColor:Colors.main.text,borderRadius:20}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}} onPress={()=>{setShowAirportList(true)}}>{selectedAirport==''?'Select Airport':selectedAirport.name}</Text>
      </View>
      {selectedLounge !== null ? 
        <View style={{alignItems:'center',marginTop:20}}>
          <View style={{padding:5,borderWidth:1,borderColor:Colors.main.text,borderTopRightRadius:300,borderTopLeftRadius:300}} >
          <Image source={{uri:selectedLounge.lounge}} style={{width:300,height:400,borderTopRightRadius:300,borderTopLeftRadius:300}} />
          </View>
          <View style={{padding:5,alignItems:'center'}}>
            <Text style={{fontSize:40,fontWeight:'bold',color:"#fff"}} >{selectedLounge.name}</Text>
            <Text style={{color:'#fff',marginTop:10,textAlign:'center'}}>{selectedLounge.description}</Text>
          </View>

          <View style={{width:'100%',marginTop:40,flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row'}}>
            <Image source={{uri:selectedLounge.assis_pic}} style={{width:50,height:50,borderRadius:50}} />
            <View style={{marginLeft:10}}>
              <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>{selectedLounge.assistant}</Text>
              <Text style={{color:'grey'}} >Your assistant</Text>
            </View>
            </View>
            <View style={{width:50,height:50,borderRadius:50,backgroundColor:'#fff',alignItems:'center',justifyContent:'center'}}>
              <FontAwesome5 name="rocketchat" size={24} color="#000" />
            </View>
          </View>
        </View>
        :
        <View style={{alignItems:'center',justifyContent:'center',marginTop:50}}>
          <FontAwesome5 name="exclamation-circle" size={40} color="#fff" />
          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Please select airport first!</Text>
        </View>
      }
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


export default airLounge