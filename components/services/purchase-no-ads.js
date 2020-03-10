import * as RNIap from 'react-native-iap';

const purchaseNoAds = async (setErrorMessage, cancelDialogPurchase) => {

	const itemSkus = [ 'com.msm.truth_app_noads' ];

    try {      	     
      
      const products: Product[] = await RNIap.getProducts(itemSkus);     

      await RNIap.requestPurchase(products[0].productId);

    } catch(err) {

    	// if (err.code == "E_USER_CANCELLED") {

    	// 	await RNIap.finishTransaction();

    	// 	return cancelDialogPurchase();
    	// }

      setErrorMessage(JSON.stringify(err.message));
     
    }  
}

export default purchaseNoAds;