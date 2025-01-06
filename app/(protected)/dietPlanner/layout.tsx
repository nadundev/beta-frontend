import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

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
        <div className="flex-1 overflow-y-auto">{children}</div>
      </div>
    </>
  );
}
