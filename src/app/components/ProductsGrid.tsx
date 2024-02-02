import { ProductsResponse } from '@/lib/apis/constants';
import ProductCard from './ProductCard';
import { formatProductsLink } from '@/lib/helpers/formatters';

export default function ProductsGrid({ data }: { data: ProductsResponse }) {
	const { data: products, links } = data;
	return (
		<section
			aria-labelledby='products-heading'
			className='max-w-2xl mx-auto pt-12 pb-16 px-4 sm:pt-16 sm:pb-24 sm:px-6 lg:max-w-7xl lg:px-8'
		>
			<div className='grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8'>
				{products ? (
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))
				) : (
					<div>No products found</div>
				)}
			</div>
			<nav
				aria-label='Pagination'
				className='max-w-7xl mx-auto px-4 mt-6 mb-4 flex justify-between text-sm font-medium text-gray-700 sm:px-6 lg:px-8'
			>
				<div className='hidden space-x-2 sm:flex mx-auto'>
					{links.map(
						(link) =>
							link.label !== '&laquo; Previous' &&
							link.label !== 'Next &raquo;' &&
							(link.url ? (
								<a
									key={link.label}
									href={formatProductsLink(link.url)}
									className={
										'inline-flex items-center px-4 h-10 border border-gray-300 rounded-md bg-white hover:bg-gray-100 focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25' +
										(link.active
											? ' border-indigo-600 ring-1 ring-indigo-600'
											: ' border-gray-300')
									}
								>
									{link.label}
								</a>
							) : (
								<span
									key={link.label}
									className='inline-flex items-center text-gray-500 px-1.5 h-10'
								>
									{link.label}
								</span>
							)),
					)}
				</div>
			</nav>
		</section>
	);
}
