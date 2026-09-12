import { Button } from "@/components/ui/button";

function SaleDetails() {
  return (
    <div className="flex flex-col gap-3 p-4 shrink-0 h-full w-80 bg-zinc-50">
      <h6 className="font-semibold text-xl">Sale Details</h6>
      <hr />
      <div className="flex flex-col gap-3 py-3 min-h-0 max-h-full overflow-auto">
        <div className="flex flex-col gap-1.5">
          <h6 className="text-sm text-zinc-500">Products</h6>
          <div className="flex justify-between">
            <span>Product Name</span>
            <span>Rp. 0</span>
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <h6 className="text-sm text-zinc-500">Services</h6>
          <div className="flex justify-between">
            <span>Service Name</span>
            <span>Rp. 0</span>
          </div>
        </div>
      </div>
      <hr className="mt-auto" />
      <div className="flex justify-between">
        <span>Total</span>
        <span>Rp. 0</span>
      </div>
      <Button>Submit</Button>
    </div>
  );
}

export default SaleDetails;