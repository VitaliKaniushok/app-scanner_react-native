import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';
import { getDeviceId } from 'react-native-device-info';
import { AdsConsent, AdsConsentStatus, AdsConsentDebugGeography } from '@react-native-firebase/admob';
import purchaseNoAds from '../services/purchase-no-ads.js';

const consentComponents = async (setErrorMessage, setDialogPurchase, setIsLoadedConsentAds) => {	

	// const deviceId = getDeviceId();

	// throw new Error(deviceId);

	// await AdsConsent.addTestDevices([deviceId]);

	// await AdsConsent.setStatus(AdsConsentStatus.UNKNOWN);
	// await AdsConsent.setDebugGeography(AdsConsentDebugGeography.NOT_EEA);

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
			return setIsLoadedConsentAds();		
		}

		setIsLoadedConsentAds();

	} else {

		setDialogPurchase();
	}	
}
export default consentComponents;