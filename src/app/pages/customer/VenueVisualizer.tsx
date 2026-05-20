import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { ArrowLeft, Upload, Wand2, Sparkles, Download, RotateCcw, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { useAuth } from "../../context/AuthContext";

export function VenueVisualizer() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user?.role !== "customer") {
      navigate("/");
    }
  }, [isAuthenticated, user, navigate]);
  const [venueImage, setVenueImage] = useState<string | null>(null);
  const [theme, setTheme] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setVenueImage(reader.result as string);
        setGeneratedImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!venueImage || !theme) return;

    setIsGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 3000));

    // Mock: In production, this would call an AI service
    setGeneratedImage(venueImage); // Using original as placeholder
    setIsGenerating(false);
  };

  const handleReset = () => {
    setVenueImage(null);
    setGeneratedImage(null);
    setTheme("");
    setEventType("");
    setColorScheme("");
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
          Back
        </Button>

        <div className="text-center mb-8">
          <h1 className="text-4xl mb-3 text-slate-900">AI Venue Visualizer</h1>
          <p className="text-lg text-slate-600">
            Upload your venue photo and see how it will look with your chosen theme and decorations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                Your Vision
              </CardTitle>
              <CardDescription>Upload your venue and describe your ideal setup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label htmlFor="venue-upload">Venue Photo</Label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                  <input
                    id="venue-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <label htmlFor="venue-upload" className="cursor-pointer">
                    {venueImage ? (
                      <div>
                        <img src={venueImage} alt="Venue" className="max-h-48 mx-auto rounded mb-3" />
                        <p className="text-sm text-blue-600">Click to change image</p>
                      </div>
                    ) : (
                      <div>
                        <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                        <p className="text-sm text-slate-600">Click to upload venue photo</p>
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 10MB</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>


              {/* Theme Description */}
              <div className="space-y-2">
                <Label htmlFor="theme">Theme Description</Label>
                <Textarea
                  id="theme"
                  placeholder="Describe your ideal event theme... (e.g., 'Elegant garden wedding with floral centerpieces and fairy lights')"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  onClick={handleGenerate}
                  disabled={!venueImage || !theme || isGenerating}
                  className="flex-1 gap-2"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <Wand2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-5 h-5" />
                      Generate Preview
                    </>
                  )}
                </Button>
                <Button onClick={handleReset} variant="outline" size="lg">
                  <RotateCcw className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Output Panel */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                AI-Generated Preview
              </CardTitle>
              <CardDescription>See how your venue will look with your chosen theme</CardDescription>
            </CardHeader>
            <CardContent>
              {generatedImage ? (
                <div className="space-y-4">
                  <div className="relative rounded-lg overflow-hidden border-2 border-slate-200">
                    <img src={generatedImage} alt="Generated venue" className="w-full" />
                    <div className="absolute top-3 right-3">
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </div>
                  </div>

                  <Alert>
                    <Sparkles className="w-4 h-4" />
                    <AlertDescription>
                      This is an AI-generated preview. Final setup may vary based on availability and specific requirements.
                    </AlertDescription>
                  </Alert>

                  <div className="bg-slate-100 rounded-lg p-4">
                    <h4 className="font-medium mb-2">Your Configuration:</h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {eventType && <li>• Event: {eventType}</li>}
                      {colorScheme && <li>• Colors: {colorScheme}</li>}
                      {theme && <li>• Theme: {theme}</li>}
                    </ul>
                  </div>

                  <Button className="w-full" size="lg">
                    Save & Continue to Booking
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-center h-96 bg-slate-100 rounded-lg">
                  <div className="text-center">
                    <Sparkles className="w-16 h-16 mx-auto mb-4 text-slate-400" />
                    <p className="text-slate-600">Your AI-generated preview will appear here</p>
                    <p className="text-sm text-slate-400 mt-2">Upload a venue photo and describe your theme to begin</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* How It Works */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How the AI Visualizer Works</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                  1
                </div>
                <h4 className="font-medium mb-1">Upload Venue</h4>
                <p className="text-sm text-slate-600">Take a photo of your actual event space</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                  2
                </div>
                <h4 className="font-medium mb-1">Describe Theme</h4>
                <p className="text-sm text-slate-600">Tell us your vision and preferences</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                  3
                </div>
                <h4 className="font-medium mb-1">AI Generates</h4>
                <p className="text-sm text-slate-600">Our AI creates a realistic preview</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">
                  4
                </div>
                <h4 className="font-medium mb-1">Book with Confidence</h4>
                <p className="text-sm text-slate-600">Proceed knowing what to expect</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
