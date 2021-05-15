import React from "react";
import { View, Text, Image} from "react-native";
import {Button} from "react-native-elements";

const CourseDerscerption = (props) => {
    return(
        <View style= {{flex : 1 , justifyContent: "center"}}>
             <Image
                style={{width:"100%" , height: "70%"}}
                //source={require($`props.image`)}
                source = {{uri : 'https://www.pngitem.com/pimgs/m/126-1265114_end-hd-png-download.png'}}
            />
            <Text style={{padding:20, fontSize:24,textAlign: "center"}}>
                    descerption     
            </Text> 
            <Text style={{padding:20, fontSize:24,textAlign: "center"}}>
                {/* {props.CourseName} */}
                cousre name 
            </Text>
            <Button
            //title= "go to $`props.CourseName`"
            title = "hello from courselist"
            color= "#F0F8FF"
            //onpress=() =>{}
            />
        </View>
    )
} 

export default CourseDerscerption;