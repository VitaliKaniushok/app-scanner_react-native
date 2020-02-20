import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import { getDeviceId } from 'react-native-device-info';
// import NetInfo from "@react-native-community/netinfo";
import SplashScreen from 'react-native-splash-screen';
import { AdsConsent, AdsConsentStatus } from '@react-native-firebase/admob';
import purchaseComponent from '../purchase/purchase-component.js';

const consentComponents = async (setConsentAds) => {	

	// const deviceId = getDeviceId();

	// await AdsConsent.addTestDevices(deviceId)

	await AdsConsent.setStatus(AdsConsentStatus.UNKNOWN);	

	const consentInfo = await AdsConsent.requestInfoUpdate(['pub-6938009934674893']);
	
	if (
	  consentInfo.isRequestLocationInEeaOrUnknown &&
	  consentInfo.status === AdsConsentStatus.UNKNOWN
	) {
		const formResult = await AdsConsent.showForm({
		privacyPolicy: 'https://sites.google.com/view/msm-privacy-truth-detector/document',
		withPersonalizedAds: true,
		withNonPersonalizedAds: true,
		withAdFree: true,
		});

		if (formResult.userPrefersAdFree) {

			SplashScreen.hide();
							
			purchaseComponent();
			return;
		}

		// The user requested non-personalized or personalized ads
		// const status = formResult.status;
	}

	setConsentAds();

	SplashScreen.hide();
}
export default consentComponents;