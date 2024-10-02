import React, { useContext, useEffect, useState } from 'react'
import { View,Text,StyleSheet,TouchableOpacity, ScrollView } from 'react-native'
import { Colors } from '@/constants/Colors'
import axios from 'axios'
import { URL } from '@/constants/URL'
import { Profile } from '@/context'
import Loader2 from '@/components/loader2'



const wallet = () => {
  const p:any = useContext(Profile)
  let userId = p.profile.user_id
  const [creditsInfo,setCreditsInfo] = useState(null)
  const [loader,setLoader] = useState(false)

  const fetchCreditsInfo =async () =>{
    setLoader(true)
    await axios.post(`${URL}/get-credits`,{
      user_id:userId
    }).then((res)=>{
      setLoader(false)
      setCreditsInfo(res.data)
    })
  }

  useEffect(()=>{
    fetchCreditsInfo()
  },[])

  return (
    <View style={styles.container}>
      <Loader2 open={loader} />
        <View style={{backgroundColor:Colors.main.dark}}>
          <View style={{padding:20,marginTop:50}} >
              <Text style={{color:'grey',textAlign:'center'}}>My Credits</Text>
              <Text style={{fontSize:50,fontWeight:'bold',color:'#fff',textAlign:'center'}}>{creditsInfo==null?0:creditsInfo.wallet_info.remaining_credits}</Text>
              <View style={{flexDirection:'row',justifyContent:'space-evenly',marginTop:20}}>
                <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,width:150,alignItems:'center'}}>
                  <Text style={{color:Colors.main.text}}>Airport Shop</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{padding:10,borderWidth:1,borderColor:Colors.main.text,borderRadius:20,width:150,alignItems:'center'}}>
                  <Text style={{color:Colors.main.text}}>Airport Lounge</Text>
                </TouchableOpacity>
              </View>
          </View>
        </View>
        <View style={{padding:20,marginTop:10}}>
            <Text style={{color:'grey'}}>My Transactions:</Text>
            <View>
              {creditsInfo==null
              ?
              <Text>Loading</Text>
              :
              creditsInfo.history.length == 0? <Text>No transaction</Text>:
              <ScrollView>
                {
                  creditsInfo.history.map((item,index)=>{
                    let date = new Date(item.timestamp)
                    return(
                      <View key={index} style={{padding:20,backgroundColor:Colors.main.dark,borderRadius:20,marginTop:10}}>
                        <Text style={{color:item.amount>0?'green':'red',fontSize:30,fontWeight:'bold'}}>{item.amount}</Text>
                        <Text style={{fontWeight:'bold',color:'#fff'}}>{item.name}</Text>
                        <Text style={{color:'grey'}}>{date.getDate()}.{date.getMonth()}.{date.getFullYear()}</Text>
                      </View>
                    )
                  })
                }
              </ScrollView>
              }
            </View>
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

export default wallet