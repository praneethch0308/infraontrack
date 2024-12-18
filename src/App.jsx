import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Vendors from './pages/vendors/Vendors';
import Home from './pages/Home';
import { SidebarProvider } from './context/SidebarContext';
import Landing from './pages/Landing';
import VendorCreate from './pages/vendors/VendorCreate';

import Locations from './pages/locations/Locations';
import Departments from './pages/departments/Departments';
import VendorsPage from './pages/vendors/Vendors';
import DepartmentCreate from './pages/departments/DepartmentCreate';
import EmployeeCreate from './pages/employees/EmployeeCreate';
import EmployeeState from './context/employees/EmployeeState';
import Employees from './pages/employees/Employees';
import { AuthProvider } from './context/auth/AuthContext';
import ProtectedRoute from './components/protectedroute/ProtectedRoute';
import { DeptProvider } from './context/departments/DeptContext';
import ChangePassword from './pages/auth/ChangePassword';
import { VendorProvider } from './context/vendors/VendorContext';
import Assets from './pages/assets/Assets';
import LocationCreate from './pages/locations/LocationCreate';
import { LocProvider } from './context/locations/LocationContext';
import AssetCreate from './pages/assets/AssetCreate';
import { AssetProvider } from './context/assets/AssetContext';
import Dashboard from './pages/dashboards/Dashboard';
import Lists from './pages/lists/Lists';
import AddList from './pages/lists/AddList';
import { ListProvider } from './context/lists/ListContext';
import AddListitem from './pages/lists/AddListitem';
import AddSubList from './pages/lists/AddSubList';

import BulkApprovalHod from './pages/bulkapproval/BulkApprovalHod';
import BulkApprovalPrincipal from './pages/bulkapproval/BulkApprovalPrincipal';
import AssetApproveHod from './pages/bulkapproval/AssetApproveHod';
import AssetApprovePrincipal from './pages/bulkapproval/AssetApprovePrincipal';
import { BulkApprovalProvider } from './context/bulkapproval/BulkapprovalContext';
import AssetUpdate from './pages/assets/AssetUpdate';
import AssetView from './pages/assets/AssetView';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <SidebarProvider>
          <DeptProvider>
          <EmployeeState>
            <VendorProvider>
             <LocProvider>
              <AssetProvider>
                <ListProvider>
                  <BulkApprovalProvider>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route
                path="/home"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/change-password"
                element={
                  <ProtectedRoute>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employees"
                element={
                  <ProtectedRoute>
                    <Employees />
                  </ProtectedRoute>
                }
              />
              <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/employee-create"
                element={
                  <ProtectedRoute>
                    <EmployeeCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/departments"
                element={
                  <ProtectedRoute>
                    <Departments />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/lists"
                element={
                  <ProtectedRoute>
                    <Lists />
                  </ProtectedRoute>
                }
              />

                <Route
                path="/add-lists"
                element={
                  <ProtectedRoute>
                    <AddList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-listitem"
                element={
                  <ProtectedRoute>
                    <AddListitem />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/add-sublistitem"
                element={
                  <ProtectedRoute>
                    <AddSubList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/department-create"
                element={
                  <ProtectedRoute>
                    <DepartmentCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/locations"
                element={
                  <ProtectedRoute>
                    <Locations />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/location-create"
                element={
                  <ProtectedRoute>
                    <LocationCreate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendors"
                element={
                  <ProtectedRoute>
                    <VendorsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/vendor-create"
                element={
                  <ProtectedRoute>
                    <VendorCreate />
                  </ProtectedRoute>
                }
              />
               <Route
                path="/bulkapproval-hod"
                element={
                  <ProtectedRoute>
                    <BulkApprovalHod />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/bulkapproval-principal"
                element={
                  <ProtectedRoute>
                    <BulkApprovalPrincipal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assets"
                element={
                  <ProtectedRoute>
                    <Assets />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assetapprove-hod"
                element={
                  <ProtectedRoute>
                    <AssetApproveHod />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assetapprove-principal"
                element={
                  <ProtectedRoute>
                    <AssetApprovePrincipal />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/asset-create"
                element={
                  <ProtectedRoute>
                    <AssetCreate />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/asset-update"
                element={
                  <ProtectedRoute>
                    <AssetUpdate />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/assetview"
                element={
                  <ProtectedRoute>
                    <AssetView />
                  </ProtectedRoute>
                }
              />

            </Routes>
            </BulkApprovalProvider>
            </ListProvider>
            </AssetProvider>
            </LocProvider> 
            </VendorProvider>
          </EmployeeState>
          </DeptProvider>
        </SidebarProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
