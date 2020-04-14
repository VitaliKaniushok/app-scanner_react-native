import * as Speech from 'expo-speech';
import { Camera } from 'expo-camera';
import textDefinition from './text-definition.js';
import arrayLanguage from './arr-language-texts.js';
import {FileSystem} from 'react-native-unimodules';

function ScannerService(obj) {

	return class {

		setErrorMessage() {

			return function(message) {

				obj.setState({	
		      		errorMessage: message
		      	});
			}
		}
		
		cancelDialogPurchase() {

			return function() {				

				obj.setState({
					dialogPurchase: false,
					consentAds: true,
					isLoaded:false			
				});
			}
		}		
		
		scaning() {
			return function() {

				if ( (obj.state.isScaning) || (!obj.state.isFaceDetected) || (obj.state.speech.progressSpeak) ) return;

				obj.setState({
					isScaning: true				
				});					
			}
		}
		setLoadingInterstitial()  {
			return function(isLoading) {
				obj.setState({
					loadingInterstitial: isLoading				
				});
			}			
		}

		facesDetected() {

			return function() {				

				obj.setState({
					isFaceDetected: !obj.state.isFaceDetected					
				});
			}
		}

		statusPermissions() {
			return function(isPermission) {
				obj.setState({
					hasCameraPermission: isPermission				
				});
			}		
		}

		checkCameraBack() {
			const cameraBack = Camera.Constants.Type.back;
			return  cameraBack;
		}

		setCameraType() {
			return function() {

				if (obj.state.isScaning) return;

				obj.setState({
					cameraType:
						obj.state.cameraType === Camera.Constants.Type.back
		                  ? Camera.Constants.Type.front
		                  : Camera.Constants.Type.back
				});
			}
		}

		setMode() {
			return function(mode) {

				if ( mode === 'selfMode' ) {
			
					return function(){
							obj.setState({
								selfMode:true,
								speechText: []				
						});
					}
				}else{

					return function(){
							obj.setState({
								selfMode:false,
								speechText: mode,
								selectedEnry:''				
						});
					}					
				}								                
		    }
		}

		setLanguage() {
			return function(lang,definition) {

				return function(){
						obj.setState( ( state ) => {

							let newState = {

								...state,
								listVisible: false,
								speech:{
									...state.speech,
									language: lang,
									langDefinition:definition
								},
								appText: arrayLanguage[lang]								
							}

							return newState;				      		
				      	}
			      	);
				}
			}
		}

		hideList() {
			return function() {				
				
				obj.setState({
					listVisible: !obj.state.listVisible									
				});				
				
			}
		}

		incRate() {
			return function() {				
				
				obj.setState( ( state ) => {

					let {rate} = state.speech;

					if ( rate === 1 ) return;

					rate = (rate*10+1)/10;

					let newState = {

						...state,						
						speech:{
							...state.speech,
							rate: rate
						}
					}

					return newState;				      		
		      	})
			}
		}
		decRate() {
			return function() {				
				
				obj.setState( ( state ) => {

					let {rate} = state.speech;

					if ( rate === 0 ) return;

					rate = (rate*10-1)/10;

					let newState = {

						...state,						
						speech:{
							...state.speech,
							rate: rate
						}
					}
				return newState;				      		
		      	})
			}
		}
		incPitch() {
			return function() {				
				
				obj.setState( ( state ) => {

					let {pitch} = state.speech;

					if ( pitch === 1 ) return;

					pitch = (pitch*10+1)/10;

					let newState = {

						...state,						
						speech:{
							...state.speech,
							pitch: pitch
						}
					}
				return newState;				      		
		      	})
			}
		}
		decPitch() {
			return function() {				
				
				obj.setState( ( state ) => {

					let {pitch} = state.speech;

					if ( pitch === 0 ) return;

					pitch = (pitch*10-1)/10;

					let newState = {

						...state,						
						speech:{
							...state.speech,
							pitch: pitch
						}
					}
				return newState;				      		
		      	})
			}
		}

		removeSelfItem() {
			return function(id) {

				return function() {

					obj.setState( ( state ) => {

						const beforeArr = state.speechText.slice(0,id);
						const afterArr = state.speechText.slice(id+1);
						
						const newArr =[...beforeArr,...afterArr];
												
						let newState = {
							...state,
							selectedEnry:'',
							speechText: newArr
						}

						return newState;
															
					});	
				}
			}
		}

		addSelfItem() {

			return function(newSelfText, fun) {

				return function() {	

					if (newSelfText === '') return;			

					obj.setState( ( state ) => {

						const oldSpeech = state.speechText.slice(0);
						
						oldSpeech.push(newSelfText);
												
						let newState = {
							...state,
							speechText: oldSpeech
						}

						return newState;
															
					});

					fun();	
				}
			}
		}

		selectSavedEntry() {

			return function(nameEntry) {

				return async function() {

					const dir =FileSystem.documentDirectory;

					const jsonData = await FileSystem.readAsStringAsync(dir+'dataSelf/dataNames.json');
					
			        let listData = JSON.parse(jsonData);

			        let newData;

			        for ( var key in listData) {
			        	if (key == nameEntry) {
			        		newData = listData[key]
			        	}
			        }

			        obj.setState({ 
			      		speechText: newData,
			      		selectedEnry: nameEntry 
			      	})

				}
			}
		}

		removeSavedEntry () {

			return function(nameEntry) {

				return async function() {

					const dir =FileSystem.documentDirectory;

					const jsonData = await FileSystem.readAsStringAsync(dir+'dataSelf/dataNames.json');
					
			        let listData = JSON.parse(jsonData);

			        let newData={};

			        for ( var key in listData) {
			        	if (key !== nameEntry) {
			        		newData[key] = listData[key]
			        	}
			        }

			        let data = JSON.stringify(newData);

			        await FileSystem.writeAsStringAsync(dir+'dataSelf/dataNames.json', data);       

				}
			}
		}

		saveSelfEntry() {

			return function(newSelfText) {

				return async function() {

					if (newSelfText === '') return;

					const arrTexts = obj.state.speechText;

					const dir =FileSystem.documentDirectory;

				    const dataNames = await FileSystem.getInfoAsync(dir+'dataSelf');        
				        
				    if ( !dataNames.exists ) {

				    	const newData = {
				    		[newSelfText]:arrTexts
				    	}

				    	const newTexts = JSON.stringify(newData);				    	

				    	await FileSystem.makeDirectoryAsync(dir+'dataSelf');

				        await FileSystem.writeAsStringAsync(dir+'dataSelf/dataNames.json', newTexts);

				        obj.setState({ 			      		
				      		selectedEnry: newSelfText 
				      	})
				    } 
				    else {

				    	const jsonData = await FileSystem.readAsStringAsync(dir+'dataSelf/dataNames.json');

				    	const parseData = JSON.parse(jsonData);				    	

				    	const newData = {
				    		...parseData,
				    		[newSelfText]:arrTexts
				    	}

				    	const newTexts = JSON.stringify(newData);				    	

				    	await FileSystem.writeAsStringAsync(dir+'dataSelf/dataNames.json', newTexts);

				    	obj.setState({ 			      		
				      		selectedEnry: newSelfText 
				      	})
				    }						
				}
			}			
		}

		scaningResult() {
			
			return function() {				

				let text = textDefinition(obj.state.speechText, obj.state.speech.language);
				let dateStart;

				if (!obj.state.isFaceDetected) {

					obj.setState({ 
			      		isScaning: false
			      	})

					return;
				};				

				const start = () => {

					dateStart = Date.now();
					
			      	obj.setState( state => ({

			      		speech: {...state.speech,
							progressSpeak: true }
						})
			      	);
			      	
			    };
			    const complete = () => {

			    	const dateDone = Date.now();

			    	if ( (dateDone - dateStart) < 100 ) {

			    		obj.state.speech.progressSpeak && 
				      	obj.setState( state => ({
				      		errorMessage:"Add this language in your phone speech options. E.g: on your device open Settings → Language and input → Speech → Text to speech output.",
				      		isScaning: false,			      		
				      		speech: { 
								...state.speech,
								progressSpeak: false } 
				      		}),
				      	);
			    		return;
			    	}

			      	obj.state.speech.progressSpeak && 
			      	obj.setState( state => ({ 
			      		isScaning: false,			      		
			      		speech: { 
							...state.speech,
							progressSpeak: false } 
			      		}),			    
			      	);
			    };

			    const errorSpeech = () => {

			    	obj.setState( state => ({
			      		errorMessage: 'Error speech',
			      		isScaning: false,			      		
			      		speech: { 
							...state.speech,
							progressSpeak: false } 
			      		}),
			      	);	    	
			    }
			   
			    Speech.speak(text, {
			      	language: obj.state.speech.language,
			      	pitch: obj.state.speech.pitch,
			      	rate: obj.state.speech.rate,
			      	onStart: start,
			      	onDone: complete,
			      	// onStopped: Speech.stop(),
			      	onError: errorSpeech			      	
			    });
			}
		}
	}	
}

export default ScannerService;