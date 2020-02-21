import * as RNIap from 'react-native-iap';
import { Alert } from 'react-native';

const purchaseComponent = async () => {

	const itemSkus = [ 'com.msm.truth_app_noads' ];

    try {
      	
      // await RNIap.initConnection();      
      
      const products: Product[] = await RNIap.getProducts(itemSkus);

      // Alert.alert('receipt',products[0].productId.toString());

      await RNIap.requestPurchase(products[0].productId);

     //  const purchases = await RNIap.getAvailablePurchases();

     //  const j = JSON.stringify(purchases);

     // const jj = JSON.parse(j)[0].purchaseToken;
     
     // RNIap.consumePurchaseAndroid(jj);



     //  Alert.alert('purchases',JSON.stringify(purchases, function(k,v) {

     //  if ( k !== "purchaseToken"  ) {return undefined};

     //  return v;

     // }));
     

     

    } catch(err) {

      Alert.alert('receipt',err.toString());
     
    }  
}

export default purchaseComponent;