document.getElementById("coverLetterForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    phone: form.phone.value.trim(),
    jobTitle: form.jobTitle.value.trim(),
    company: form.company.value.trim(),
    jobSource: form.jobSource.value.trim(),
    tools: form.tools.value.trim(),
    skills: form.skills.value.trim(),
    manager: form.manager.value.trim(),
    project: form.project.value.trim(),
    availability: form.availability.value.trim(),
    message: form.message.value.trim(),
  };

  // Save to Google Sheet
  saveToGoogleSheet(data);  // from google-sheet.js

  // Generate the cover letter
  const greeting = data.manager ? `Dear ${data.manager},` : `Dear Hiring Team at ${data.company},`;

  const intro = `I'm excited to apply for the position of ${data.jobTitle} at ${data.company}, which I found via ${data.jobSource}. I am genuinely interested in this opportunity and believe I would be a strong fit for your team.`;

  const body = `With a solid background in ${data.skills}, I have developed experience working on ${data.project || "various projects"} using tools such as ${data.tools}. I am confident my skills align well with the requirements of the ${data.jobTitle} role.`;

  const close = `I would love the opportunity to contribute to ${data.company}'s continued success. ${data.availability ? `I am available ${data.availability}. ` : ""}${data.message ? data.message + " " : ""}Thank you for considering my application. I look forward to the possibility of discussing this role further.`;

  const coverLetter = `
${greeting}

${intro}

${body}

${close}

Best regards,  
${data.name}  
Email: ${data.email}  
Phone: ${data.phone}
  `;

  // Show the result
  document.getElementById("coverLetterOutput").innerText = coverLetter;
  document.getElementById("resultBox").style.display = "block";

  // Enable and attach download button
  document.getElementById("downloadPDF").addEventListener("click", function () {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const coverText = document.getElementById("coverLetterOutput").innerText;
  const lines = doc.splitTextToSize(coverText, 180); // auto wrap
  doc.text(lines, 10, 20);
  doc.save("Cover_Letter.pdf");
  }, { once: true });


});
