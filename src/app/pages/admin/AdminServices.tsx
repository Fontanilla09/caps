import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Plus, Edit, Trash2, Users, DollarSign } from "lucide-react";

const MOCK_SERVICES = [
  {
    id: "1",
    name: "Elegant Wedding Package",
    eventType: "Wedding",
    guestRange: "100-150",
    price: 75000,
    status: "active",
    bookings: 12,
  },
  {
    id: "2",
    name: "Corporate Event Deluxe",
    eventType: "Corporate",
    guestRange: "50-100",
    price: 45000,
    status: "active",
    bookings: 8,
  },
  {
    id: "3",
    name: "Birthday Celebration",
    eventType: "Birthday",
    guestRange: "30-50",
    price: 25000,
    status: "inactive",
    bookings: 4,
  },
];

export function AdminServices() {
  const [services, setServices] = useState(MOCK_SERVICES);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);

  // Form state
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [guestRange, setGuestRange] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");

  const handleOpenDialog = (service?: any) => {
    if (service) {
      setEditingService(service);
      setName(service.name);
      setEventType(service.eventType);
      setGuestRange(service.guestRange);
      setPrice(service.price.toString());
    } else {
      setEditingService(null);
      setName("");
      setEventType("");
      setGuestRange("");
      setPrice("");
      setDescription("");
      setFeatures("");
    }
    setIsDialogOpen(true);
  };

  const handleSaveService = () => {
    // Mock save
    setIsDialogOpen(false);
    setEditingService(null);
  };

  const handleDeleteService = (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl mb-2 text-slate-900">Manage Services</h1>
            <p className="text-slate-600">Create and manage your catering packages</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingService ? "Edit Service" : "Create New Service"}</DialogTitle>
                <DialogDescription>
                  {editingService ? "Update your service package details" : "Add a new catering package to your offerings"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="serviceName">Package Name</Label>
                  <Input
                    id="serviceName"
                    placeholder="e.g. Elegant Wedding Package"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="eventType">Event Type</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger id="eventType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                        <SelectItem value="Birthday">Birthday</SelectItem>
                        <SelectItem value="Anniversary">Anniversary</SelectItem>
                        <SelectItem value="Private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guestRange">Guest Range</Label>
                    <Input
                      id="guestRange"
                      placeholder="e.g. 100-150"
                      value={guestRange}
                      onChange={(e) => setGuestRange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Price (₱)</Label>
                  <Input
                    id="price"
                    type="number"
                    placeholder="75000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what's included in this package..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="features">Features (one per line)</Label>
                  <Textarea
                    id="features"
                    placeholder="Premium Menu&#10;Elegant Decorations&#10;Professional Staff"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveService}>
                    {editingService ? "Update Service" : "Create Service"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <Badge variant={service.status === "active" ? "default" : "secondary"}>
                    {service.status}
                  </Badge>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleOpenDialog(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDeleteService(service.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </div>
                </div>
                <CardTitle>{service.name}</CardTitle>
                <CardDescription>{service.eventType} Event</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{service.guestRange} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg text-slate-900">₱{service.price.toLocaleString()}</span>
                  </div>
                  <div className="text-sm text-slate-600 pt-2 border-t">
                    {service.bookings} total bookings
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {services.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Plus className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600 mb-4">No services yet</p>
              <Button onClick={() => handleOpenDialog()}>Create Your First Service</Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
