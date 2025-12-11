import { useState, useMemo, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { ItemCard } from "@/components/ItemCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, SlidersHorizontal, Loader2 } from "lucide-react";
import { AnnouncementBanner } from "@/components/AnnouncementBanner";
import { supabase } from "@/integrations/supabase/client";

interface ItemReport {
  id: string;
  name: string;
  description: string | null;
  category: string;
  location: string;
  date: string;
  type: string;
  status: string;
  image_url: string | null;
  reward_amount: number | null;
  created_at: string;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  const [items, setItems] = useState<ItemReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('item_reports')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setItems(data);
    }
    setIsLoading(false);
  };

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      electronics: "Electrónicos",
      accessories: "Accesorios",
      documents: "Documentos/Llaves",
      supplies: "Útiles Escolares",
      clothing: "Ropa/Calzado",
      sports: "Deportivos",
      other: "Otros",
    };
    return labels[category] || category;
  };

  const getLocationLabel = (location: string) => {
    const labels: Record<string, string> = {
      biblioteca: "Biblioteca Central",
      comedor: "Comedor Universitario",
      canchas: "Canchas Deportivas",
      ing: "Facultad de Ingeniería",
      admin: "Edificio Administrativo",
      lab: "Laboratorios",
      auditorio: "Auditorio",
      estacionamiento: "Estacionamiento",
      otro: "Otro",
    };
    return labels[location] || location;
  };

  // Filter items based on search, category, and tab
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
        item.name.toLowerCase().includes(searchLower) ||
        (item.description?.toLowerCase().includes(searchLower) || false) ||
        getLocationLabel(item.location).toLowerCase().includes(searchLower) ||
        getCategoryLabel(item.category).toLowerCase().includes(searchLower);

      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter;

      const matchesTab = activeTab === "all" || 
        (activeTab === "lost" && item.type === "lost") ||
        (activeTab === "found" && item.type === "found");

      return matchesSearch && matchesCategory && matchesTab;
    });
  }, [searchQuery, categoryFilter, activeTab, items]);

  // Count items per category for display
  const counts = useMemo(() => ({
    all: items.length,
    lost: items.filter(i => i.type === "lost").length,
    found: items.filter(i => i.type === "found").length,
  }), [items]);

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return "Hace menos de 1 hora";
    if (diffHours < 24) return `Hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
    if (diffDays < 7) return `Hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
    return date.toLocaleDateString('es-EC');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Objetos Perdidos y Encontrados</h1>
            <p className="text-muted-foreground">
              Busca entre {items.length} reportes activos o reporta un objeto
            </p>
          </div>

          <AnnouncementBanner
            message="Nuevo: Ahora puedes ofrecer recompensas por objetos perdidos. ¡Aumenta tus chances de recuperación!"
            variant="info"
          />

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por nombre, descripción o ubicación..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Categoría" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  <SelectItem value="electronics">Electrónicos</SelectItem>
                  <SelectItem value="accessories">Accesorios</SelectItem>
                  <SelectItem value="documents">Documentos/Llaves</SelectItem>
                  <SelectItem value="supplies">Útiles Escolares</SelectItem>
                  <SelectItem value="clothing">Ropa/Calzado</SelectItem>
                  <SelectItem value="sports">Deportivos</SelectItem>
                  <SelectItem value="other">Otros</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon" onClick={fetchItems}>
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="all">Todos ({counts.all})</TabsTrigger>
            <TabsTrigger value="lost">Perdidos ({counts.lost})</TabsTrigger>
            <TabsTrigger value="found">Encontrados ({counts.found})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="space-y-6">
            {activeTab === "lost" && (
              <AnnouncementBanner
                message="Los objetos marcados con $ tienen una recompensa ofrecida por el dueño"
                variant="success"
                dismissible={true}
              />
            )}
            
            {activeTab === "found" && (
              <AnnouncementBanner
                message="Si encontraste un objeto, verifica primero si ya fue reportado como perdido antes de crear un nuevo reporte"
                variant="warning"
                dismissible={true}
              />
            )}

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
                <p className="text-muted-foreground">Cargando reportes...</p>
              </div>
            ) : filteredItems.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredItems.map((item) => (
                  <ItemCard 
                    key={item.id} 
                    id={item.id}
                    title={item.name}
                    description={item.description || "Sin descripción"}
                    category={getCategoryLabel(item.category)}
                    location={getLocationLabel(item.location)}
                    date={getTimeAgo(item.created_at)}
                    status={item.type as "lost" | "found" | "returned"}
                    image={item.image_url || undefined}
                    reward={item.reward_amount || undefined}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <Search className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-semibold text-foreground">No se encontraron resultados</h3>
                <p className="text-muted-foreground mt-2">
                  Intenta con otros términos de búsqueda o cambia los filtros
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
