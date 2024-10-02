import React from "react"
import { Stack } from 'expo-router';

export default function FlightLayout (){

    return(
        <Stack>
            <Stack.Screen name="ticket" options={{ headerShown: false }}/>
            <Stack.Screen name="flightShop" options={{ headerShown: false }}/>
            <Stack.Screen name="ai" options={{ headerShown: false }}/>
            <Stack.Screen name="BagTrack" options={{ headerShown: false }}/>
            
        </Stack>
    )
}