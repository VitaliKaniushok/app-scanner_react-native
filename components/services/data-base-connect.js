import { Alert } from 'react-native';
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

    	// const jj = purchases[0].purchaseToken;
		const jj = purchases[0].transactionReceipt;


    	return jj;
    	// return await RNIap.consumePurchaseAndroid(jj);    	
	}

    return null;
}
export {setDocInBase,checkId};