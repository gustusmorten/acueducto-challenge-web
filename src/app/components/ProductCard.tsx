/* eslint-disable @next/next/no-img-element */
'use client';
import { Product } from '@/lib/apis/constants';
import { formatPrice } from '@/lib/helpers/formatters';
import Cookies from 'js-cookie';

export default function ProductCard({ product }: { product: Product }) {
	const addProductToCart = () => {
		const cart = Cookies.get('cart');
		const cartList = cart ? JSON.parse(cart) : [];

		const productInCart = cartList.find(
			(cartProduct: Product) => cartProduct.id === product.id,
		);
		let newCartList: Product[] = [];
		if (productInCart) {
			newCartList = cartList.map((cartProduct: Product) => {
				if (cartProduct.id === product.id) {
					return { ...cartProduct, qty: cartProduct.qty ?? 1 + 1 };
				}
				return cartProduct;
			});
		} else {
			newCartList = [...cartList, product];
		}

		Cookies.set('cart', JSON.stringify(newCartList));
		window.location.reload();
	};

	return (
		<div className='group'>
			<div className='w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8'>
				<img
					src={product.image}
					alt={product.name}
					className='w-full h-full object-center object-cover'
				/>
			</div>

			<h3 className='mt-4 text-base text-gray-900'>{product.name}</h3>
			<h4 className='mt-1 text-sm font-medium text-gray-600'>
				{product.description}
			</h4>
			<p className='mt-4 text-xs font-medium text-gray-600'>{product.brand}</p>
			<div className='flex mt-1 font-medium text-gray-900'>
				<p
					className={product.promo_price ? 'text-sm line-through' : 'text-lg '}
				>
					{formatPrice(Number(product.price))}
				</p>
				{product.promo_price && (
					<p className='ml-4 text-lg text-red-500'>
						{formatPrice(Number(product.promo_price))}
					</p>
				)}
			</div>
			<div>
				<button
					className='inline-flex items-center px-4 h-10 border border-gray-300 rounded-md bg-white hover:bg-indigo-600 hover:text-white focus:outline-none focus:border-indigo-600 focus:ring-2 focus:ring-offset-1 focus:ring-offset-indigo-600 focus:ring-indigo-600 focus:ring-opacity-25'
					onClick={addProductToCart}
				>
					Añadir al carrito
				</button>
			</div>
		</div>
	);
}
