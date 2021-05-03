import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const FindPassword = () => {
    return (
        <View style={styles.container}>
            <Text>비밀번호 찾기</Text>
        </View>
    )
}

export default FindPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    }
})
