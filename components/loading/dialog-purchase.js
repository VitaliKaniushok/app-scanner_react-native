import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
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
        	<Dialog.Container visible={props.visible}>

          		<Dialog.Title style={style.title} >Truth detector</Dialog.Title>

		        <Dialog.Description style={style.description}>You want to use the application without ads and internet connection? Pay for the ad-free vertion.</Dialog.Description>

		        <View style={style.buttons}>
		        	<Dialog.Button
			        	style={style.cancel}
			        	label= "Cancel" 
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
	dialog: {
		backgroundColor:'green'
	},
	title:{    	   
	    fontSize:25,
	    color:'green',
	    textAlign:'center'	   
	},
	description: {
		fontSize:15,
		paddingLeft:10,
		paddingRight:10
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
		marginTop:20,
		flexDirection:'row',
		justifyContent:'space-between'
	},	
	cancel:{    	   
	    fontSize:20,	    
	    color:'green',
	    borderWidth:1,
	    borderColor:'green',
	    backgroundColor:'#fff',
	    borderRadius:10   
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