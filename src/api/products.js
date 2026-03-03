import axios from 'axios';

// FakeStore API를 사용하는 패션 쇼핑몰의 데이터 fetching 함수 모음
const BASE_URL = 'https://fakestoreapi.com';

// 전체 상품 목록을 가져온다
export const  getProducts = async () => {
    const response = await axios.get(`${BASE_URL}/products`);
    return response.data;
};

// 특정 상품 ID에 해당하는 단일 상품을 가져온다
export const getProductById = async (id) => {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data;
};

// 전체 카테고리 목록을 가져온다 (ex: men's clothing, electronics ...)
export const getCategories = async () => {
    const response = await axios.get(`${BASE_URL}/products/categories`);
    return response.data;
};

// 특정 카테고리에 속한 상품 목록을 가져온다
export const getProductsByCategory = async (category) => {
    const response = await axios.get(`${BASE_URL}/products/category/${category}`);
    return response.data;
};
