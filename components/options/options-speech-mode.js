import React, { useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import {ContextApi} from '../context-api.js';
import  OptionsTemplateComponent  from './options-template-component.js';

const OptionsSpeechMode = () => {

	const { speech, incPitch, decPitch, incRate, decRate, appText } = useContext(ContextApi);

	const pitch = speech.pitch *10;
	const rate = speech.rate *10;

	return (

        <OptionsTemplateComponent>

        	<Text style = { styles.text }>{appText.headSpeechSet}</Text>

        	<View style={styles.boxSettings}>

        		<View style={styles.box}>

        			<Text style = { styles.text }>{appText.buttonPitch}</Text>

        			<View style={styles.boxButton}>

        				<TouchableOpacity 
	                		style = { styles.buttonSetting }
	                		onPress = { decPitch }>
	                			<Text style = { styles.textButton }>-</Text> 
		                </TouchableOpacity>

		                <Text style = { styles.textValue }>{pitch}</Text>

		            	<TouchableOpacity 
		                	style = { styles.buttonSetting }
		                	onPress = { incPitch }>
		                		<Text style = { styles.textButton }>+</Text>
		            	</TouchableOpacity>

        			</View>	        			

        		</View>

        		<View style={styles.box}>

        			<Text style = { styles.text }>{appText.buttonRate}</Text>

        			<View style={styles.boxButton}>

        				<TouchableOpacity 
	                		style = { styles.buttonSetting }
	                		onPress = { decRate }>
	                			<Text style = { styles.textButton }>-</Text> 
		                </TouchableOpacity>

		                <Text style = { styles.textValue }>{rate}</Text>

		            	<TouchableOpacity 
		                	style = { styles.buttonSetting }
		                	onPress = { incRate }>
		                		<Text style = { styles.textButton }>+</Text>
		            	</TouchableOpacity>

        			</View>	        			

        		</View> 

            </View>

    	</OptionsTemplateComponent>
  	)
}
export default OptionsSpeechMode;

const styles = StyleSheet.create({
	boxSettings: {
		flex:1,
		flexDirection:'row',		
		justifyContent:'space-around'
	},
	box: {
		flex:1,		
		justifyContent:'center',
		alignItems:'center'
	},
	boxButton:{
		flex:1,
		flexDirection:'row',
		justifyContent:'center',
		alignItems:'center'
	},
    buttonSetting: {
        height: 40,
        width: 40,
        borderRadius: 10,        
        
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(167,174,166,1)'       
    },
  	text: { fontSize: 14,  color: '#fff', textAlign:'center',paddingBottom:15,flex:1 },
  	textButton: { fontSize: 27,  color: '#000', textAlign:'center'},
  	textValue: { fontSize: 27,  color: '#fff', textAlign:'center',width:40,height:40}  	
});