import React from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { ContextApi } from './components/context-api.js';
import ScannerService from './components/services/scanner-service.js';
import { AppNavContainer } from './components/app-nav-container.js';
// import ConsentComponents from './components/ads/consent-components.js';
import NoInternetComponent from './components/no-internet-component.js';
import NetInfo from "@react-native-community/netinfo";
import RNIap, {
  purchaseErrorListener,
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError
} from 'react-native-iap';
 
export default class TwoMillion extends React.Component {

  scannerService = new (ScannerService(this))();
  
  state = {   

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

    appText: {
      topBarHome:'Scanner',
      topBarSetting:'Setting scanner',
      placeHolder:'Type here to add!',
      scaning:'Scanning',
      noObject:'No object for scanning',
      readyScan:'Ready scanning',
      selectMode:'Select Mode',
      selectLanguage:'Select Language',
      buttonTruth:'Truth detector',
      buttonAliens:'Aliens detector',
      buttonSelf:'Self Mode',
      headSelfMode:'Self mode',
      headAddText:'Add text',
      headSpeechSet:'Speech settings',
      buttonPitch:'Pitch',
      buttonRate:'Rate',
      buttonSave:'Save',
      buttonCancel:'Cancel'
    }     
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

    this.unsubscribe();

    this.unsubscribe = NetInfo.addEventListener(state => {

      if (!state.isInternetReachable) {

        return this.setState({noInternet:true});

      } else {

        return this.setState({noInternet:false});
      }

    });
  }
  componentDidMount() {
    this.purchaseUpdateSubscription = purchaseUpdatedListener((purchase: InAppPurchase | ProductPurchase ) => {
      
      const receipt = purchase.transactionReceipt;
        if (receipt) {
          // yourAPI.deliverOrDownloadFancyInAppPurchase(purchase.transactionReceipt)
          // .then((deliveryResult) => {
          //   if (isSuccess(deliveryResult)) {

          try {
            Alert.alert('receipt',receipt.toString());
            
            // RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
            
            // const ackResult = awaitRNIap.finishTransaction(purchase, false);

          } catch (ackErr) {

            Alert.alert('ackErr',ackErr.toString());
          }           

        // } else {
          // Retry / conclude the purchase is fraudulent, etc...
        }
    });      

    this.purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
      console.warn('purchaseErrorListener', error);
    });
  }  

  componentWillUnmount() {
    this.unsubscribe();

    if (this.purchaseUpdateSubscription) {
      this.purchaseUpdateSubscription.remove();
      this.purchaseUpdateSubscription = null;
    }
    if (this.purchaseErrorSubscription) {
      this.purchaseErrorSubscription.remove();
      this.purchaseErrorSubscription = null;
    }
  }

  render() {     
    
    if ( this.state.noInternet ) {

      return <NoInternetComponent />;

    } else {      
    
      return (
              
        <ContextApi.Provider value={this.state}>

          <StatusBar backgroundColor="#000000" barStyle="light-content" />

          <AppNavContainer /> 

        </ContextApi.Provider>
      )
    } 
  }
}