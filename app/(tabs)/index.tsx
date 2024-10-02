import { Image, StyleSheet, Platform } from 'react-native';
import { Link } from 'expo-router';
import { HelloWave } from '@/components/HelloWave';
import { View,Text,ScrollView,TextInput,TouchableOpacity, } from 'react-native';
import { Colors } from '@/constants/Colors';
import { FontAwesome5 } from '@expo/vector-icons';
import { Profile } from '@/context';
import { useContext } from 'react';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter()
  const p:any = useContext(Profile)

  console.log(p)
  const n = p.profile.user_data.name
 

  const suggestions = [
    {name:'Istanbul, Turkey',price:600,image:'https://cdn.britannica.com/82/167882-050-8F4AC206/Blue-Mosque-Istanbul.jpg'},
    {name:'Paris, France',price:650,image:'https://a.eu.mktgcdn.com/f/100004519/N2BB4ohwclor2uLoZ7XMHgJmxOZaMOokMdQqqXQAq3s.jpg'},
    {name:'Agra, India',price:50,image:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Taj_Mahal_%28Edited%29.jpeg/365px-Taj_Mahal_%28Edited%29.jpeg'},
    {name:'Tokyo, Japan',price:650,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOQmNpxrD9ccoxZ3Q23LOOE93wLr_tMR7LFQ&s'},
    {name:'Dubai, UAE',price:500,image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtIVphyD0Jm3z_x6KIa6iorBBszdXEnf1slA&s'},
    {name:'London, England',price:700,image:'https://babylontours.com/wp-content/uploads/2016/09/london-441853_960_720.jpg'},
    {name:'New York , USA',price:800,image:'https://miro.medium.com/v2/resize:fit:480/0*g0Ucr94C_VA0SpoP.jpg'},
  ]


  return (
   <View style={styles.container}>
    
    <ScrollView style={{marginTop:50}}>
    <View style={{padding:20}}>
      <Text style={{color:Colors.main.text,fontSize:20}}>Welcome! <HelloWave/></Text>
      <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>{n||'User'}</Text>
      <Image source={require('../../assets/images/g1.gif')} style={{width:200,height:200,alignSelf:'center'}}/>
      <View style={{marginTop:20}}>
        <View style={{flexDirection:'row',backgroundColor:'#01021c',padding:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text}}>
          <FontAwesome5 name="plane-departure" size={15} color={'#fff'} />
            <View style={{marginLeft:20,width:'90%'}}>
              <Text style={{color:'#fff'}}>From</Text>
             <Link href='/(tabs)/search' >
             <Text style={{fontSize:20,color:'grey',fontWeight:'bold'}} >Your Location</Text>
             </Link>
            </View>
        </View>
        <View style={{flexDirection:'row',backgroundColor:'#01021c',padding:20,marginTop:5,borderRadius:20,borderWidth:1,borderColor:Colors.main.text}}>
          <FontAwesome5 name="plane-arrival" size={15} color={'#fff'} />
            <View style={{marginLeft:20,width:"90%"}}>
              <Text style={{color:'#fff'}}>To</Text>
              <Link href={'/(tabs)/search'}>
              <Text style={{fontSize:20,color:'grey',fontWeight:'bold'}} >Destination</Text>
              </Link>
            </View>
        </View>
      </View>
      <View style={{marginTop:20}}>
        <Text style={{fontSize:18,color:'#fff',fontWeight:'bold'}} >Suggested for you</Text>
        <ScrollView style={{flexDirection:'row',marginTop:10}} horizontal={true}>
          {suggestions.map((item,index)=>{
            return(
              <View key={index} style={{backgroundColor:'#01021c',padding:10,marginRight:20,borderRadius:20,borderWidth:1,borderColor:Colors.main.text}}>
                <Image source={{uri:item.image}} style={{width:120,height:120,borderRadius:20}} />
                <Text style={{color:'#fff',fontSize:15,fontWeight:'bold'}}>{item.name}</Text>
                <Text style={{color:'grey',fontSize:13,}}>${item.price}</Text>
              </View>
            )
          })}
        </ScrollView>
      </View>
    </View>
    </ScrollView>
   </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#16183D',

  },
  
});
