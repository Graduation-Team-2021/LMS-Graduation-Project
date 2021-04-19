import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

import Input from './Input';
const FormInputFiels = (props) => {
    return ( 
        <View style={styles.formInputField}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Input style={styles.dataEntry} />
        </View>
     );
}

const styles = StyleSheet.create({
    formInputField:{
        justifyContent:'flex-start',
        alignItems:'flex-start',
        padding: '10%',
        width:'100%',
    },
    title: {
        paddingHorizontal:10,
    },
    dataEntry: {
        width:'100%',
    }
})
 
export default FormInputFiels;