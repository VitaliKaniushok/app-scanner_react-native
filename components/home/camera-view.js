import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {Permissions} from 'react-native-unimodules';
import { Camera } from 'expo-camera';
import ScannerCamera from './scanner-camera.js';
import { ContextApi } from '../context-api.js';
import * as FaceDetector from 'expo-face-detector';

const CameraView = () => {
    
    const [ isDetected, setIsDetected ] = useState(0);

    const { statusPermissions, hasCameraPermission, cameraType, facesDetected, speech } = useContext(ContextApi);

    useEffect(()=> {

        (async ()=> {
            const { status } = await Permissions.askAsync(Permissions.CAMERA);
            const isPermission = status === 'granted';
            statusPermissions(isPermission);
        })();

    },[]);
       
    if (hasCameraPermission === null) {

        return <View style={style.blank}/> ;

    } else if (hasCameraPermission === false) {

        return <Text style={style.noAccesText}> No access to camera </Text>;

    } else {

        return (
           
            <Camera style={style.camera} 
                type={cameraType}
                onFacesDetected={ ({faces}) => {

                        const fl = faces.length;
                        const amountDetect = isDetected;
                        const progressSpeak = speech.progressSpeak;

                        if (fl === amountDetect) {

                            return;

                        } else if ( (fl > 0) && (amountDetect > 0)  ) {

                            return setIsDetected(fl);

                        } else if (fl > 0) {

                            if (progressSpeak) return;

                            facesDetected();
                            return setIsDetected(fl);

                        } else if (fl === 0) {

                            if (progressSpeak) return;

                            facesDetected();
                            return setIsDetected(0);
                        }                                                                                                                                             
                    }                            
                }

                faceDetectorSettings={{
                    mode: FaceDetector.Constants.Mode.fast,
                    detectLandmarks: FaceDetector.Constants.Landmarks.none,
                    runClassifications: FaceDetector.Constants.Classifications.none,
                    minDetectionInterval: 100,
                    tracking: true }}
            >                                           

                <ScannerCamera />

            </Camera>
    	)
	}	
}

export default CameraView;

const style = StyleSheet.create({   
    camera: { flex: 4},
    noAccesText:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        fontSize:25,
        color:'red'
    },
    blank:{
        flex: 4,
        backgroundColor:'#000'
    }
});