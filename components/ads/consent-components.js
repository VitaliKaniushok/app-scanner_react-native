import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { getDeviceId } from 'react-native-device-info';
import admob, { AdsConsent, AdsConsentStatus, AdsConsentDebugGeography, MaxAdContentRating } from '@react-native-firebase/admob';
import purchaseNoAds from '../services/purchase-no-ads.js';

const consentComponents = async (setErrorMessage, setDialogPurchase) => {	

	// const deviceId = getDeviceId();

	// throw new Error(deviceId);

	// await AdsConsent.addTestDevices([deviceId]);

	// await AdsConsent.setStatus(AdsConsentStatus.UNKNOWN);
	// await AdsConsent.setDebugGeography(AdsConsentDebugGeography.NOT_EEA);	

	await admob().setRequestConfiguration({
	  
		maxAdContentRating: MaxAdContentRating.T 
	})

	const consentInfo = await AdsConsent.requestInfoUpdate(['pub-6938009934674893']);

	if (
	  consentInfo.isRequestLocationInEeaOrUnknown &&
	  consentInfo.status === AdsConsentStatus.UNKNOWN
	) {

		await AdsConsent.setTagForUnderAgeOfConsent(true);

	}else {

		await AdsConsent.setTagForUnderAgeOfConsent(false);
	}

	setDialogPurchase();

	// if (
	//   consentInfo.isRequestLocationInEeaOrUnknown &&
	//   consentInfo.status === AdsConsentStatus.UNKNOWN
	// ) {
	// 	const formResult = await AdsConsent.showForm({
	// 		withAdFree: true,
	// 		withPersonalizedAds: true,			
	// 		withNonPersonalizedAds: true,			
	// 		privacyPolicy: 'https://sites.google.com/view/prank-truth-detector/prank-truth-detector',
	// 	});

	// 	if (formResult.userPrefersAdFree) {

	// 		await purchaseNoAds(setErrorMessage);
	// 		return setIsLoadedConsentAds();		
	// 	}

	// 	setIsLoadedConsentAds();

	// } else {

	// 	setDialogPurchase();
	// }	
}
export default consentComponents;