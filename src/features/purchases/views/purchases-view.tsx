import { useProducts } from "@/features/products/hooks/use-products";

function PurchasesView() {
  const { data: products = [] } = useProducts();

  return (
    <div className="flex h-dvh bg-zinc-200">
      <div className="grid grid-cols-4 gap-4 p-4 w-full">
        {products.map((product) => (
          <div className="flex items-center justify-between gap-2 p-4 h-fit bg-zinc-50 rounded-lg">
            <div className="flex flex-col gap-2 overflow-hidden">
              <span className="truncate font-bold">{product.name}</span>
              <span className="text-sm text-zinc-500">
                Rp. {product.selling_price}
              </span>
            </div>
            <button className="shrink-0 size-8 bg-indigo-500 hover:bg-indigo-600 rounded-full cursor-pointer">
              <span className="icon-[mdi--add] text-indigo-50" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-8 p-4 h-full w-100 bg-zinc-50 overflow-auto">
        <h6 className="font-bold text-lg">Purchase Summary</h6>
        <div className="flex flex-col gap-1.5">
          <span className="">Items: 0</span>
          <span className="">Total Qty: 0</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="">Total Cost:</span>
          <span className="font-bold">Rp. 0</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="">Reference:</span>
          <span className="font-bold">PUR-260909-001</span>
        </div>
        <div className="flex flex-col gap-1.5">
          <span className="">Notes:</span>
          <textarea
            cols={16}
            rows={8}
            className="p-3 border border-zinc-300 rounded"
          />
        </div>
        <button className="mt-auto h-10 text-zinc-50 bg-indigo-500 hover:bg-indigo-600 rounded-full">
          Submit
        </button>
      </div>
    </div>
  );
}

export default PurchasesView;
