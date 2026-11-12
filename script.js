
document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    menuToggle.addEventListener("click", function () {
        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.innerHTML = isOpen
            ? '<i class="fas fa-times"></i>'
            : '<i class="fas fa-bars"></i>';
    });

    // CLOSE MENU AFTER CLICKING A LINK
    document.querySelectorAll(".nav-links a").forEach(function (link) {
        link.addEventListener("click", function () {
            navLinks.classList.remove("show");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // COURSE DETAILS
    const courseData = {

        coaching: {
            title: "Academic Coaching | Grade 9 to 12",
            description:
                "Smart Future Public School offers academic coaching for students from Grade 9 to Grade 12. Students can receive academic guidance, subject support, revision assistance and learning support. Contact our school to learn about available subjects, class timings and admission details."
        },

        language: {
            title: "Language Classes",
            description:
                "Our language program focuses on English language learning, grammar, vocabulary, speaking practice and communication development. Students can improve their confidence and language abilities through guided lessons. Online and physical learning options are available."
        },

        writing: {
            title: "Writing Classes",
            description:
                "Our writing classes help students improve basic writing, sentence formation, English writing, grammar and creative writing. Sir Akeel and Miss Nargis guide students through writing lessons and practice activities."
        },

        cit: {
            title: "CIT Computer Course",
            description:
                "Our CIT computer program introduces students to computer fundamentals, MS Office, internet knowledge and practical digital skills. Miss Shahbazi is the computer instructor. Contact us for course duration, timings and available online or physical classes."
        }

    };

    const modal = document.getElementById("courseModal");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalClose = document.getElementById("modalClose");
    const modalEnroll = document.getElementById("modalEnroll");

    // OPEN COURSE MODAL
    document.querySelectorAll(".details-btn").forEach(function (button) {

        button.addEventListener("click", function () {

            const course = button.dataset.course;
            const details = courseData[course];

            if (!details) return;

            modalTitle.textContent = details.title;
            modalDescription.textContent = details.description;

            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
            modalClose.focus();
        });

    });

    // CLOSE MODAL
    function closeModal() {
        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
    }

    modalClose.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // CLOSE MODAL WITH ESCAPE
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && modal.classList.contains("show")) {
            closeModal();
        }
    });

    // GO TO REGISTRATION FROM COURSE POPUP
    modalEnroll.addEventListener("click", function () {
        closeModal();
    });

    // REGISTRATION FORM
    const admissionForm = document.getElementById("admissionForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = admissionForm.querySelector(".submit-btn");

    admissionForm.addEventListener("submit", function (event) {

        // HTML built-in validation runs before this event.
        if (!admissionForm.checkValidity()) {
            event.preventDefault();
            admissionForm.reportValidity();
            return;
        }

        formMessage.textContent = "Your form is being submitted. Please wait...";
        formMessage.style.color = "#17834a";

        submitButton.disabled = true;
        submitButton.innerHTML =
            'Submitting... <i class="fas fa-spinner fa-spin"></i>';

        // The browser now sends the form to the configured FormSubmit endpoint.
    });

    // BACK TO TOP BUTTON
    const backToTop = document.getElementById("backToTop");

    window.addEventListener("scroll", function () {

        if (window.scrollY > 400) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }

    });

    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // AUTOMATIC COPYRIGHT YEAR
    document.getElementById("year").textContent =
        new Date().getFullYear();

    // ACTIVE NAVIGATION LINK
    const sections = document.querySelectorAll("main section[id]");
    const navItems = document.querySelectorAll(".nav-links a[href^='#']");

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                navItems.forEach(function (link) {
                    link.classList.remove("active");

                    if (link.getAttribute("href") === "#" + entry.target.id) {
                        link.classList.add("active");
                    }
                });

            }

        });

    }, {
        rootMargin: "-25% 0px -65% 0px"
    });

    sections.forEach(function (section) {
        observer.observe(section);
    });

});
