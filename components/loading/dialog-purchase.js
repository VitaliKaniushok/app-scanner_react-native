import React, { useContext } from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import Dialog from "react-native-dialog";
import purchaseNoAds from '../services/purchase-no-ads.js';
import {ContextApi} from '../context-api.js';

const DialogPurchase = (props) => {

	const { setErrorMessage, cancelDialogPurchase, purchaseState } = useContext(ContextApi);
	
	if ( purchaseState == 2 ) {

		return (

	      	<View>
	        	<Dialog.Container visible={props.visible}>

	          		<Dialog.Title style={style.title} >Truth detector</Dialog.Title>

			        <Dialog.Description style={style.description}>Your purchase is pending.</Dialog.Description>
			        
		        	<Dialog.Button
			        	style={style.buttonPending}
			        	label= "OK" 
			        	onPress={cancelDialogPurchase}/>

	        	</Dialog.Container>
	      	</View>	
		)
	}

	return (
      	<View>
        	<Dialog.Container visible={props.visible} style={style.dialog} contentStyle={{paddingTop:10, paddingLeft:7,paddingRight:7,borderRadius:10}}>

          		<Dialog.Title style={style.title} >Truth detector</Dialog.Title>

          		<Dialog.Description style={style.descriptionPolicy}
		        					onPress={() => { Linking.openURL("https://sites.google.com/view/prank-truth-detector/prank-truth-detector")} }>
		        	Before you start using the application, read our privacy policy.
		        </Dialog.Description>

		        <Dialog.Description style={style.description}>		        	
		        	If you want to use the application without ads and internet connection, support our project and buy the ad-free version.		        
		        </Dialog.Description>		        

		        <View style={style.buttons}>
		        	<Dialog.Button
			        	style={style.cancel}
			        	label= "No" 
			        	onPress={cancelDialogPurchase}/>

			        <Dialog.Button
			        	style={style.purchase}
			        	label="Purchase" 
	    				onPress={ 
	    					async ()=> { await purchaseNoAds(setErrorMessage,cancelDialogPurchase) ;
	    					cancelDialogPurchase() }
						}/>
		        </View>

        	</Dialog.Container>
      	</View>	
	)
}
export default DialogPurchase;
const style = StyleSheet.create({	
	title:{    	   
	    fontSize:25,
	    lineHeight:24,
	    color:'green',
	    textAlign:'center',
	    paddingBottom:0,
	    marginBottom:0,
	       
	},
	description: {
		fontSize:15		
	},
	descriptionPolicy: {
		fontSize:15,		
		textDecorationStyle:'solid',
		textDecorationColor:'#000',
		textDecorationLine:'underline'
	},
	buttonPending: {
		marginTop:20,
		paddingTop:15,
		paddingBottom:15,
		paddingLeft:35,
		paddingRight:35,
		color:'#fff',
		backgroundColor:'green',
		borderRadius:10
	},
	buttons: {
		marginTop:5,
		flexDirection:'row',
		paddingLeft:7,
		paddingRight:7,
		justifyContent:'space-between'
	},	
	cancel:{    	   
	    fontSize:20,	    
	    color:'green',
	    borderWidth:1,
	    borderColor:'green',
	    backgroundColor:'#fff',
	    borderRadius:10,
	    paddingLeft: 15,
	    paddingRight:15   
	},
	purchase:{    	   
	    fontSize:20,
	    alignSelf:'flex-start',
	    color:'#fff',	   
	    borderWidth:1,
	    borderColor:'green',
	    backgroundColor:'green',
	    borderRadius:10   
	}
});