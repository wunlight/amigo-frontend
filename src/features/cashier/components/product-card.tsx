import { Button } from "@/components/ui/button";

type ProductCardProps = {
  name: string;
  price: number;
  unit: string;
  stocks: number;
  selectedStock: number;
  onIncrement: () => void;
  onDecrement: () => void;
};

function ProductCard({
  name,
  price,
  unit,
  stocks,
  selectedStock,
  onIncrement,
  onDecrement,
}: ProductCardProps) {
  const canIncrement = selectedStock < stocks;
  const canDecrement = selectedStock > 0;

  return (
    <div className="flex flex-col gap-3 p-3 bg-zinc-50 rounded-lg">
      <div className="flex items-center gap-3">
        <h6 className="truncate w-full font-semibold text-lg">{name}</h6>
        <div className="flex flex-col items-end shrink-0">
          <span>Rp. {price.toLocaleString()}</span>
          <span className="text-sm text-zinc-500">/ {unit}</span>
        </div>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">Stock: {stocks}</span>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            onClick={onDecrement}
            disabled={!canDecrement}
            aria-label="Decrease quantity"
          >
            <span className="icon-[hugeicons--minus]" />
          </Button>
          <span className="w-8 text-center font-medium">{selectedStock}</span>
          <Button
            size="icon"
            onClick={onIncrement}
            disabled={!canIncrement}
            aria-label="Increase quantity"
          >
            <span className="icon-[hugeicons--plus]" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
