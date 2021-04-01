import React from 'react';
import { TextInput,StyleSheet } from 'react-native'

const Input = (props) => {
    //NOTE: to myself, the props property on the right would overwrite the one on the left
    return ( 
        <TextInput {...props} style={{...props.style,...styles.Input}}  />
     );
}

const styles = StyleSheet.create({
    Input: {
        height:30,
        borderBottomColor:'gray',
        borderBottomWidth:1,
        marginVertical: 10
    }
})

export default Input;