import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

type CreateCategoryRowProps = {
  isSubmitting: boolean;
  onCreate: (name: string) => Promise<void>;
};

type CategoryTableProps = {
  categories: Category[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  onCreate: (name: string) => Promise<void>;
  onUpdate: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function CreateCategoryRow({ isSubmitting, onCreate }: CreateCategoryRowProps) {
  const [name, setName] = useState("");

  async function handleSubmit() {
    const value = name.trim();

    if (!value) return;

    await onCreate(value);
    setName("");
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Category name"
          disabled={isSubmitting}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </TableCell>

      <TableCell>
        <div className="flex justify-end">
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
        </div>
      </TableCell>
    </TableRow>
  );
}

function CategoryRow({
  category,
  isEditing,
  isSubmitting,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
}: {
  category: Category;
  isEditing: boolean;
  isSubmitting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate: (name: string) => Promise<void>;
  onDelete: () => void;
}) {
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

          <Button variant="destructive" size="icon" onClick={onDelete}>
            <span className="icon-[hugeicons--delete-02]" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

function CategoriesTable({
  categories,
  isLoading,
  isError,
  refetch,
  onCreate,
  onUpdate,
}: CategoryTableProps) {
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
    console.log(id);
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
