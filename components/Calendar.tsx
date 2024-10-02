import React from 'react'
import { View,Text,Modal,StyleSheet } from 'react-native'
import { Calendar } from 'react-native-calendars'
import { Colors } from '@/constants/Colors'

const Cal = (props:{visible:boolean,title:string,setter:any,close:any,minDate:any}) => {

  let now = new Date(props.minDate)

  const handleDayPress = (day) =>{
    props.setter(new Date(day.timestamp))
    props.close()
  }

  return (
    <Modal visible={props.visible}>
    <View style={styles.container}>
      <View >
        <Text style={{textAlign:'center',fontSize:20,fontWeight:'bold',color:'#fff',marginBottom:10}}>{props.title}</Text>
        <View style={{padding:10,borderWidth:2,borderColor:Colors.main.text,borderRadius:20}}>
        <Calendar 
        minDate={`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()}`}
        maxDate={`${now.getFullYear()+1}-${now.getMonth()+1}-${now.getDate()}`}
        style={{borderRadius:20,padding:10}}
        onDayPress={(day)=>{handleDayPress(day)}}

        />
        </View>
      </View>
    </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#16183D',
    justifyContent:'center'
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


export default Cal