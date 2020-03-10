import React, { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ContextApi } from '../context-api.js';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const BannerAdComponent = () => {

  const { noAds, consentAds, setErrorMessage } = useContext(ContextApi);

  if ( noAds | !consentAds ) {

    return null;

  } else {

    return (

      <View style={style.banner} >
                      
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.LARGE_BANNER}
          // requestOptions={{
          //   requestNonPersonalizedAdsOnly: true                      
          // }}
          // onAdLoaded={() => {
          //   setErrorAdLoaded(false);
          // }}
          onAdFailedToLoad={(error) => {            
            setErrorMessage('Banner Ads');
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