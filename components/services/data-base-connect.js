import * as RNIap from 'react-native-iap';
import firestore from '@react-native-firebase/firestore';
 
const setDocInBase = async(nameDocument,obj) => {	

	await firestore().doc('data-receipt/'+nameDocument).set({
		receipt: obj
	});	
}

const checkId = async() => {

	const purchases = await RNIap.getAvailablePurchases(); 	

	if ( purchases.length ) {

    	
		const jj = purchases[0].purchaseStateAndroid;
    	return jj;
   	}

    return null;
}

const resetPurchase = async() => {

	const purchases = await RNIap.getAvailablePurchases();

	const jj = purchases[0].purchaseToken;
	return await RNIap.consumePurchaseAndroid(jj);  
}
export {setDocInBase,checkId,resetPurchase};