import { useAxiosClient, useAxiosClientWithToken } from "../../api";

export function CategoriesItems() {
    return useAxiosClient().get('/api/categories/',);
};

export function FetchProduct(ProductId) {
    return useAxiosClient().get(`/api/products/${ProductId}/`)
};

export function FetchProductsByCategory(categoryId) {
    return useAxiosClient().get(`/product/category_products/${categoryId}`)
};

export function FetchFeaturedProducts(categoryId) {
    return useAxiosClient().get(`/product/featured_Products?category_id=${categoryId}`)
};

export function AdminFetchProducts(token) {
    return useAxiosClientWithToken(token).get(`/api/seller_products/`)
}

export function CreateProduct( token, data ) {
    return useAxiosClientWithToken(token).post(`/product/create/`, data)
}

export function EditProduct( token, id, data ) {
    return useAxiosClientWithToken(token).put(`/product/edit/${id}`, data)
}

export function UploadProductImage( token, data ) {
    return useAxiosClientWithToken(token).post(`/product/upload/`, data)
}

export function DeleteProduct( token, id ) {
    return useAxiosClientWithToken(token).delete(`/product/delete/${id}`)
}