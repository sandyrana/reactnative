import { View, Text,StyleSheet,Image } from 'react-native'
import React,{useState,useEffect}from 'react'
import ToggleSwitch from 'toggle-switch-react-native'
import {getUserDetails} from '../utils/LocalStorage';
import { BASE_URL } from "../axios/Api";
import Loading from '../components/Loading';
import { showToastWithGravityAndOffset } from '../utils/Toast'
import AppStatusBar from '../components/AppStatusBar';




export default function HomeScreen() {
  const [ca,setCa] =useState(false);
  const [fig,setFig] =useState(false);
  const [user,setUser] =useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect( async() => {
    let user = await getUserDetails();
    setUser(user);
 
  }, []);


  const changeValue = () =>{
    if(ca == true){
      setCa(false)
      callApiforCA()
    }else{
      setCa(true)
      callApiforCA()
    }
  }

  const callApiforCA = () => {
   setIsLoaded(true);
    
      fetch(BASE_URL + "/login.php", {
        method: 'POST',
        body:JSON.stringify({
          email:user.email,
          type:"cal",
          value:fig
        })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          setIsLoaded(false);
          showToastWithGravityAndOffset(responseJson.msg)
        
        })
        .catch((error) => {
          console.error(error);
        });
  
    }

  const changeValueforfig = () =>{
    if(fig == true){
      setFig(false)
      changforfig()
    }else{
      setFig(true)
      changforfig()

    }
  }


  const changforfig = () => {
    setIsLoaded(true);
     
       fetch(BASE_URL + "/login.php", {
         method: 'POST',
         body:JSON.stringify({
           email:user.email,
           type:"cal",
           value:fig
         })
         })
         .then((response) => response.json())
         .then((responseJson) => {
           setIsLoaded(false);
           showToastWithGravityAndOffset(responseJson.msg)
         
         })
         .catch((error) => {
           console.error(error);
         });
   
     }

  return (
    <View style={styles.container}>
    <AppStatusBar />
    {isLoaded ? <Loading /> : null}
   <View style={{marginBottom:100}}> 
   {user !== null ? (
     <View>
     <Image
     source={{ uri: `data:image/png;base64,${user.image}`}}
     style={styles.image}
   />
     <Text >Name: {user.name}</Text>
     <Text >Email: {user.email}</Text>
     </View>
   
   

 ) : null}</View>


    <ToggleSwitch style={{marginBottom:20}}
  isOn={ca}
  onColor="green"
  offColor="red"
  label="Face Login"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="large"
  onToggle={()=>{changeValue()}}
/>


<ToggleSwitch  style={{marginBottom:20}}
  isOn={fig}
  onColor="green"
  offColor="red"
  label="Finger Login"
  labelStyle={{ color: "black", fontWeight: "900" }}
  size="large"
  onToggle={()=>{changeValueforfig()}}
/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',


  },
});