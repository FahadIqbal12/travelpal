import React,{useContext, useEffect, useState} from 'react'
import { View,Text,StyleSheet,TextInput,TouchableOpacity, ScrollView,Image, Alert } from 'react-native'
import { Colors } from '@/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons';
import { URL } from '@/constants/URL';
import axios from 'axios';
import { GloboAI, Main } from '@/context';
import { useRouter } from 'expo-router';
import Markdown from 'react-native-markdown-display'

const globo = () => {
  const router = useRouter()
  const g:any = useContext(GloboAI)
  const main:any = useContext(Main)


  const questions = ['Can you help me find the cheapest flights from Delhi to Dubai on 30 september?',
    'What are some must see attractions in India to visit?',
    'What is the weather like in Bali in December?',
    'What are some tips for packing light for a long-haul flight?'
  ]

  const [input,setInput] = useState('');
  const [convo,setConvo]:any = useState([])
  const [loader,setLoader] = useState(false);
  let c = []

  const handleInput = () =>{
    
    
      const newMessage = 
        {
          from:'user',
          msg:input,
          timestamp:new Date().toTimeString()
        }
      let a = [...convo,newMessage]
      setConvo((convo)=>[...convo,newMessage]);
    
    
   // console.log(convo)
  }

  const handleAiResponse = async () =>{
    setLoader(true)
    await axios.post(`${URL}/ai`,{
      prompt:input
    }).then((res)=>{
      let result = res.data
      setConvo((convo)=>[...convo,{from:'ai',msg:result.message,timestamp:new Date().toTimeString()}])
     //console.log(result)
      if(result.type == 'data'){
        if(result.r.funct == 'getFlightInfo'){
          if(result.screen !== null){
            let trip = {
              from:{code:result.r.departure,city:result.r.depCity},to:{code:result.r.destination,city:result.r.desCity},route:'one way',departure:result.r.timestamp,returning:new Date().getTime(),passengers:result.r.passengers
            }
            main.setContext({trip:trip})
            g.setGloboAi(result)
            router.push(result.screen)
          }
        }
        if(result.r.funct == 'bookFlight'){
          if(result.screen !== null){
            g.setGloboAi(result)
            router.push(result.screen)
          }
        }
      }
       setLoader(false)
    }).catch((e)=>{
      setLoader(false)
     // console.log(e)
      Alert.alert('Something went wrong')
    })
      
      
  }

  const Ask =async ()=>{
    if(input !== ''){
    handleInput()
    handleAiResponse()
    }else{
      Alert.alert('Warning','Please ask something!')
    }
    
    //setConvo([...convo,msg])
  }

  useEffect(()=>{})

  return (
   <View style={styles.container}>
    <View style={{flex:1,marginTop:50,padding:20}}>
     
      <ScrollView style={{marginBottom:90}}>
        {convo.length == 0 ?
          <View style={{alignItems:'center'}}>
            <Image source={require('../../assets/images/201.gif')} style={{width:200,height:200,borderRadius:20}}/>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>I am Globo.</Text>
            <Text style={{color:'#fff',fontSize:20,fontWeight:'bold'}}>Your travel assistant.</Text>
            {questions.map((item,index)=>{
              return(
                <TouchableOpacity key={index} style={{backgroundColor:Colors.main.dark,padding:10,marginTop:10,borderWidth:1,borderColor:Colors.main.text,width:'90%',borderRadius:20}} onPress={()=>{setInput(item)}}>
                
                  <Text style={{fontSize:15,color:'#fff'}}>{item}</Text>
              
                </TouchableOpacity>
              )
            })}
          </View>
          :
          <View>
           {convo.map((item:any,index:number)=>{
            return(
              <View style={{flexDirection:item.from =='user'?'row-reverse':'row',alignItems:'flex-end'}} key={index}>
              <View style={{marginLeft:item.from =='user'?10:0,marginRight:item.from =='user'?0:10}} >
                {item.from == 'user'
                ?
                <View>
                  <FontAwesome5 name="user-alt" size={20} color={Colors.main.text} />
                </View>
                :
                <View>
                  <Image source={require('../../assets/images/201.gif')} style={{width:30,height:30}} />
                </View>
                }
              </View>
              <View key={index} style={{padding:10,backgroundColor:item.from == 'user'?Colors.main.text:Colors.main.bg,borderRadius:20,marginTop:10,borderBottomRightRadius:item.from == 'user'?0:20,borderBottomLeftRadius:item.from == 'user'?20:0,width:'70%',alignSelf:item.from == 'user'?'flex-end':'flex-start'}}>
                  <Markdown style={s}>
                  {item.msg}
                  </Markdown>
                <Text style={{textAlign:item.from == 'user'?'right':'left',fontSize:10,color:item.from == 'user'?'#adadad':'grey'}}>{item.timestamp}</Text>
              </View>
              </View>
            )
           })}
          </View>
        }
{loader == true?
          <View style={{flexDirection:'row',alignItems:'flex-end'}} >
            <View style={{marginRight:10,}}>
                <View>
                  <Image source={require('../../assets/images/201.gif')} style={{width:30,height:30}} />
                </View>
            </View>
            <View style={{padding:10,backgroundColor:Colors.main.bg,borderRadius:20,marginTop:10,borderBottomRightRadius:20,borderBottomLeftRadius:0,width:'70%',alignSelf:'flex-start'}}>
                <Text style={{color:'#fff'}}>Thinking...</Text>
            </View>
          </View>:''

}
      </ScrollView>
      <View style={styles.input}>
        <TextInput placeholder='Ask me anything....' placeholderTextColor={'#fff'} style={{fontSize:15,color:'#fff',width:'90%'}}  multiline={true} value={input} onChangeText={(text)=>{setInput(text)}}/>
        <TouchableOpacity onPress={()=>{Ask();setInput('')}}>
        <FontAwesome5 name="paper-plane" size={24} color={Colors.main.text} />
        </TouchableOpacity>
      </View>
      
    </View>
   </View>
  )
}

const s = StyleSheet.create({
  body:{
    color:'#fff',
    width:'100%'
  }
})


const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor:'#020D3D',

  },
  input:{
    position:'absolute',
    backgroundColor:'#16183D',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    bottom:10,
    width:'100%',
    borderWidth:1,
    borderColor:Colors.main.text,
    borderRadius:50,
    padding:20,
    alignSelf:'center',
    
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

export default globo