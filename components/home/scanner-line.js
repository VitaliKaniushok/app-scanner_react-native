import React, { useContext, useState, useEffect } from 'react';
import { Animated, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { ContextApi } from '../context-api.js';

const RunLine = (props) => {

	const [ posX, setPosX ] = useState( new Animated.Value(-300) );

	useEffect(() => {
		const height = Dimensions.get('window').height;

	    Animated.loop(
			 Animated.sequence([
			    Animated.timing(posX, {
			      toValue: height,
			      duration: 900,			      
			    }),
			    Animated.timing(posX, {
			      toValue: -300,
			      duration: 900,			      
			    })
			]),
			{
			   iterations: 2
			}
		).start(() => props.scaningResult())
	},[]);

	let animPosX  = posX;

    return (

      <Animated.View                 
        style={{
          ...props.style,
          top: animPosX,         
        }}
      >
        {props.children}
      </Animated.View>
    )
}

const ScannerLine = () => {			
		
	const width= Dimensions.get('window').width;

	const { scaningResult } = useContext(ContextApi);

	return (

		<RunLine  				
	        style={{      
	          	position:'absolute',
	        	width:width,		        	
	          	height: 300,
        	}} 
        	scaningResult={ scaningResult } >

			<LinearGradient
		        colors={['transparent','rgba(210,255,82,1)', 'transparent']}
		        style={{      
		          	flex:1,
	        }} />

        </RunLine>
	);			
}
export default ScannerLine;