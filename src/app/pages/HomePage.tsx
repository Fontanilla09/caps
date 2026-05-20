import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Alert, AlertDescription } from "../components/ui/alert";
import { Sparkles, MessageSquare, CreditCard, Shield, Eye, Wand2, Info, Smartphone, Banknote } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export function HomePage() {
  const { user, isAuthenticated } = useAuth();
  const isCustomerOrGuest = !isAuthenticated || user?.role === "customer";
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl mb-6">
              AI-Powered Catering Design & Reservation
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Visualize your dream event before it happens. Book verified caterers with confidence.
            </p>
            {/* Removed Browse Packages, Venue Visualizer, Login, and Get Started buttons as requested */}
          </div>
        </div>
      </section>

      {/* Payment Info Section */}
      {isCustomerOrGuest && (
        <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 max-w-4xl">
          <Alert className="border-blue-200 bg-blue-50">
            <Info className="w-5 h-5 text-blue-600" />
            <AlertDescription className="text-blue-900">
              <h3 className="font-semibold mb-3 text-lg">Easy & Flexible Payment Options</h3>
              <p className="mb-3">We offer two convenient ways to secure your booking:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Smartphone className="w-5 h-5 text-blue-600" />
                    <span className="font-medium">GCash Payment</span>
                  </div>
                  <p className="text-sm text-slate-700">Send payment to the caterer's GCash number and upload your transaction receipt for verification.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-100">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-5 h-5 text-green-600" />
                    <span className="font-medium">Face-to-Face Cash</span>
                  </div>
                  <p className="text-sm text-slate-700">Visit the caterer's office to pay in person. Perfect for those who prefer direct transactions.</p>
                </div>
              </div>
              <p className="text-sm mt-3">Monitor your payment status in real-time through your dashboard. You'll be notified once your payment is confirmed!</p>
            </AlertDescription>
          </Alert>
        </div>
      </section>
      )}

      {/* Features Section */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-slate-900">Why Choose CaterAI?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card>
              <CardHeader>
                <Sparkles className="w-12 h-12 text-blue-600 mb-3" />
                <CardTitle>AI Venue Visualization</CardTitle>
                <CardDescription>
                  Upload your venue photo and see how it will look with your chosen theme and decorations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <MessageSquare className="w-12 h-12 text-blue-600 mb-3" />
                <CardTitle>Real-Time Messaging</CardTitle>
                <CardDescription>
                  Communicate directly with caterers to clarify details and ensure everything meets your expectations
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="w-12 h-12 text-blue-600 mb-3" />
                <CardTitle>Flexible Payment</CardTitle>
                <CardDescription>
                  Secure your booking with a partial down payment and pay the balance before your event
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="w-12 h-12 text-blue-600 mb-3" />
                <CardTitle>Verified Caterers</CardTitle>
                <CardDescription>
                  All caterers are verified with valid business permits to ensure quality and reliability
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Wand2 className="w-12 h-12 text-blue-600 mb-3" />
                <CardTitle>Smart Recommendations</CardTitle>
                <CardDescription>
                  AI-powered suggestions for packages, themes, and menus based on your event details
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Eye className="w-12 h-12 text-blue-600 mb-3" />
                <CardTitle>Visual Alignment</CardTitle>
                <CardDescription>
                  See exactly what you're getting before making a commitment, reducing misunderstandings
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      {isCustomerOrGuest && (
        <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl text-center mb-12 text-slate-900">How It Works</h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                1
              </div>
              <div>
                <h3 className="text-xl mb-2">Browse & Select Packages</h3>
                <p className="text-slate-600">
                  Explore verified caterers and their service packages tailored to different event types and budgets
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                2
              </div>
              <div>
                <h3 className="text-xl mb-2">Visualize Your Event</h3>
                <p className="text-slate-600">
                  Upload a photo of your venue and use AI to generate a preview of how it will look with your chosen theme
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                3
              </div>
              <div>
                <h3 className="text-xl mb-2">Book & Pay</h3>
                <p className="text-slate-600">
                  Complete your reservation with a secure partial payment and communicate with your caterer in real-time
                </p>
              </div>
            </div>

            <div className="flex gap-6 items-start">
              <div className="flex-shrink-0 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl">
                4
              </div>
              <div>
                <h3 className="text-xl mb-2">Enjoy Your Event</h3>
                <p className="text-slate-600">
                  Relax knowing your event will match your expectations, with professional catering handled seamlessly
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* CTA Section */}
      {isCustomerOrGuest && (
        <section className="py-16 bg-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl mb-4">Ready to Plan Your Perfect Event?</h2>
            <p className="text-xl mb-8 text-blue-100">
              Join hundreds of satisfied customers who have brought their vision to life
            </p>
            <Link to="/register">
              <Button size="lg" variant="secondary">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
