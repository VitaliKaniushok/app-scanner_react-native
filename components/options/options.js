import React from 'react';
import { StyleSheet, View } from 'react-native';
import OptionsSelectMode from './options-select-mode.js';
import OptionsSelfMode from './options-self-mode.js';
import OptionsSpeechMode from './options-speech-mode.js';
import OptionsSelectLanguage from './options-select-language.js';
import { ContextApi } from '../context-api.js';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import InterstitialAdComponents from '../ads/interstitial-components.js';
import LoadingComponent from '../loading/loading-component.js';

class Options extends React.Component {

  static navigationOptions = ({ navigation }) => {

    return {
      title: navigation.getParam('titleContext', ''),
      headerStyle: {
          backgroundColor: '#000'
      },      
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold'
      } 
    }
  }

  state = {
    topBarSetting:'',
    loadingInterstitial:true   
  }

  componentDidUpdate(prevProps,prevState) {

    if(this.context.appText.topBarSetting !== prevState.topBarSetting) {

      this.props.navigation.setParams({ titleContext: this.context.appText.topBarSetting })

      this.setState({
          topBarSetting:this.context.appText.topBarSetting
      });       
    }

    if(this.context.loadingInterstitial !== prevState.loadingInterstitial) {

       this.setState({
          loadingInterstitial:this.context.loadingInterstitial
      });
    }
  }

	render() {

    if ( this.state.loadingInterstitial ) {

      return (

        <InterstitialAdComponents>

          <LoadingComponent />

        </InterstitialAdComponents>
      )
    }

  	return (
    
        <KeyboardAwareScrollView 
          style={styles.optionsContainer}
          innerRef={ ( ref ) => this.scroll = ref}
          enableOnAndroid={true}                  
          >            

  	        <OptionsSelectMode />
            	
            <OptionsSelectLanguage />

            <OptionsSpeechMode />

            <OptionsSelfMode/>                                        	
	       
        </KeyboardAwareScrollView>      
  	)
  }  
}

Options.contextType = ContextApi;

export default Options;

const styles = StyleSheet.create({

	optionsContainer: {
  	flex:1,
  	paddingTop: 3,
  	backgroundColor:'#000000'
	}
});