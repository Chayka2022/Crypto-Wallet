import { Text, View } from 'react-native';
import { Wallet } from './src/screens';
import { CoinsList } from './src/screens/CoinsList';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Entypo, FontAwesome5 } from '@expo/vector-icons';
import "node-libs-react-native/globals"
import "react-native-url-polyfill/auto"
import "react-native-get-random-values"

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen name="Wallet" component={Wallet} 
          options={{headerShown: false, positon:'absolute', tabBarShowLabel: false,  tabBarIcon: ({focused})=>{
            return(
            <View style={{alignItems: "center", justifyContent:"center"}}>
              <Entypo name="wallet" size={'25%'} color={focused ? "#16247d" : "#111"} />
              <Text style={{fontSize: 12, color: "#16247d"}}>Wallet</Text>
            </View>
            )
            }
          }}/>
        <Tab.Screen name="Coins List" component={CoinsList}  
          options={{positon:'absolute', headerShown: false, tabBarShowLabel: false, tabBarIcon: ({focused})=>{
            return(
            <View style={{alignItems: "center", justifyContent:"center"}}>
              <FontAwesome5 name="list" size={'25%'} color={focused ? "#16247d" : "#111"} />
              <Text style={{fontSize: 12, color: "#16247d"}}>Crytpo List</Text>
            </View>
            )
            }
          }}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const screenOptions = {
  tabsBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    paddingTop: '3%',
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: '10%',
    background: "#fff",
  }
}