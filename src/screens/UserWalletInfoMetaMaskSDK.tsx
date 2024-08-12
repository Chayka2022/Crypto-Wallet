import 'node-libs-react-native/globals';
import 'react-native-url-polyfill/auto';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
//import { MMSDK } from '../../web3/metamask';

function UserWalletInfoMetaMaskSDK() {
    const onPress = async() => {

    }
    return (
    <View>
        <Button 
            title='Sign up with metamask'
            onPress={onPress}
        />
    </View>
    );
}

export default UserWalletInfoMetaMaskSDK;