import { Card, CardContent } from "@/components/ui/card";
import CategoriesTable from "../components/categories-table";
import { useCategories } from "../hooks/use-categories";
import * as service from "../services/categories.service";

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
            onCreate={(name) => service.createCategory(name)}
            onUpdate={(id, name) => service.updateCategory(id, name)}
            onDelete={(id) => service.deleteCategory(id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default CategoriesList;
