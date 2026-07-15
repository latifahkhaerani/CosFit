import { ObjectId } from "mongodb";

// GET INTERFACE

export interface GetUser {
    _id: string;
    email: string;
    password: string;
    username: string;
}

export interface GetProduct {
    _id: string;
    imgUrl: string;
    desc: string;
    size: string;
    theme: string;
    title: string;
    OriginalPrice: number;
}

export interface GetWishlist {
    _id: string;
    productId: string;
    aiImgUrl: string;
    userId: string;
}

export interface GetUserProfile {
    _id: string;
    userId: string;
    address: string;
    photo: string;
}

export interface GetCheckout {
    _id: string;
    productId: string;
    userId: string;
    status: string;
}

export interface GetInputImage {
    yourImg: File;
    cosImg: File
}

export interface GetChat {
    _id: string;
    content: string;
    userId: string;
    roomId: string;
    imgUrl: string;
}

export interface GetRoom {
    _id: string;
    nameForum: string;
    desc: string;
    img: string;
    tag: [string];
}

export interface GetOurEvent {
    _id: string;
    eventName: string;
    category: string;
    imgUrl: string;
    forumId: string;
    description: string;
}

export interface GetUserDesign {
    _id: string;
    imgUrl: string;
    userId: string;
    vote: number;
}

// INI POST INTERFACE

export interface PostUser {
    email: string;
    password: string;
    username: string;
}

export interface PostProduct {
    imgUrl: string;
    desc: string;
    size: string;
    theme: string;
    title: string;
    OriginalPrice: number;
}

export interface PostWishlist {
    productId: string;
    aiImgUrl: string;
}

export interface PostUserProfile {
    userId: string;
    address: string;
    photo: string;
}

export interface PostCheckout {
    productId: string;
    status: string;
}

export interface PostInputImage {
    yourImg: File;
    cosImg: File
}

export interface PostChat {
    content: string;
    userId: string;
    roomId: string;
    imgUrl: string;
}

export interface PostRoom {
    nameForum: string;
    desc: string;
    img: string;
    tag: [string];
}

export interface PostOurEvent {
    eventName: string;
    category: string;
    imgUrl: string;
    forumId: string;
    description: string;
}

export interface PostUserDesign {
    imgUrl: string;
    vote: number;
}
