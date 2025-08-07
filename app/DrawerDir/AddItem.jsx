import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Picker } from '@react-native-picker/picker';
import { Alert, Button, View,ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";



export default function AddItem() {
  const [description,setDescription] =useState("")
  const [items,SetItems]=useState([]);
  const [imag,SetImage]=useState();
  const [name,SetName]=useState("");
  const [price,SetPrice]=useState(0);
  const router = useRouter();
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState('');
  

  
  
  useEffect(()=>
    { 
      const fetchitems = async () => {
      
        let current_cart = JSON.parse(await AsyncStorage.getItem('@cart'));
        // We have data!!
        if (current_cart != undefined) {
          SetItems(current_cart)
          
        } else{
          SetItems([])
          
        }
        console.log(current_cart)

      }
      fetchitems()
    },[])
    
    const AddItem=async()=>{
       if (!name || !price || !imag||!selectedOption || !description) {
            Alert.alert('Please fill out all fields');
            return;
          }

     let additems ={name:name,price:price,Image:imag,amount:1,category:selectedOption,description:description}
     items.push(additems)
      SetItems(additems)
      await AsyncStorage.setItem('@cart',JSON.stringify(items));
      Alert.alert("You can see The '"+additems.name+"' in the menu")
      router.push('./(tabs)')
      }
    return (
      <ScrollView contentContainerStyle={styles.container}>

    
          

      <Text style={styles.title}>AddItem</Text>
      <Text>{"\n"}</Text>
      <TextInput  style={styles.input} onChangeText={image => (SetImage(image))} placeholderTextColor="black" placeholder="Enter The Image URL"/>

      <TextInput  style={styles.input} onChangeText={name => (SetName(name))} placeholderTextColor="black" placeholder="Enter The Name"/>
      
      <TextInput style={styles.input} onChangeText={price => (SetPrice(price))} placeholderTextColor="black" placeholder="Enter The Price"/> 
      <TextInput style={styles.input} onChangeText={description => (setDescription(description))} placeholderTextColor="black" placeholder="Enter The Description"/> 

       
       <View style={styles.container1}>
      <Text style={styles.label}>Choose an Option:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedOption}
          onValueChange={(itemValue ) => setSelectedOption(itemValue)}
          style={{ height: 170, width: 250 }}
          mode={"dialog"}
         
          
        >
          <Picker.Item  label="-- Select --" value="" color="#000"/>
          <Picker.Item  label="Burger" value="burger" color="#000" />
          <Picker.Item label="Crispy" value="crispy" color="#000"/>
          <Picker.Item label="Side" value="side" color="#000"/>
          <Picker.Item label="Drinck" value="drinck" color="#000"/>
        </Picker>
      </View>
    </View>
      <Text>{"\n"}</Text>
       <TouchableOpacity style={styles.button} onPress={()=>{AddItem()}}>
       <Text style={styles.buttonText}>Add Item</Text>
       </TouchableOpacity>
        
    
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container1:{padding:20},
 
  label: { fontSize: 16, marginBottom: 10 },
  pickerWrapper: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: 'red',  // Blue button color
    borderRadius: 8,  // Rounded corners
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
    marginTop: 20,  // Space between the button and input field
    shadowColor: '#000',  // Add shadow for elevation
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // For Android devices
  },
  buttonText: {
    color: '#fff',  // White text color
    fontSize: 18,  // Font size for the button text
    fontWeight: '600',  // Semi-bold text for prominence
  },inputlabel: {
    color: '#666',
    fontSize: 14,
    marginTop: 12,
  },

});


