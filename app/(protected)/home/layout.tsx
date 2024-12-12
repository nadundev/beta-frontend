import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { SideBarHeader } from "./components/sideBarHeader";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <>
      <div className="h-screen overflow-hidden flex">
        <SideBarHeader />
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
