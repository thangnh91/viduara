export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-white">
      <div className="flex flex-col items-center gap-6 text-center px-6">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-500" />
          <span className="text-2xl font-bold tracking-tight">LUMINA</span>
        </div>

        <h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight">
          Live a career before you choose it.
        </h1>

        <p className="max-w-md text-lg text-zinc-400">
          7-day AI-powered career simulations for Vietnamese high school students.
        </p>

        <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-500">
          <p>🚧 V0 — Foundation setup complete</p>
          <p>
            API:{" "}
            <a
              href={process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001"}
              className="text-indigo-400 hover:underline"
            >
              {process.env["NEXT_PUBLIC_API_URL"] ?? "http://localhost:3001"}
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
