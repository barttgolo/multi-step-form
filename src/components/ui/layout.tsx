import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="bg-gray-200 flex items-center justify-center h-screen">
      <Card className="w-[544px]">
        <CardHeader>
          <CardTitle>Multi step form</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full items-center py-4">
            <Outlet />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
