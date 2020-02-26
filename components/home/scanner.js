import React from 'react';
import { View, BackHandler, Text, Alert } from 'react-native';
import { ContextApi } from '../context-api.js';
import * as FaceDetector from 'expo-face-detector';
import RNExitApp from 'react-native-exit-app';
import CameraView from './camera-view.js';
import ButtonsGroup from './buttons-group.js';
import consentComponents from '../ads/consent-components.js';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { InterstitialAd, TestIds, AdEventType } from '@react-native-firebase/admob';
import InterstitialAdComponents from '../ads/interstitial-components.js';

class Scanner extends React.Component {

    static navigationOptions = ({ navigation }) => {

        return {
            title: navigation.getParam('titleContext', ''),
            headerStyle: {
                backgroundColor: '#000'
            },      
            tabBarVisible:false,  
            headerTintColor: '#0d7f06',
            headerTitleStyle: {
                fontWeight: 'bold'
            }   
        }
    }

    state = {        
        topBarHome:''
    }

    setTitle = () => this.props.navigation.setParams({ titleContext: this.context.appText.topBarHome });

    componentDidMount() {
       
        this.setTitle();
        changeNavigationBarColor('#000000');         

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if ( this.props.navigation.isFocused() ) {
                
                RNExitApp.exitApp();
                return true;
            }
           
          return false;
        });

        if ( this.context.noAds || this.context.consentAds || this.context.errorMessage ) return;
Alert.alert("Message",JSON.stringify(this.context.errorMessage))
        consentComponents(this.context.setConsentAds, this.context.setErrorMessage);
    };

    componentDidUpdate(prevProps,prevState) {

        if(this.context.appText.topBarHome !== prevState.topBarHome) {

          this.props.navigation.setParams({ titleContext: this.context.appText.topBarHome })

          this.setState({
              topBarHome:this.context.appText.topBarHome
          });
          return 
        }
    } 

    componentWillUnmount() {
        
        this.backHandler.remove();
    }    

    render() {                
            
        return (

            <InterstitialAdComponents>

                <CameraView />

                <ButtonsGroup navigation= {this.props.navigation} />

            </InterstitialAdComponents>
        )       
	}
}

Scanner.contextType = ContextApi;

export default Scanner;