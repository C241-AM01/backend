import firebase from '../firebase.js';
import Mobile from '../Models/mobileModel.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

export const createMobile = async (req, res, next) => {
    try {
        const data = req.body;
        // console.log(data);
        await addDoc(collection(db, 'mobiles'), data);
        res.status(200).send('mobile created successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getMobiles = async (req, res, next) => {
    try {
        const mobiles = await getDocs(collection(db, 'mobiles'));
        const mobileArray = [];

        if (mobiles.empty) {
            res.status(400).send('No Mobiles found');
        } else {
            mobiles.forEach((doc) => {
                const mobile = new Mobile(
                    doc.id,
                    doc.data().latitude,
                    doc.data().longitude,
                    doc.data().timestamp
                );
                mobileArray.push(mobile);
            });

            res.status(200).send(mobileArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const getMobile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const mobile = doc(db, 'mobiles', id);
        const data = await getDoc(mobile);
        if (data.exists()) {
            res.status(200).send(data.data());
        } else {
            res.status(404).send('Mobile not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const updateMobile = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const mobile = doc(db, 'mobiles', id);
        await updateDoc(mobile, data);
        res.status(200).send('Mobile updated successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

export const deleteMobile = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, 'mobiles', id));
        res.status(200).send('Mobile deleted successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
