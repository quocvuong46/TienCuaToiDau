
const apiKey = process.env.OPENCODE_API_KEY;
if (!apiKey) {
  console.error("Missing OPENCODE_API_KEY in environment variables.");
  process.exit(1);
}

async function main() {
  console.log("Fetching models from OpenCode AI...");
  const response = await fetch("https://opencode.ai/zen/v1/models", {
    headers: {
      "Authorization": `Bearer ${apiKey}`
    }
  });

  if (!response.ok) {
    console.error("Failed to fetch models:", response.status, await response.text());
    return;
  }

  const data = await response.json();
  console.log("Available models:");
  console.log(JSON.stringify(data, null, 2));
}

main().catch(console.error);
