import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { useEffect, useState , useCallback } from "react";
import { Alert, Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';


export default function CartPage() {



  
  const [cartitems, SetCartItems] = useState([]);
  const [currentuser, SetCurrentUser] = useState();
  const [total, SetTotal] = useState(0);
  const router = useRouter();

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [address, setAddress] = useState(null);

  const getLocation = async () => {
    // Ask permission
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
      return;
    }

    // Get coordinates
    let location = await Location.getCurrentPositionAsync({});
    let { latitude, longitude } = location.coords;

    // Reverse geocode to get address
    let reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    if (reverseGeocode.length > 0) {
      let addr = reverseGeocode[0];
      setAddress(` ${addr.street}, ${addr.city}`);
    }
  };  



  const SetAmount = async (item, opartion) => {



    let newlist = [...cartitems]
    
    if (item.amount == 1 && opartion == "-") {
     newlist= newlist.filter((cartitem) => {return cartitem !== item })
    }
    else if (opartion == "+") {
      newlist.find((cartitem) => {
        
        return cartitem === item
      }).amount++
      
    }
    else if (opartion == "-") {
      newlist.find((cartitem) => { return cartitem === item }).amount--
      
    }
    console.log(newlist)
    SetCartItems(newlist)
    await AsyncStorage.setItem('@'+currentuser.email+' cart',JSON.stringify(newlist));
  }
  
  

  useEffect(() => {

    let getTotal = 0
    cartitems.map((item) => {
      if (item != undefined) {
        getTotal += item.price * item.amount
      }

    })
    SetTotal(getTotal);


  }, [cartitems]);



  useFocusEffect(
    useCallback(() => {
      const fetchUsers = async () => {
        

        
        let current_user = JSON.parse(await AsyncStorage.getItem('@current_user'));
        // We have data!!
        if (current_user != undefined) {
          SetCurrentUser(current_user)
        } else{
          Alert.alert("You Need To Login First")
          router.push('/')
        }
        
  
        let current_cart = JSON.parse(await AsyncStorage.getItem('@'+current_user.email+' cart'));
        // We have data!!
        if (current_cart != undefined) {
          SetCartItems(current_cart)
        } else{
          SetCartItems([])
  
        }
     

       
       getLocation();
       console.log(address)
        
        
        

      }
  
          
      fetchUsers()
    }, [])
  );


 

 const Purchase=async()=>{






  if(total>0){
   
    let date=new Date()
    let key=""+date.toLocaleDateString()+"            "+date.toLocaleTimeString();
                                                  
    let str="\n"+key+"\n-------------------------------\n";

  cartitems.map((i) => {
    str+=i.name+" x"+i.amount+"    "+i.price+"     "+i.amount * i.price+"\n"
  })
  str+="____________________________\n                          total: "+total
 
    
     let history= JSON.parse(await AsyncStorage.getItem('@'+currentuser.email+' history'));
     if(history!= undefined)
      {
        history=[...history,{str:str,key:new Date()}]
    
      }else
      {
         history=[{str:str,key:new Date()}]
      }
   
       Alert.alert('Order Placed!', 'Delivering to: '+address )
     
      await AsyncStorage.setItem('@'+currentuser.email+' history',JSON.stringify(history));
     SetCartItems([]) 
     await AsyncStorage.setItem('@'+currentuser.email+' cart',JSON.stringify([]));}
     
    
     }
     
    
     


  return (
    <ScrollView style={styles.container}>
      <Text>
      <Text style={styles.header} >Cart</Text>
      </Text>
      <Text style={styles.total}>Total: {total}₪</Text>

     

            <View style={styles.cartContainer}>
              {
              cartitems.map((i) => {
                if (i.name != "") {
                 
                  return (
                    <View key={i.name} style={styles.cartItem}>
                      <Image source={{ uri: i.Image }} style={styles.image} />
                      <Text style={styles.cartItemName}>{i.name}</Text>
                      <Text style={styles.cartItemPrice}>Price: {i.price}₪ </Text>
                      <Text style={styles.cartItemAmount}>Amount: {i.amount}</Text>
                      <Text>
                        <Button color="red" title="+" onPress={() => { SetAmount(i, "+") }} />
                        <Button color="red" title="-" onPress={() => { SetAmount(i, "-") }} />
                      </Text>
                    </View>
                  );
                }

              })}


            </View>
          

     


          <Text>{"\n"}</Text>

      <TouchableOpacity style={styles.button} onPress={Purchase}>
            <Text style={styles.buttonText}>Purchase</Text>
            </TouchableOpacity>
      
     
   
     
    </ScrollView>


  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#555',
  },
  itemsContainer: {
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  itemPrice: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  cartContainer: {
    marginTop: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 3,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#888',
  },
  cartItemAmount: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },button: {
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
  },

});



