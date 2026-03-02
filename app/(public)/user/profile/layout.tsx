import { AuthProvider } from "@/context/AuthContext";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <main>{children}</main>
    </AuthProvider>
  );
}
