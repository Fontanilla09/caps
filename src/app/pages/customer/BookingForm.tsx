import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Checkbox } from "../../components/ui/checkbox";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { CalendarIcon, Clock, Users, MapPin, FileText, ArrowLeft, Info } from "lucide-react";
import { format } from "date-fns";

export function BookingForm() {
  const { packageId } = useParams();
  const navigate = useNavigate();

  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [venue, setVenue] = useState("");
  const [venueAddress, setVenueAddress] = useState("");
  const [specialRequests, setSpecialRequests] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock booking creation
    const bookingId = Math.random().toString(36).substr(2, 9);
    navigate(`/payment/${bookingId}`);
  };

  const PACKAGE_NAME = "Elegant Wedding Package";
  const PACKAGE_PRICE = 75000;
  const DOWN_PAYMENT_PERCENT = 30;
  const downPayment = (PACKAGE_PRICE * DOWN_PAYMENT_PERCENT) / 100;

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Caterer Profile
        </Button>

        <h1 className="text-4xl mb-4 text-slate-900">Request Your Booking</h1>
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>You're initiating a booking request.</strong> Fill in your event details below.
            After submitting, proceed to payment to confirm your slot. Your booking will remain "Pending"
            until the caterer verifies your payment in your dashboard.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
                <CardDescription>Fill in the information about your event</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Event Date */}
                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          disabled={(date) => date < new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Event Time */}
                  <div className="space-y-2">
                    <Label htmlFor="time">Event Start Time</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="time"
                        type="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Guest Count */}
                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="guests"
                        type="number"
                        placeholder="e.g. 120"
                        value={guestCount}
                        onChange={(e) => setGuestCount(e.target.value)}
                        className="pl-10"
                        required
                        min="1"
                      />
                    </div>
                  </div>

                  {/* Venue Name */}
                  <div className="space-y-2">
                    <Label htmlFor="venue">Venue Name</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="venue"
                        placeholder="e.g. Grand Hotel Ballroom"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  {/* Venue Address */}
                  <div className="space-y-2">
                    <Label htmlFor="address">Venue Address</Label>
                    <Textarea
                      id="address"
                      placeholder="Full address including city and postal code"
                      value={venueAddress}
                      onChange={(e) => setVenueAddress(e.target.value)}
                      required
                      rows={3}
                    />
                  </div>

                  {/* Special Requests */}
                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests or Dietary Requirements (Optional)</Label>
                    <Textarea
                      id="requests"
                      placeholder="Any special dietary needs, allergies, or specific requests..."
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      rows={4}
                    />
                  </div>

                  {/* Terms Agreement */}
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                      I agree to the terms and conditions, cancellation policy, and understand that a {DOWN_PAYMENT_PERCENT}%
                      down payment is required to confirm this booking.
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={!agreedToTerms}>
                    Proceed to Payment
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Package</p>
                  <p className="font-medium">{PACKAGE_NAME}</p>
                </div>

                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Package Price</span>
                    <span>₱{PACKAGE_PRICE.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-blue-600">
                    <span>Down Payment ({DOWN_PAYMENT_PERCENT}%)</span>
                    <span>₱{downPayment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Balance Due</span>
                    <span>₱{(PACKAGE_PRICE - downPayment).toLocaleString()}</span>
                  </div>
                </div>

                <div className="border-t pt-4 bg-slate-50 -mx-6 px-6 py-4">
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">Due Now</span>
                    <span className="text-xl font-bold text-blue-600">
                      ₱{downPayment.toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Balance of ₱{(PACKAGE_PRICE - downPayment).toLocaleString()} due 7 days before event
                  </p>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-start gap-2 text-sm text-slate-600">
                    <FileText className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>You'll receive a digital receipt after payment confirmation</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
