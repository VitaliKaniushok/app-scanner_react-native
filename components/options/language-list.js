import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import {ContextApi} from '../context-api.js';
import DATA from '../services/images-definition.js';

const LanguageList =() => {

  const { setLanguage, listVisible } = useContext(ContextApi);

  const listItem = DATA.map((item)=> {

    return (

      <View key={item.code} 
            style={style.listItem}>

        <TouchableOpacity style={style.item}
            onPress = {setLanguage(item.code,item.key)}>
          
         <Image
              style={style.styleImage}
              source={item.image}
            /> 

          <Text style={style.text}>{item.key}</Text>
         
        </TouchableOpacity>

      </View>
    )              
  })              

  if (listVisible === false) {
      return null

  } else {

    return (
    
     <View >
        {listItem}
    </View>
    )
  } 
}
export default LanguageList;

const style = StyleSheet.create({  
  listItem: {
    flex:1,    
    paddingTop: 20     
  },
  item: {    
    flexDirection:'row'
  },
  styleImage:{
    flex:1,
    height:40,
    borderRadius:7
  },
  text:{
    flex:5,
    textAlign:'center',
    fontSize:22,
    color:'#fff'
  }
});