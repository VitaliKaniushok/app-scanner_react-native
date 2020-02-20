import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ContextApi } from '../context-api.js';


const ButtonsGroup = (props) => {    

    const { setCameraType, scaning, isScaning, appText  } = useContext(ContextApi);    

	return(

		<View style = { style.buttonGroup }>	                    

            <TouchableOpacity 
            	style = { style.buttonChange }
            	onPress = { setCameraType }>
            		<Image
                        style = { style.buttonImg }
                        source={require('../../sources/change_camera.png')}
                      />
        	</TouchableOpacity>

            <TouchableOpacity 
                style = { style.buttonScan }
                onPress = { scaning }>
                    <Image
                        style = { style.buttonImg }
                        source={require('../../sources/push.png')}
                      /> 
            </TouchableOpacity>

        	<TouchableOpacity 
            	style = { style.buttonSettings }
            	onPress={() => {
                    if (isScaning) return;                               
                    props.navigation.navigate(
                        'Details', 
                        { titleContext:  appText.topBarSetting }) 
                }} >
            		<Image
                        style = { style.buttonImg }
                        source={require('../../sources/settings.png')}
                      />
        	</TouchableOpacity>

    	</View>
	)        
}

export default ButtonsGroup;

const style = StyleSheet.create({
      
    buttonGroup: {
        flex:1,
        flexDirection:'row',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: '#000'
    },
    buttonImg:{
        height: 70,
        width: 70,
    },
    buttonChange: {
        height: 70,
        width: 70,       
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',       
    },    
    buttonSettings: {
        height: 70,
        width: 70,                
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center'        
    },    
    buttonScan: {
        height: 70,
        width: 70,     
        alignSelf: 'flex-start',
        alignItems: 'center',
        justifyContent: 'center',       
    }
});