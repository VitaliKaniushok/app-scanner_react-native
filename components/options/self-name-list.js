import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

const SelfNameList = (props)=> {

	let {id, text, selectSavedEntry, removeSavedEntry, selectedEnry } = props;

  	++id;

  	return (

	    <View style={styles.boxRemoveItem}>

        <TouchableOpacity 
          style={[styles.touchSelfText, selectedEnry=== text?styles.activeBoxRemoveItem:styles.noActiveBoxRemoveItem]}
          onPress = { selectSavedEntry }>                  
              
            <Text style={styles.selfText}>{id}.  {text}</Text>

        </TouchableOpacity>

		    <TouchableOpacity 
		      style={styles.removeItem}
		      onPress = { removeSavedEntry }>                  
		          
		        <Text style={styles.textRemove}>-</Text>

	      </TouchableOpacity>

	    </View>
	  )
}
export default SelfNameList;

const styles = StyleSheet.create({
  boxRemoveItem: {    
    flex:1,
    minHeight:45,
    marginTop:10,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between' 
  },
  activeBoxRemoveItem:{
      backgroundColor: 'green'
  },
  noActiveBoxRemoveItem:{
      backgroundColor: 'rgba(167,174,166,1)'
  },
  removeItem:{
    width:45,
    height:45,
    borderRadius:7,
    marginLeft:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: 'rgba(167,174,166,0.2)'
  },
  textRemove:{   
    textAlign:'center',
    fontSize:40,
    color:'#fff'    
  },
  touchSelfText:{
    flex:1,
    justifyContent:'center',
    borderRadius:7
  },
  selfText: {
  	flex:1,
    justifyContent:'center',   
    fontSize: 20,  
    color: '#000',
    paddingTop:5,
    paddingLeft:5
  }
  	
});