import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const ErrorMessage = ({message}) => {

	useEffect(() => {

		SplashScreen.hide();
		
	},[])	

	return (

		<View style={style.container}>

			<Text style={style.text}>ERROR</Text>

			<Text style={style.text}>{message}</Text>

			<Text style={style.text}>Restart App</Text>

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
	}
})