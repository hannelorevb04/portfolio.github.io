<header class="video-header">
    <video class="background-video" autoplay muted loop playsinline preload="metadata" poster="/images/beach_poster.jpg">
        <source src="/images/beach_1080.mp4" type="video/mp4" media="(min-width: 1024px)">
        <source src="/images/beach_720.mp4" type="video/mp4">
    </video>

    <nav class="main-nav">
        <div class="nav-profile">
            <a href="/profiles.php">
                <img class="profile-image" src="/images/logos_figma.png" alt="Profile">
            </a>
        </div>
    </nav>

    <?php if (!empty($hero)): ?>
        <div class="hero-content">
            <h1 class="hero-title"><?= htmlspecialchars($hero['title'] ?? '') ?></h1>
            <?php if (!empty($hero['lead'])): ?>
                <p class="hero-description"><?= htmlspecialchars($hero['lead']) ?></p>
            <?php endif; ?>
            <?php if (!empty($hero['actions'])): ?>
                <div class="hero-buttons">
                    <?php foreach ($hero['actions'] as $a): ?>
                        <a class="btn btn-<?= htmlspecialchars($a['variant'] ?? 'primary') ?>" href="<?= htmlspecialchars($a['href']) ?>" target="_blank" rel="noopener">
                            <?= htmlspecialchars($a['label']) ?>
                        </a>
                    <?php endforeach; ?>
                </div>
            <?php endif; ?>
        </div>
    <?php endif; ?>
</header>