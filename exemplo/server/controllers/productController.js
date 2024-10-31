import firebase from '../firebase.js';
import Product from '../models/productModel.js';
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    getDoc,
    getDocs,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';

const db = getFirestore(firebase);

// Criar um produto
export const createProduct = async (req, res, next) => {
    try {
        const data = req.body;
        await addDoc(collection(db, 'products'), data);
        res.status(200).send('Produto criado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Ler todos os produtos
export const getProducts = async (req, res, next) => {
    try {
        const products = await getDocs(collection(db, 'products'));
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Ler um produto específico
export const getProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await getDoc(doc(db, 'products', id));
        if (product.exists()) {
            res.status(200).send(product.data());
        } else {
            res.status(404).send('Produto não encontrado!');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Atualizar um produto
export const updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const product = doc(db, 'products', id);
        await updateDoc(product, data);
        res.status(200).send('Produto atualizado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};

// Deletar um produto
export const deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        await deleteDoc(doc(db, 'products', id));
        res.status(200).send('Produto deletado com sucesso!');
    } catch (error) {
        res.status(400).send(error.message);
    }
};
