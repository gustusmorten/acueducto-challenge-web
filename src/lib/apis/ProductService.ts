import { ProductsResponse } from './constants';

interface getProductsProps {
	page?: number;
	search?: string;
	Category?: string;
}

const getProducts = async (
	page?: number,
	search?: string,
	Category?: string,
): Promise<ProductsResponse> => {
	let query = '';
	if (page) {
		query += `page=${page}`;
	}
	if (search) {
		query += `&search=${search}`;
	}
	if (Category) {
		query += `&category=${Category}`;
	}
	const res = await fetch(`${process.env.API_URL}/product?${query}`);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	const data = await res.json();

	return data.data as ProductsResponse;
};

export default getProducts;
