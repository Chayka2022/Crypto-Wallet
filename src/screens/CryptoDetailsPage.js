import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import Chart from '../chart/chart.tsx'; // Adjust the import if the path is different
import axios from 'axios';

export default function CryptoDetailsPager({ route, navigation }) {
    const { itemId } = route.params;

    const [data, setData] = useState(null); // Use null as the initial state for data
    const [loading, setLoading] = useState(true);

    const readDataFromFile = async () => {
        const TrendingCoins = (itemId) =>
            `https://api.coingecko.com/api/v3/coins/${itemId}?accept=application/json`;

        let config = {
            headers: {
                accept: 'application/json',
                'X-CoinAPI-Key': 'CG-SvrA5NgqvrVWpzJ8LviXg5Ci', 
            },
        };

        try {
            const response = await axios.get(TrendingCoins(itemId), config); //2
            return response.data;
        } catch (error) {
            console.warn('Error fetching data from API:', error);
            return null;
        }
    };

    useEffect(() => {
        getAPIdata();
    }, []);

    const getAPIdata = async () => {
        try {
            const jsonData = await readDataFromFile();
            if (!jsonData) return;
            setData(jsonData);
            setLoading(false);
        } catch (error) {
            console.warn(error);
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                {loading ? (
                    <Text>Loading...</Text>
                ) : (
                    <View style={styles.container}>
                        <View style={styles.headerTopBar}>
                            <Text style={styles.headerText}>{data?.name ? data.name.toString() : ''}</Text>
                            <Text style={styles.symbol}>{data?.symbol ? data.symbol.toString().toUpperCase() : ''}</Text>
                        </View>
                        <Chart itemId={itemId}/>
                        <Image height={120} width={120} source={{ uri: data.image.large }} style={styles.image} />
                        <Text style={styles.description}>{data?.description?.en ? data.description.en.split(". ").slice(0,4).join(". ") : ''}.</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
        width: '100%',
        marginBottom: 100,
    },
    headerTopBar: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'black',
        width: '100%',
    },
    headerText: {
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'gold',
    },
    image: {
        padding: 16,
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    symbol: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        marginBottom: 100,
    },
});
