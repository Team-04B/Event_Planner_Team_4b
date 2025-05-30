import { TReactChildrenType } from "@/commonTypes/commonTypes";
import { AppSidebar } from "@/components/shared/Sidebar/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { checkAuthGuard, getMeFoDb } from "@/service/AuthService";

const DashboardLayout = async ({ children }: TReactChildrenType) => {
  const { data } = await getMeFoDb();
  const token = checkAuthGuard();

  if (token instanceof Response) {
    return token;
  }
  return (
    <SidebarProvider>
      <AppSidebar name={data?.name} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
          </div>
        </header>
        <div className="p-4 pt-0 min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
