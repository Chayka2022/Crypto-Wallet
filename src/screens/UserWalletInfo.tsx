
import SendTransactionButton from './SendTransactionButton'

import '@walletconnect/react-native-compat'
import { WagmiProvider, useSendTransaction } from 'wagmi'
import { sepolia } from '@wagmi/chains'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal, defaultWagmiConfig, Web3Modal } from '@web3modal/wagmi-react-native'
import { W3mButton } from '@web3modal/wagmi-react-native'

////////
import { useWeb3Modal } from '@web3modal/wagmi-react-native'
import { Button, StyleSheet } from 'react-native'
////////

// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '366aab34eb2ea1bd3660764991f5b9e9'

// 2. Create config
const metadata = {
  name: 'Crypto Tracker',
  description: 'React Native Crypto Tracker',
  url: 'https://walletconnect.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
  redirect: {
    native: 'YOUR_APP_SCHEME://',
    universal: 'YOUR_APP_UNIVERSAL_LINK.com'
  }
}

const chains = [sepolia] as const

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })

// 3. Create modal
createWeb3Modal({
  projectId,
  wagmiConfig,
  defaultChain: sepolia, // Optional
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

///////////////
const { open, close } = useWeb3Modal()

///////////////

export default function App() {
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <Web3Modal />
        <W3mButton balance='show'/>
        <Button title='Open menu' onPress={() => open({view: 'Account'})}/>
        <Button title='Send Transaction' onPress={() => open({view: 'Account'})}/> 
      </QueryClientProvider>
    </WagmiProvider>
  )
}
