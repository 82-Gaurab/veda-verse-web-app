import { handleGetDashboard } from "@/lib/action/admin/dashboard-action";
import DashboardPage from "./_components/Dashboard";

export default async function Page() {
  const response = await handleGetDashboard();
  if (!response.success) {
    return <div>Failed to load Dashboard data</div>;
  }
  return (
    <div>
      <DashboardPage dashboardData={response.data} />
    </div>
  );
}
