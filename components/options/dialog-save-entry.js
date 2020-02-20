import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Dialog from "react-native-dialog";

const DialogSaveEntry = (props) => {

	function handleS(fn1,fn2) {
		return function() {
			fn1();
			fn2();
		}				
	}
	const [ inputText, setInputText ] = useState("");

	const changeText = (text)=> {
	    
	    if ( text.match( /(^[\s])/g ) ) return;
	    setInputText(text);
	}

	const { handleCancel, saveSelfEntry, handleSave, labelSave, labelCancel, visible } = props;	

	return (
      	<View>
        	<Dialog.Container 
        	visible={visible}>
          		<Dialog.Title>Save entry</Dialog.Title>
		        <Dialog.Description>
		           	Enter name
		        </Dialog.Description>
		        <Dialog.Input 
		          	style={styles.input}
		          	onChangeText={changeText}
		        	value={inputText}/>
		        <Dialog.Button label={labelCancel} onPress={handleCancel}/>
		        <Dialog.Button label={labelSave} onPress={handleS(saveSelfEntry(inputText),handleSave)}/>
        	</Dialog.Container>
      	</View>	
	)
}
export default DialogSaveEntry;
const styles = StyleSheet.create({  
	dialog: {
		backgroundColor:'#f1f1f1'
	},
	input:{    
	    borderColor: 'gray',
	    borderWidth: 1,
	    fontSize:16,
	    color:'#000',
	    backgroundColor:'#fff'
	}
});