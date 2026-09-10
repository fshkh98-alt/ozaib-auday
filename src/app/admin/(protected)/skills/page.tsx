import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteSkill } from "./actions";

export default async function SkillsAdminPage() {
  const skills = await db.skill.findMany({
    orderBy: [{ category: "asc" }, { order: "asc" }],
  });

  return (
    <div>
      <AdminPageHeader title="Skills" newHref="/admin/skills/new" />

      <DataTable
        rows={skills}
        editHref={(row) => `/admin/skills/${row.id}`}
        emptyMessage="No skills yet. Add your first one."
        columns={[
          {
            header: "Name",
            render: (s: (typeof skills)[number]) => s.name,
          },
          {
            header: "Category",
            render: (s: (typeof skills)[number]) => s.category,
          },
          {
            header: "Level",
            render: (s: (typeof skills)[number]) => s.level,
          },
          {
            header: "",
            render: (s: (typeof skills)[number]) => (
              <DeleteButton
                action={deleteSkill.bind(null, s.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
