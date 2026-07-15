export interface User {
    id: string;
    email: string;
    password: string;
    username: string;
}

export interface Product {
    id: string;
    imgUrl: string;
    desc: string;
    size: string;
    theme: string;
    title: string;
    OriginalPrice: number;
}

export interface Wishlist {
    id: string;
    productId: string;
    aiImgUrl: string;
    userId: string;
}

export interface UserProfile {
    id: string;
    userId: string;
    address: string;
    photo: string;
}

export interface Checkout {
    id: string;
    productId: string;
    userId: string;
    status: string;
}

export interface InputImage {
    yourImg: File;
    cosImg: File
}