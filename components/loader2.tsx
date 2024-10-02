import React from 'react'
import { View,Modal,Text,Image,ActivityIndicator } from 'react-native'

const Loader2 = (props:any) => {
  return (
    <Modal visible={props.open} transparent style={{flex:1}}>
        <View style={{backgroundColor:'#fff',position:'absolute',top:'50%',left:'50%',transform:'translate(-30cm,-10cm)',padding:20,borderRadius:10}}>
            <ActivityIndicator size={25}/>
        </View>
    </Modal>
  )
}

export default Loader2