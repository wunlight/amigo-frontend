import type { Category } from "../types/categories.type";

type CategoriesTableProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
};

function CategoriesTable({
  categories,
  isLoading,
  isError,
}: CategoriesTableProps) {
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
            <td className="px-4 py-2 text-center">
              Failed to load categories.
            </td>
          </tr>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <tr className="border-b border-zinc-300">
            <td className="px-4 py-2 text-center">No categories found.</td>
          </tr>
        )}

        {!isLoading &&
          !isError &&
          categories.map((category) => (
            <tr key={category.id} className="border-b border-zinc-300">
              <td className="px-4 py-2">{category.name}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default CategoriesTable;
