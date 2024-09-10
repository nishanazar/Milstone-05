var _a, _b;
(_a = document.getElementById("resumeForm")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var nameElement = document.getElementById("name");
    var emailElement = document.getElementById("email");
    var addressElement = document.getElementById("address");
    var phoneElement = document.getElementById("phone");
    var educationElement = document.getElementById("education");
    var workExperienceElement = document.getElementById("workExperience");
    var skillsElement = document.getElementById("skills");
    var profilePictureElement = document.getElementById("profilePicture");
    if (nameElement && emailElement && phoneElement && educationElement && workExperienceElement && skillsElement) {
        var name_1 = nameElement.value;
        var email = emailElement.value;
        var address = addressElement.value;
        var phone = phoneElement.value;
        var education = educationElement.value;
        var workExperience = workExperienceElement.value;
        var skills = skillsElement.value;
        var profilePicture = profilePictureElement.files ? URL.createObjectURL(profilePictureElement.files[0]) : '';
        // Create dynamic resume output
        var resumeOutput = "\n            <h2>".concat(name_1, "'s Resume</h2>\n            <img src=\"").concat(profilePicture, "\" alt=\"Profile Picture\" style=\"width: 150px; height: 150px;\" />\n            <p><strong>Email:</strong> ").concat(email, "</p>\n            <p><strong>Address:</strong> ").concat(address, "</p>\n            <p><strong>Phone:</strong> ").concat(phone, "</p>\n\n            <h3>Education</h3>\n            <p>").concat(education, "</p>\n\n            <h3>Work Experience</h3>\n            <p>").concat(workExperience, "</p>\n\n            <h3>Skills</h3>\n            <p>").concat(skills, "</p>\n        ");
        var resumeOutputElement = document.getElementById("resumeOutput");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
        }
        // Show download button
        (_a = document.getElementById("downloadResume")) === null || _a === void 0 ? void 0 : _a.classList.remove("hidden");
        // Make sections editable
        makeEditable();
    }
});
function makeEditable() {
    var editableElements = document.querySelectorAll('#resumeOutput p');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || '';
            var input = document.createElement("textarea");
            input.value = currentValue;
            input.classList.add("editing-input");
            input.addEventListener('blur', function () {
                currentElement.textContent = input.value;
                currentElement.style.display = 'inline';
                input.remove();
            });
            currentElement.style.display = 'none';
            (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input, currentElement);
            input.focus();
        });
    });
}
// Add functionality to download resume as PDF
(_b = document.getElementById("downloadResume")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var resumeOutputElement = document.getElementById("resumeOutput");
    if (resumeOutputElement) {
        var resumeContent = resumeOutputElement.innerHTML;
        var blob = new Blob([resumeContent], { type: 'text/html' });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "resume.html";
        link.click();
    }
});
