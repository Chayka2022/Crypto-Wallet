import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import UserWalletInfo from './UserWalletInfo';
import UserWalletInfoMetaMaskSDK from './UserWalletInfoMetaMaskSDK';
import EthereumImage from '../../assets/ethereum-eth-logo.png';
import MetaMaskImage from '../../assets/free-metamask-6432337-5326393.webp'

export default function Wallet() {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <ScrollView>
                <View style={styles.headerTopBar}>
                    <Text style={styles.headerText}>Wallet</Text>
                </View>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={styles.mmskImage} source={MetaMaskImage}/>
                    <Text style={styles.balanceText}>Your Balance:</Text>
                    <UserWalletInfo/>
                    <Image style={styles.ethImage} source={EthereumImage}/>
                </View>
                </ScrollView>
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
    ethImage: {
        marginTop: 40,
        margin: 20,
        width: 150,
        height: 150,
    },
    mmskImage: {
        marginBottom: 20,
        margin: 20,
        width: 250,
        height: 250,
    },
    balanceText: {
        fontSize: 30,
        margin: 10
    }
  });