import { Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
 
const dataBaseConnection = async(obj) =>{

	const nameCollection = JSON.parse(obj).orderId;

	// Alert.alert('nameCollection',nameCollection);
	

	await firestore().doc('data-receipt/'+nameCollection).set({
		receipt: obj
	});

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
export default dataBaseConnection;