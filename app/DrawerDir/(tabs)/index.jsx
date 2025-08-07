import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";





export default function index() {
  const [items, SetItems] = useState([]);
  const [burgers, SetBurgers] = useState([]);
  const [crispy, setCrispy] = useState([]);
  const [side,setSide]=useState([]);
  const [drinck,SetDricks]=useState([]);
  const [cartitems, SetCartItems] = useState([]);
  const [currentuser, SetCurrentUser] = useState();
  const [total, SetTotal] = useState(0);
  const router = useRouter();
  const [title,SetTitle]= useState("");


  
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
    
        // await AsyncStorage.removeItem('@cart')
         // await AsyncStorage.removeItem('@'+current_user.email+' history')
    
          let current_cart = JSON.parse(await AsyncStorage.getItem('@'+current_user.email+' cart'));
          // We have data!!
          if (current_cart != undefined) {
            SetCartItems(current_cart)
          } else{
            SetCartItems([])
    
          }
          
    
          let current_items = JSON.parse(await AsyncStorage.getItem('@cart'))
          
         
    
    
    
         
          SetBurgers([])
          setCrispy([])
          SetDricks([])
          setSide([])
            
        

          current_items.map((item) => {
                if(item !=undefined){
                if (item.category == 'burger') {
                  
                  SetBurgers((prev) => [...prev, item]);
                }
                if (item.category == "crispy") {
                  setCrispy((prev) => [...prev, item]);
                }
                if (item.category == "drinck") {
                  SetDricks((prev) => [...prev, item]);
                }
                if (item.category == "side") {
                  setSide((prev) => [...prev, item]);
                }
              }
              });   
              
              
              SetTitle("Burgers")
              
            
    
           
         
          
    
        }        
        fetchUsers()
        
     
      }, [])
    );
  

  


 const Burgers=() =>
  {
    SetTitle("Burgers");
    SetItems(burgers)
  }
  const Crispy=() =>
    {
      SetItems(crispy)
      SetTitle("Crispy");
    }
    const Side=()=>
      {
        SetItems(side)
        SetTitle("Sides");
      }
      const Drinck=()=>
        {
          SetItems(drinck)
          SetTitle("Drincks");
        }
  


  const AddToCart = async(item) => {

    let flag = true
    let additem = {
      Image: item.Image,
      name: item.name,
      price: item.price,
      amount: 1
    }
    
    
    let current_cart = JSON.parse(await AsyncStorage.getItem('@'+currentuser.email+' cart'));
    
    
    if (current_cart == undefined)
    {
      current_cart =[additem]
      flag= false
      
    }else
      {
    console.log(additem , "add item")
    console.log(current_cart , "current_cart")
    console.log(current_cart , "state_cart")

  
     
    current_cart.find((i) => {
      if(i.name == additem.name)
        {
          i.amount++
          console.log(i)
          flag = false
          return i
        }
    })
      
    }
    
    if (flag) {
     
      current_cart.push(additem)
    
      
    }
    SetCartItems(current_cart)
    await AsyncStorage.setItem('@'+currentuser.email+' cart',JSON.stringify(current_cart));
    Alert.alert("You Add a " + additem.name + " in the cart")
    
  }



  return (
    <ScrollView style={styles.container}> 
        
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <Text style={styles.header}>Menu</Text>
    </View>
    <ScrollView horizontal>
      <TouchableOpacity onPress={Burgers} style={{ width: 200, height: 100, backgroundColor: 'red', marginRight: 10 }}><Image style={{width:150,height:150}} source={require('./burger_icon.png')} /></TouchableOpacity> 
      <TouchableOpacity onPress={Crispy} style={{ width: 200, height: 100, backgroundColor: 'red', marginRight: 10 }} ><Image style={{width:150,height:150}} source={require('./chicken_burger_icon.png')} /></TouchableOpacity>
      <TouchableOpacity onPress={Side} style={{ width: 200, height: 100, backgroundColor: 'red', marginRight: 10 }} ><Image style={{width:150,height:150}} source={require('./fries_icon.png')} /></TouchableOpacity>
      <TouchableOpacity onPress={Drinck} style={{ width: 200, height: 100, backgroundColor: 'red', marginRight: 10 }} ><Image style={{width:150,height:150}} source={require('./drink_icon.png')} /></TouchableOpacity>

    </ScrollView>
    
    <Text style={styles.header}>{title}</Text>
    

  
      <View style={styles.itemsContainer}>
        {items.map((item) => {
          if (item.name !== undefined ) {
            return (
              <View key={item.name} style={styles.item}>
              <View style={{ flexDirection: 'row' }}>
  <Image source={{ uri: item.Image }} style={styles.image} />
<Text>    </Text>
   <View style={{ justifyContent: 'flex-start' ,  }}>
    <Text style={styles.itemDescription}>{item.description}</Text>
    </View>
    </View>
              
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>Price: {item.price}₪</Text>
                <TouchableOpacity style={styles.button} onPress={()=>{AddToCart(item)}}>
        <Text style={styles.buttonText}>{<Feather name="plus"  size={24}   />}Add To Cart</Text>
      </TouchableOpacity>
              </View>
            );
          }
        })}
      </View>

      
     

       

     
    </ScrollView>
  );
};

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
  itemDescription: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
    width:220
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
  }, buttonText: {
    color: '#fff',  // White text color
    fontSize: 18,  // Font size for the button text
    fontWeight: '600',  // Semi-bold text for prominence
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