import React, { useContext } from 'react';
import { View } from 'react-native';
import {ContextApi} from '../context-api.js';
import TextSelfList from './text-self-list.js';
import SelfInput from './self-input.js';

const SelfModeList = () => {

  const RenderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            flex:1,
            marginTop:10,
            backgroundColor: "#000"            
          }}
        />
      );
    };

  const { speechText, removeSelfItem } = useContext(ContextApi); 

  const listItem = speechText.map((item,idx)=> {

    return (

      <View key={idx}>

        <TextSelfList 
          text={item}
          id={idx}
          removeSelfItem={removeSelfItem}/>

        <RenderSeparator />

      </View>
    )              
  }); 

  if ( speechText.length === 0) {

    return  <SelfInput/>  
  }

  return (

    <View>  

      <View>
        {listItem}
      </View>

      <SelfInput/>

    </View>
  )      
}
export default SelfModeList;