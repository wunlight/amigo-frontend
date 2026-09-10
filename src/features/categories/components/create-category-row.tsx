import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";

type CreateCategoryRowProps = {
  isSubmitting: boolean;
  onCreate: (name: string) => Promise<void>;
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

export default CreateCategoryRow;
