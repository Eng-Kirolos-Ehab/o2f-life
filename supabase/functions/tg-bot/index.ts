// Telegram webhook for @o2flife_bot: lets people subscribe to site alerts and lets admins manage them.
//   /start  → asks the person to share their phone (Telegram "share contact" button)
//   contact → pre-approved phone ⇒ active at once; otherwise pending + approve/reject buttons sent to admins
//   /list   (admin) → everyone with a remove button      /stop → unsubscribe yourself      /test (admin) → sample alert
// GET ?setup=1 registers this function as the bot's webhook (with the header secret from Vault).
import { createClient } from "jsr:@supabase/supabase-js@2";

const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);
const SELF_URL = `${Deno.env.get("SUPABASE_URL")}/functions/v1/tg-bot`;
let TOKEN = "", HOOK_SECRET = "";
async function secrets() {
  if (!TOKEN) TOKEN = (await db.rpc("tg_secret", { p_name: "tg_bot_token" })).data ?? "";
  if (!HOOK_SECRET) HOOK_SECRET = (await db.rpc("tg_secret", { p_name: "tg_webhook_secret" })).data ?? "";
}
async function tg(method: string, body: Record<string, unknown>) {
  const r = await fetch(`https://api.telegram.org/bot${TOKEN}/${method}`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body),
  });
  return r.json();
}
const say = (chat_id: number, text: string, extra: Record<string, unknown> = {}) =>
  tg("sendMessage", { chat_id, text, parse_mode: "HTML", ...extra });
const esc = (s: string) => String(s ?? "").replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]!));
// 01279777609 / +20 127… / 00201… → 201279777609
function normPhone(p: string) {
  let d = String(p).replace(/\D/g, "").replace(/^00/, "");
  if (/^01\d{9}$/.test(d)) d = "2" + d;
  return d;
}
const who = (r: { name?: string; username?: string; phone?: string }) =>
  `${esc(r.name || "بدون اسم")}${r.username ? " @" + esc(r.username) : ""}${r.phone ? " (" + esc(r.phone) + ")" : ""}`;

async function admins() {
  const { data } = await db.from("notify_recipients").select("chat_id").eq("status", "active").eq("is_admin", true);
  return (data ?? []).map((x) => x.chat_id as number);
}
async function isAdmin(chat_id: number) {
  const { data } = await db.from("notify_recipients").select("is_admin,status").eq("chat_id", chat_id).maybeSingle();
  return !!(data && data.is_admin && data.status === "active");
}
const shareKb = {
  reply_markup: {
    keyboard: [[{ text: "📱 شارك رقمي", request_contact: true }]],
    resize_keyboard: true, one_time_keyboard: true,
  },
};
const noKb = { reply_markup: { remove_keyboard: true } };

async function onMessage(m: any) {
  const chat_id = m.chat.id as number, from = m.from ?? {};
  if (m.chat.type !== "private") return;
  const text = String(m.text ?? "").trim();
  const name = [from.first_name, from.last_name].filter(Boolean).join(" ");

  if (m.contact) {
    if (m.contact.user_id !== from.id) return say(chat_id, "شارك رقمك أنت من الزر تحت 👇", shareKb);
    const phone = normPhone(m.contact.phone_number);
    const { data: allow } = await db.from("notify_allow_phones").select("is_admin").eq("phone", phone).maybeSingle();
    const { data: prev } = await db.from("notify_recipients").select("status").eq("chat_id", chat_id).maybeSingle();
    const row = { chat_id, name, username: from.username ?? null, phone, updated_at: new Date().toISOString() };
    if (allow) {
      await db.from("notify_recipients").upsert({ ...row, status: "active", is_admin: allow.is_admin });
      return say(chat_id, `✅ تم! من الحين توصلك تنبيهات موقع O2F هنا.${allow.is_admin ? "\n\nأنت مشرف: اكتب /list عشان تشوف المشتركين وتضيف أو تشيل أي أحد." : ""}`, noKb);
    }
    if (prev?.status === "active") return say(chat_id, "أنت مشترك أصلاً ✅", noKb);
    await db.from("notify_recipients").upsert({ ...row, status: "pending" });
    await say(chat_id, "وصل طلبك ⏳ أول ما المشرف يوافق بتوصلك التنبيهات.", noKb);
    for (const a of await admins()) {
      await say(a, `🙋 طلب اشتراك في التنبيهات:\n${who(row)}`, {
        reply_markup: { inline_keyboard: [[
          { text: "✅ موافقة", callback_data: `ok:${chat_id}` },
          { text: "❌ رفض", callback_data: `no:${chat_id}` },
        ]] },
      });
    }
    return;
  }

  if (text.startsWith("/start")) {
    const { data } = await db.from("notify_recipients").select("status").eq("chat_id", chat_id).maybeSingle();
    if (data?.status === "active") return say(chat_id, "أنت مشترك ✅ التنبيهات توصلك هنا.\nللإلغاء اكتب /stop");
    return say(chat_id, `أهلاً ${esc(from.first_name ?? "")} 👋\nهذا بوت تنبيهات موقع O2F.\nاضغط الزر تحت عشان تشارك رقمك ونفعّل لك التنبيهات.`, shareKb);
  }
  if (text.startsWith("/stop")) {
    await db.from("notify_recipients").update({ status: "removed", updated_at: new Date().toISOString() }).eq("chat_id", chat_id);
    return say(chat_id, "تم إيقاف التنبيهات 👍 ترجع أي وقت بـ /start", noKb);
  }
  if (text.startsWith("/list")) {
    if (!(await isAdmin(chat_id))) return say(chat_id, "هذا الأمر للمشرف بس.");
    return sendList(chat_id);
  }
  if (text.startsWith("/test")) {
    if (!(await isAdmin(chat_id))) return say(chat_id, "هذا الأمر للمشرف بس.");
    return say(chat_id, "🔔 <b>تجربة تنبيه</b>\nلو وصلتك هذي الرسالة، التنبيهات شغالة ✅");
  }
  return say(chat_id, "الأوامر:\n/start تفعيل التنبيهات\n/stop إيقافها\n/list المشتركين (للمشرف)\n/test تجربة (للمشرف)");
}

async function sendList(chat_id: number) {
  const { data } = await db.from("notify_recipients").select("*").in("status", ["active", "pending"]).order("created_at");
  const rows = data ?? [];
  if (!rows.length) return say(chat_id, "ما فيه مشتركين.");
  const lines = rows.map((r) => `${r.status === "active" ? "✅" : "⏳"} ${who(r)}${r.is_admin ? " ⭐ مشرف" : ""}`);
  const kb = rows.filter((r) => r.chat_id !== chat_id).map((r) => [
    r.status === "pending"
      ? { text: `✅ وافق: ${r.name || r.phone}`, callback_data: `ok:${r.chat_id}` }
      : { text: `🗑 شيل: ${r.name || r.phone}`, callback_data: `rm:${r.chat_id}` },
  ]);
  return say(chat_id, `👥 المشتركين في التنبيهات:\n${lines.join("\n")}\n\nلإضافة شخص جديد: يفتح t.me/o2flife_bot ويضغط Start ويشارك رقمه، ويوصلك طلبه هنا.`,
    kb.length ? { reply_markup: { inline_keyboard: kb } } : {});
}

async function onCallback(q: any) {
  const chat_id = q.from.id as number;
  const [act, idStr] = String(q.data ?? "").split(":");
  const target = Number(idStr);
  if (!(await isAdmin(chat_id)) || !target) return tg("answerCallbackQuery", { callback_query_id: q.id, text: "للمشرف بس" });
  const status = act === "ok" ? "active" : "removed";
  await db.from("notify_recipients").update({ status, updated_at: new Date().toISOString() }).eq("chat_id", target);
  const { data: r } = await db.from("notify_recipients").select("*").eq("chat_id", target).maybeSingle();
  if (act === "ok") await say(target, "✅ تمت الموافقة! من الحين توصلك تنبيهات موقع O2F هنا.");
  const msg = act === "ok" ? "تمت الموافقة ✅" : act === "no" ? "تم الرفض ❌" : "تم الحذف 🗑";
  await tg("answerCallbackQuery", { callback_query_id: q.id, text: msg });
  if (q.message) await tg("editMessageText", { chat_id, message_id: q.message.message_id, text: `${msg}: ${r ? who(r) : target}`, parse_mode: "HTML" });
}

Deno.serve(async (req) => {
  await secrets();
  if (!TOKEN) return new Response("bot token missing", { status: 500 });
  const url = new URL(req.url);
  if (req.method === "GET" && url.searchParams.get("setup") === "1") {
    const r = await tg("setWebhook", {
      url: SELF_URL, secret_token: HOOK_SECRET, allowed_updates: ["message", "callback_query"], drop_pending_updates: true,
    });
    await tg("setMyCommands", { commands: [
      { command: "start", description: "تفعيل التنبيهات" },
      { command: "stop", description: "إيقاف التنبيهات" },
      { command: "list", description: "المشتركين (للمشرف)" },
      { command: "test", description: "تجربة تنبيه (للمشرف)" },
    ] });
    return Response.json({ webhook: r.ok, description: r.description });
  }
  if (req.method !== "POST" || req.headers.get("x-telegram-bot-api-secret-token") !== HOOK_SECRET) {
    return new Response("forbidden", { status: 403 });
  }
  try {
    const u = await req.json();
    if (u.message) await onMessage(u.message);
    else if (u.callback_query) await onCallback(u.callback_query);
  } catch (e) {
    console.error(e);
  }
  return new Response("ok"); // always 200 so Telegram doesn't retry forever
});
