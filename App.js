import React from 'react';
import { StatusBar, View, Alert } from 'react-native';
import { ContextApi } from './components/context-api.js';
import SplashScreen from 'react-native-splash-screen';
import ScannerService from './components/services/scanner-service.js';
import { AppNavContainer } from './components/app-nav-container.js';
import ErrorBoundry from './components/error-boundry/error-boundry.js';
import NetInfo from "@react-native-community/netinfo";
import { setDocInBase, checkId } from './components/services/data-base-connect.js';
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

    isLoaded:true,

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

  async checkIsPurchase() {   

    try { 
     
      await RNIap.initConnection();      

      const netInfo = await NetInfo.fetch().then(state => {

        return state.isInternetReachable;

      });   

      // const netInfo =false;   

      if ( netInfo ) { 
        
        const productId = await checkId();

        if ( productId ) {
// this.setState({ errorMessage: productId });
// Alert.alert('DID',productId);
          await this.scannerService.writeNoAds(productId);
          return this.setState({ isLoaded:false, noAds:true, consentAds:true });          
          
// this.setState({ errorMessage: JSON.stringify(productId) });          

        } else {
//           // Alert.alert('No',this.state.noAds);
// // this.setState({ errorMessage: JSON.stringify(productId), noAds:true });
          await this.scannerService.writeNoAds();
          this.setState({ isLoaded:false, noAds:false });
//           // Alert.alert('NoproductId', productId.toString())
        }

      } else {

        // const productId =  await this.scannerService.getNoAds();
        const productId = true;
// Alert.alert('productId Mobile', productId.toString())
        if ( productId ) {
// Alert.alert('productId Mobile', productId.toString())
          this.setState({ isLoaded:false, noAds:true, consentAds:true });
          return SplashScreen.hide();

        } else {
// Alert.alert('NO productId Mobile2', JSON.stringify(productId))
          this.setState({ isLoaded:false, noAds:false, consentAds:false, errorMessage:JSON.stringify(productId) });
        }
      }

    } catch(error) {

      this.setState({ isLoaded:false, errorMessage: "check is purchase" });
      
    }    
  }

  componentDidMount() {

    this.checkIsPurchase();

// ----CONNECT INTERNET LISTENER
    this.unsubscribe = NetInfo.addEventListener(state => {

      if (!state.isInternetReachable) {
        
        return this.setState({errorMessage:"No internet connection"});

      } else {

        this.setState({errorMessage:''});        
      }

    });
// ----PURCHASE LISTENER 
    this.purchaseUpdate = purchaseUpdatedListener(
      async (purchase: InAppPurchase | ProductPurchase ) => {
      
        const receipt = purchase.transactionReceipt;

        if (receipt) {

          try {

              const nameDocument = JSON.parse(receipt).orderId;

              setDocInBase(nameDocument,receipt);              
              
              // RNIap.acknowledgePurchaseAndroid(purchase.purchaseToken);
              
              // const ackResult = await RNIap.finishTransaction(purchase, false);

              // Alert.alert('ackResult',receipt.toString());

              await this.scannerService.writeNoAds(nameDocument);

              this.setState({
                noAds:true, 
                consentAds:true,
              })

          } catch(error) {

            this.setState({ errorMessage: "Dont  purchase" })
          }

        } else {

          this.setState({ errorMessage: 'No receipt' })
        }
    });

    this.purchaseError = purchaseErrorListener((error: PurchaseError) => {
      this.setState({ errorMessage: "Error purchase" })
    });
  }

  componentDidUpdate(prevProps,prevState) {

    if( !prevState.errorMessage === !this.state.errorMessage ) return;
    // Alert.alert('DDD',prevState.errorMessage.toString()+' '+this.state.errorMessage);
      this.checkIsPurchase();
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

    if ( this.state.isLoaded ) {

      return <View style={{flex:1}} />
    }
    
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