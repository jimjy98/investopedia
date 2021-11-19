import { collection, getDocs, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const generateRandom = (max) => {
    return Math.random() * max;
}

export const getWatchlist = async () => {
    const db = getFirestore();

    var watchlist = [];
    const querySnapshot = await getDocs(collection(db, 'watchlist'));
    querySnapshot.forEach(doc => {
        watchlist.push({
            ticker: doc.id.toUpperCase(),
            current_value: doc.data().current,
            high: doc.data().high,
            low: doc.data().low,
        });
    })

    return watchlist;
}

export const addToWatchlist = async (ticker) => {
    const db = getFirestore();

    var curr = generateRandom(1000);
    var h = curr + generateRandom(100);
    var l = curr - generateRandom(100);
    await setDoc(doc(db, 'watchlist', ticker.toLowerCase()), {
        current: curr,
        high: h,
        low: l,
    });
}

export const removeFromWatchlist = async (ticker) => {
    const db = getFirestore();

    await deleteDoc(doc(db, 'watchlist', ticker.toLowerCase()));
}

export const tickerExists = async (ticker) => {
    if (ticker === '') return false;
    const db = getFirestore();
    const docRef = doc(db, 'watchlist', ticker.toLowerCase());
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
}