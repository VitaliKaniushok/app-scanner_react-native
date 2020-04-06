import React, { useEffect, useContext, useState } from 'react';
import { View, Text } from 'react-native';
import { ContextApi } from '../context-api.js';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';

const InterstitialAdComponents = (props) => {	

	const { noAds, setErrorMessage } = useContext(ContextApi);
	// const adId = TestIds.INTERSTITIAL;
  	const adId = 'ca-app-pub-6938009934674893/9062311388';

	useEffect(() => {

		if ( noAds ) return;

		const interstitial = InterstitialAd.createForAdRequest(
			adId,
			// { requestNonPersonalizedAdsOnly: true }
		);

		const eventListener = interstitial.onAdEvent((type, error, data ) => {

			if (type === AdEventType.LOADED) {			
			  	
			   	(async () => {
	                await interstitial.show();
	            })();
			    
			} else if (type === AdEventType.ERROR) { 	

			  	if( error.code == 'admob/no-fill') return;
			  	setErrorMessage(error.toString())		  	
			    
			} else if (type === AdEventType.CLOSED) {

				eventListener();				   
	  		}
		});

		interstitial.load();

		return () => {
			eventListener();
		}

	},[noAds]);

	return (
		<View style={{flex:1}}>
			{props.children}
		</View>			
	)
	
}
export default InterstitialAdComponents;