
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSocialLink } from "./actions";

export default async function SocialLinksAdminPage() {
  const items = await db.socialLink.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Social Links"
        newHref="/admin/social-links/new"
      />

      <DataTable
        rows={items}
        editHref={(row) => `/admin/social-links/${row.id}`}
        columns={[
          {
            header: "Platform",
            render: (s: (typeof items)[number]) => s.platform,
          },
          {
            header: "Visible",
            render: (s: (typeof items)[number]) =>
              s.visible ? "Yes" : "No",
          },
          {
            header: "Order",
            render: (s: (typeof items)[number]) => s.order,
          },
          {
            header: "",
            render: (s: (typeof items)[number]) => (
              <DeleteButton
                action={deleteSocialLink.bind(null, s.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}

