import * as RNIap from 'react-native-iap';

const purchaseNoAds = async (setErrorMessage) => {

	const itemSkus = [ 'com.msm.truth_app_noads' ];

    try {      	     
      
      const products: Product[] = await RNIap.getProducts(itemSkus);     

      await RNIap.requestPurchase(products[0].productId);

    } catch(err) {

      setErrorMessage(JSON.stringify(err.message));     
    }  
}

export default purchaseNoAds;