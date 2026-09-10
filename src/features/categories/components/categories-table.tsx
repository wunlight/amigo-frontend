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
import { useState } from "react";
import type { Category } from "../types/categories.type";
import CategoryRow from "./category-row";
import CreateCategoryRow from "./create-category-row";

type CategoriesTableProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  onCreate: (name: string) => Promise<void>;
  onUpdate: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function CategoriesTable({
  categories,
  isLoading,
  isError,
  refetch,
  onCreate,
  onUpdate,
  onDelete,
}: CategoriesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate(name: string) {
    try {
      setIsCreating(true);

      await onCreate(name);
      refetch();
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdate(id: string, name: string) {
    try {
      setSubmittingId(id);

      await onUpdate(id, name);

      setEditingId(null);
      refetch();
    } finally {
      setSubmittingId(null);
    }
  }

  async function handleDelete(id: string) {
    await onDelete(id);
    refetch();
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>

          <TableHead>
            <div className="flex justify-end">
              <span>Actions</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <CreateCategoryRow isSubmitting={isCreating} onCreate={handleCreate} />

        {isLoading && (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              Loading categories...
            </TableCell>
          </TableRow>
        )}

        {!isLoading && isError && (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              Failed to load categories.
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !isError && categories.length === 0 && (
          <TableRow>
            <TableCell colSpan={2} className="h-24 text-center">
              No categories found.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          !isError &&
          categories.map((category) => (
            <CategoryRow
              key={category.id}
              category={category}
              isEditing={editingId === category.id}
              isSubmitting={submittingId === category.id}
              onEdit={() => setEditingId(category.id)}
              onCancel={() => setEditingId(null)}
              onUpdate={(name) => handleUpdate(category.id, name)}
              onDelete={() => handleDelete(category.id)}
            />
          ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={2}>
            <div className="flex justify-end">
              <Button size="icon" onClick={refetch}>
                <span className="icon-[hugeicons--refresh-04]" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}

export default CategoriesTable;
