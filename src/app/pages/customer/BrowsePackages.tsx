import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Search, Users, DollarSign, Star, CheckCircle, Clock, AlertCircle, ArrowLeft, Info } from "lucide-react";

const MOCK_PACKAGES = [
  {
    id: "1",
    name: "Elegant Wedding Package",
    caterer: "Premium Catering Co.",
    eventType: "Wedding",
    guestRange: "100-150",
    price: 75000,
    rating: 4.8,
    reviewCount: 124,
    successfulEvents: 87,
    availability: "available",
    description: "Complete wedding catering with elegant setup, floral arrangements, and premium menu options",
    features: ["Premium Menu", "Elegant Decorations", "Professional Staff", "Floral Arrangements"],
    topFeedback: "Highly praised for punctuality and presentation",
  },
  {
    id: "2",
    name: "Corporate Event Deluxe",
    caterer: "Business Events Pro",
    eventType: "Corporate",
    guestRange: "50-100",
    price: 45000,
    rating: 4.9,
    reviewCount: 89,
    successfulEvents: 124,
    availability: "available",
    description: "Professional corporate event setup with modern aesthetics and business-appropriate catering",
    features: ["Modern Setup", "Business Menu", "AV Equipment", "Professional Service"],
    topFeedback: "Known for excellent presentation and professional staff",
  },
  {
    id: "3",
    name: "Birthday Celebration",
    caterer: "Party Perfect",
    eventType: "Birthday",
    guestRange: "30-50",
    price: 25000,
    rating: 4.7,
    reviewCount: 156,
    successfulEvents: 203,
    availability: "fully-booked",
    description: "Fun and colorful birthday party package with themed decorations and kid-friendly options",
    features: ["Themed Decorations", "Entertainment", "Dessert Bar", "Party Favors"],
    topFeedback: "Customers love their creative themes and kid-friendly service",
  },
  {
    id: "4",
    name: "Garden Wedding Special",
    caterer: "Nature's Feast",
    eventType: "Wedding",
    guestRange: "80-120",
    price: 68000,
    rating: 4.9,
    reviewCount: 92,
    successfulEvents: 65,
    availability: "available",
    description: "Outdoor garden wedding setup with natural elements and farm-to-table cuisine",
    features: ["Outdoor Setup", "Organic Menu", "Natural Decor", "Garden Lighting"],
    topFeedback: "Outstanding quality and attention to detail",
  },
  {
    id: "5",
    name: "Intimate Dinner Party",
    caterer: "Gourmet Affairs",
    eventType: "Private",
    guestRange: "10-25",
    price: 18000,
    rating: 5.0,
    reviewCount: 45,
    successfulEvents: 38,
    availability: "available",
    description: "Exclusive small gathering with gourmet menu and personalized service",
    features: ["Gourmet Menu", "Personalized Service", "Fine Dining", "Wine Pairing"],
    topFeedback: "Exceptional quality and personalized attention",
  },
  {
    id: "6",
    name: "Grand Anniversary Package",
    caterer: "Celebration Experts",
    eventType: "Anniversary",
    guestRange: "60-100",
    price: 52000,
    rating: 4.8,
    reviewCount: 78,
    successfulEvents: 96,
    availability: "offline",
    description: "Romantic anniversary celebration with elegant ambiance and classic menu selections",
    features: ["Romantic Setup", "Classic Menu", "Live Music", "Photo Backdrop"],
    topFeedback: "Romantic ambiance and generous serving sizes",
  },
];

export function BrowsePackages() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [eventType, setEventType] = useState<string>("all");

  const filteredPackages = MOCK_PACKAGES.filter((pkg) => {
    const matchesSearch =
      pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.caterer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = eventType === "all" || pkg.eventType === eventType;
    return matchesSearch && matchesType;
  });

  const getAvailabilityBadge = (availability: string) => {
    if (availability === "available") {
      return (
        <Badge variant="default" className="bg-green-600 gap-1">
          <CheckCircle className="w-3 h-3" />
          Available
        </Badge>
      );
    } else if (availability === "fully-booked") {
      return (
        <Badge variant="destructive" className="gap-1">
          <Clock className="w-3 h-3" />
          Fully Booked
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="gap-1">
          <AlertCircle className="w-3 h-3" />
          Offline
        </Badge>
      );
    }
  };

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h1 className="text-4xl mb-4 text-slate-900">Caterer Directory</h1>
        <p className="text-slate-600 mb-8">
          Take control of your event! Browse our verified caterers, check their availability, and request a booking directly.
        </p>

        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>You're in control!</strong> Filter caterers by status, rating, or event type.
            Check each caterer's service history and customer reviews before requesting a booking.
          </AlertDescription>
        </Alert>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search packages or caterers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={eventType} onValueChange={setEventType}>
                <SelectTrigger>
                  <SelectValue placeholder="Event Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Event Types</SelectItem>
                  <SelectItem value="Wedding">Wedding</SelectItem>
                  <SelectItem value="Corporate">Corporate</SelectItem>
                  <SelectItem value="Birthday">Birthday</SelectItem>
                  <SelectItem value="Anniversary">Anniversary</SelectItem>
                  <SelectItem value="Private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4 text-slate-600">
          Found {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPackages.map((pkg) => (
            <Card key={pkg.id} className="flex flex-col">
              <CardHeader>
                <div className="flex items-start justify-between mb-2 gap-2">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{pkg.eventType}</Badge>
                    {getAvailabilityBadge(pkg.availability)}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-amber-500" />
                    <span className="text-sm">{pkg.rating}</span>
                    <span className="text-xs text-slate-500">({pkg.reviewCount})</span>
                  </div>
                </div>
                <CardTitle>{pkg.name}</CardTitle>
                <CardDescription>{pkg.caterer}</CardDescription>
                <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {pkg.successfulEvents}+ successful events
                </p>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-slate-600 mb-3">{pkg.description}</p>

                <div className="bg-blue-50 border border-blue-100 rounded-md p-2 mb-4">
                  <p className="text-xs text-blue-800 italic">"{pkg.topFeedback}"</p>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{pkg.guestRange} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-lg text-slate-900">₱{pkg.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {pkg.features.slice(0, 3).map((feature, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                  {pkg.features.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{pkg.features.length - 3} more
                    </Badge>
                  )}
                </div>

                <Link to={`/packages/${pkg.id}`} className="mt-auto">
                  <Button
                    className="w-full"
                    variant={pkg.availability === "available" ? "default" : "outline"}
                    disabled={pkg.availability === "offline"}
                  >
                    {pkg.availability === "available"
                      ? "View Profile & Request Booking"
                      : pkg.availability === "fully-booked"
                      ? "Check Availability"
                      : "Currently Unavailable"}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPackages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-600 text-lg">No packages found matching your criteria.</p>
            <Button onClick={() => { setSearchTerm(""); setEventType("all"); }} variant="outline" className="mt-4">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
