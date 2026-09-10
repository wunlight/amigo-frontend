import { Button } from "@/components/ui/button";
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
        <Button size="icon" className="ml-auto" onClick={() => refetch()}>
          <span className="icon-[mdi--refresh]" />
        </Button>
      </div>
    </div>
  );
}

export default CategoriesList;
