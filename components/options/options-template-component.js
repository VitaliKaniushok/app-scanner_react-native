import React from 'react';
import { View, StyleSheet } from 'react-native';

const OptionsTemplateComponent = (props) => {

  return (
    <View style={style.box}>
      {props.children}
    </View>
  )
}
export default OptionsTemplateComponent;

const style = StyleSheet.create({
box: {
    flex:1,
    paddingTop:10,
    paddingBottom:20,
    paddingLeft:15,
    paddingRight:15,
    marginBottom:15,
    borderRadius:20,
    backgroundColor:'#595b57'
  }
});