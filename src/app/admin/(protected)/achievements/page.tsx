import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { deleteAchievement } from "./actions";

export default async function AchievementsAdminPage() {
  const items = await db.achievement.findMany({
    orderBy: { date: "desc" },
  });

  return (
    <div>
      <AdminPageHeader
        title="Achievements"
        newHref="/admin/achievements/new"
      />

      <DataTable
        rows={items}
        editHref={(row) => `/admin/achievements/${row.id}`}
        columns={[
          {
            header: "Title",
            render: (a: (typeof items)[number]) => a.title,
          },
          {
            header: "Category",
            render: (a: (typeof items)[number]) => a.category ?? "—",
          },
          {
            header: "",
            render: (a: (typeof items)[number]) => (
              <DeleteButton
                action={deleteAchievement.bind(null, a.id)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
