import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../../components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Calendar, Clock, MapPin, Users, Phone, Mail, MessageSquare, CheckCircle2, XCircle } from "lucide-react";

const MOCK_RESERVATIONS = [
  {
    id: "1",
    customer: {
      name: "Maria Santos",
      email: "maria@email.com",
      phone: "+63 912 345 6789",
    },
    package: "Elegant Wedding Package",
    date: "2026-06-15",
    time: "18:00",
    guests: 120,
    venue: "Grand Hotel Ballroom",
    venueAddress: "123 Main St, Manila",
    status: "confirmed",
    totalPrice: 75000,
    paidAmount: 22500,
    balanceDue: 52500,
    specialRequests: "Vegetarian options for 10 guests, nut allergies for 2 guests",
    bookingDate: "2026-05-01",
  },
  {
    id: "2",
    customer: {
      name: "John Reyes",
      email: "john@email.com",
      phone: "+63 917 555 8888",
    },
    package: "Corporate Event Deluxe",
    date: "2026-05-25",
    time: "14:00",
    guests: 75,
    venue: "City Convention Center",
    venueAddress: "456 Business Ave, Makati",
    status: "pending",
    totalPrice: 45000,
    paidAmount: 13500,
    balanceDue: 31500,
    specialRequests: "Need projector and microphone setup",
    bookingDate: "2026-05-05",
  },
  {
    id: "3",
    customer: {
      name: "Lisa Cruz",
      email: "lisa@email.com",
      phone: "+63 905 222 3333",
    },
    package: "Birthday Celebration",
    date: "2026-03-10",
    time: "15:00",
    guests: 40,
    venue: "Garden Restaurant",
    venueAddress: "789 Park Rd, Quezon City",
    status: "completed",
    totalPrice: 25000,
    paidAmount: 25000,
    balanceDue: 0,
    specialRequests: "Birthday cake with chocolate decoration",
    bookingDate: "2026-02-15",
  },
];

export function AdminReservations() {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredReservations = MOCK_RESERVATIONS.filter(
    (res) => selectedStatus === "all" || res.status === selectedStatus
  );

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; label: string }> = {
      confirmed: { variant: "default", label: "Confirmed" },
      pending: { variant: "secondary", label: "Pending" },
      completed: { variant: "outline", label: "Completed" },
      cancelled: { variant: "destructive", label: "Cancelled" },
    };
    const config = variants[status] || { variant: "secondary", label: status };
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [confirmType, setConfirmType] = useState<"accept" | "reject" | null>(null);

  const handleAcceptBooking = (id: string) => {
    setSelectedBooking(id);
    setConfirmType("accept");
  };

  const handleRejectBooking = (id: string) => {
    setSelectedBooking(id);
    setConfirmType("reject");
  };

  const handleConfirm = () => {
    if (confirmType === "accept") {
      alert(`Booking ${selectedBooking} accepted!`);
    } else if (confirmType === "reject") {
      alert(`Booking ${selectedBooking} rejected`);
    }
    setSelectedBooking(null);
    setConfirmType(null);
  };

  const handleCancel = () => {
    setSelectedBooking(null);
    setConfirmType(null);
  };

  // Get proofs from localStorage
  const reservationProofs = JSON.parse(localStorage.getItem("reservationProofs") || '{}');

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <Button variant="outline" size="sm" onClick={() => window.history.back()} className="mb-4">Back</Button>
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-slate-900">Reservations</h1>
          <p className="text-slate-600">Manage customer bookings and reservations</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Label className="text-sm font-medium">Filter by status:</Label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Reservations</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reservations List */}
        <div className="space-y-6">
          {filteredReservations.map((reservation) => {
            // DEMO: Hardcode payment details for John Reyes (id: "2")
            let proof = reservationProofs[reservation.id];
            if (reservation.id === "2") {
              proof = {
                paymentMethod: "gcash",
                referenceNumber: "1234567890123",
                submittedAt: new Date().toISOString(),
                // Placeholder image (public domain sample)
                proofUrl: "https://dummyimage.com/400x200/ced4da/495057&text=GCash+Receipt+Sample",
              };
            }
            return (
              <Card key={reservation.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{reservation.customer.name}</CardTitle>
                      <CardDescription>{reservation.package}</CardDescription>
                    </div>
                    {getStatusBadge(reservation.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Event Details */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-slate-700">Event Details</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-slate-400 mt-0.5" />
                          <span>
                            {new Date(reservation.date).toLocaleDateString("en-US", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Clock className="w-4 h-4 text-slate-400 mt-0.5" />
                          <span>{reservation.time}</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Users className="w-4 h-4 text-slate-400 mt-0.5" />
                          <span>{reservation.guests} guests</span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                          <div>
                            <p>{reservation.venue}</p>
                            <p className="text-slate-500">{reservation.venueAddress}</p>
                          </div>
                        </div>
                      </div>

                      {reservation.specialRequests && (
                        <div className="pt-3 border-t">
                          <h4 className="font-medium text-sm text-slate-700 mb-2">Special Requests</h4>
                          <p className="text-sm text-slate-600">{reservation.specialRequests}</p>
                        </div>
                      )}
                    </div>

                    {/* Customer & Payment Info */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-sm text-slate-700">Customer Information</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <a href={`mailto:${reservation.customer.email}`} className="text-blue-600 hover:underline">
                            {reservation.customer.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span>{reservation.customer.phone}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t">
                        <h4 className="font-medium text-sm text-slate-700 mb-2">Payment Status</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-slate-600">Total Price</span>
                            <span className="font-medium">₱{reservation.totalPrice.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Paid</span>
                            <span className="text-green-600 font-medium">₱{reservation.paidAmount.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-600">Balance</span>
                            <span className="text-blue-600 font-medium">₱{reservation.balanceDue.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Payment Details Display (always show if available) */}
                      {proof && (
                        <div className="pt-3 border-t">
                          <h4 className="font-medium text-sm text-slate-700 mb-2">Payment Details</h4>
                          <div className="text-xs text-slate-600 mb-1">
                            Method: <span className="font-mono">{proof.paymentMethod === 'gcash' ? 'GCash' : 'Face-to-Face'}</span>
                          </div>
                          {proof.referenceNumber && (
                            <div className="text-xs text-slate-600 mb-1">Reference #: <span className="font-mono">{proof.referenceNumber}</span></div>
                          )}
                          {proof.proofUrl && (
                            <img
                              src={proof.proofUrl}
                              alt="Proof of Payment"
                              className="rounded-lg border w-full max-w-xs mb-2"
                              style={{objectFit: 'contain'}}
                            />
                          )}
                          {proof.submittedAt && (
                            <div className="text-xs text-slate-500">Submitted: {new Date(proof.submittedAt).toLocaleString()}</div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 mt-6 pt-6 border-t flex-wrap">
                    <Button variant="default" className="gap-2">
                      <MessageSquare className="w-4 h-4" />
                      Message Customer
                    </Button>

                    {reservation.status === "pending" && (
                      <>
                        <Button
                          variant="outline"
                          className="gap-2 text-green-600 border-green-600 hover:bg-green-50"
                          onClick={() => handleAcceptBooking(reservation.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Accept Booking
                        </Button>
                        <Button
                          variant="outline"
                          className="gap-2 text-red-600 border-red-600 hover:bg-red-50"
                          onClick={() => handleRejectBooking(reservation.id)}
                        >
                          <XCircle className="w-4 h-4" />
                          Reject
                        </Button>
                      </>
                    )}

                    <Button variant="ghost">View Full Details</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Confirmation Dialog */}
        <Dialog open={!!confirmType} onOpenChange={handleCancel}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {confirmType === "accept" ? "Accept Booking" : "Reject Booking"}
              </DialogTitle>
              <DialogDescription>
                {confirmType === "accept"
                  ? "Are you sure you want to accept this booking? The customer will be notified."
                  : "Are you sure you want to reject this booking? The customer will be notified."}
              </DialogDescription>
            </DialogHeader>
            <div className="flex gap-3 justify-end mt-4">
              <Button variant="outline" onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleConfirm} variant={confirmType === "accept" ? "default" : "destructive"}>
                Confirm
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {filteredReservations.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600">No reservations found</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
