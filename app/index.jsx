import { Button as BTNElm, Input } from "@rneui/base";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useRouter , Link} from "expo-router";
import { useEffect, useState ,  } from "react";
import { Alert, Button, ScrollView, Text, TextInput, TouchableOpacity , View , Dimensions ,ImageBackground , Image} from "react-native";

export default function Index() {
  const [email, SetEmail] = useState(null);
  const [password, SetPassword] = useState(0);
  const [users, SetUsers] = useState([]);
  const router = useRouter();
  const windowWidth = Dimensions.get('window').width;

  useEffect( () => {
    const fetchUsers = async () => 
      {     
       

        try{
          let allusers = await AsyncStorage.getItem('@users');
          
            // We have data!!
            if(allusers != null)
              {
            console.log(allusers);
            SetUsers(JSON.parse(allusers))
              }else
              {
                SetUsers([])
              }
          
        }catch(e) {
          Alert.alert("erorr")
        }

        let current_user = JSON.parse(await AsyncStorage.getItem('@current_user'));

        if(current_user.email != undefined)
        {
          router.push("./DrawerDir/(tabs)")
        //  await AsyncStorage.setItem('@current_user',JSON.stringify([]));
        }
        
      }
     
      fetchUsers()
    
  },[]);

  const Login = () => {  
    let flag = true;
    if (email == undefined || email == "") {
      Alert.alert("The Email Is Empty!!!")
      
      return
    }
    if (password == undefined || password == "") {
      Alert.alert("The Password Is Empty!!!")
      return
    }
   
    users.map(async (user) => {
      if (email == user.email && password == user.password&&user != undefined) {
        
       
        Alert.alert(user.name + " welcome!!")
        flag = false
        await AsyncStorage.setItem('@current_user',JSON.stringify(user));
        router.push("./DrawerDir/(tabs)")
       
      }
    })
    if (flag) {
      Alert.alert("Not Found")  
    
    }

  }

  return (
    <ImageBackground
    source={require('./background.png')}
   
    style={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "red",
    }}
  >

    <Image source={require('./DrawerDir/app_icon.png')} style={{width:120,height:100}}></Image>
      <View
  intensity={50}
  tint="dark"
  style={{
    width: windowWidth * 0.8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'white',
    borderRadius: 5,        
    overflow: 'hidden' ,
    width:370,    
    height:470,
  }}
>
<Text>{"\n"}</Text>
<Text style={{fontSize:40}} >Login</Text>
<Text>{"\n"}</Text>

        
      <Input
       onChangeText={email => SetEmail(email)}
       placeholderTextColor="gray"
       placeholder="Enter Your Email"
       leftIcon={{ type: 'font-awesome', name: 'envelope',color:"red", }}
       />
       
     
      <Input
       onChangeText={password => SetPassword(password)}
       placeholderTextColor="gray"
       placeholder="Enter Your Password"
       secureTextEntry={true}
       leftIcon={{ type: 'font-awesome', name: 'lock' ,color:"red"}}
       
       />
      <Text>{"\n"}</Text>

       <BTNElm radius={"sm"} type="solid" color="red" titleStyle={{color:'white',fontSize:25,}} title="Login" style={{width:320,}} onPress={Login}/>
       <Text>{"\n"}</Text>
       <Text style={{fontSize:15}}>Don't have an account? {<Link href='./Register'  style={{color:'red',margin: 20, paddingVertical: 10,paddingHorizontal: 20, borderRadius: 10,overflow: 'hidden',textAlign:'center'}}> Register </Link>}</Text>
      
      
</View>
      
       
    </ImageBackground>
   
  );
  
}
const styles = {
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
    backgroundColor: '#0066cc',  // Blue button color
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

}




