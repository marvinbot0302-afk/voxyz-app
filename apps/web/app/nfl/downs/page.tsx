import Link from "next/link";
import { DownsTutor } from "./DownsTutor.client";

export default function DownsPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-5xl px-6 py-16">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-semibold tracking-tight">
            NFL Rules Tutor
          </h1>
          <Link href="/nfl" className="text-sm text-white/70 hover:text-white">
            Back
          </Link>
        </div>

        <p className="mt-6 max-w-2xl text-white/80">
          A 2-minute interactive to learn downs.
        </p>

        <div className="mt-10">
          <DownsTutor />
        </div>
      </div>
    </main>
  );
}
