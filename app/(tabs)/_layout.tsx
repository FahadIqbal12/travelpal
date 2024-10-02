import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'react-native';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const color = Colors.main.light

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor:'#fff',
        tabBarInactiveTintColor:'#53569e',
        tabBarStyle:{backgroundColor:'#090A38'},
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title:'Home',
          tabBarShowLabel:false,
          
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} size={20}/>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarShowLabel:false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'search' : 'search-outline'} color={color} size={20}/>
          ),
        }}
      />
      <Tabs.Screen
        name="globo"
        options={{
          title: 'Globo AI',
          tabBarShowLabel:false,
          tabBarIcon: ({ color, focused }) => (
            <Image source={require('../../assets/images/globo.png')} style={{width:50,height:50}} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarShowLabel:false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'airplane' : 'airplane-outline'} color={color} size={20}/>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'You',
          tabBarShowLabel:false,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} size={20}/>
          ),
        }}
      />
       
      
    </Tabs>
  );
}
