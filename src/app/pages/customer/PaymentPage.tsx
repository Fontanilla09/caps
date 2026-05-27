import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../../components/ui/radio-group";
import { Separator } from "../../components/ui/separator";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Smartphone, Banknote, Upload, CheckCircle2, Download, Calendar, AlertCircle, MapPin, Clock, ArrowLeft, Info } from "lucide-react";

export function PaymentPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("ewallet");
  const [proofOfPayment, setProofOfPayment] = useState<File | null>(null);
  const [referenceNumber, setReferenceNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentSubmitted, setPaymentSubmitted] = useState(false);

  const BOOKING = {
    id: bookingId,
    package: "Elegant Wedding Package",
    caterer: "Premium Catering Co.",
    eventDate: "2026-06-15",
    totalPrice: 75000,
    downPaymentPercent: 30,
    amountDue: 22500,
    balanceDue: 52500,
    balanceDueDate: "2026-06-08",
    ewalletNumber: "0912 345 6789",
    ewalletName: "PREMIUM CATERING CO.",
    officeAddress: "123 Business St, Manila, Philippines",
    officeHours: "Mon-Fri 9:00 AM - 5:00 PM",
  };

  const handleProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProofOfPayment(file);
    }
  };

  const handleSubmitPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (paymentMethod === "ewallet" && !proofOfPayment) {
      alert("Please upload your proof of payment");
      return;
    }

    if (paymentMethod === "ewallet" && !referenceNumber.trim()) {
      alert("Please enter the reference number");
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setPaymentSubmitted(true);
  };

  if (paymentSubmitted) {
    return (
      <div className="py-12 px-4 bg-slate-50 min-h-[calc(100vh-4rem)]">
        <div className="container mx-auto max-w-2xl">
          <Card>
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-blue-600" />
              </div>
              <h1 className="text-3xl mb-3 text-slate-900">Payment Submitted!</h1>
              <p className="text-slate-600 mb-8">
                Your payment information has been submitted for verification. You'll receive a confirmation once it's processed.
              </p>

              <Alert className="mb-8 text-left border-blue-200 bg-blue-50">
                <AlertCircle className="w-5 h-5 text-blue-600" />
                <AlertDescription className="text-blue-900">
                  <p className="font-medium mb-2">Next Steps:</p>
                  <ul className="text-sm space-y-1 list-disc list-inside">
                    <li>Your payment is currently pending verification</li>
                    <li>The caterer will review your proof of payment</li>
                    <li>You'll be notified once payment is confirmed</li>
                    <li>Check your dashboard for payment status updates</li>
                  </ul>
                </AlertDescription>
              </Alert>

              <div className="bg-slate-50 rounded-lg p-6 mb-8 text-left border">
                <h3 className="font-medium mb-4">Submission Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Booking ID</span>
                    <span className="font-mono">#{BOOKING.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Amount Submitted</span>
                    <span className="font-medium">₱{BOOKING.amountDue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Payment Method</span>
                    <span className="capitalize">{paymentMethod === "ewallet" ? "E-wallet" : "Face-to-Face"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Status</span>
                    <span className="text-amber-600 font-medium">Pending Verification</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Submitted Date</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-blue-600 font-medium">
                    <span>Remaining Balance</span>
                    <span>₱{BOOKING.balanceDue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Due Date</span>
                    <span>{new Date(BOOKING.balanceDueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 justify-center flex-wrap">
                <Button onClick={() => navigate("/customer/dashboard")} size="lg">
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-5xl">
        <Button
          variant="ghost"
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <h1 className="text-4xl mb-4 text-slate-900">Confirm Your Booking with Payment</h1>
        <Alert className="mb-8 border-blue-200 bg-blue-50">
          <Info className="w-5 h-5 text-blue-600" />
          <AlertDescription className="text-blue-900">
            <strong>Final Step!</strong> Choose your payment method and settle the down payment to secure your slot.
            Your booking remains "Pending" until the caterer verifies your payment. Monitor your dashboard for updates.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you'd like to pay for your booking</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmitPayment} className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <Label>Select Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="ewallet" id="ewallet" />
                        <Label htmlFor="ewallet" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-medium">E-wallet</p>
                            <p className="text-xs text-slate-500">Send payment and upload proof</p>
                          </div>
                        </Label>
                      </div>

                      <div className="flex items-center space-x-3 border rounded-lg p-4 cursor-pointer hover:bg-slate-50">
                        <RadioGroupItem value="cash" id="cash" />
                        <Label htmlFor="cash" className="flex-1 cursor-pointer flex items-center gap-3">
                          <Banknote className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium">Face-to-Face (Cash)</p>
                            <p className="text-xs text-slate-500">Pay at our office location</p>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* E-wallet Instructions */}
                  {paymentMethod === "ewallet" && (
                    <div className="space-y-4 pt-4 border-t">
                      <Alert className="border-blue-200 bg-blue-50">
                        <Smartphone className="w-4 h-4 text-blue-600" />
                        <AlertDescription className="text-blue-900">
                          <p className="font-medium mb-2">E-wallet Payment Instructions:</p>
                          <ol className="text-sm space-y-1 list-decimal list-inside">
                            <li>Send ₱{BOOKING.amountDue.toLocaleString()} to the e-wallet number below</li>
                            <li>Take a screenshot of the transaction receipt</li>
                            <li>Upload the proof of payment below</li>
                            <li>Enter the reference number</li>
                          </ol>
                        </AlertDescription>
                      </Alert>

                      <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">E-wallet Number:</span>
                          <span className="text-lg font-bold text-blue-600">{BOOKING.ewalletNumber}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-600">Account Name:</span>
                          <span className="font-medium">{BOOKING.ewalletName}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reference">Reference Number *</Label>
                        <Input
                          id="reference"
                          placeholder="Enter reference number"
                          value={referenceNumber}
                          onChange={(e) => setReferenceNumber(e.target.value)}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Upload Proof of Payment *</Label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-500 transition cursor-pointer">
                          <input
                            id="proof-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleProofUpload}
                            className="hidden"
                            required
                          />
                          <label htmlFor="proof-upload" className="cursor-pointer">
                            {proofOfPayment ? (
                              <div>
                                <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-green-600" />
                                <p className="text-sm font-medium text-green-600">{proofOfPayment.name}</p>
                                <p className="text-xs text-slate-400 mt-1">Click to change file</p>
                              </div>
                            ) : (
                              <div>
                                <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                                <p className="text-sm text-slate-600">Click to upload screenshot</p>
                                <p className="text-xs text-slate-400 mt-1">PNG or JPG up to 10MB</p>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Face-to-Face Instructions */}
                  {paymentMethod === "cash" && (
                    <div className="space-y-4 pt-4 border-t">
                      <Alert className="border-green-200 bg-green-50">
                        <MapPin className="w-4 h-4 text-green-600" />
                        <AlertDescription className="text-green-900">
                          <p className="font-medium mb-2">Office Location:</p>
                          <p className="text-sm mb-3">{BOOKING.officeAddress}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            <span>{BOOKING.officeHours}</span>
                          </div>
                        </AlertDescription>
                      </Alert>

                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="font-medium mb-2">What to bring:</p>
                        <ul className="text-sm space-y-1 list-disc list-inside text-slate-700">
                          <li>Valid ID</li>
                          <li>Booking reference number: #{BOOKING.id}</li>
                          <li>Exact amount: ₱{BOOKING.amountDue.toLocaleString()}</li>
                        </ul>
                      </div>

                      <Alert className="border-amber-200 bg-amber-50">
                        <AlertCircle className="w-4 h-4 text-amber-600" />
                        <AlertDescription className="text-amber-900 text-sm">
                          After clicking "Confirm Selection", visit our office to complete your payment. Your booking will be confirmed once payment is received.
                        </AlertDescription>
                      </Alert>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : paymentMethod === "gcash"
                      ? "Submit Payment Proof"
                      : "Confirm Selection"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Package</p>
                  <p className="font-medium">{BOOKING.package}</p>
                  <p className="text-sm text-slate-600">{BOOKING.caterer}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(BOOKING.eventDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}</span>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Total Package Price</span>
                    <span>₱{BOOKING.totalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium text-blue-600">
                    <span>Down Payment ({BOOKING.downPaymentPercent}%)</span>
                    <span>₱{BOOKING.amountDue.toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Amount Due Now</span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₱{BOOKING.amountDue.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="text-sm text-slate-600 space-y-1">
                  <p className="font-medium text-slate-900">Remaining Balance</p>
                  <p>₱{BOOKING.balanceDue.toLocaleString()}</p>
                  <p className="text-xs">
                    Due by {new Date(BOOKING.balanceDueDate).toLocaleDateString()}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
