import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <div className="glass-panel max-w-xl rounded-5xl p-10 text-center shadow-premium">
        <p className="eyebrow border-line bg-white text-primary">Page Not Found</p>
        <h1 className="mt-6 font-display text-4xl font-semibold tracking-[-0.05em] text-primary">
          The page you&apos;re looking for has moved beyond the horizon.
        </h1>
        <p className="mt-4 text-base leading-7 text-muted">
          Let&apos;s bring you back to a clearer path.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-deep"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
