import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { ContextApi } from '../context-api.js';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';

const InterstitialAdComponents = (props) => {	

	let errorMessage = '';
	const { noAds, consentAds, setErrorMessage } = useContext(ContextApi);

	useEffect(() => {

		if ( noAds || !consentAds ) return;

		const interstitial = InterstitialAd.createForAdRequest(TestIds.INTERSTITIAL, {
			    requestNonPersonalizedAdsOnly: true,
			    maxAdContentRating: 'G',
			    tagForUnderAgeOfConsent: true
		});

		interstitial.onAdEvent((type, error, data ) => {

			if (type === AdEventType.LOADED) {			
			  	
			   	(async () => {
	                await interstitial.show();
	            })();			   	

			   	const unsubscribe = interstitial.onAdEvent((type) => {
				 
				}); 
				unsubscribe();
			    
			} else if (type === AdEventType.ERROR) { 	

			  	errorMessage = error;		  	
			    
			} else if (type === AdEventType.CLOSED) {

			  	const unsubscribe = interstitial.onAdEvent((type) => {
			 
				}); 
				unsubscribe();				   
	  		}
		});

		interstitial.load();

	},[noAds,consentAds]);	

	if (errorMessage) {	

		setErrorMessage(errorMessage)	

		return (
			null		
		)

	} else {

		return (
			<View style={{flex:1}}>
				{props.children}
			</View>			
		)
	}
}
export default InterstitialAdComponents;