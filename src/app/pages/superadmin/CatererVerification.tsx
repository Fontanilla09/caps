import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import { Alert, AlertDescription } from "../../components/ui/alert";
import { CheckCircle2, XCircle, Eye, Building2, Mail, Phone, MapPin, FileText, AlertCircle } from "lucide-react";
import { useApplications } from "../../context/ApplicationContext";

export function CatererVerification() {
  const { getPendingApplications, approveApplication: approveApp, rejectApplication: rejectApp } = useApplications();
  const [applications, setApplications] = useState(getPendingApplications());
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");

  // Refresh applications when context changes
  useEffect(() => {
    setApplications(getPendingApplications());
  }, [getPendingApplications]);

  const handleViewApplication = (app: any) => {
    setSelectedApp(app);
    setIsViewDialogOpen(true);
  };

  const handleApprove = (id: string) => {
    if (confirm("Are you sure you want to approve this caterer application?")) {
      approveApp(id);
      setApplications(getPendingApplications());
      setIsViewDialogOpen(false);
      alert("Application approved! The caterer has been notified and can now access their dashboard.");
    }
  };

  const handleOpenReject = (app: any) => {
    setSelectedApp(app);
    setIsViewDialogOpen(false);
    setIsRejectDialogOpen(true);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection");
      return;
    }

    if (selectedApp) {
      rejectApp(selectedApp.id, rejectionReason);
      setApplications(getPendingApplications());
    }
    setIsRejectDialogOpen(false);
    setRejectionReason("");
    alert("Application rejected. The caterer has been notified with the reason and can correct and resubmit.");
  };

  const pendingCount = applications.length;

  return (
    <div className="py-12 px-4 bg-slate-50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl mb-2 text-slate-900">Caterer Verification</h1>
          <p className="text-slate-600 mb-4">Review and approve caterer applications submitted to your account</p>

          <Alert className="border-purple-200 bg-purple-50">
            <Building2 className="w-5 h-5 text-purple-600" />
            <AlertDescription className="text-purple-900">
              <strong>Super Admin Dashboard</strong> - You are the only administrator with access to this verification system.
              All caterer registration submissions appear here for your review and approval.
            </AlertDescription>
          </Alert>
        </div>

        {pendingCount > 0 && (
          <Alert className="mb-6 border-amber-200 bg-amber-50">
            <AlertCircle className="w-5 h-5 text-amber-600" />
            <AlertDescription className="text-amber-900">
              You have {pendingCount} pending application{pendingCount !== 1 ? "s" : ""} awaiting review
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-6">
          {applications.map((app) => (
            <Card key={app.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{app.businessName}</CardTitle>
                    <CardDescription>Applied on {new Date(app.submittedDate).toLocaleDateString()}</CardDescription>
                  </div>
                  <Badge variant="secondary">Pending Review</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2 text-sm">
                      <Mail className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Email</p>
                        <p>{app.email}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Phone className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Phone</p>
                        <p>{app.phone}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm md:col-span-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Address</p>
                        <p>{app.address}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <p className="text-sm text-slate-700">{app.description}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm border-t pt-4">
                    <FileText className="w-4 h-4 text-blue-600" />
                    <span className="text-blue-600">{app.permitDocument}</span>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button onClick={() => handleViewApplication(app)} variant="outline" className="gap-2">
                      <Eye className="w-4 h-4" />
                      View Details
                    </Button>
                    <Button
                      onClick={() => handleApprove(app.id)}
                      className="gap-2 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleOpenReject(app)}
                      variant="outline"
                      className="gap-2 text-red-600 border-red-600 hover:bg-red-50"
                    >
                      <XCircle className="w-4 h-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {applications.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <Building2 className="w-16 h-16 mx-auto mb-4 text-slate-400" />
              <p className="text-slate-600">No pending applications</p>
            </CardContent>
          </Card>
        )}

        {/* View Details Dialog */}
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{selectedApp?.businessName}</DialogTitle>
              <DialogDescription>Complete application details</DialogDescription>
            </DialogHeader>
            {selectedApp && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-slate-500">Business Name</Label>
                    <p className="text-sm">{selectedApp.businessName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Email</Label>
                    <p className="text-sm">{selectedApp.email}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Phone</Label>
                    <p className="text-sm">{selectedApp.phone}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-500">Submitted Date</Label>
                    <p className="text-sm">{new Date(selectedApp.submittedDate).toLocaleDateString()}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Business Address</Label>
                  <p className="text-sm">{selectedApp.address}</p>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Business Description</Label>
                  <p className="text-sm">{selectedApp.description}</p>
                </div>

                <div>
                  <Label className="text-xs text-slate-500">Business Permit Document</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-blue-600">
                      {selectedApp.permitFileName || selectedApp.permitDocument || "Document uploaded"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    {selectedApp.permitFile ? "File uploaded by caterer" : "Document on file"}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => handleApprove(selectedApp.id)}
                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve Application
                  </Button>
                  <Button
                    onClick={() => handleOpenReject(selectedApp)}
                    variant="outline"
                    className="flex-1 gap-2 text-red-600 border-red-600 hover:bg-red-50"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Reject Dialog */}
        <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Reject Application</DialogTitle>
              <DialogDescription>
                Provide a reason for rejecting this caterer application. They will be notified with your feedback.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Rejection *</Label>
                <Textarea
                  id="reason"
                  placeholder="e.g., Business permit document is unclear or expired..."
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={5}
                />
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleReject} variant="destructive">
                  Confirm Rejection
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
