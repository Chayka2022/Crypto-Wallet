import { View, Text, Button } from 'react-native';
import React from 'react';

import { parseEther } from 'viem'
import { useSendTransaction } from 'wagmi'

const { data, sendTransaction } = useSendTransaction();

const handleSendTransaction = async () => {
try {
    await sendTransaction({
      to: '0xF65C245dDA065e16767F3d61a7c87cA5fEcB375c', // Replace with the recipient address
      value: parseEther('0.001'), // Value in wei (1 ETH in this example)
    });
    console.log('Transaction sent:', data);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
};
function Wallet() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button title='Send Transaction' onPress={sendTransaction}/>
        </View>
    );
}

export default Wallet