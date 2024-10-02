import React, { useEffect, useState } from 'react'
import { View,Modal,Text,Image } from 'react-native'
import axios from 'axios'
import { URL } from '@/constants/URL'

const Wakeup = (props:any) => {
    const [state,setState] = useState('Waking Up Server...')

    const connect = () =>{
        axios.get(`${URL}/`).then((res)=>{
            setState(res.data)
            props.close()
        })
    }

    useEffect(()=>{
        connect()
    },[])


  return (
    <Modal visible={props.open} transparent>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            <View style={{backgroundColor:'#fff',padding:10,alignItems:'center',borderRadius:10}}>
            <Image source={{uri:'https://i.pinimg.com/originals/b4/4b/4f/b44b4f6f05fb9696fb75320e59374d3f.gif'}} style={{width:100,height:100}}/>
            <Text>{state}</Text>
            </View>
        </View>
    </Modal>
  )
}

export default Wakeup