import React from 'react';
import { View, BackHandler } from 'react-native';
import { ContextApi } from '../context-api.js';
import RNExitApp from 'react-native-exit-app';
import CameraView from './camera-view.js';
import ButtonsGroup from './buttons-group.js';

class Scanner extends React.Component {

    static navigationOptions = ({ navigation }) => {

        return {
            title: navigation.getParam('titleContext', ''),
            headerStyle: {
                backgroundColor: '#000'
            },      
            tabBarVisible:false,  
            headerTintColor: '#0d7f06',
            headerTitleStyle: {
                fontWeight: 'bold'
            }   
        }
    }

    state = {        
        topBarHome:''
    }

    setTitle = () => this.props.navigation.setParams({ titleContext: this.context.appText.topBarHome });

    componentDidMount() {
       
        this.setTitle();        

        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            if ( this.props.navigation.isFocused() ) {
                
                RNExitApp.exitApp();
                return true;
            }
           
          return false;
        });
    };

    componentDidUpdate(prevProps,prevState) {

        if(this.context.appText.topBarHome !== prevState.topBarHome) {

          this.props.navigation.setParams({ titleContext: this.context.appText.topBarHome })

          this.setState({
              topBarHome:this.context.appText.topBarHome
          });
          return 
        }
    } 

    componentWillUnmount() {
        
        this.backHandler.remove();
    }    

    render() {                
            
        return (

            <View style={{ flex:1 }}>

                <CameraView />

                <ButtonsGroup navigation= {this.props.navigation} />

            </View>
        )       
	}
}

Scanner.contextType = ContextApi;

export default Scanner;