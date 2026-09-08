import type { Product } from "../types/products.type";

type ProductsTableProps = {
  products: Product[];
  isLoading: boolean;
  isError: boolean;
};

function ProductsTable({ products, isLoading, isError }: ProductsTableProps) {
  return (
    <table className="border-collapse">
      <thead>
        <tr className="border-b border-zinc-300">
          <th className="px-4 py-2 text-left">Name</th>
        </tr>
      </thead>

      <tbody>
        {isLoading && (
          <tr className="border-b border-zinc-300">
            <td className="px-4 py-2 text-center">Loading...</td>
          </tr>
        )}

        {isError && (
          <tr className="border-b border-zinc-300">
            <td className="px-4 py-2 text-center">Failed to load products.</td>
          </tr>
        )}

        {!isLoading && !isError && products.length === 0 && (
          <tr className="border-b border-zinc-300">
            <td className="px-4 py-2 text-center">No products found.</td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          products.map((product) => (
            <tr key={product.id} className="border-b border-zinc-300">
              <td className="px-4 py-2">{product.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default ProductsTable;
