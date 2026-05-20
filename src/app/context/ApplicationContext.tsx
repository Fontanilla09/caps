import { createContext, useContext, useState, ReactNode } from "react";

interface CatererApplication {
  id: string;
  businessName: string;
  email: string;
  phone: string;
  address: string;
  description: string;
  permitFile: File | null;
  permitFileName?: string;
  submittedDate: string;
  status: "pending" | "approved" | "rejected";
  rejectionReason?: string;
}

interface ApplicationContextType {
  applications: CatererApplication[];
  addApplication: (application: Omit<CatererApplication, "id" | "submittedDate" | "status">) => void;
  approveApplication: (id: string) => void;
  rejectApplication: (id: string, reason: string) => void;
  getPendingApplications: () => CatererApplication[];
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export function ApplicationProvider({ children }: { children: ReactNode }) {
  const [applications, setApplications] = useState<CatererApplication[]>([]);

  const addApplication = (application: Omit<CatererApplication, "id" | "submittedDate" | "status">) => {
    const newApplication: CatererApplication = {
      ...application,
      id: Math.random().toString(36).substr(2, 9),
      submittedDate: new Date().toISOString(),
      status: "pending",
    };
    setApplications((prev) => [newApplication, ...prev]);
  };

  const approveApplication = (id: string) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: "approved" as const } : app))
    );
  };

  const rejectApplication = (id: string, reason: string) => {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status: "rejected" as const, rejectionReason: reason } : app
      )
    );
  };

  const getPendingApplications = () => {
    return applications.filter((app) => app.status === "pending");
  };

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        approveApplication,
        rejectApplication,
        getPendingApplications,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within ApplicationProvider");
  }
  return context;
}
