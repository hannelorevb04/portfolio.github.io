<?php
$title = "Message sent — Portfolio";
include __DIR__ . '/partials/head.php';
?>
<main style="
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  height:100vh;
  text-align:center;
  font-family:'Montserrat', sans-serif;
  background:#f7fbfe;
  color:#18304b;
">
    <h1 style="font-size:2.5rem; margin-bottom:1rem;">Message sent ✅</h1>
    <p style="font-size:1.2rem; margin-bottom:2rem;">Thank you for contacting me. I’ll get back to you soon.</p>
    <a href="/profiles.php" style="
    text-decoration:none;
    background:#224b67;
    color:#fff;
    padding:0.8rem 2rem;
    border-radius:50px;
    font-weight:600;
    box-shadow:0 4px 12px rgba(0,0,0,0.15);
    transition:transform 0.2s ease;
  ">Back to profiles</a>
</main>
<?php include __DIR__ . '/partials/footer.php'; ?>