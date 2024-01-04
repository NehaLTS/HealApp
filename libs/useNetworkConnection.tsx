import React, { useEffect } from 'react'
import NetInfo from '@react-native-community/netinfo'
const useNetworkConnection = () => {
    const [isConnected, setIsConnected] = React.useState<boolean | null>(null)
    useEffect(() => {
        // COMMENT: Subscribe to network state changes
        const unsubscribe = NetInfo.addEventListener((state) => {
            setIsConnected(state.isConnected)
        })
        // COMMENT: Unsubscribe when the component is unmounted
        return () => unsubscribe()
    }, [])
    return { isConnected }
}
export default useNetworkConnection