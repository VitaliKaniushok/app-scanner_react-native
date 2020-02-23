import React from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { ContextApi } from './components/context-api.js';
import ScannerService from './components/services/scanner-service.js';
import { AppNavContainer } from './components/app-nav-container.js';
import ErrorBoundry from './components/error-boundry/error-boundry.js';
import NetInfo from "@react-native-community/netinfo";
import { setDocInBase } from './components/data-base-connect/data-base-connect.js';
import arrayLanguage from './components/services/arr-language-texts.js';
import RNIap, {
  purchaseErrorListener, 
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError
} from 'react-native-iap';
 
export default class TwoMillion extends React.Component {

  scannerService = new (ScannerService(this))();
  
  state = {

    errorMessage:'',
    setErrorMessage:this.scannerService.setErrorMessage(),

    noAds:false,   
    consentAds:false,
    noInternet: false,
    setConsentAds: this.scannerService.setConsentAds(),     
    
    isScaning: false,
    scaning: this.scannerService.scaning(),
    scaningResult:this.scannerService.scaningResult(),

    hasCameraPermission: null,
    statusPermissions: this.scannerService.statusPermissions(),
    
    listVisible:false,
    hideList:this.scannerService.hideList(),

    isFaceDetected: false,
    facesDetected:this.scannerService.facesDetected(),

    selfMode:false,
    setMode:this.scannerService.setMode(),

    cameraType: this.scannerService.checkCameraBack(),    
    setCameraType:this.scannerService.setCameraType(),
    
    speech: {
      progressSpeak:false,      
      language:'en',
      langDefinition:"english",     
      pitch:0.1,
      rate:0.5
    },
    speechText:'truthScanner',
    setLanguage:this.scannerService.setLanguage(),        
    
    addSelfItem:this.scannerService.addSelfItem(),
    removeSelfItem:this.scannerService.removeSelfItem(),    
    saveSelfEntry:this.scannerService.saveSelfEntry(),
    removeSavedEntry:this.scannerService.removeSavedEntry(),

    selectedEnry:'',
    selectSavedEntry:this.scannerService.selectSavedEntry(),    
    
    incRate:this.scannerService.incRate(),
    decRate:this.scannerService.decRate(),
    incPitch:this.scannerService.incPitch(),
    decPitch:this.scannerService.decPitch(),

    appText: arrayLanguage.en
  }

  unsubscribe = ()=>{};

  UNSAFE_componentWillMount() {

    // let netinfo;

    // (async ()=>{

    //   netInfo = await NetInfo.fetch().then(state => {

    //     return state.isInternetReachable

    //   })

    // })

    // if ( netInfo ) { 

    //   // connect to server
    //   this.scannerService.checkSetNoAds(null);
    // }

    // this.scannerService.checkRecordIdAds();

    if ( this.state.noAds ) return;

    this.unsubscribe = NetInfo.addEventListener(state => {

      if (!state.isInternetReachable) {

        return this.setState({errorMessage:"No internet connection"});

      } else {

        return this.setState({errorMessage:''});
      }

    });
  }

  componentDidMount() {

    try {

     (async function() {await RNIap.initConnection()} )();

    } catch(error) {
     
      this.setState({ setErrorMessage: error })
    }

    this.purchaseUpdate = purchaseUpdatedListener((purchase: InAppPurchase | ProductPurchase ) => {
      
      const receipt = purchase.transactionReceipt;

        if (receipt) {

          try {

            setDocInBase(receipt);

            Alert.alert('receipt',receipt.toString());
            
            // RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
            
            // const ackResult = awaitRNIap.finishTransaction(purchase, false);

          } catch (error) {

            this.setState({ setErrorMessage: error })
          }

        } else {

          this.setState({ setErrorMessage: 'No purchase' })
        }
    });

    this.purchaseError = purchaseErrorListener((error: PurchaseError) => {
      this.setState({ setErrorMessage: error })
    });
  }  

  componentWillUnmount() {
    this.unsubscribe();

    if (this.purchaseUpdate) {
      this.purchaseUpdate.remove();
      this.purchaseUpdate = null;
    }
    if (this.purchaseError) {
      this.purchaseError.remove();
      this.purchaseError = null;
    }
  }

  render() {
    
    return (

      <ErrorBoundry errorMessage={this.state.errorMessage}>
            
        <ContextApi.Provider value={this.state}>

          <StatusBar backgroundColor="#000000" barStyle="light-content" />

          <AppNavContainer /> 

        </ContextApi.Provider>

      </ErrorBoundry>
    )    
  }
}