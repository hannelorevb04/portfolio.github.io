<?php
$title = "Who's watching? — Portfolio";
$extra_styles = ['assets/profiles.css'];   // << hier jouw pagina-CSS
include __DIR__ . '/partials/head.php';
?>


<video class="background-video" autoplay muted loop playsinline preload="metadata" poster="images/beach_poster.jpg">
    <source src="images/beach_1.mp4" type="video/mp4">
</video>

<main class="profile-selection">
    <h1>Who's watching?</h1>

    <div class="profiles-grid">
        <a href="/designer.php" class="profile">
            <div class="circle">
                <img src="images/logos_figma.png" alt="Designer logo">
            </div>
            <span>Designer</span>
        </a>

        <a href="/developer.php" class="profile">
            <div class="circle">
                <img src="images/devicon_vscode.png" alt="Developer logo">
            </div>
            <span>Developer</span>
        </a>

        <a href="/mixed-media.php" class="profile">
            <div class="circle">
                <img src="images/logos_creative_cloud.png" alt="Mixed-media logo">
            </div>
            <span>Mixed-media</span>
        </a>

        <a href="/about.php" class="profile">
            <div class="circle">
                <img src="images/Hannelore_1.png" alt="Profile photo">
            </div>
            <span>Profile</span>
        </a>
    </div>

</main>