import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Dimensions, Image, ImageBackground, Text, View } from "react-native";

import { Button as BTNElm, Input } from "@rneui/base";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
export default function Register() {
  const [email, SetEmail] = useState();
  const [password, SetPassword] = useState();
  const [firstname, SetFirstname] = useState();
  const [lastname, SetLastname] = useState();
  const [confirmpass, SetConfirmPass] = useState();

  const [users, SetUsers] = useState([]);
  const NameRegex = new RegExp("^[A-Za-z\s'-]{5,}$")
  const EmailRegex = new RegExp("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");


  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const router = useRouter();


  useEffect(() => {
      

    const fetchUsers = async () => {
      let allusers = JSON.parse(await AsyncStorage.getItem('@users'));
      // We have data!!
      if (allusers != undefined) {
        SetUsers(allusers)
      } else
        SetUsers([])
    }    
    fetchUsers()
  }, []);




  const Registertion = async () => {
    let flag = true
    let newuser =
    {
      name: firstname,
      lastname:lastname,
      email: email,
      password: password,
      admin:false
    }



    users.map((user) => {
      if (user.email == email) {
        flag = false

        Alert.alert("The User Already Exist!!!")
        return
      }
    })


    if (!firstname || firstname.trim() === '') {
      Alert.alert("The First Name Is Empty!!!");
      flag = false;
      return;
    } else if (!NameRegex.test(firstname)) {
      Alert.alert("Wrong First Name Format!!!");
      flag = false;
      return;
    }
   

    if (!lastname || lastname.trim() === '') {
      Alert.alert("The Last Name Is Empty!!!");
      flag = false;
      return;
    }else if (!NameRegex.test(lastname)) {
      Alert.alert("Wrong Last Name Format!!!");
      flag = false;
      return;

    }


    if (!email || email.trim() === '') {
      Alert.alert("The Email Is Empty!!!");
      flag = false;
      return;


    }else if (!EmailRegex.test(email)) {
      Alert.alert("Wrong email Format!!!");
      flag = false;
      return;

    }


if (!password || password.trim() === '') {
      Alert.alert("The Password Is Empty!!!");
      flag = false;
      return;
    } else if (password.length < 8) {
      Alert.alert("Password must be at least 8 characters long");
      flag = false;
      return;
    }

    if (!confirmpass || confirmpass != password) 
      {
        Alert.alert("The Confirm Password Is Not Correct!!!");
        flag = false;
        return;
      }

    if (flag) {


      users.push(newuser)

 
    
      await AsyncStorage.setItem('@users', JSON.stringify(users));


      Alert.alert(newuser.name + " Add Seccsusfuly :)")
      router.push('/')

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
          height: windowHeight * 0.8,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: 'white',
          borderRadius: 5,
          overflow: 'hidden',
          width: 370,
          height: 650,
        }}
      >
        <Text style={{ fontSize: 40 }}>Register{"\n"}</Text>
        <Input
          onChangeText={name => SetFirstname(name)}
          placeholderTextColor="gray"
          placeholder="Enter Your First Name"
          leftIcon={{ type: 'font-awesome', name: 'user', color: "red", }}
        />
        <Input
          onChangeText={name => SetLastname(name)}
          placeholderTextColor="gray"
          placeholder="Enter Your Last Name"
          leftIcon={{ type: 'font-awesome', name: 'user', color: "red", }}
        />
        <Input
          onChangeText={email => SetEmail(email)}
          placeholderTextColor="gray"
          placeholder="Enter Your Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope', color: "red", }}
        />
        <Input
          onChangeText={password => SetPassword(password)}
          placeholderTextColor="gray"
          placeholder="Enter Your Password"
          secureTextEntry={true}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: "red" }}

        />
        <Input
          onChangeText={password => SetConfirmPass(password)}
          placeholderTextColor="gray"
          placeholder="Confirm Your Password"
          secureTextEntry={true}
          leftIcon={{ type: 'font-awesome', name: 'lock', color: "red" }}

        />
        <BTNElm radius={"sm"} type="solid" color="red" titleStyle={{ color: 'white', fontSize: 25, }} title="Register" style={{ width: 320, }} onPress={Registertion} />
        <Text>{"\n"}</Text>
        <Text style={{ fontSize: 15 }}>You Already have an account? {<Link href='/' style={{ color: 'red', margin: 20, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, overflow: 'hidden', textAlign: 'center' }}> Login </Link>}</Text>



      </View>

    </ImageBackground>
  );
}
