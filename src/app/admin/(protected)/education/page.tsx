import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteEducation } from "./actions";

export default async function EducationAdminPage() {
  const items = await db.education.findMany({
    orderBy: { startDate: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Education"
        newHref="/admin/education/new"
      />

      <DataTable
        rows={items}
        editHref={(row) => `/admin/education/${row.id}`}
        columns={[
          {
            header: "Degree",
            render: (e: (typeof items)[number]) => e.degree,
          },
          {
            header: "Institution",
            render: (e: (typeof items)[number]) => e.institution,
          },
          {
            header: "Current",
            render: (e: (typeof items)[number]) =>
              e.current ? "Yes" : "No",
          },
          {
            header: "",
            render: (e: (typeof items)[number]) => (
              <DeleteButton
                action={deleteEducation.bind(null, e.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
