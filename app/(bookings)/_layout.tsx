import React from "react"
import { Stack } from 'expo-router';

export default function BookingLayout (){

    return(
        <Stack>
            <Stack.Screen name="trip" options={{ headerShown: false }}/>
            <Stack.Screen name="class" options={{headerShown:false}}/>
            <Stack.Screen name="seat" options={{headerShown:false}}/>
            <Stack.Screen name="book" options={{headerShown:false}}/>
            <Stack.Screen name="AiBook" options={{headerShown:false}}/>
        </Stack>
    )
}