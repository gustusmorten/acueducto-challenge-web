import { Category } from './constants';

const getCategory = async () => {
	const res = await fetch(`${process.env.API_URL}/category`);

	if (!res.ok) {
		// This will activate the closest `error.js` Error Boundary
		throw new Error('Failed to fetch data');
	}

	const data = await res.json();
	return data.data as Category[];
};

export default getCategory;
