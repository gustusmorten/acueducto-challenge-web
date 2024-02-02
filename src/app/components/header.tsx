/* eslint-disable @next/next/no-img-element */
'use client';
import { Fragment, useEffect, useState } from 'react';
import { Dialog, Popover, Tab, Transition } from '@headlessui/react';
import { Bars3Icon, ShoppingBagIcon } from '@heroicons/react/24/outline';
import { Category, Product } from '@/lib/apis/constants';
import Cookies from 'js-cookie';
import { ShoppingCart } from './ShoppingCart';
import Search from './Search';

export default function Header({ navigation }: { navigation: Category[] }) {
	const [open, setOpen] = useState(false);
	const [cartOpen, setCartOpen] = useState(false);
	const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(0);

	const getTotalProducts = () => {
		const cart = Cookies.get('cart');
		const cartList = cart ? JSON.parse(cart) : [];
		const qtys = cartList.map((product: Product) => product.qty ?? 1);
		return qtys.reduce((acc: number, qty: number) => acc + qty, 0);
	};

	useEffect(() => {
		setNumberOfItemsInCart(getTotalProducts());
	}, []);

	return (
		<div className='bg-white'>
			{/* Shopping cart */}
			<ShoppingCart open={cartOpen} setOpen={setCartOpen} />
			{/* Mobile menu */}
			<Transition.Root show={open} as={Fragment}>
				<Dialog as='div' className='relative z-40 lg:hidden' onClose={setOpen}>
					<Transition.Child
						as={Fragment}
						enter='transition-opacity ease-linear duration-300'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition-opacity ease-linear duration-300'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<div className='fixed inset-0 bg-black bg-opacity-25' />
					</Transition.Child>

					<div className='fixed inset-0 z-40 flex'>
						<Transition.Child
							as={Fragment}
							enter='transition ease-in-out duration-300 transform'
							enterFrom='-translate-x-full'
							enterTo='translate-x-0'
							leave='transition ease-in-out duration-300 transform'
							leaveFrom='translate-x-0'
							leaveTo='-translate-x-full'
						>
							<Dialog.Panel className='relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl'>
								<div className='space-y-6 border-t border-gray-200 px-4 py-6'>
									{navigation.map((page) => (
										<div key={page.name} className='flow-root'>
											<a
												href={`product?category=${page.id}`}
												className='-m-2 block p-2 font-medium text-gray-900'
											>
												{page.name}
											</a>
										</div>
									))}
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition.Root>

			{/* desktop */}

			<header className='relative bg-white'>
				<p className='flex h-10 items-center justify-center bg-indigo-600 px-4 text-sm font-medium text-white sm:px-6 lg:px-8'>
					Descubre nuestro descuento secreto.
				</p>

				<nav
					aria-label='Top'
					className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'
				>
					<div className='border-b border-gray-200'>
						<div className='flex h-16 items-center'>
							<button
								type='button'
								className='relative rounded-md bg-white p-2 text-gray-400 lg:hidden'
								onClick={() => setOpen(true)}
							>
								<span className='absolute -inset-0.5' />
								<span className='sr-only'>Open menu</span>
								<Bars3Icon className='h-6 w-6' aria-hidden='true' />
							</button>

							{/* Logo */}
							<div className='ml-4 flex lg:ml-0'>
								<a href='#'>
									<span className='sr-only'>Your Company</span>
									<img
										className='h-8 w-auto'
										src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600'
										alt=''
									/>
								</a>
							</div>

							<Popover.Group className='hidden lg:ml-8 lg:block lg:self-stretch'>
								<div className='flex h-full space-x-8'>
									{navigation.map((page) => (
										<a
											key={page.name}
											href={`/?category=${page.id}`}
											className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800 uppercase'
										>
											{page.name}
										</a>
									))}
								</div>
							</Popover.Group>

							<div className='ml-auto flex items-center'>
								<div className='flex lg:ml-6'>
									<Search />
								</div>

								{/* Cart */}
								<div className='ml-4 flow-root lg:ml-6'>
									<button
										onClick={() => setCartOpen(true)}
										className='group -m-2 flex items-center p-2'
									>
										<ShoppingBagIcon
											className='h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500'
											aria-hidden='true'
										/>
										<span className='ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800'>
											{numberOfItemsInCart}
										</span>
										<span className='sr-only'>items in cart, view bag</span>
									</button>
								</div>
							</div>
						</div>
					</div>
				</nav>
			</header>
		</div>
	);
}
