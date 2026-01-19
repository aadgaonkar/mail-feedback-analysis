type EmailAddress = { email: string; name?: string };

export async function sendEmailViaMailChannels(
  apiKey: string,
  opts: {
    from: EmailAddress;
    to: EmailAddress[];
    subject: string;
    text: string;
    html?: string;
  }
): Promise<{ ok: boolean; status: number; body: string }> {
  if (!apiKey) {
    console.error("MAILCHANNELS_API_KEY missing");
    return { ok: false, status: 0, body: "Missing API key" };
  }

  const res = await fetch("https://api.mailchannels.net/tx/v1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": apiKey, // ✅ THIS WAS MISSING
    },
    body: JSON.stringify({
      personalizations: [{ to: opts.to }],
      from: opts.from,
      subject: opts.subject,
      content: [
        { type: "text/plain", value: opts.text },
        ...(opts.html ? [{ type: "text/html", value: opts.html }] : []),
      ],
    }),
  });

  const body = await res.text().catch(() => "");
  console.log("MailChannels response:", { status: res.status, body });

  return { ok: res.ok, status: res.status, body };
}
