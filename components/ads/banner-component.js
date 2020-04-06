import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ContextApi } from '../context-api.js';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const BannerAdComponent = () => {

  const { noAds, setErrorMessage } = useContext(ContextApi);
  // const adId = TestIds.BANNER;
  const adId = "ca-app-pub-6938009934674893/3225808575";

  if ( noAds ) {

    return null;

  } else {

    return (

      <View style={style.banner} >
                      
        <BannerAd
          unitId={adId}
          size={BannerAdSize.LARGE_BANNER}
          // requestOptions={{
          //   requestNonPersonalizedAdsOnly: true                      
          // }}
          // onAdLoaded={() => {   
          // }}
          onAdFailedToLoad={(error) => {  

            if( error.code == 'admob/error-code-no-fill') return;          
            setErrorMessage(error.message);
          }}
        />

      </View>
    )
  }
}

export default BannerAdComponent;

const style = StyleSheet.create({  
  
  banner: {
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'transparent'
  }
});