import CategoryForm from "../components/product-form";
import ProductsTable from "../components/products-table";
import { useProducts } from "../hooks/use-products";

function ProductsList() {
  const { data: products = [], isFetching, isError, refetch } = useProducts();

  return (
    <div className="flex flex-col p-4">
      <div className="flex p-4">
        <CategoryForm />
      </div>
      <ProductsTable
        products={products}
        isLoading={isFetching}
        isError={isError}
      />
      <div className="flex p-4">
        <button
          onClick={() => refetch()}
          className="ml-auto grid place-content-center size-8 text-zinc-800 hover:bg-zinc-100 border border-zinc-100 rounded-full shadow-md"
        >
          <span className="icon-[mdi--refresh]" />
        </button>
      </div>
    </div>
  );
}

export default ProductsList;
