// Load environment variables
const { SMTP_EMAIL, SMTP_PASS, SHEET_SCRIPT_URL } = ENV;

// Helper to collect values from multiple inputs
const getVals = (name) => Array.from(document.getElementsByName(name)).map(i => i.value).filter(v => v);

// ---- Resume Builder ----
document.getElementById("resumeForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const address = document.getElementById("address").value;
  const phones = getVals("phone[]");
  const email = document.getElementById("email").value;
  const urls = getVals("url[]");
  const objective = document.getElementById("objective").value;
  const degrees = getVals("degree[]");
  const institutions = getVals("institution[]");
  const durations = getVals("duration[]");
  const cgpas = getVals("cgpa[]");
  const jobTitles = getVals("jobTitle[]");
  const companies = getVals("company[]");
  const expDurations = getVals("expDuration[]");
  const responsibilities = getVals("responsibilities[]");
  const projectNames = getVals("projectName[]");
  const techUsed = getVals("techUsed[]");
  const projectDesc = getVals("projectDesc[]");
  const projectLinks = getVals("projectLinks[]");
  const programmingLanguages = document.getElementsByName("programmingLanguages")[0].value;
  const toolsFrameworks = document.getElementsByName("toolsFrameworks")[0].value;
  const otherSkills = document.getElementsByName("otherSkills")[0].value;
  const certNames = getVals("certName[]");
  const certAuthorities = getVals("certAuthority[]");
  const certYears = getVals("certYear[]");
  const achievements = getVals("achievement[]");
  const hobbies = getVals("hobby[]");
  const languages = getVals("language[]");
  const proficiencies = getVals("proficiency[]");

  // Save to Google Sheet
  fetch(SHEET_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sheet: "ResumeBuilder",
      timestamp: new Date().toISOString(),
      fullName,
      address,
      phones: phones.join("; "),
      email,
      urls: urls.join("; "),
      objective,
      degrees: degrees.join("; "),
      institutions: institutions.join("; "),
      durations: durations.join("; "),
      cgpas: cgpas.join("; "),
      jobTitles: jobTitles.join("; "),
      companies: companies.join("; "),
      expDurations: expDurations.join("; "),
      responsibilities: responsibilities.join("; "),
      projectNames: projectNames.join("; "),
      techUsed: techUsed.join("; "),
      projectDesc: projectDesc.join("; "),
      projectLinks: projectLinks.join("; "),
      programmingLanguages,
      toolsFrameworks,
      otherSkills,
      certNames: certNames.join("; "),
      certAuthorities: certAuthorities.join("; "),
      certYears: certYears.join("; "),
      achievements: achievements.join("; "),
      hobbies: hobbies.join("; "),
      languages: languages.join("; "),
      proficiencies: proficiencies.join("; "),
    })
  })
    .then(res => res.ok ? console.log("✅ Sheet updated") : console.error("❌ Sheet update failed"))
    .catch(err => console.error("❌ Sheet error:", err));

  // Send Email
  if (email) {
    Email.send({
      Host: "smtp.gmail.com",
      Username: SMTP_EMAIL,
      Password: SMTP_PASS,
      To: email,
      From: SMTP_EMAIL,
      Subject: "Your Resume from Smart Fresher Hub",
      Body: `
        Hi ${fullName},<br>
        Thank you for using Smart Fresher Hub.<br>
        Your resume has been generated successfully.<br><br>
        <b>Career Objective:</b><br>${objective}<br><br>
        <b>Education:</b><br>${degrees.join("<br>")}<br><br>
        <b>Skills:</b><br>${programmingLanguages}, ${toolsFrameworks}, ${otherSkills}<br><br>
        Best regards,<br>
        Smart Fresher Hub
      `
    })
      .then(() => alert("✅ Resume sent to your email!"))
      .catch(() => alert("⚠️ Failed to send email. Please check SMTP settings."));
  }
});
