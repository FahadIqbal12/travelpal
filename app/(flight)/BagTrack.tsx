import React, { useContext } from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { Colors } from '@/constants/Colors'
import { Flight } from '@/context'

const BagTrack = () => {
  const f:any = useContext(Flight)

  let data = f.flight.data
  const past_checkpoint = ['Not Checked In','Checked In','Security Done', 'Boarding', 'On Board']
  const bag_status = ['Not Checked In','Security Checking','Baggage Handling','Loading','Loaded']

  const currentStatus = past_checkpoint[past_checkpoint.indexOf(data.status)]
  const bagStatus = bag_status[past_checkpoint.indexOf(data.status)]

  return (
    <View style={styles.container}>
        <View style={{padding:20,marginTop:40}}>
          <Text style={{fontSize:20,fontWeight:'bold',color:'#fff'}}>Track your Baggage</Text>
          <View style={{margin:20}}>
              <View style={{padding:10,borderWidth:1,borderRadius:20,borderColor:Colors.main.text,marginTop:20}}>
                <Text style={{color:'grey'}}>Your current status:</Text>
                <Text style={{color:'#fff',fontSize:30,fontWeight:'bold'}}>{currentStatus}</Text>
              </View>
              <View style={{padding:10,borderWidth:1,borderRadius:20,borderColor:Colors.main.text,marginTop:20}}>
                <Text style={{color:'grey'}}>Your baggage status:</Text>
                <Text style={{color:'#fff',fontSize:30,fontWeight:'bold'}}>{bagStatus}</Text>
              </View>
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

export default BagTrack