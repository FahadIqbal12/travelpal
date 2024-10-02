import React from 'react';
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function TabTwoScreen() {

  const explore = [
    {city:"Dubai",
      img:"https://cdn.britannica.com/15/189715-050-4310222B/Dubai-United-Arab-Emirates-Burj-Khalifa-top.jpg",
      des:"Dubai offers a blend of ancient traditions and futuristic marvels. Experience towering skyscrapers, luxurious shopping, and thrilling adventures in this desert oasis."
    },
    {
      city:"Tokyo",
      img:"https://media.nomadicmatt.com/2024/tokyothings.jpeg",
      des:"xperience Tokyo's blend of tradition and modernity. Explore neon lights, temples, markets, and iconic sights like Shibuya Crossing and Senso-ji. Enjoy delicious food and friendly people."
    },
    {
      city:"Singapore",
      img:"https://www.holidify.com/images/bgImages/SINGAPORE.jpg",
      des:"Singapore is a bustling city with a mix of cultures, stunning architecture, and delicious food. Explore its iconic landmarks and enjoy the modern amenities of this thriving city-state."
    },
    {
      city:"New Delhi",
      img:"https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
      des:"Delhi, India's capital, offers a fascinating mix of history, culture, and modernity. Explore iconic monuments, immerse yourself in the vibrant culture, and savor delicious cuisine."
    },
    {
      city:"Istanbul",
      img:"https://rodinistanbul.com/wp-content/uploads/2023/04/day-trips-from-istanbul-copy.jpg",
      des:"Experience Istanbul, a city blending Europe and Asia. Explore iconic landmarks, wander through vibrant bazaars, and savor Turkish cuisine. Immerse yourself in the rich history and culture of this captivating destination."
    }
  ]

  return (
   <ScrollView style={styles.container}>
      <View style={{padding:20,marginTop:40}}>
        <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}} >Explore the world</Text>
        {explore.map((item,index)=>{
          return(
            <View style={{marginTop:20}} key={index}>
              <Image source={{uri:item.img}} style={{width:'100%',height:200,borderTopLeftRadius:20,borderTopRightRadius:20}} />
              <View style={{backgroundColor:Colors.main.dark,padding:10,borderBottomLeftRadius:20,borderBottomRightRadius:20}}>
                <Text style={{color:'#fff',textAlign:"center",fontSize:30,fontWeight:'bold'}}>{item.city}</Text>
                <Text style={{textAlign:'center',color:'#fff'}}>{item.des}</Text>
              </View>
            </View>
          )
        })}
      </View>
   </ScrollView>
  );
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

