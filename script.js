function generateResume() {
    document.getElementById("previewName").innerText = document.getElementById("name").value;
    document.getElementById("previewEmail").innerText = document.getElementById("email").value;
    document.getElementById("previewPhone").innerText = document.getElementById("phone").value;
    document.getElementById("previewEducation").innerText = document.getElementById("education").value;
    document.getElementById("previewExperience").innerText = document.getElementById("experience").value;
    document.getElementById("previewSkills").innerText = document.getElementById("skills").value;
}

document.addEventListener("DOMContentLoaded", function() {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
    script.onload = () => console.log("html2pdf loaded");
    document.body.appendChild(script);
});

function downloadPDF() {
    generateResume(); // Ensure content is updated
    setTimeout(() => {
        const element = document.getElementById("resumePreview");
        html2pdf().from(element).save("resume.pdf");
    }, 500); // Delay to allow DOM update
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
