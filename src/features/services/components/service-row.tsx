import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { useState } from "react";
import type { Service } from "../types/services.type";
import DeleteServiceDialog from "./delete-service-dialog";

type ServiceRowProps = {
  service: Service;
  isEditing: boolean;
  isSubmitting: boolean;
  onEdit: () => void;
  onCancel: () => void;
  onUpdate: (name: string, default_price: number) => Promise<void>;
  onDelete: () => Promise<void>;
};

function ServiceRow({
  service,
  isEditing,
  isSubmitting,
  onEdit,
  onCancel,
  onUpdate,
  onDelete,
}: ServiceRowProps) {
  const [name, setName] = useState(service.name);
  const [defaultPrice, setDefaultPrice] = useState(String(service.default_price));

  async function handleSubmit() {
    const nameValue = name.trim();
    const priceValue = defaultPrice.trim();

    if (!nameValue || !priceValue) {
      onCancel();
      return;
    }

    const price = Number(priceValue);

    if (nameValue === service.name && price === service.default_price) {
      onCancel();
      return;
    }

    await onUpdate(nameValue, price);
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
          <Input
            type="number"
            step="0.01"
            min="0"
            value={defaultPrice}
            onChange={(event) => setDefaultPrice(event.target.value)}
            disabled={isSubmitting}
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
              disabled={!name.trim() || !defaultPrice.trim() || isSubmitting}
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
      <TableCell>{service.name}</TableCell>

      <TableCell>{service.default_price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</TableCell>

      <TableCell>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" size="icon" onClick={onEdit}>
            <span className="icon-[hugeicons--pencil-edit-02]" />
          </Button>

          <DeleteServiceDialog
            serviceName={service.name}
            onDelete={onDelete}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export default ServiceRow;