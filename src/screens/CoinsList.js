import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CryptoCurrencies } from ".";
import { CryptoDetailsPage } from ".";

const Stack = createNativeStackNavigator();

const CoinsList = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="  "
                component={CryptoCurrencies}
                options={{ headerShown: false }} 
            />
            <Stack.Screen
                options={{headerShown: true}} 
                name="Coin Detail Page"
                component={CryptoDetailsPage}
            />
        </Stack.Navigator>
    )
}
export {CoinsList}