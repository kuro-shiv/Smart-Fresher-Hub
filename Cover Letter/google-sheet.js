// ✅ Replace this with your actual Web App URL
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbz4hv_LdYB9uBw-ogFF8Gc8spYQLqSbxD_2R3dlHr-8DZAopeiSNxUus3_kLOboKCLi/exec";

async function saveToGoogleSheet(data) {
  try {
    await fetch(SHEET_API_URL, {
      method: "POST",
      mode: "no-cors",  // Prevent CORS error
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    console.log("✅ Data saved to Google Sheet");
  } catch (error) {
    console.error("❌ Failed to save data:", error);
    alert("Something went wrong while saving your details.");
  }
}
