import CategoriesTable from "../components/categories-table";
import CategoryForm from "../components/category-form";
import { useCategories } from "../hooks/use-categories";

function CategoriesList() {
  const {
    data: categories = [],
    isFetching,
    isError,
    refetch,
  } = useCategories();

  return (
    <div className="flex flex-col p-4">
      <div className="flex p-4">
        <CategoryForm />
      </div>
      <CategoriesTable
        categories={categories}
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

export default CategoriesList;
