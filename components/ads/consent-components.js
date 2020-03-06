import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
// import { getDeviceId } from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import { AdsConsent, AdsConsentStatus } from '@react-native-firebase/admob';
import purchaseNoAds from '../services/purchase-no-ads.js';

const consentComponents = async (setConsentAds,setErrorMessage) => {	

	// const deviceId = getDeviceId();

	// await AdsConsent.addTestDevices(deviceId);

	await AdsConsent.setStatus(AdsConsentStatus.UNKNOWN);	

	const consentInfo = await AdsConsent.requestInfoUpdate(['pub-6938009934674893']);
	
	if (
	  consentInfo.isRequestLocationInEeaOrUnknown &&
	  consentInfo.status === AdsConsentStatus.UNKNOWN
	) {
		const formResult = await AdsConsent.showForm({
			withAdFree: true,		
			withPersonalizedAds: true,
			withNonPersonalizedAds: true,			
			privacyPolicy: 'https://sites.google.com/view/msm-privacy-truth-detector/document',
		});

		if (formResult.userPrefersAdFree) {

			await purchaseNoAds(setErrorMessage);
			setConsentAds();
			return SplashScreen.hide();	
		}	
	}else{

		// Alert.alert('Wont no ADS?','',[{text:'By', onPress: async (setErrorMessage)=>{ await purchaseNoAds(setErrorMessage) }}]);

		
	}

	setConsentAds();

	SplashScreen.hide();

	
}
export default consentComponents;