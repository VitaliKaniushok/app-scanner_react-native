import React, { useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const ErrorMessage = ({message,checkIsPurchase}) => {

	useEffect(() => {

		SplashScreen.hide();
		
	},[])	

	return (

		<View style={style.container}>

			<Text style={style.text}>ERROR</Text>

			<Text style={style.text}>{message}</Text>
			
			<TouchableOpacity style={style.button}
            	onPress = { async ()=> await checkIsPurchase()}>

            	<Text style={style.textButton}>Restart App</Text>

            </TouchableOpacity>

		</View>
	)
}

export default ErrorMessage;

const style = StyleSheet.create({

	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'green'
	},
	text:{
		fontSize:25,
		color:'#fff',
		paddingTop:20,
		paddingLeft:20,
		paddingRight:20
	},
	textButton:{
		fontSize:25,
		color: 'green',
		paddingTop:10,
		paddingBottom:10,
		paddingLeft:20,
		paddingRight:20
	},
	button: {
	    borderRadius:7,   
	    margin: 10,
	    backgroundColor:'#fff'    
	}
})