export const formatPrice = (price: number) => {
	return new Intl.NumberFormat('es-MX', {
		style: 'currency',
		currency: 'MXN',
	}).format(price);
};

export const formatProductsLink = (link: string | null) => {
	if (!link) return '/';
	const page = link.split('page=')[1];
	return `/?page=${page}`;
};
