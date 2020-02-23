import * as RNIap from 'react-native-iap';
// import { Alert } from 'react-native';

const purchaseNoAds = async (setErrorMessage) => {

	const itemSkus = [ 'com.msm.truth_app_noads' ];

    try {      	     
      
      const products: Product[] = await RNIap.getProducts(itemSkus);     

      await RNIap.requestPurchase(products[0].productId);

    // const purchases = await RNIap.getAvailablePurchases();

    // const j = JSON.stringify(purchases);

    // const jj = JSON.parse(j)[0].purchaseToken;
     
    // RNIap.consumePurchaseAndroid(jj);


    //  Alert.alert('purchases',JSON.stringify(purchases, function(k,v) {

    //  if ( k !== "purchaseToken"  ) {return undefined};

    //  return v;

    // }));     

    } catch(err) {

      setErrorMessage(err);
     
    }  
}

export default purchaseNoAds;