import { ObjectId } from "mongodb";

export interface User {
    _id?: ObjectId;
    email: string;
    password: string;
    username: string;
}

export interface Product {
    _id?: ObjectId;
    imgUrl: string;
    desc: string;
    size: string;
    theme: string;
    title: string;
    OriginalPrice: number;
}

export interface Wishlist {
    _id?: ObjectId;
    productId: string;
    aiImgUrl: string;
    userId: string;
}

export interface UserProfile {
    _id?: ObjectId;
    userId: string;
    address: string;
    photo: string;
}

export interface Checkout {
    _id?: ObjectId;
    productId: string;
    userId: string;
    status: string;
}

export interface InputImage {
    yourImg: File;
    cosImg: File
}

export interface Chat {
    _id?: ObjectId;
    content: string;
    userId: string;
    roomId: string;
    imgUrl: string;
}

export interface Room {
    _id?: ObjectId;
    nameForum: string;
    desc: string;
    img: string;
    tag: [string];
}