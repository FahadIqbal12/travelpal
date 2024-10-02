import React from 'react'
import { View,Modal,Text,Image } from 'react-native'

const Loader = (props:any) => {
  return (
    <Modal visible={props.open}>
        <View style={{flex:1,backgroundColor:'#F3F2F3',alignItems:'center',justifyContent:'center'}}>
            <Image source={require('../assets/images/loading.gif')} style={{width:'100%',height:300}} />
            <Text>Loading...</Text>
        </View>
    </Modal>
  )
}

export default Loader