import React from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';

const TextSelfList = (props)=> {

	let {id, text } = props;

	++id;

	return (

    <View style={styles.boxRemoveItem}>

    	<Text style={styles.selfText}>{id}.  {text}</Text>

	    <TouchableOpacity 
	        style={styles.removeSelfItem}
	        onPress = { props.removeSelfItem(props.id) }>                  
	          
	       <Text style={styles.textRemove}>-</Text>

      	</TouchableOpacity>

    </View>
  )
}
export default TextSelfList;

const styles = StyleSheet.create({
  boxRemoveItem: {    
    flex:1,
    minHeight:45,
    marginTop:10,
    flexDirection:'row',
    alignItems:'flex-end',
    justifyContent:'space-between' 
  },
  removeSelfItem:{
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
  selfText: {
  	flex:1,
    fontSize: 20,  
    color: '#000'
  }  	
});