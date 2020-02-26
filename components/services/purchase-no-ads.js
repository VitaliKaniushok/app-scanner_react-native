import * as RNIap from 'react-native-iap';
// import { Alert } from 'react-native';

const purchaseNoAds = async (setErrorMessage) => {

	const itemSkus = [ 'com.msm.truth_app_noads' ];

    try {      	     
      
      const products: Product[] = await RNIap.getProducts(itemSkus);     

      await RNIap.requestPurchase(products[0].productId);
     
    // RNIap.consumePurchaseAndroid(jj);

    } catch(err) {

      setErrorMessage(err);
     
    }  
}

export default purchaseNoAds;