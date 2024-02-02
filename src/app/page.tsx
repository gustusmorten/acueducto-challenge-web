import getProducts from '@/lib/apis/ProductService';
import ProductsGrid from './components/ProductsGrid';
import Header from './components/header';
import getCategory from '@/lib/apis/CategoryService';

type HomeProps = {
	params: {};
	searchParams: { [key: string]: string | string[] | undefined };
};

export default async function Home(props: HomeProps) {
	const {
		page: pageData,
		search: searchData,
		category: categoryData,
	} = props.searchParams;

	const navigation = await getCategory();
	const productsData = await getProducts(
		Number(pageData),
		searchData as string,
		categoryData as string,
	);

	return (
		<div>
			<Header navigation={navigation} />
			<div>
				<ProductsGrid data={productsData} />
			</div>
		</div>
	);
}
