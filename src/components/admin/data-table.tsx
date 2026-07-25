export interface AdminTableRow {
  id: string;
  title: string;
  status: string;
  updated: string;
  owner: string;
}

export function DataTable({
  title,
  rows,
  selectedId,
  loading,
  emptyMessage = "No records found yet.",
  onRowClick,
  onCreateClick,
  showCreateButton = true,
}: {
  title: string;
  rows: AdminTableRow[];
  selectedId?: string | null;
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: AdminTableRow) => void;
  onCreateClick?: () => void;
  showCreateButton?: boolean;
}) {
  return (
    <div className="rounded-5xl bg-white p-6 shadow-soft">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.26em] text-muted">Management</p>
          <h3 className="mt-2 font-display text-2xl tracking-[-0.05em] text-primary">{title}</h3>
        </div>
        <div className="flex gap-3">
          <button className="rounded-full border border-line px-4 py-2 text-sm text-primary transition hover:bg-[#f2f8f8]">
            Filter
          </button>
          {showCreateButton ? (
            <button
              type="button"
              onClick={onCreateClick}
              className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#008f8f]"
            >
              New Entry
            </button>
          ) : null}
        </div>
      </div>
      <div className="mt-6 overflow-hidden rounded-4xl border border-line">
        <table className="min-w-full border-collapse">
          <thead className="bg-[#f7fbfb] text-left text-xs uppercase tracking-[0.24em] text-muted">
            <tr>
              <th className="px-5 py-4">Title</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Updated</th>
              <th className="px-5 py-4">Owner</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-muted">
                  Loading records...
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-sm text-muted">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row)}
                  className={`border-t border-line transition ${
                    onRowClick ? "cursor-pointer hover:bg-[#f9fbfc]" : ""
                  } ${selectedId === row.id ? "bg-[#f7fbfb]" : ""}`}
                >
                  <td className="px-5 py-4 text-sm font-medium text-primary">{row.title}</td>
                  <td className="px-5 py-4 text-sm text-muted">
                    <span className="rounded-full bg-[#eaf7f8] px-3 py-1 text-xs font-semibold text-accent">
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-sm text-muted">{row.updated}</td>
                  <td className="px-5 py-4 text-sm text-muted">{row.owner}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
