import { Navbar } from "@/components/Navbar";
import { ItemCard } from "@/components/ItemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app this would come from backend
  const mockItems = [
    {
      id: "1",
      title: "iPhone 13 Pro",
      description: "iPhone color azul con funda negra. Última vez visto en la biblioteca",
      category: "Electrónicos",
      location: "Biblioteca Central - Piso 2",
      date: "Hace 2 horas",
      status: "lost" as const,
      image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Mochila Deportiva Nike",
      description: "Mochila negra con el logo de Nike, contiene cuadernos y calculadora",
      category: "Accesorios",
      location: "Canchas Deportivas",
      date: "Hace 5 horas",
      status: "found" as const,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      title: "Calculadora Casio FX-991",
      description: "Calculadora científica con nombre escrito en la parte posterior",
      category: "Útiles",
      location: "Facultad de Ingeniería - Aula 3B",
      date: "Hace 1 día",
      status: "found" as const,
    },
    {
      id: "4",
      title: "Llaves con llavero de Pokemon",
      description: "Juego de 3 llaves con llavero de Pikachu",
      category: "Documentos/Llaves",
      location: "Comedor Universitario",
      date: "Hace 3 horas",
      status: "lost" as const,
    },
    {
      id: "5",
      title: "Audífonos Sony WH-1000XM4",
      description: "Audífonos inalámbricos color negro con estuche",
      category: "Electrónicos",
      location: "Laboratorio de Computación",
      date: "Hace 6 horas",
      status: "returned" as const,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop"
    },
    {
      id: "6",
      title: "Cartera de Cuero",
      description: "Cartera marrón de cuero con documentos de identificación",
      category: "Documentos/Llaves",
      location: "Edificio Administrativo",
      date: "Hace 4 horas",
      status: "found" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Objetos Perdidos y Encontrados</h1>
            <p className="text-muted-foreground">
              Busca entre {mockItems.length} reportes activos o reporta un objeto
            </p>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nombre, descripción o ubicación..." 
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="electronics">Electrónicos</SelectItem>
                  <SelectItem value="accessories">Accesorios</SelectItem>
                  <SelectItem value="documents">Documentos/Llaves</SelectItem>
                  <SelectItem value="supplies">Útiles</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">Todos ({mockItems.length})</TabsTrigger>
            <TabsTrigger value="lost">
              Perdidos ({mockItems.filter(i => i.status === "lost").length})
            </TabsTrigger>
            <TabsTrigger value="found">
              Encontrados ({mockItems.filter(i => i.status === "found").length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockItems.map((item) => (
                <ItemCard key={item.id} {...item} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="lost" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockItems
                .filter((item) => item.status === "lost")
                .map((item) => (
                  <ItemCard key={item.id} {...item} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="found" className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mockItems
                .filter((item) => item.status === "found")
                .map((item) => (
                  <ItemCard key={item.id} {...item} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
