import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const NoInternetComponent = () => {

	useEffect(() => {

		SplashScreen.hide();
	},[])	

	return (

		<View style={style.container}>

			<Text style={style.text}>No connect internet</Text>

		</View>

	)
}

export default NoInternetComponent;

const style = StyleSheet.create({

	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		backgroundColor:'green'
	},
	text:{
		fontSize:25,
		color:'#fff'
	}
})