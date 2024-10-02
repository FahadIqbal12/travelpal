import React, { useContext, useState } from 'react'
import { View,Text,StyleSheet, ScrollView,Image, TouchableOpacity, Alert } from 'react-native'
import { Colors } from '@/constants/Colors';
import axios from 'axios';
import { URL } from '@/constants/URL';
import { Profile } from '@/context';
import Loader2 from '@/components/loader2';
import { useSafeAreaFrame } from 'react-native-safe-area-context';

const flightShop = () => {

  const p:any = useContext(Profile)
  let userId = p.profile.user_id

  const [loader,setLoader] = useState(false)

  const flightMenu = [
    { name: "Chicken Tikka Masala", price: 600,img:'https://www.licious.in/blog/wp-content/uploads/2020/12/Chicken-Tikka-Masala-min.jpg' },
    { name: "Butter Chicken", price: 500 ,img:'https://www.maspices.co.in/wp-content/uploads/2022/02/butter-chicken-.jpg'},
    { name: "Vegetable Korma", price: 500,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKe0i_B4IdQAsqqkIEu9io1dp2MxzpIgaU3A&s' },
    { name: "Paneer Tikka Masala", price: 400,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTB2vs7GwXOwIHQ6iGpsu2lTG9eEy5VSaXTRg&s' },
    { name: "Vegetable Biryani", price: 400,img:"https://www.chefkunalkapur.com/wp-content/uploads/2021/03/veg-biryani-scaled.jpeg?v=1618288847" },
    { name: "Chicken Biryani", price: 600,img:'https://ministryofcurry.com/wp-content/uploads/2024/06/chicken-biryani-5.jpg' },
    { name: "Fish Tikka Masala", price: 500,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQERO5GX60PV5IZ6W-GBYdt4EBYZYpduB14Q&s' },
    { name: "Lamb Rogan Josh", price: 500,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGIqlSZNKfcRN3KQ8VJ6wvD3rk2UGg7BOGHA&s' },
    { name: "Aloo Gobi", price: 400,img:'https://static01.nyt.com/images/2023/12/21/multimedia/ND-Aloo-Gobi-gkwc/ND-Aloo-Gobi-gkwc-square640.jpg' },
    { name: "Baingan Bharta", price: 350 ,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSV8Bh_iKbLPCjH-SUm-51UgdF4YZQvuckv6w&s'},
    { name: "Gulab Jamun", price: 200,img:'https://www.scrumptiously.com/wp-content/uploads/2023/04/GulabJamun.webp' },
    { name: "Rasmalai", price: 250,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRAo3kz8rMjy7saXJWEjopLUr3Arq6h1TMaQ&s' },
    { name: "Kheer", price: 150,img:'https://masalaandchai.com/wp-content/uploads/2021/08/Rice-Kheer-1-500x500.jpg' },
    { name: "Fruit Salad", price: 100,img:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsP3Gyi-2Hi1CN6SxAqHT2SqAxUHctRpgofw&s' },
    { name: "French Fries", price: 150 ,img:'https://www.chefhasti.com/wp-content/uploads/2020/06/COVER-1-1-scaled.jpg'},
    { name: "Onion Rings", price: 200,img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE_bSy4N3lmp-dxb6wphUCGEqAJ32AWb8n_w&s" },
    { name: "Chicken Nuggets", price: 250,img:'https://www.onehappyhousewife.com/wp-content/uploads/2022/05/air-fryer-chicken-nuggets-8.jpg' },
    { name: "Fish Fingers", price: 200,img:'https://www.kannammacooks.com/wp-content/uploads/finger-fish-fry-recipe-24.jpg' },
    { name: "Cheese Sandwich", price: 100,img:'https://static01.nyt.com/images/2023/02/28/multimedia/ep-air-fryer-grilled-cheese-vpmf/ep-air-fryer-grilled-cheese-vpmf-square640.jpg' },
    { name: "Ham Sandwich", price: 150,img:'https://images.immediate.co.uk/production/volatile/sites/30/2024/04/HamSandwich-0d4e4ff.jpg?quality=90&resize=556,505' }
  ];

  const order = async(item:any) =>{
    setLoader(true)
    await axios.post(`${URL}/get-credits`,{
      user_id:userId
    }).then(async(res)=>{
      let credits = res.data.wallet_info.remaining_credits
      if(credits >= item.price){
        await axios.post(`${URL}/deduct-credits`,{
          user_id:userId,
          credits:item.price,
          title:`Bought ${item.name} on flight.`
        }).then(()=>{
          setLoader(false)
          Alert.alert('Order Placed',"Please remain seated, order will arrive soon!")
        })
      }else{
        setLoader(false)
        Alert.alert('Error',"You dont have enough credits")
      }
    })
  }


  return (
    <View style={styles.container}>
      <Loader2 open={loader} />
       <View style={{padding:20,marginTop:40}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',textAlign:'center'}} >Flight Shop</Text>
          <ScrollView>
            <View style={{flexDirection:'row',flexWrap:'wrap',justifyContent:'space-between',marginBottom:20}}>
            {flightMenu.map((item,index)=>{
              return(
                <View style={{width:'45%',marginTop:10}} key={index}>
                    <Image source={{uri:item.img}} style={{width:'100%',height:150,borderTopRightRadius:10,borderTopLeftRadius:10}}/>
                    <View style={{padding:5,backgroundColor:Colors.main.dark}}>
                    <Text style={{fontWeight:'bold',color:'#fff'}}>{item.name}</Text>
                    <Text style={{color:'#fff'}}>Rate: {item.price} credits</Text>
                    </View>
                    <TouchableOpacity style={{backgroundColor:Colors.main.text,borderBottomLeftRadius:10,borderBottomRightRadius:10}} onPress={()=>{order(item)}}>
                      <Text style={{color:'#fff',fontWeight:'bold',textAlign:'center'}} >Order</Text>
                    </TouchableOpacity>
                </View>
              )
            })}
            </View>
          </ScrollView>
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

export default flightShop