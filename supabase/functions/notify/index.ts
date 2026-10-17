// Public endpoint the site calls (navigator.sendBeacon, text/plain JSON) when something happens,
// e.g. a visitor finishes the /start/ form. Sends a short Telegram alert to every active recipient.
// Only a summary is sent (no health details, just a yes/no heads-up); the full answers still arrive on WhatsApp.
import { createClient } from "jsr:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
let TOKEN = "";
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Methods": "POST, OPTIONS", "Access-Control-Allow-Headers": "content-type" };
const esc = (s: unknown, max = 120) => String(s ?? "").slice(0, max).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
const list = (v: unknown) => (Array.isArray(v) ? v.slice(0, 8).map((x) => esc(x, 60)).join("، ") : esc(v));

async function sha(s: string) {
  const b = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s + "o2f"));
  return [...new Uint8Array(b)].slice(0, 12).map((x) => x.toString(16).padStart(2, "0")).join("");
}

function intakeText(d: Record<string, unknown>) {
  const L = ["🆕 <b>استمارة جديدة من الموقع</b>", ""];
  const add = (k: string, v: unknown) => { const s = Array.isArray(v) ? list(v) : esc(v); if (s) L.push(`<b>${k}:</b> ${s}`); };
  add("الاسم", d.name); add("النوع", d.gender); add("العمر", d.age); add("البلد", d.country);
  add("المدينة", d.city); add("واتساب", d.whatsapp); add("مدة الاشتراك", d.plan); add("الأهداف", d.goals);
  // Health details stay on WhatsApp only (Osama 2026-10-17); the team just gets a heads-up.
  if (d.health_note === true) L.push("", "⚠️ فيه ملاحظة صحية، شوف الواتساب");
  const wa = String(d.whatsapp ?? "").replace(/\D/g, "").replace(/^00/, "").replace(/^0(1\d{9})$/, "20$1");
  if (wa.length >= 8) L.push("", `💬 <a href="https://wa.me/${wa}">كلّمه على واتساب</a>`);
  L.push("", "📩 الإجابات الكاملة توصل على واتساب الكوتش.");
  return L.join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
  if (req.method !== "POST") return new Response("method", { status: 405, headers: CORS });
  let body: any;
  try { body = JSON.parse((await req.text()).slice(0, 8000)); } catch { return new Response("bad json", { status: 400, headers: CORS }); }
  if (body?.kind !== "intake" || typeof body.d !== "object") return new Response("bad kind", { status: 400, headers: CORS });

  // Abuse guard: max 3 per visitor per 10 min, max 40 site-wide per hour.
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "?";
  const ip_hash = await sha(ip);
  const t10 = new Date(Date.now() - 10 * 60e3).toISOString(), t60 = new Date(Date.now() - 60 * 60e3).toISOString();
  const [{ count: mine }, { count: all }] = await Promise.all([
    db.from("notify_log").select("id", { count: "exact", head: true }).eq("ip_hash", ip_hash).gte("created_at", t10),
    db.from("notify_log").select("id", { count: "exact", head: true }).gte("created_at", t60),
  ]);
  if ((mine ?? 0) >= 3 || (all ?? 0) >= 40) {
    await db.from("notify_log").insert({ kind: body.kind, ip_hash, ok: false });
    return new Response("slow down", { status: 429, headers: CORS });
  }

  if (!TOKEN) TOKEN = (await db.rpc("tg_secret", { p_name: "tg_bot_token" })).data ?? "";
  const { data: rcpt } = await db.from("notify_recipients").select("chat_id").eq("status", "active");
  const text = intakeText(body.d);
  const sent = await Promise.all((rcpt ?? []).map((r) =>
    fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: r.chat_id, text, parse_mode: "HTML", disable_web_page_preview: true }),
    }).then((x) => x.ok).catch(() => false)
  ));
  await db.from("notify_log").insert({ kind: body.kind, ip_hash, ok: sent.some(Boolean) });
  return Response.json({ sent: sent.filter(Boolean).length }, { headers: CORS });
});
