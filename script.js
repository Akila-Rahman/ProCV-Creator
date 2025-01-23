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
    generateResume(); // Ensure latest content is updated
    
    setTimeout(() => {
        const element = document.getElementById("resumePreview");
        console.log(element.innerHTML); // Debugging output
        
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
    }, 500); // Short delay to ensure content updates
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
