<?php
$title = "Portfolio - Who's Watching?";
$extraCss = ["/assets/profiles.css"];
include __DIR__ . "/partials/head.php";
?>

<script>
    // selectProfile -> link naar .php (niet naar *_component.html)
    function selectProfile(type) {
        if (type === "designer") location.href = "/designer.php";
        else if (type === "developer") location.href = "/developer.php";
        else if (type === "mixed-media") location.href = "/mixed-media.php";
        else if (type === "profile") location.href = "/about.php";
    }
</script>

<div class="profiles-page">
    <video class="background-video" autoplay muted loop playsinline preload="metadata" poster="/images/beach_poster.jpg">
        <source src="/images/beach_1080.mp4" type="video/mp4" media="(min-width: 1024px)">
        <source src="/images/beach_720.mp4" type="video/mp4">
    </video>

    <h1 class="profiles-title">Who's watching?</h1>

    <div class="profiles-container">
        <button class="profile-card designer" type="button" onclick="selectProfile('designer')">
            <span class="profile-circle"><img src="/images/logos_figma.png" alt="Figma" class="profile-icon"></span>
            <span class="profile-label">Designer</span>
        </button>

        <button class="profile-card developer" type="button" onclick="selectProfile('developer')">
            <span class="profile-circle"><img src="/images/devicon_vscode.png" alt="VS Code" class="profile-icon"></span>
            <span class="profile-label">Developer</span>
        </button>

        <button class="profile-card mixed" type="button" onclick="selectProfile('mixed-media')">
            <span class="profile-circle"><img src="/images/logos_creative_cloud.png" alt="Adobe CC" class="profile-icon"></span>
            <span class="profile-label">Mixed-media</span>
        </button>

        <button class="profile-card mixed" type="button" onclick="selectProfile('profile')">
            <span class="profile-circle"><img src="/images/Hannelore_1.png" alt="Profile" class="profile-icon"></span>
            <span class="profile-label">Profile</span>
        </button>
    </div>
</div>

<?php include __DIR__ . "/partials/footer.php"; ?>