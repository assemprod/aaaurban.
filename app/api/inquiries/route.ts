/** Compatibility endpoint for older versions. This version stores no inquiry data. */
export async function POST() {
  return Response.json(
    { error: "This endpoint is no longer used. Please reload the website and send your inquiry through WhatsApp." },
    { status: 410, headers: { "Cache-Control": "no-store" } },
  );
}
