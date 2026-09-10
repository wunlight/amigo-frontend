import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import type { Category } from "../types/categories.type";
import DeleteCategoryDialog from "./delete-category-dialog";

type CategoryRowProps = {
  category: Category;
  isEditing: boolean;
  isSubmitting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate: (name: string) => Promise<void>;
  onDelete: () => Promise<void>;
};

function CategoryRow({
  category,
  isEditing,
  isSubmitting,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
}: CategoryRowProps) {
  const [name, setName] = useState(category.name);

  async function handleSubmit() {
    const value = name.trim();

    if (!value || value === category.name) {
      onCancel();
      return;
    }

    await onUpdate(value);
  }

  if (isEditing) {
    return (
      <TableRow>
        <TableCell>
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSubmitting}
            autoFocus
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }

              if (event.key === "Escape") {
                onCancel();
              }
            }}
          />
        </TableCell>

        <TableCell>
          <div className="flex justify-end gap-3">
            <Button
              size="icon"
              disabled={!name.trim() || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <span className="icon-[hugeicons--loader-circle] animate-spin" />
              ) : (
                <span className="icon-[hugeicons--check]" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              disabled={isSubmitting}
              onClick={onCancel}
            >
              <span className="icon-[hugeicons--cancel-01]" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
    );
  }

  return (
    <TableRow>
      <TableCell>{category.name}</TableCell>

      <TableCell>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="icon" onClick={onEdit}>
            <span className="icon-[hugeicons--pencil-edit-02]" />
          </Button>

          <DeleteCategoryDialog
            categoryName={category.name}
            onDelete={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default CategoryRow;
