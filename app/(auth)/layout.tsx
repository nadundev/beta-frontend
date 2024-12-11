import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-200 to-white p-4">
      <BackgroundBeams />
      <div className="relative z-50">{children}</div>
    </div>
  );
}
