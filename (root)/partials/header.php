<?php
// PARTIAL: hero + videobanner + nav
// Verwacht optioneel $hero = ['title' => '', 'lead' => '', 'actions' => [['label'=>'','href'=>'','variant'=>'primary|secondary']]]
$hero = $hero ?? [
    'title'   => 'Portfolio',
    'lead'    => 'Showcasing design, development & mixed-media work.',
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary'],
        ['label' => 'Info',   'href' => '/about.php',                        'variant' => 'secondary'],
    ],
];
?>
<header class="video-header">
    <video class="background-video" autoplay muted loop playsinline preload="metadata" poster="/images/beach_poster.jpg">
        <source src="/images/beach_1.mp4" type="video/mp4">
    </video>

    <nav class="main-nav">
        <div class="nav-profile">
            <a href="/profiles.php" aria-label="Profiles">
                <img src="/images/devicon_vscode.png" alt="Profile icon" class="profile-image">
            </a>
        </div>
    </nav>

    <div class="hero-content">
        <h1 class="hero-title"><?= htmlspecialchars($hero['title']) ?></h1>
        <?php if (!empty($hero['lead'])): ?>
            <p class="hero-description"><?= htmlspecialchars($hero['lead']) ?></p>
        <?php endif; ?>
        <?php if (!empty($hero['actions'])): ?>
            <div class="hero-buttons">
                <?php foreach ($hero['actions'] as $a): ?>
                    <a class="btn btn-<?= ($a['variant'] ?? 'primary') ?>" href="<?= htmlspecialchars($a['href']) ?>">
                        <?= htmlspecialchars($a['label']) ?>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</header>