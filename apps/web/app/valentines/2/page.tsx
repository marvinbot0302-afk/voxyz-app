"use client";

import Link from "next/link";
import { PlanReveal } from "../_components/PlanReveal";
import { useEffect, useMemo, useRef, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export default function Valentines2Page() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const redrawRef = useRef<(() => void) | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDown, setIsDown] = useState(false);

  const secret = useMemo(
    () =>
      [
        "You’re my favorite notification.",
        "I like you more than fresh pastries.",
        "Meet me for a tiny adventure?",
      ][Math.floor(Math.random() * 3)],
    []
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const { width, height } = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Draw "foil" cover
      ctx.clearRect(0, 0, width, height);
      const grad = ctx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, "rgba(255, 80, 160, 0.92)");
      grad.addColorStop(0.45, "rgba(255, 205, 230, 0.95)");
      grad.addColorStop(1, "rgba(255, 130, 190, 0.92)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // subtle glitter stripes
      ctx.globalAlpha = 0.22;
      for (let i = -height; i < width + height; i += 10) {
        ctx.fillStyle = i % 20 === 0 ? "#ffffff" : "#ffd1e5";
        ctx.fillRect(i, 0, 6, height);
      }
      ctx.globalAlpha = 1;

      ctx.fillStyle = "rgba(255,255,255,0.9)";
      ctx.font = "600 14px ui-sans-serif, system-ui";
      ctx.fillText("Scratch to reveal", 18, 28);

      ctx.globalCompositeOperation = "destination-out";
    };

    redrawRef.current = resize;
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let lastSample = 0;

    const getPos = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const scratch = (x: number, y: number) => {
      const r = 18;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const sample = () => {
      if (revealed) return;
      const now = performance.now();
      if (now - lastSample < 220) return;
      lastSample = now;

      const { width, height } = canvas.getBoundingClientRect();
      const img = ctx.getImageData(0, 0, Math.floor(width), Math.floor(height));
      let cleared = 0;
      for (let i = 3; i < img.data.length; i += 4) {
        if (img.data[i] === 0) cleared++;
      }
      const pct = cleared / (img.data.length / 4);
      const nice = clamp(Math.round(pct * 100), 0, 100);
      setProgress(nice);
      if (pct > 0.48) setRevealed(true);
    };

    const onDown = (e: PointerEvent) => {
      if (revealed) return;
      setIsDown(true);
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
      const p = getPos(e);
      scratch(p.x, p.y);
      sample();
    };

    const onMove = (e: PointerEvent) => {
      if (!isDown || revealed) return;
      const p = getPos(e);
      scratch(p.x, p.y);
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        sample();
      });
    };

    const onUp = () => {
      setIsDown(false);
    };

    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isDown, revealed]);

  const reset = () => {
    setRevealed(false);
    setProgress(0);
    // redraw the cover immediately
    requestAnimationFrame(() => redrawRef.current?.());
  };

  return (
    <main className="min-h-dvh bg-[radial-gradient(circle_at_20%_10%,rgba(255,105,180,0.32),transparent_40%),radial-gradient(circle_at_80%_20%,rgba(255,0,128,0.18),transparent_45%),linear-gradient(180deg,#fff5fb,#ffffff)] text-zinc-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="flex items-center justify-between">
          <Link href="/valentines" className="text-sm text-zinc-600 hover:text-zinc-900">
            ← All valentines
          </Link>
          <span className="rounded-full bg-white/70 px-3 py-1 text-xs text-zinc-700 ring-1 ring-pink-200/60 backdrop-blur">
            #2 scratch
          </span>
        </div>

        <div className="mt-8 rounded-[2.25rem] bg-white/75 p-7 shadow-sm ring-1 ring-pink-200/60 backdrop-blur">
          <h1 className="text-balance text-3xl font-semibold tracking-tight">
            Scratch-off Reveal
          </h1>
          <p className="mt-2 text-sm text-zinc-700">
            Scratch the shiny cover until the secret is mostly revealed.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <div className="md:col-span-3">
              <div
                ref={containerRef}
                className="relative h-56 overflow-hidden rounded-3xl bg-gradient-to-br from-rose-50 to-pink-100 p-6 shadow-inner"
              >
                <div className="absolute inset-0 grid place-items-center px-6 text-center">
                  <div className="max-w-sm">
                    <p className="text-xs font-medium uppercase tracking-widest text-pink-700/70">
                      secret note
                    </p>
                    <p className="mt-3 text-balance text-2xl font-semibold text-zinc-900">
                      {secret}
                    </p>
                    <p className="mt-2 text-sm text-zinc-600">
                      (If you can read this already, you’re too powerful.)
                    </p>
                  </div>
                </div>

                {!revealed && (
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 cursor-crosshair touch-none"
                    aria-label="Scratch surface"
                  />
                )}

                {revealed && (
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-pink-700 ring-1 ring-pink-200 backdrop-blur">
                      Revealed ✨
                    </div>
                  </div>
                )}
              </div>

              {revealed && <PlanReveal />}
            </div>

            <div className="md:col-span-2">
              <div className="rounded-3xl bg-white/70 p-5 ring-1 ring-pink-200/60 backdrop-blur">
                <p className="text-sm font-semibold">Progress</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-pink-500 to-rose-400 transition-[width]"
                    style={{ width: `${revealed ? 100 : progress}%` }}
                  />
                </div>
                <p className="mt-2 text-xs text-zinc-600">{revealed ? "Done" : `${progress}%`}</p>

                <button
                  onClick={reset}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800 active:scale-[0.99]"
                >
                  Reset
                </button>

                <p className="mt-4 text-xs text-zinc-600">
                  Tip: scratch fast in zig-zags. (Yes, this is serious advice.)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
