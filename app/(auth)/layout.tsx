export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-pink-50 to-white p-4">{children}</div>;
}
