import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useParams, useNavigate } from "react-router-dom";
import { Clock, MapPin, Tag, User, Mail, Phone, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - in real app this would be fetched based on ID
  const item = {
    id: "1",
    title: "iPhone 13 Pro",
    description: "iPhone color azul con funda negra. Última vez visto en la biblioteca del segundo piso, cerca de la zona de estudio. El teléfono tiene una pequeña rayadura en la esquina superior derecha y un sticker de la ESPOL en la parte posterior.",
    category: "Electrónicos",
    location: "Biblioteca Central - Piso 2",
    date: "5 de Noviembre, 2025",
    time: "14:30",
    status: "lost" as const,
    reportedBy: "Juan Pérez",
    contactEmail: "juperez@espol.edu.ec",
    contactPhone: "+593 99 123 4567",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800&h=600&fit=crop",
    reportDate: "Hace 2 horas",
    views: 45,
  };

  const statusConfig = {
    lost: {
      label: "Perdido",
      variant: "warning" as const,
      icon: <AlertCircle className="h-5 w-5" />,
      bgClass: "bg-warning-light",
      textClass: "text-warning",
    },
    found: {
      label: "Encontrado",
      variant: "success" as const,
      icon: <CheckCircle className="h-5 w-5" />,
      bgClass: "bg-success-light",
      textClass: "text-success",
    },
    returned: {
      label: "Entregado",
      variant: "default" as const,
      icon: <CheckCircle className="h-5 w-5" />,
      bgClass: "bg-muted",
      textClass: "text-foreground",
    },
  };

  const currentStatus = statusConfig[item.status];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4" />
          Volver a la búsqueda
        </Button>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            {item.image && (
              <Card className="overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-[400px] object-cover"
                />
              </Card>
            )}

            {/* Details */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <h1 className="text-3xl font-bold text-foreground">{item.title}</h1>
                    <Badge variant={currentStatus.variant} className="flex items-center gap-1">
                      {currentStatus.icon}
                      {currentStatus.label}
                    </Badge>
                  </div>
                  
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <Separator />

                {/* Info Grid */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <div className={`rounded-lg p-2 ${currentStatus.bgClass}`}>
                      <Tag className={`h-5 w-5 ${currentStatus.textClass}`} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Categoría</p>
                      <p className="text-base font-semibold text-foreground">{item.category}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-info-light p-2">
                      <MapPin className="h-5 w-5 text-info" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Ubicación</p>
                      <p className="text-base font-semibold text-foreground">{item.location}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Clock className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Fecha</p>
                      <p className="text-base font-semibold text-foreground">{item.date}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-primary/10 p-2">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Reportado por</p>
                      <p className="text-base font-semibold text-foreground">{item.reportedBy}</p>
                      <p className="text-sm text-muted-foreground">{item.reportDate}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline/Status */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Estado del Reporte
                </h3>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-success p-2">
                        <CheckCircle className="h-4 w-4 text-success-foreground" />
                      </div>
                      <div className="h-full w-0.5 bg-border mt-2"></div>
                    </div>
                    <div className="pb-8">
                      <p className="font-semibold text-foreground">Reporte Creado</p>
                      <p className="text-sm text-muted-foreground">{item.reportDate}</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-warning p-2">
                        <Clock className="h-4 w-4 text-warning-foreground" />
                      </div>
                      <div className="h-full w-0.5 bg-border mt-2"></div>
                    </div>
                    <div className="pb-8">
                      <p className="font-semibold text-foreground">Búsqueda Activa</p>
                      <p className="text-sm text-muted-foreground">
                        {item.views} personas han visto este reporte
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-muted p-2">
                        <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-muted-foreground">Pendiente de Entrega</p>
                      <p className="text-sm text-muted-foreground">Esperando coincidencias</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    Información de Contacto
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${item.contactEmail}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {item.contactEmail}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Teléfono</p>
                        <a
                          href={`tel:${item.contactPhone}`}
                          className="text-sm text-primary hover:underline"
                        >
                          {item.contactPhone}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-3">
                  {item.status === "lost" ? (
                    <>
                      <Button className="w-full" size="lg">
                        Lo Encontré
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Si encontraste este objeto, haz click para notificar al dueño
                      </p>
                    </>
                  ) : (
                    <>
                      <Button className="w-full" size="lg">
                        Es Mío
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        Si este es tu objeto, solicita la devolución
                      </p>
                    </>
                  )}
                </div>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full">
                    Compartir Reporte
                  </Button>
                  <Button variant="ghost" className="w-full text-destructive hover:text-destructive">
                    Reportar Problema
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-info-light border-info">
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold text-info mb-3">
                  💡 Consejos de Seguridad
                </h3>
                <ul className="space-y-2 text-xs text-foreground">
                  <li>• Verifica la identidad antes de entregar</li>
                  <li>• Solicita una descripción detallada</li>
                  <li>• Coordina la entrega en un lugar público</li>
                  <li>• Notifica a las autoridades si es necesario</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
