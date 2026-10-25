export function GET() {
  return Response.json({ status: "ok", service: "jamia-madnia-arabia" }, { headers: { "Cache-Control": "no-store" } });
}
