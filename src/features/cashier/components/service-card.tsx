import { Button } from "@/components/ui/button";

type ServiceCardProps = {
  name: string;
  defaultPrice: number;
  isSelected: boolean;
  onToggle: () => void;
};

function ServiceCard({
  name,
  defaultPrice,
  isSelected,
  onToggle,
}: ServiceCardProps) {
  return (
    <div className="flex flex-col gap-3 p-3 bg-zinc-50 rounded-lg">
      <div className="flex items-center justify-between">
        <h6 className="truncate w-full font-semibold text-lg">{name}</h6>
        <Button
          size="icon"
          variant={isSelected ? "destructive" : "secondary"}
          onClick={onToggle}
          aria-label={isSelected ? "Remove service" : "Add service"}
        >
          {isSelected ? (
            <span className="icon-[hugeicons--cancel-01]" />
          ) : (
            <span className="icon-[hugeicons--plus]" />
          )}
        </Button>
      </div>
      <hr />
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">Default Price</span>
        <span className="font-medium">Rp. {defaultPrice.toLocaleString()}</span>
      </div>
    </div>
  );
}

export default ServiceCard;
