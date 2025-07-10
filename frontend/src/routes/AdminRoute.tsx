import { Navigate, useLocation } from "react-router";
import { useAuth } from "../hooks/useAuth";
import useIsAdmin from "../hooks/useIsAdmin";
import SkeletenLoader from "../components/shared/SkeletonLoader";

const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminLoading } = useIsAdmin();
  const location = useLocation();

  if (loading || isAdminLoading) return <SkeletenLoader />;

  if (!user || !isAdmin)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default AdminRoute;
