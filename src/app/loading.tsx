export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f8fbfc] px-4 py-10 sm:px-6 lg:px-10">
      <div className="container-shell space-y-6">
        <div className="h-16 rounded-full bg-white shadow-soft" />
        <div className="h-[420px] rounded-[2.8rem] bg-primary/10" />
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="h-52 rounded-5xl bg-white shadow-soft" />
          <div className="h-52 rounded-5xl bg-white shadow-soft" />
          <div className="h-52 rounded-5xl bg-white shadow-soft" />
        </div>
      </div>
    </main>
  );
}
