import { useParams, Link, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Separator } from "../../components/ui/separator";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Star, Users, DollarSign, Clock, MapPin, Check, ArrowLeft, CheckCircle, AlertCircle, Calendar, TrendingUp, Info } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const MOCK_PACKAGE = {
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
  nextAvailableDate: "2026-06-01",
  description: "Complete wedding catering with elegant setup, floral arrangements, and premium menu options. Perfect for couples who want a sophisticated and memorable celebration.",
  features: [
    "Elegant table settings and linens",
    "Professional wait staff",
    "Floral centerpieces",
    "Decorative lighting",
    "Beverage service",
    "Setup and cleanup",
  ],
  duration: "6-8 hours",
  serviceArea: "Metro Manila",
  downPayment: 30,
  topFeedback: [
    "Highly praised for punctuality and presentation",
    "Generous serving sizes",
    "Professional and attentive staff",
  ],
  reviews: [
    {
      author: "Maria Santos",
      rating: 5,
      comment: "Absolutely perfect for our wedding! Everything was flawless. The staff was punctual and the presentation exceeded our expectations.",
      date: "2026-04-15",
      highlights: ["Punctuality", "Presentation", "Service Quality"]
    },
    {
      author: "John Reyes",
      rating: 5,
      comment: "Professional service. Highly recommended! The portions were generous and our guests loved everything.",
      date: "2026-03-22",
      highlights: ["Professional Staff", "Generous Portions"]
    },
    {
      author: "Lisa Cruz",
      rating: 4,
      comment: "Great package overall. Minor timing issues but the setup was beautiful.",
      date: "2026-02-10",
      highlights: ["Setup & Decor"]
    },
  ],
};

export function PackageDetails() {
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  const handleBookNow = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (MOCK_PACKAGE.availability === "fully-booked") {
      alert(`This caterer is currently fully booked. Next available date: ${new Date(MOCK_PACKAGE.nextAvailableDate).toLocaleDateString()}`);
      return;
    }

    if (MOCK_PACKAGE.availability === "offline") {
      alert("This caterer is currently offline. Please check back later.");
      return;
    }

    navigate(`/book/${id}`);
  };

  const getAvailabilityBadge = () => {
    if (MOCK_PACKAGE.availability === "available") {
      return (
        <Badge variant="default" className="bg-green-600 gap-1">
          <CheckCircle className="w-4 h-4" />
          Available
        </Badge>
      );
    } else if (MOCK_PACKAGE.availability === "fully-booked") {
      return (
        <Badge variant="destructive" className="gap-1">
          <Clock className="w-4 h-4" />
          Fully Booked
        </Badge>
      );
    } else {
      return (
        <Badge variant="secondary" className="gap-1">
          <AlertCircle className="w-4 h-4" />
          Offline
        </Badge>
      );
    }
  };

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-6xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Directory
        </Button>

        <Alert className="mb-6 border-blue-200 bg-blue-50">
          <Info className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>Review this caterer's profile</strong> including their service history, customer feedback, and real-time availability.
            When ready, click "Request Booking" to initiate your reservation.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-3 gap-2">
                  <div className="flex gap-2 flex-wrap">
                    <Badge variant="secondary">{MOCK_PACKAGE.eventType}</Badge>
                    {getAvailabilityBadge()}
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-5 h-5 fill-amber-500" />
                    <span className="text-lg">{MOCK_PACKAGE.rating}</span>
                    <span className="text-sm text-slate-500">({MOCK_PACKAGE.reviewCount} reviews)</span>
                  </div>
                </div>
                <CardTitle className="text-3xl">{MOCK_PACKAGE.name}</CardTitle>
                <CardDescription className="text-lg">{MOCK_PACKAGE.caterer}</CardDescription>

                <div className="flex items-center gap-4 mt-3">
                  <div className="flex items-center gap-1 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span className="font-medium">{MOCK_PACKAGE.successfulEvents}+ Successful Events</span>
                  </div>
                  <div className="flex items-center gap-1 text-blue-600 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Trusted by {MOCK_PACKAGE.reviewCount}+ customers</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-700 leading-relaxed mb-4">{MOCK_PACKAGE.description}</p>

                {MOCK_PACKAGE.availability === "fully-booked" && (
                  <Alert className="border-amber-200 bg-amber-50">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <AlertDescription className="text-amber-900">
                      This caterer is currently fully booked. Next available date: <strong>{new Date(MOCK_PACKAGE.nextAvailableDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</strong>
                    </AlertDescription>
                  </Alert>
                )}

                {MOCK_PACKAGE.availability === "offline" && (
                  <Alert className="border-slate-200 bg-slate-50">
                    <AlertCircle className="w-4 h-4 text-slate-600" />
                    <AlertDescription className="text-slate-700">
                      This caterer is currently offline. Please check back later or browse other available caterers.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-amber-500" />
                  What Customers Love
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {MOCK_PACKAGE.topFeedback.map((feedback, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="italic">"{feedback}"</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Package Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {MOCK_PACKAGE.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Menu card removed as per request */}

            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews ({MOCK_PACKAGE.reviewCount})</CardTitle>
                <CardDescription>
                  See what customers say about {MOCK_PACKAGE.caterer}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {MOCK_PACKAGE.reviews.map((review, idx) => (
                  <div key={idx}>
                    {idx > 0 && <Separator className="my-4" />}
                    <div className="flex items-start gap-3">
                      <Avatar className="bg-blue-100">
                        <AvatarFallback className="text-blue-600">{review.author.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium">{review.author}</p>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: review.rating }).map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-700 mb-2">{review.comment}</p>
                        <div className="flex flex-wrap gap-1 mb-1">
                          {review.highlights.map((highlight, hIdx) => (
                            <Badge key={hIdx} variant="secondary" className="text-xs">
                              {highlight}
                            </Badge>
                          ))}
                        </div>
                        <p className="text-xs text-slate-400">{new Date(review.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric"
                        })}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="text-2xl">₱{MOCK_PACKAGE.price.toLocaleString()}</CardTitle>
                <CardDescription>Starting price</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Users className="w-4 h-4" />
                    <span>{MOCK_PACKAGE.guestRange} guests</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock className="w-4 h-4" />
                    <span>{MOCK_PACKAGE.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span>{MOCK_PACKAGE.serviceArea}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <DollarSign className="w-4 h-4" />
                    <span>{MOCK_PACKAGE.downPayment}% down payment required</span>
                  </div>
                </div>

                <Separator />

                {MOCK_PACKAGE.availability === "available" ? (
                  <>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                      <p className="text-sm text-green-800 text-center">
                        ✓ This caterer is ready to accept your booking request
                      </p>
                    </div>
                    <Button onClick={handleBookNow} className="w-full" size="lg">
                      Request Booking
                    </Button>
                    {(!isAuthenticated || user?.role === "customer") && (
                      <Link to="/visualizer">
                        <Button variant="outline" className="w-full">
                          Visualize Your Venue First
                        </Button>
                      </Link>
                    )}
                  </>
                ) : MOCK_PACKAGE.availability === "fully-booked" ? (
                  <>
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                      <p className="text-sm text-amber-800 text-center">
                        This caterer is fully booked. Check their calendar for the next available slot.
                      </p>
                    </div>
                    <Button onClick={handleBookNow} variant="outline" className="w-full" size="lg">
                      View Real-Time Calendar
                    </Button>
                    <p className="text-xs text-center text-slate-600">
                      Next available: {new Date(MOCK_PACKAGE.nextAvailableDate).toLocaleDateString()}
                    </p>
                  </>
                ) : (
                  <Button disabled className="w-full" size="lg">
                    Currently Offline
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
