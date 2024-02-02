export interface Category {
	id: number;
	name: string;
}

export interface Product {
	id: number;
	brand: string;
	description: string;
	image: string;
	name: string;
	price: string;
	stock: number;
	category_id: number;
	promo_price?: string;
	qty?: number;
}

export interface ProductsResponse {
	current_page: number;
	data: Product[];
	first_page_url: string;
	from: number;
	last_page: number;

	last_page_url: string;
	links: {
		url: string | null;
		label: string;
		active: boolean;
	}[];
	next_page_url: string | null;
	path: string;
	per_page: number;
	prev_page_url: number | null;
	to: number;
	total: number;
}
