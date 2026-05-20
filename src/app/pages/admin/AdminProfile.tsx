import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { Badge } from "../../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Upload, AlertCircle, CheckCircle2, Building2, FileText, Mail, Phone } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useApplications } from "../../context/ApplicationContext";

export function AdminProfile() {
  const { user } = useAuth();
  const { addApplication } = useApplications();
  const navigate = useNavigate();
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [permitFile, setPermitFile] = useState<File | null>(null);

  const handlePermitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPermitFile(file);
    }
  };

  const handleSaveProfile = () => {
    alert("Profile updated successfully!");
  };

  const handleSubmitForVerification = () => {
    if (!permitFile) {
      alert("Please upload your business permit first");
      return;
    }

    if (!businessName || !phone || !address) {
      alert("Please complete all required fields");
      return;
    }

    // Submit application to context
    addApplication({
      businessName,
      email,
      phone,
      address,
      description,
      permitFile,
      permitFileName: permitFile.name,
    });

    alert("Application submitted successfully! The Super Admin will review your documents. You will be notified once your account is verified.");
  };

  const isVerified = user?.isVerified;

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl mb-2 text-slate-900">Business Profile</h1>
              <p className="text-slate-600">Manage your catering business information</p>
            </div>
            {isVerified ? (
              <Badge variant="default" className="gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Verified
              </Badge>
            ) : (
              <Badge variant="secondary" className="gap-2">
                <AlertCircle className="w-4 h-4" />
                Pending Verification
              </Badge>
            )}
          </div>
        </div>

        {!isVerified && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <AlertDescription className="text-amber-900">
              <h4 className="font-medium mb-1">Complete Your Profile</h4>
              <p className="text-sm">
                Please fill in all required information and upload your business permit to submit your application for verification.
              </p>
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="info" className="space-y-6">
          <TabsList>
            <TabsTrigger value="info">Business Information</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="info">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      id="businessName"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Business Address *</Label>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    rows={3}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Business Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Tell customers about your catering business, experience, and specialties..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={5}
                  />
                </div>

                <Button onClick={handleSaveProfile} size="lg">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Business Documents</CardTitle>
                <CardDescription>Upload required documents for verification</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Business Permit / DTI Registration *</Label>
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center hover:border-blue-500 transition cursor-pointer">
                    <input
                      id="permit-upload"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handlePermitUpload}
                      className="hidden"
                    />
                    <label htmlFor="permit-upload" className="cursor-pointer">
                      {permitFile ? (
                        <div>
                          <FileText className="w-12 h-12 mx-auto mb-3 text-blue-600" />
                          <p className="text-sm font-medium text-blue-600">{permitFile.name}</p>
                          <p className="text-xs text-slate-400 mt-1">Click to change file</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-12 h-12 mx-auto mb-3 text-slate-400" />
                          <p className="text-sm text-slate-600">Click to upload business permit</p>
                          <p className="text-xs text-slate-400 mt-1">PDF, JPG, or PNG up to 10MB</p>
                        </div>
                      )}
                    </label>
                  </div>
                  <p className="text-sm text-slate-500">
                    Please upload a clear copy of your business permit or DTI registration certificate
                  </p>
                </div>

                {!isVerified && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-medium text-blue-900 mb-2">Verification Requirements:</h4>
                    <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
                      <li>Valid business permit or DTI registration</li>
                      <li>Complete business information</li>
                      <li>Clear and readable document copy</li>
                    </ul>
                  </div>
                )}

                {!isVerified && (
                  <Button onClick={handleSubmitForVerification} size="lg" className="w-full">
                    Submit for Verification
                  </Button>
                )}

                {isVerified && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    <AlertDescription className="text-green-900">
                      Your business has been verified! You can now accept bookings and manage your services.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
