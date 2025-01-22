function generateResume() {
    document.getElementById("previewName").innerText = document.getElementById("name").value;
    document.getElementById("previewEmail").innerText = document.getElementById("email").value;
    document.getElementById("previewPhone").innerText = document.getElementById("phone").value;
    document.getElementById("previewEducation").innerText = document.getElementById("education").value;
    document.getElementById("previewExperience").innerText = document.getElementById("experience").value;
    document.getElementById("previewSkills").innerText = document.getElementById("skills").value;
}

function downloadPDF() {
    const element = document.getElementById("resumePreview");
    html2pdf().from(element).save("resume.pdf");
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
