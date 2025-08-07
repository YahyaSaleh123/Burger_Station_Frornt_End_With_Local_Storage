import React, { useState ,useCallback } from 'react';
import { useFocusEffect } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ScrollView ,ImageBackground } from 'react-native';

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useFocusEffect(
    useCallback(()=>{
      const fetchUser=async()=>
        {
          let current_user = JSON.parse(await AsyncStorage.getItem('@current_user'));
          setName(current_user.name+" "+current_user.lastname)
          setEmail(current_user.email)
        }
        fetchUser()
    })
  )

  const handleSubmit = () => {
    if (!name || !email || !message) {
      Alert.alert('Please fill out all fields');
      return;
    }
   

    // You can send the data to your backend or email service here
    console.log('Contact Form:', { name, email, message });

    Alert.alert('Message Sent!', 'Thank you for contacting us.');

    
    setMessage('');
  };

  return (
     <ImageBackground source={require('./background.png')} style={styles.container}>
   
     <ScrollView >
        <View style={styles.card} >
        <Text style={styles.header}>Contact Us</Text>
             <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          editable={false}
          
        />
          <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          value={email}
          editable={false}
       
          keyboardType="email-address"
          autoCapitalize="none"
        />
         <Text style={styles.label}>Message</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Message"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={4}
          
        />

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                 <Text style={styles.buttonText}>{'Send Message'}</Text>
               </TouchableOpacity>
        </View>
      </ScrollView>
    
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    padding: 20,
    justifyContent:'center'
  }
  
  ,
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },card:{ backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    marginTop:100,
    elevation: 5,},label: {
      color: '#666',
      fontSize: 14,
      marginTop: 12,
    },button: {
      marginTop: 30,
      backgroundColor: 'red',
      paddingVertical: 12,
      borderRadius: 8,
    }, buttonText: {
      color: '#fff',
      fontSize: 16,
      textAlign: 'center',
      fontWeight: 'bold',
    },
});

export default ContactUsScreen;
