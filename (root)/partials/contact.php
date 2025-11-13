<footer class="site-footer">
    <div class="footer-inner">
        <nav class="footer-links">
            <a href="about.php">About</a>
            <a href="profiles.php">Profiles</a>
            <a href="https://www.linkedin.com/in/hannelore-van-buynderen-056783225/"
                target="_blank" rel="noopener">LinkedIn</a>
        </nav>

        <div class="footer-contact">
            <h3>Contact me</h3>

            <!-- Formspree versie -->
            <form
                id="footerContactForm"
                class="contact-form"
                action="https://formspree.io/f/movpggjw"
                method="POST">

                <input type="text" name="name" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Your email" required />
                <textarea name="message" rows="4" placeholder="Your message" required></textarea>

                <!-- anti-spam -->
                <input type="text" name="_gotcha" style="display:none">

                <!-- redirect na succes -->
                <input type="hidden" name="_next" value="/thanks.php">

                <button type="submit" class="btn btn-primary">
                    <span>
                        <svg
                            width="1.1em"
                            height="1.1em"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="white"
                            stroke-width="2.4"
                            stroke-linecap="round"
                            stroke-linejoin="round">
                            <path d="M22 2 11 13"></path>
                            <path d="M22 2 15 22 11 13 2 9 22 2z"></path>
                        </svg>
                    </span>
                    Send
                </button>

            </form>


        </div>

        <p class="footer-name">© 2025 Hannelore Van Buynderen</p>
    </div>


</footer>

<!-- Popup -->
<div id="popup" class="popup-overlay" role="dialog" aria-modal="true">
    <div class="popup-card">
        <div class="popup-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="32" height="32">
                <circle cx="12" cy="12" r="11" fill="#e8f3ff"></circle>
                <path d="M7 12.5l3.2 3.2L17.5 8.5" fill="none" stroke="#1e3b54"
                    stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </div>
        <h3 id="popupTitle">Message sent!</h3>
        <p id="popupDesc">Thank you for contacting me. I’ll get back to you soon.</p>
        <button id="closePopup" class="btn btn-primary" type="button">Close</button>
    </div>
</div>




<script>
    document.addEventListener("DOMContentLoaded", function() {
        const form = document.getElementById("footerContactForm");
        const popup = document.getElementById("popup");
        const close = document.getElementById("closePopup");
        if (!form) return;

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const res = await fetch(form.action, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                },
                body: new FormData(form),
            });
            if (res.ok) {
                form.reset();
                if (popup) popup.style.display = "flex";
            } else {
                alert("Sending failed. Please try again.");
            }
        });

        if (close) close.addEventListener("click", () => (popup.style.display = "none"));
    });
</script>