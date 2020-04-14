import React, { useContext } from 'react';
import { Text, StyleSheet } from 'react-native';
import {ContextApi} from '../context-api.js';
import SelfModeList  from './self-mode-list.js';
import SelfTextsData  from './self-texts-data.js';
import OptionsTemplateComponent  from './options-template-component.js';
import InterstitialAdComponents from '../ads/interstitial-components.js';

const OptionsSelfMode =() => {

	const { selfMode, appText } = useContext(ContextApi);

  if (selfMode === false) {
      return null

  } else {

  	return (
        	
    	<OptionsTemplateComponent>        

      		<Text style = { styles.textHeader }>{appText.headSelfMode}</Text>

          <SelfTextsData />

          <Text style = { styles.textHeader }>{appText.headAddText}</Text>

          <SelfModeList />        

    	</OptionsTemplateComponent>
  	);
  }  
}

export default OptionsSelfMode;

const styles = StyleSheet.create({
  
  textHeader: { 
    fontSize: 14,  
    color: '#fff',
    textAlign:'center' 
  }  	
});