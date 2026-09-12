import AdminShell from "@/components/admin/AdminShell";

export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Next Move Estates Admin",
  },

  robots: {
    index: false,
    follow: false,
    nocache: true,

    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function AdminLayout({
  children,
}) {
  return (
    <AdminShell>
      {children}
    </AdminShell>
  );
}