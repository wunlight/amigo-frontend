import { Button } from "@/components/ui/button";

function ProductCard() {
  return (
    <div className="flex flex-col gap-3 p-3 bg-zinc-50 rounded-lg">
      <div className="flex items-center gap-3">
        <h6 className="truncate w-full font-semibold text-lg">Product Name</h6>
        <div className="flex flex-col items-end shrink-0">
          <span>Rp. 12,000</span>
          <span className="text-sm text-zinc-500">/ Unit</span>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">Stock: 12</span>
        <div className="flex gap-1.5">
          <Button size="icon">
            <span className="icon-[hugeicons--minus]" />
          </Button>
          <Button size="icon">
            <span className="icon-[hugeicons--plus]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
