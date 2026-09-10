import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Category } from "../types/categories.type";

type CategorysTableProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

function CategoryTableBody({
  categories,
  isLoading,
  isError,
}: CategorysTableProps) {
  if (isLoading) {
    return (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          Loading categories...
        </TableCell>
      </TableRow>
    );
  }

  if (isError) {
    return (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          Failed to load categories.
        </TableCell>
      </TableRow>
    );
  }

  if (categories.length === 0) {
    return (
      <TableRow>
        <TableCell colSpan={2} className="h-24 text-center">
          No categories found.
        </TableCell>
      </TableRow>
    );
  }

  return categories.map((category) => (
    <TableRow key={category.id}>
      <TableCell>{category.name}</TableCell>
      <TableCell>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="icon">
            <span className="icon-[hugeicons--pencil-edit-02]" />
          </Button>

          <Button variant="destructive" size="icon">
            <span className="icon-[hugeicons--delete-02]" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  ));
}

function CategorysTable({
  categories,
  isLoading,
  isError,
  refetch,
}: CategorysTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>
            <div className="flex justify-end">
              <Button>
                <span className="icon-[hugeicons--plus]" />
                <span>Add Category</span>
              </Button>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <CategoryTableBody
          categories={categories}
          isLoading={isLoading}
          isError={isError}
          refetch={refetch}
        />
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <div className="flex justify-end">
              <Button size="icon" onClick={() => refetch()}>
                <span className="icon-[hugeicons--refresh-04]" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default CategorysTable;
