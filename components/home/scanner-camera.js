import React, { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet ,View } from 'react-native';
import {ContextApi} from '../context-api.js';
import ScannerLine from './scanner-line.js';
import BannerAdComponent from '../ads/banner-component.js';

const ScannerCamera = () => {

  const { isScaning, appText, isFaceDetected, speech, noAds } = useContext(ContextApi);

  const [visibleBaner, setVisibleBaner] = useState( ()=>{ return ()=>null}  );

  let Banner = visibleBaner;  

  useEffect(() => {
    
    setVisibleBaner(()=>{
        return noAds ? ()=> null : ()=> <BannerAdComponent />
      }
    )   
  },[noAds]);

  let GreenLine = ()=> {

    return null;
  };

  let textView = appText.noObject;
  
  if ( speech.progressSpeak ) {

      textView = appText.scaning;
    
  } else if ( isScaning && isFaceDetected ) {   

      GreenLine = ()=> { 

        return <ScannerLine/>
      }

      textView = appText.scaning;
    
  } else if ( isFaceDetected ) {     

      textView = appText.readyScan;

  } else {

      GreenLine = ()=>{

        return null;
      };

      textView = appText.noObject;
  }  

  return (    
   
    <View style={style.cameraContent}>      

      <GreenLine/>

      <Banner/>

      <Text style={style.text}> {textView} </Text>
    
    </View>
  );
 
}

export default ScannerCamera;

const style = StyleSheet.create({  
  cameraContent: { flex:1, backgroundColor:'transparent'},
  text: {fontSize: 30,  color: 'red', top:110,position:'absolute',fontWeight:'bold' }
});