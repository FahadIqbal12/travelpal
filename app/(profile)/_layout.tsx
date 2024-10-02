import React from "react"
import { Stack } from 'expo-router';

export default function ProfileLayout (){

    return(
        <Stack>
            <Stack.Screen name="account" options={{ headerShown: false }}/>
            <Stack.Screen name="wallet" options={{ headerShown: false }}/>
            <Stack.Screen name="my-bookings" options={{ headerShown: false }}/>
            <Stack.Screen name="airLounge" options={{ headerShown: false }}/>
            <Stack.Screen name="airShop" options={{ headerShown: false }}/>
            
        </Stack>
    )
}