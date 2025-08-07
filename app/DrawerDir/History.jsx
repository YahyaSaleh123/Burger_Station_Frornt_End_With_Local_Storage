import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from "react-native";

export default function History() {
  const [item,setItems]=useState([]);

  

    useFocusEffect(
      useCallback(() => {
        const fetchUsers =async()=>{
          let current_user = JSON.parse(await AsyncStorage.getItem('@current_user'));
         
            let history = JSON.parse(await AsyncStorage.getItem('@'+current_user.email+' history'));
         
            if(history!=undefined)
              {
                setItems(history)
              }else
              {
                history=[]
               setItems([])
              }
  
              
  
  
          }
         
        fetchUsers()
        
      }, [])
    );
  return (
    <ImageBackground style={{flex:1,padding:16}} source={require('./background.png')}>
      <ScrollView>
      <View style={{ marginTop: 20 }}>
  {item.map((i, index) => {
  
  
      return (
        <View
          key={i.key || index.toString()} // Safe fallback
          style={{
            backgroundColor: '#fff',
            padding: 15,
            borderRadius: 8,
            marginBottom: 15,
            elevation: 3,
          }}
        >
          <Text style={{ fontSize: 20.5, marginBottom: 5 }}>{String(i.str)}</Text>
        </View>
      );
    
  })}
</View>
      </ScrollView>
    </ImageBackground>
  )
}
