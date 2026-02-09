import Link from "next/link";
import { AgentWorldNav } from "../../components/aw/Nav";

export default function AgentWorldLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs text-white/50">VoxYZ Lab</div>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight">
              Agent World
            </h1>
          </div>
          <Link href="/" className="text-sm text-white/70 hover:text-white">
            Home
          </Link>
        </div>

        <div className="mt-6">
          <AgentWorldNav />
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </main>
  );
}
