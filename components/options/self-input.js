import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import {ContextApi} from '../context-api.js';
import DialogSaveEntry from './dialog-save-entry.js';

const SelfInput = () => {  

  const [ text, setText ] = useState('');
  const [ dialogVisible, setDialogVisible ] = useState(false);

  const changeText = (text) => {

    if ( text.match( /(^[\s])/g ) ) return;
    setText(text);
  }

  const clearState=()=> {
    setText('');
  }

  const showDialog = () => {
    setDialogVisible(true);
  };
 
  const handleCancel = () => {
    setDialogVisible(false);
  };

  const handleSave = () => {   
    setDialogVisible(false);
  };  

  const { addSelfItem, saveSelfEntry, appText } = useContext(ContextApi);

  return(
      
    <View style={styles.boxInput}>

      <TextInput
        style={ styles.input}
        maxLength={150}
        multiline = {true}
        placeholder={appText.placeHolder}
        onChangeText={changeText}
        value={text}
      />

      <View 
        style={styles.buttonsBox} >
    
        <TouchableOpacity 
          style={styles.saveItem}
          onPress = { showDialog }>                  
            
          <Text style={styles.textSave}>{appText.buttonSave}</Text>

        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.addItem}
          onPress = { addSelfItem( text, clearState ) }>                  
            
          <Text style={styles.textAdd}>+</Text>

        </TouchableOpacity>

      </View>

      <DialogSaveEntry
        visible={dialogVisible}
        handleCancel={handleCancel}
        handleSave={handleSave}
        saveSelfEntry={ saveSelfEntry }
        labelSave={appText.buttonSave}
        labelCancel={appText.buttonCancel}/>

    </View>
  )    
}
export default SelfInput;

const styles = StyleSheet.create({  
  boxInput: {
    flex:1,    
    paddingTop: 20        
  },
  input:{
    flex:1,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize:22,
    color:'#000',
    textAlignVertical: 'top',
    backgroundColor:'#fff'
  },
  buttonsBox: {
    flex:1,
    marginTop:20,
    flexDirection:'row',
    justifyContent:'space-between'
  },
  saveItem:{
    flexWrap:'wrap',
    padding: 10,
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',   
    backgroundColor: 'rgba(167,174,166,0.2)'
  },
  addItem:{
    width:45,
    height:45,
    borderRadius:7,
    alignItems:'center',
    justifyContent:'center',   
    backgroundColor: 'rgba(167,174,166,0.2)'
  },
  textSave: {
    textAlign:'center',
    fontSize:18,
    color:'#fff'
  },
  textAdd:{    
    textAlign:'center',
    fontSize:40,
    color:'#fff'    
  }
});