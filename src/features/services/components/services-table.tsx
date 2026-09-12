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
import type { Service } from "../types/services.type";
import ServiceRow from "./service-row";
import CreateServiceRow from "./create-service-row";

type ServicesTableProps = {
  services: Service[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
  onCreate: (name: string, default_price: number) => Promise<void>;
  onUpdate: (id: string, name: string, default_price: number) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

function ServicesTable({
  services,
  isLoading,
  isError,
  refetch,
  onCreate,
  onUpdate,
  onDelete,
}: ServicesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  async function handleCreate(name: string, default_price: number) {
    try {
      setIsCreating(true);

      await onCreate(name, default_price);
      refetch();
    } finally {
      setIsCreating(false);
    }
  }

  async function handleUpdate(id: string, name: string, default_price: number) {
    try {
      setSubmittingId(id);

      await onUpdate(id, name, default_price);

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

          <TableHead>Default Price</TableHead>

          <TableHead>
            <div className="flex justify-end">
              <span>Actions</span>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <CreateServiceRow isSubmitting={isCreating} onCreate={handleCreate} />

        {isLoading && (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              Loading services...
            </TableCell>
          </TableRow>
        )}

        {!isLoading && isError && (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              Failed to load services.
            </TableCell>
          </TableRow>
        )}

        {!isLoading && !isError && services.length === 0 && (
          <TableRow>
            <TableCell colSpan={3} className="h-24 text-center">
              No services found.
            </TableCell>
          </TableRow>
        )}

        {!isLoading &&
          !isError &&
          services.map((service) => (
            <ServiceRow
              key={service.id}
              service={service}
              isEditing={editingId === service.id}
              isSubmitting={submittingId === service.id}
              onEdit={() => setEditingId(service.id)}
              onCancel={() => setEditingId(null)}
              onUpdate={(name, default_price) =>
                handleUpdate(service.id, name, default_price)
              }
              onDelete={() => handleDelete(service.id)}
            />
          ))}
      </TableBody>

      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>
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

export default ServicesTable;