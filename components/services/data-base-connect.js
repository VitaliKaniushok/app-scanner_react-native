import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
 
const setDocInBase = async(obj) => {

	const nameDocument = JSON.parse(obj).orderId;

	await firestore().doc('data-receipt/'+nameDocument).set({
		receipt: obj
	});

	// Alert.alert('nameDocument',toString(q));

	// await firestore()
	// 	.doc('data-receipt/receipt')
	// 	.collection(nameCol)
	// 	.doc(nameDoc).set({
	// 	 		name:'test'
	// 	 	});


	// const g = docRef.collection(nameCol)
	// 	.doc(nameDoc).set({
	//  		name:'test'
	//  	});

	// const documentSnapshot = await firestore()
	 	// Alert.aletr('docSnapshot',JSON.stringify(documentSnapshot))
}
export {setDocInBase};