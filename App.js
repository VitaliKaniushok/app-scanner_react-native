import React from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { ContextApi } from './components/context-api.js';
import ScannerService from './components/services/scanner-service.js';
import { AppNavContainer } from './components/app-nav-container.js';
import ErrorBoundry from './components/error-boundry/error-boundry.js';
import NetInfo from "@react-native-community/netinfo";
import { setDocInBase, checkId, resetPurchase } from './components/services/data-base-connect.js';
import arrayLanguage from './components/services/arr-language-texts.js';
import LoadingComponent from './components/loading/loading-component.js';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import consentComponents from './components/ads/consent-components.js';
import RNIap, {
  purchaseErrorListener, 
  purchaseUpdatedListener,
  type ProductPurchase,
  type PurchaseError
} from 'react-native-iap';
 
export default class TwoMillion extends React.Component {

  scannerService = new (ScannerService(this))();
  
  state = {

    isLoaded:true,

    errorMessage:'',
    setErrorMessage:this.scannerService.setErrorMessage(),

    noAds:false,   
    consentAds:false,
    dialogPurchase:false,
    cancelDialogPurchase: this.scannerService.cancelDialogPurchase(),   
    
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
      rate:0.5},

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

  unsubscribeListeners = ()=> {

    if ( this.unsubscribe) {
      this.unsubscribe();
    } 
    if (this.purchaseUpdate) {
      this.purchaseUpdate.remove();
      this.purchaseUpdate = null;
    }
    if (this.purchaseError) {
      this.purchaseError.remove();
      this.purchaseError = null;
    }
  }

  netInfo = () => {

    const isInet = async ()=> { await NetInfo.fetch().then(state => {

        return state.isInternetReachable;
      }); }

    return isInet;
  }

  checkIsPurchase = () => {   

    try { 
      
    Alert.alert('check','FIRST',[{ text: 'FIRST', onPress: () => {} }])
      const purchaseState =  checkId();
      
    Alert.alert('check','SECOND' ,[{ text: JSON.stringify(purchaseState), onPress: () => {} }])
      if ( purchaseState === 1 ) {
      
        this.unsubscribeListeners();
        this.setState({ isLoaded:false, noAds:true, consentAds:true, errorMessage:"" });
        return true;      
      }

      const netInfo = this.netInfo();

      if ( netInfo ) { 

        if ( !this.state.consentAds ) {
         Alert.alert('netInfo1','',[{ text: JSON.stringify(netInfo), onPress: () => {} }]);
          consentComponents(
              this.state.setErrorMessage,              
              ()=>{ this.setState({ dialogPurchase:true })}
            );
          return false;
        }
        Alert.alert('netInfo2','',[{ text: JSON.stringify(netInfo), onPress: () => {} }]);
        this.setState({ isLoaded:false, noAds:false, errorMessage:"" });
        return false;     

      } else {
          Alert.alert('netInfo3','',[{ text: JSON.stringify(netInfo), onPress: () => {} }]);
          this.setState({ isLoaded:false, noAds:false, errorMessage:"No internet" });
          return false;
      }

    } catch(error) {

      this.setState({ isLoaded:false, noAds:false, errorMessage: "error.message" });
      return false;
    }    
  }

  componentDidMount() { 

    changeNavigationBarColor('#000000'); 

    try {

      ( async()=> { await RNIap.initConnection() } )();

    } catch (err) {

      this.setState({ isLoaded:false, errorMessage: "No connection to Play Services: "+ err.message });
    }

    const isNoAds = this.checkIsPurchase();

    if ( isNoAds ) return;

    // ----CONNECT INTERNET LISTENER
    this.unsubscribe = NetInfo.addEventListener(state => {

      if (this.state.noAds) return;

      if (!state.isInternetReachable) {
        
        return this.setState({errorMessage:"No connection to internet"});

      } else { this.setState({errorMessage:''}) }

    });   

    // ----PURCHASE LISTENER 
    this.purchaseUpdate = purchaseUpdatedListener(
      async (purchase: InAppPurchase | ProductPurchase ) => {
      
        const receipt = purchase.transactionReceipt;

        if (receipt) {

          try {

            const purchaseState = JSON.parse(receipt).purchaseState;

            if ( purchaseState === 0 ) {

              const receiptParse = JSON.parse(receipt);

              const nameDocument = receiptParse.orderId;    
              
              await RNIap.finishTransaction(purchase, false);

              await setDocInBase(nameDocument,receipt);  

              await this.checkIsPurchase();
            }     
                          
          } catch(error) { 
           
            this.setState({ errorMessage: "Receipt: "+error.message })
          }
        }
    });

    this.purchaseError = purchaseErrorListener((error: PurchaseError) => {
      this.setState({ errorMessage: "Error purchase" })
    });       
  }

  componentDidUpdate(prevProps,prevState) {

    if( !prevState.errorMessage === !this.state.errorMessage ) return;   

      if ( !this.state.errorMessage ) {
        
        Alert.alert('Update','UPDATE',[{ text: 'OK', onPress: () => {} }]);        
        return this.checkIsPurchase();        
      } 
  }

  componentWillUnmount() {

    this.unsubscribeListeners();
  }

  render() {

    let visibleComponent = null;

    if ( this.state.isLoaded ) {

      visibleComponent = <LoadingComponent />

    } else {

      visibleComponent = <AppNavContainer />
    }

    return (

      <ErrorBoundry errorMessage={this.state.errorMessage}
                    checkIsPurchase={this.checkIsPurchase}>

        <ContextApi.Provider value={this.state}>

          <StatusBar backgroundColor="#000000" barStyle="light-content" />

           { visibleComponent }

        </ContextApi.Provider>

      </ErrorBoundry>
    ) 
  }
}