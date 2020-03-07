import React, { useState, useEffect, useContext } from 'react';
import { Animated, View, StyleSheet, Image, Easing } from "react-native";
import SplashScreen from 'react-native-splash-screen';
import DialogPurchase from "./dialog-purchase.js";
import {ContextApi} from '../context-api.js';

const RotateLogo = () => {

	const [ spinValue, setSpinValue ] = useState( new Animated.Value(0) );

	useEffect(() => {
		
	    Animated.loop(
			Animated.timing(
			    spinValue,
			  {
			    toValue: 1,
			    duration: 4000,
			    easing: Easing.linear,
			    useNativeDriver: true
			  }
			),
			{ 
				iterations: -1 
			}
		).start()
	},[]);

	const spin = spinValue.interpolate({
	  inputRange: [0, 1],
	  outputRange: ['0deg', '360deg']
	});

    return (

       <Animated.Image
		  style={{transform: [ {rotateZ: spin},	{perspective: 10} ] }}
		  source={require('../../sources/splash_icon.png')} />
    )
}

const LoadingComponent = () => {

	const { dialogPurchase } = useContext(ContextApi);

	const [ dialogVisible, setDialogVisible ] = useState(dialogPurchase);

	useEffect(() => {

		SplashScreen.hide();

	},[]);

	useEffect(() => {

		setDialogVisible(dialogPurchase);

	},[dialogPurchase]);

	return (

		<View style={style.contentView}>

			<RotateLogo/>

			<DialogPurchase visible={dialogVisible} />

		</View>
	);			
}
export default LoadingComponent;

const style = StyleSheet.create({
      
    contentView: {
        flex:1,
        alignItems:'center',
        justifyContent: 'center',        
        backgroundColor: '#000',
        padding:25
    }
});