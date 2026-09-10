import { inputClass, labelClass } from "@/lib/utils";

const types = [
  "CTF",
  "LAB",
  "RESEARCH",
  "NOTES",
  "TOOL_EXPERIMENT",
  "VULN_ANALYSIS",
];

const statuses = ["DRAFT", "PUBLISHED", "SCHEDULED"];

type Tag = {
  id: string;
  name: string;
};

type Writeup = {
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  type: string;
  status: string;
};

type WriteupWithTags = Writeup & {
  tags: Tag[];
};

export function WriteupForm({
  action,
  item,
}: {
  action: (formData: FormData) => Promise<void>;
  item?: WriteupWithTags;
}) {
  return (
    <form action={action} className="max-w-2xl space-y-4">
      <div>
        <label className={labelClass} htmlFor="title">
          Title
        </label>
        <input
          id="title"
          name="title"
          required
          defaultValue={item?.title}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="slug">
          Slug
        </label>
        <input
          id="slug"
          name="slug"
          required
          defaultValue={item?.slug}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="excerpt">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          name="excerpt"
          rows={2}
          defaultValue={item?.excerpt ?? ""}
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="content">
          Content (Markdown)
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={12}
          defaultValue={item?.content}
          className={`${inputClass} font-mono`}
        />
      </div>

      <div>
        <label className={labelClass} htmlFor="coverImage">
          Cover image URL
        </label>
        <input
          id="coverImage"
          name="coverImage"
          defaultValue={item?.coverImage ?? ""}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass} htmlFor="type">
            Type
          </label>
          <select
            id="type"
            name="type"
            defaultValue={item?.type ?? "NOTES"}
            className={inputClass}
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={item?.status ?? "DRAFT"}
            className={inputClass}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="tags">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          defaultValue={item?.tags.map((t) => t.name).join(", ") ?? ""}
          className={inputClass}
        />
      </div>

      <button
        type="submit"
        className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg"
      >
        Save
      </button>
    </form>
  );
}
