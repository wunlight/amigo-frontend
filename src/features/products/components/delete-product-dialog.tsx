import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type DeleteProductDialogProps = {
  productName: string;
  onDelete: () => Promise<void>;
};

function DeleteProductDialog({
  productName,
  onDelete,
}: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await onDelete();

      setOpen(false);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="destructive" size="icon">
          <span className="icon-[hugeicons--delete-02]" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure to delete this product?</DialogTitle>

          <DialogDescription>
            This action cannot be undone. This will permanently remove{" "}
            <span className="font-medium text-red-500">{productName}</span>{" "}
            data.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="destructive"
            disabled={isDeleting}
            onClick={handleDelete}
          >
            {isDeleting ? (
              <>
                <span className="icon-[hugeicons--loader-circle] animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProductDialog;
