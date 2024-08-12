import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import axios from 'axios';

export default function CryptoCurrencies({ navigation }) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const readDataFromFile = async () => {
        const path = require('../../assets/gc_API_Request_Res/res.json'); 

        try {
            const jsonData = path;
            return jsonData;
        } 
        catch (error) {
            console.warn('Error reading data from file:', error);
            return [];
        }
    };

    useEffect(() => {
        getAPIdata();
    }, []);

    const getAPIdata = async () => {
        // const TrendingCoins = (currency) => 1
        //     `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h`;

        // let config = {
        //     headers: {
        //         accept: 'application/json',
        //         'X-CoinAPI-Key': 'CG-SvrA5NgqvrVWpzJ8LviXg5Ci', 
        //     },
        // }; 1

        try {
            //let response = await axios.get(TrendingCoins('usd'), config); 1
            //console.warn(response);            1
            //setData(response.data);           1
            const jsonData = await readDataFromFile();
            if (!jsonData.length) return;
            //console.warn(jsonData);
            setData(jsonData);
            setLoading(false);
        } catch (error) {
            console.warn(error);
            setLoading(false);
        }
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("Coin Detail Page", { itemId: item.id })}>
            <View style={styles.item}>
                <Text style={styles.name}>{item.id}</Text>
                <Text style={styles.symbol}>{item.symbol.toUpperCase()}</Text>
                <Text style={styles.price}>${item.current_price.toFixed(2)}</Text>
                <Image height={50} width={50} source={{uri: item.image}}/>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
            <View style={styles.headerTopBar}>
                <Text style={styles.headerText}>Cryptocurrencies</Text>
            </View>
            {loading ? (
                <Text>Loading...</Text>
            ) : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                />
            )}
        </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    island: {
        height: "6%",
        backgroundColor: "black"
    },
    container: {
        flex: 1,
        padding: 0,
        paddingBottom: '10%'
    },
    headerTopBar: {
        backgroundColor: 'black',
        padding: 16,
    },
    headerText: {
        color: "gold",
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: "center",
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    name: {
        fontSize: 16,
    },
    symbol: {
        fontSize: 16,
        color: '#666',
    },
    price: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});