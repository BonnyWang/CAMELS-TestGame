import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { doc, collection, addDoc, getDocs, updateDoc, increment} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyCL5L3mKYTxGtmZl-Gq-wJ9paGIaOoEkTY",
  authDomain: "camels-172a8.firebaseapp.com",
  projectId: "camels-172a8",
  storageBucket: "camels-172a8.appspot.com",
  messagingSenderId: "303989047330",
  appId: "1:303989047330:web:2c404503caa49bb57dca7b",
  measurementId: "G-4D51KSCXC9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Get Images and the index of true option from the Database
async function getImages(imageRef, indexRef){
    const querySnapshot = await getDocs(collection(db, "Image"));
    querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().url}`);
    imageRef.push(`${doc.data().url}`);
    indexRef.push(doc.data().trueIndex);
    });

    return querySnapshot;
}


// add Statistics in Database, currently only add correct and wrong number
async function addStat(rightOrWrong){
    const optionDocRef = doc(db, "Response", "Stat");

    if(rightOrWrong){
        updateDoc(optionDocRef, {
            correct: increment(1)
        });
    }else{
        updateDoc(optionDocRef, {
            wrong: increment(1)
        });
    }
}


// This is just for testing 
async function addData(value){
    try {
        const docRef = await addDoc(collection(db, "Response"), {
            test:"I am testing"
        });
        console.log("Document written with ID: ", docRef.id);
        return docRef;
    } catch (e) {
        console.error("Error adding document: ", e);
        return 0;
    }


}

export{
    getImages, addStat
}