console.log("skills js loaded")
const skillsArray = [
    "Frontend Development",
    "Backend Development",
    "Full Stack Web Development",
    "MERN Stack Development"
];

const skillIndex = { index: 0 };

function typeAndErase(element, text, typingSpeed, erasingSpeed) {
    return new Promise((resolve) => {
        let index = 0;
        let isErasing = false;

        function type() {
            if (isErasing) {
                element.textContent = text.slice(0, index);
                index--;
            } else {
                element.textContent = text.slice(0, index);
                index++;
            }

            if (!isErasing && index <= text.length) {
                setTimeout(type, typingSpeed);
            } else if (!isErasing) {
                setTimeout(() => {
                    isErasing = true;
                    setTimeout(type, erasingSpeed); // Delay before erasing
                }, 1000); // Delay before starting to erase
            } else if (isErasing && index >= 0) {
                setTimeout(type, erasingSpeed);
            } else {
                isErasing = false;
                element.textContent = ''; // Clear the element's text
                resolve(); // Resolve the promise to continue with the next skill
            }
        }

        type();
    });
}

async function typeNextSkill() {
    if (skillIndex.index < skillsArray.length) {
        const skill = skillsArray[skillIndex.index];
        const typingSpeed = 100; // Typing speed in milliseconds
        const erasingSpeed = 0.5 * typingSpeed; // Erasing speed is double the typing speed
        const skillElement = document.querySelector('.skill');
        skillElement.textContent = ''; // Clear the original text

        // First, type the skill
        await typeAndErase(skillElement, skill, typingSpeed, erasingSpeed);

        skillIndex.index++;
        if (skillIndex.index >= skillsArray.length) {
            skillIndex.index = 0; // Reset the index to loop through skills
        }
        typeNextSkill(); // Type the next skill
    }
}

typeNextSkill(); // Start typing the skills sequentially



