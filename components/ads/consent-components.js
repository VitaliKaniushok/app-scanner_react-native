import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { getDeviceId } from 'react-native-device-info';
import SplashScreen from 'react-native-splash-screen';
import { AdsConsent, AdsConsentStatus } from '@react-native-firebase/admob';
import purchaseNoAds from '../services/purchase-no-ads.js';
// import dataBaseConnection from '../services/data-base-connect.js';

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

			SplashScreen.hide();
			// dataBaseConnection();							
			purchaseNoAds(setErrorMessage);
			return;
		}

		// The user requested non-personalized or personalized ads
		// const status = formResult.status;
	}

	setConsentAds();

	SplashScreen.hide();
}
export default consentComponents;