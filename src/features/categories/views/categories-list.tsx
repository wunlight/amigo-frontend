import { Card, CardContent } from "@/components/ui/card";
import CategoriesTable from "../components/categories-table";
import { useCategories } from "../hooks/use-categories";

function CategoriesList() {
  const {
    data: categories = [],
    isFetching,
    isError,
    refetch,
  } = useCategories();

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <CategoriesTable
            categories={categories}
            isLoading={isFetching}
            isError={isError}
            refetch={refetch}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesList;
