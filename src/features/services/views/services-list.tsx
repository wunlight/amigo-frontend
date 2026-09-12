import { Card, CardContent } from "@/components/ui/card";
import ServicesTable from "../components/services-table";
import { useServices } from "../hooks/use-services";
import * as service from "../services/services.service";

function ServicesList() {
  const {
    data: services = [],
    isFetching,
    isError,
    refetch,
  } = useServices();

  return (
    <div className="p-4">
      <Card>
        <CardContent>
          <ServicesTable
            services={services}
            isLoading={isFetching}
            isError={isError}
            refetch={refetch}
            onCreate={(name, default_price) =>
              service.createService(name, default_price)
            }
            onUpdate={(id, name, default_price) =>
              service.updateService(id, name, default_price)
            }
            onDelete={(id) => service.deleteService(id)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default ServicesList;