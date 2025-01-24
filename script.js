let selectedTemplate = "template1";

document.addEventListener("DOMContentLoaded", function() {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => console.log("html2pdf loaded");
    document.body.appendChild(script);

    generateResume(); // Show default template on load
});

document.querySelectorAll("input, textarea").forEach(input => {
    input.addEventListener("input", generateResume);
});

document.getElementById("generateResumeBtn").addEventListener("click", function() {
    generateResume();
});

document.querySelectorAll(".template-selector").forEach(button => {
    button.addEventListener("click", function() {
        selectedTemplate = this.getAttribute("data-template");
        document.querySelectorAll(".template-selector").forEach(btn => btn.classList.remove("active"));
        this.classList.add("active");
        generateResume();
    });
});

function generateResume() {
    if (!selectedTemplate) {
        console.error("No template selected");
        return;
    }
    const resumePreview = document.getElementById("resumePreview");
    if (!resumePreview) {
        console.error("Resume preview container not found");
        return;
    }
    resumePreview.innerHTML = getTemplateHTML(selectedTemplate);
    resumePreview.className = "resume-template " + selectedTemplate;
}

function getTemplateHTML(template) {
    const name = document.getElementById("name")?.value || "[Your Name]";
    const email = document.getElementById("email")?.value || "[Your Email]";
    const phone = document.getElementById("phone")?.value || "[Your Phone]";
    const education = document.getElementById("education")?.value || "[Your Education]";
    const experience = document.getElementById("experience")?.value || "[Your Experience]";
    const skills = document.getElementById("skills")?.value || "[Your Skills]";

    const templates = {
        "template1": `<div style='font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;'>
                        <h2>${name}</h2>
                        <p>Email: ${email}</p>
                        <p>Phone: ${phone}</p>
                        <h3>Education</h3>
                        <p>${education}</p>
                        <h3>Experience</h3>
                        <p>${experience}</p>
                        <h3>Skills</h3>
                        <p>${skills}</p>
                    </div>`,
        "template2": `<div style='font-family: Times New Roman, serif; background: #ffffff; border: 2px solid #000; padding: 20px;'>
                        <h1>${name}</h1>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <h2>Education</h2>
                        <p>${education}</p>
                        <h2>Experience</h2>
                        <p>${experience}</p>
                        <h2>Skills</h2>
                        <p>${skills}</p>
                    </div>`,
        "template3": `<div style='font-family: Verdana, sans-serif; background: #e3f2fd; padding: 20px; border-radius: 5px;'>
                        <h1 style='text-align: center; text-transform: uppercase;'>${name}</h1>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Phone:</strong> ${phone}</p>
                        <hr>
                        <h2>Education</h2>
                        <p>${education}</p>
                        <h2>Experience</h2>
                        <p>${experience}</p>
                        <h2>Skills</h2>
                        <p>${skills}</p>
                    </div>`
    };
    return templates[template] || "<p>Please select a template</p>";
}

function downloadPDF() {
    generateResume();
    setTimeout(() => {
        const element = document.getElementById("resumePreview");
        if (!element || element.innerHTML.trim() === "") {
            alert("Resume preview is empty. Please fill out the form first.");
            return;
        }
        const opt = {
            margin: 10,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    }, 500);
}

function downloadDOC() {
    const element = document.getElementById("resumePreview");
    const content = element.innerHTML;
    const blob = new Blob(['<html><body>' + content + '</body></html>'], { type: 'application/msword' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.doc";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
