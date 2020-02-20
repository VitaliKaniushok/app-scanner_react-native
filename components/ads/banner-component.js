import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ContextApi } from '../context-api.js';
import { BannerAd, BannerAdSize, TestIds } from '@react-native-firebase/admob';

const BannerAdComponent = () => {

  const [ isAdLoaded, setAdLoaded ] = useState(true);
  const { noAds, consentAds } = useContext(ContextApi);

  if ( noAds | !consentAds ) {

    return null;

  }else  if (isAdLoaded) {

    return (

      <View style={style.banner} >
                      
        <BannerAd
          unitId={TestIds.BANNER}
          size={BannerAdSize.LARGE_BANNER}
          requestOptions={{
            requestNonPersonalizedAdsOnly: true,
          }}
          onAdLoaded={() => {
            setAdLoaded(true);
          }}
          onAdFailedToLoad={(error) => {
            setAdLoaded(false);
          }}
        />

      </View>
    )
   }else if (!isAdLoaded) {

      return (

       <View style={style.errorBox}>           

          <Text style={style.text}> Error Ad </Text>            
        
       </View>
      )
   }   
}

export default BannerAdComponent;

const style = StyleSheet.create({  
   errorBox: {
      flex:1,    
      backgroundColor: 'green',
      justifyContent:'center'    
  },  
   text:{      
      textAlign:'center',
      fontSize:22,
      color:'#000'
  },
  banner: {
    flex:1,
    justifyContent:'flex-start',
    alignItems:'center',
    backgroundColor:'transparent'
  }
});