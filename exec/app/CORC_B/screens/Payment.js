import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BarcodeScan from './BarcodeScan';

const Payment = props => {
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <View style={styles.container}>
            <BarcodeScan />
            <Text>결제 정보 생성 페이지</Text>
        </View>
    )
}

export default Payment

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        // alignItems: 'center'
    }
})
