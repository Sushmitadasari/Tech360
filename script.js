document.addEventListener('DOMContentLoaded', () => {

    // ======================= NEW SLIDE MENU LOGIC =======================
    // These functions are called by the 'onclick' attributes in the HTML
    window.openn = function() {
        document.querySelector(".slide-menu").style.left = "0px";
        document.querySelector(".overlay").style.display = "block";
        document.body.style.overflow = "hidden";
    }

    window.cloose = function() {
        document.querySelector(".slide-menu").style.left = "-250px";
        document.querySelector(".overlay").style.display = "none";
        document.body.style.overflow = "auto";
    }

    // ======================= NEW FOOTER FORM LOGIC =======================
    const form = document.getElementById("subscribeForm");
    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const email = document.getElementById("emailInput").value.trim();
            if (email === "") {
                alert("Please enter a valid email.");
                return;
            }
            
            fetch(form.action, {
                method: "POST",
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    alert("Thank you for subscribing!🎉 We will keep you updated with our latest news.");
                    document.getElementById("emailInput").value = "";
                } else {
                    alert("Sorry, there was an error submitting the form. Please try again.");
                }
            })
            .catch(error => {
                console.error("Form submission error:", error);
                alert("Sorry, there was a network error. Please try again.");
            });
        });
    }


    // ======================= ORIGINAL RESUME MODAL LOGIC (Kept) =======================
    const resumeCards = document.querySelectorAll('.resume-card');
    const modal = document.getElementById('resume-modal');
    const modalCloseBtn = document.getElementById('modal-close-btn');
    
    if (modal) {
        const modalImg = document.getElementById('modal-img');
        const modalName = document.getElementById('modal-name');
        const modalStatusBadge = document.getElementById('modal-status-badge');
        const modalStory = document.getElementById('modal-story');
        const modalAtsScore = document.getElementById('modal-ats-score');
        const modalAtsFill = document.getElementById('modal-ats-fill');

        resumeCards.forEach(card => {
            card.addEventListener('click', () => {
                const data = card.dataset;
                
                modalImg.src = data.imgSrc;
                modalImg.alt = `Resume preview for ${data.name}`;
                modalName.textContent = data.name;
                modalStory.textContent = data.story;
                
                // Update status badge
                modalStatusBadge.textContent = data.status === 'Undergraduate' ? data.status : `Placed at ${data.company}`;
                modalStatusBadge.className = `placement-badge ${data.status.toLowerCase()}`;
                
                // Update ATS score
                modalAtsScore.textContent = `${data.ats}%`;
                modalAtsFill.style.width = `${data.ats}%`;

                modal.classList.add('is-open');
                document.body.classList.add('modal-open');
            });
        });

        const closeModal = () => {
            modal.classList.remove('is-open');
            document.body.classList.remove('modal-open');
        };

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && modal.classList.contains('is-open')) {
                closeModal();
            }
        });
    }
});