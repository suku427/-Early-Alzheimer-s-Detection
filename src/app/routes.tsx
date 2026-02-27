import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./pages/Dashboard";
import { Assessment } from "./pages/Assessment";
import { Results } from "./pages/Results";
import { Patients } from "./pages/Patients";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { 
        index: true, 
        element: <Dashboard /> 
      },
      { 
        path: "assessment", 
        element: <Assessment /> 
      },
      { 
        path: "results", 
        element: <Results /> 
      },
      { 
        path: "patients", 
        element: <Patients /> 
      },
      { 
        path: "reports", 
        element: <Reports /> 
      },
      { 
        path: "settings", 
        element: <Settings /> 
      },
      {
        path: "*",
        element: <div className="p-10 text-center">Page Not Found</div>
      }
    ],
  },
]);
