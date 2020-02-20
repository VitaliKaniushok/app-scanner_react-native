import React, { useContext, useState, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import {ContextApi} from '../context-api.js';
import SelfNameList from './self-name-list.js';
import {FileSystem} from 'react-native-unimodules';

const SelfTextsData = () => {

    const [ dataNames, setDataNames ] = useState(false);
    const [ listNames, setListNames ] = useState(null);
    const [ stateSelectedEnry, setSelectedEnry ] = useState('');
    const { removeSavedEntry, selectSavedEntry, selectedEnry } = useContext(ContextApi);

    function onHandleClick(func) {

    	return () => {
    		setDataNames(false);            
    	    func();
    	}    	
    }
    function listItem(listNames)  {

        if (listNames) {

            return listNames.map((item,idx)=> {

                return (         

                    <SelfNameList 
                        key={idx}
                        text={item}
                        id={idx}
                        selectedEnry={stateSelectedEnry}
                        selectSavedEntry = {onHandleClick(selectSavedEntry(item))}
                        removeSavedEntry = {onHandleClick(removeSavedEntry(item))}/>
                )              
            });  
        }

        return null;
    }

    async function generateListName() {

    	const dir =FileSystem.documentDirectory;

        const dataNames = await FileSystem.getInfoAsync(dir+'dataSelf/dataNames.json');        
        
        if ( !dataNames.exists ) {

        	return setDataNames('no-data');
        }

        const jsonData = await FileSystem.readAsStringAsync(dir+'dataSelf/dataNames.json');
        
        const data = JSON.parse(jsonData);

        let listNames = Object.keys(data);

        if (!listNames.length) {

        	return setDataNames('no-data');
        }

        setDataNames('data');

        setListNames(listNames);
    }

    useEffect(()=>{
        generateListName();
    },[]);

    useEffect(()=>{

        setSelectedEnry(selectedEnry);
        generateListName();

        if (dataNames === false) {

            generateListName();
        }

    },[selectedEnry,dataNames]);

	if ( !dataNames ) {

		return (

            <View style={styles.activityIndicWrap}>

                <ActivityIndicator size="large" color="green" />

            </View>

        ) 

	} else if ( dataNames === 'no-data') {

		return <Text style = { styles.textNoData }>There are no saved entries</Text>

	} else {

		return (

	       <View style={styles.boxTextsData}>
            {listItem(listNames)}
	       </View>
	    )
	}		
	
}
export default SelfTextsData;

const styles = StyleSheet.create({
  
    textNoData: { 
        fontSize: 20,  
        color: '#000',
        textAlign:'center',
        paddingTop:5,
        paddingBottom:5,
        marginBottom:20,
        marginTop:10,    
        backgroundColor:'rgba(255,255,255,0.2)'    
    },
    boxTextsData: {
      	marginBottom:20,
        paddingBottom:30,
        borderBottomColor: '#000',
        borderBottomWidth: 2
    },
    activityIndicWrap:{
        flex:1,
        height:100
    }  	
});