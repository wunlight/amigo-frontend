import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";

type CreateServiceRowProps = {
  isSubmitting: boolean;
  onCreate: (name: string, default_price: number) => Promise<void>;
};

function CreateServiceRow({ isSubmitting, onCreate }: CreateServiceRowProps) {
  const [name, setName] = useState("");
  const [defaultPrice, setDefaultPrice] = useState("");

  async function handleSubmit() {
    const nameValue = name.trim();
    const priceValue = defaultPrice.trim();

    if (!nameValue || !priceValue) return;

    await onCreate(nameValue, Number(priceValue));

    setName("");
    setDefaultPrice("");
  }

  return (
    <TableRow>
      <TableCell>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Service name"
          disabled={isSubmitting}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSubmit();
            }
          }}
        />
      </TableCell>

      <TableCell>
        <Input
          type="number"
          step="0.01"
          min="0"
          value={defaultPrice}
          onChange={(event) => setDefaultPrice(event.target.value)}
          placeholder="Default price"
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
            disabled={!name.trim() || !defaultPrice.trim() || isSubmitting}
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

export default CreateServiceRow;