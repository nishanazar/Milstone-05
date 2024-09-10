document.getElementById("resumeForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const addressElement = document.getElementById("address") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById("education") as HTMLInputElement;
    const workExperienceElement = document.getElementById("workExperience") as HTMLInputElement;
    const skillsElement = document.getElementById("skills") as HTMLInputElement;
    const profilePictureElement = document.getElementById("profilePicture") as HTMLInputElement;

    if (nameElement && emailElement && phoneElement && educationElement && workExperienceElement && skillsElement) {
        const name = nameElement.value;
        const email = emailElement.value;
        const address = addressElement.value;
        const phone = phoneElement.value;
        const education = educationElement.value;
        const workExperience = workExperienceElement.value;
        const skills = skillsElement.value;
        const profilePicture = profilePictureElement.files ? URL.createObjectURL(profilePictureElement.files[0]) : '';

        // Create dynamic resume output
        const resumeOutput = `
            <h2>${name}'s Resume</h2>
            <img src="${profilePicture}" alt="Profile Picture" style="width: 150px; height: 150px;" />
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Address:</strong> ${address}</p>
            <p><strong>Phone:</strong> ${phone}</p>

            <h3>Education</h3>
            <p>${education}</p>

            <h3>Work Experience</h3>
            <p>${workExperience}</p>

            <h3>Skills</h3>
            <p>${skills}</p>
        `;

        const resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }

        // Show download button
        document.getElementById("downloadResume")?.classList.remove("hidden");

        // Make sections editable
        makeEditable();
    }
});

function makeEditable() {
    const editableElements = document.querySelectorAll('#resumeOutput p');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || '';

            const input = document.createElement("textarea");
            input.value = currentValue;
            input.classList.add("editing-input");

            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });

            currentElement.style.display = 'none';
            currentElement.parentNode?.insertBefore(input, currentElement);
            input.focus();
        });
    });
}

// Add functionality to download resume as PDF
document.getElementById("downloadResume")?.addEventListener("click", function () {
    const resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        const resumeContent = resumeOutputElement.innerHTML;
        const blob = new Blob([resumeContent], { type: 'text/html' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resume.html";
        link.click();
    }
});
