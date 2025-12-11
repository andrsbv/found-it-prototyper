import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

interface ItemCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  date: string;
  status: "lost" | "found" | "returned";
  image?: string;
  reward?: number;
}

export const ItemCard = ({ id, title, description, category, location, date, status, image, reward }: ItemCardProps) => {
  const statusConfig = {
    lost: { label: "Perdido", variant: "warning" as const },
    found: { label: "Encontrado", variant: "success" as const },
    returned: { label: "Entregado", variant: "default" as const },
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {image && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
      )}
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">{title}</h3>
          <div className="flex items-center gap-1">
            {reward && reward > 0 && (
              <Badge variant="success" className="gap-1">
                <DollarSign className="h-3 w-3" />
                {reward}
              </Badge>
            )}
            <Badge variant={statusConfig[status].variant}>
              {statusConfig[status].label}
            </Badge>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <Badge variant="outline" className="text-xs">{category}</Badge>
      </CardContent>
      <CardFooter>
        <Link to={`/item/${id}`} className="w-full">
          <Button variant="outline" className="w-full">
            Ver Detalles
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
