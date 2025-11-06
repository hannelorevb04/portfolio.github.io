<?php
// PARTIAL: hero + videobanner + nav
// Verwacht optioneel $hero = [
//   'title' => '', 'lead' => '',
//   'actions' => [['label'=>'','href'=>'','variant'=>'primary|secondary','icon'=>'play|info']],
//   'video' => [
//       ['src'=>'/images/beach_1080.mp4','type'=>'video/mp4','media'=>'(min-width:1024px)'],
//       ['src'=>'/images/beach_720.mp4','type'=>'video/mp4'],
//       'poster' => '/images/beach_poster.jpg'
//   ],
//   'avatar' => '/images/devicon_vscode.png',
//   'profiles_link' => '/profiles.php'
// ];

$hero = $hero ?? [
    'title'   => 'Portfolio',
    'lead'    => 'Showcasing design, development & mixed-media work.',
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary',   'icon' => 'play'],
        ['label' => 'Info',   'href' => '/about.php',                      'variant' => 'secondary', 'icon' => 'info'],
    ],
    'video' => [
        ['src' => '/images/beach_1.mp4', 'type' => 'video/mp4'],
        'poster' => '/images/beach_poster.jpg'
    ],
    'avatar' => '/images/devicon_vscode.png',
    'profiles_link' => '/profiles.php',
];

$titleText = htmlspecialchars($hero['title'] ?? 'Portfolio', ENT_QUOTES, 'UTF-8');
$leadText  = trim((string)($hero['lead'] ?? ''));
$actions   = is_array($hero['actions'] ?? null) ? $hero['actions'] : [];
$videoConf = $hero['video'] ?? null;
$avatar    = htmlspecialchars($hero['avatar'] ?? '/images/devicon_vscode.png', ENT_QUOTES, 'UTF-8');
$profiles  = htmlspecialchars($hero['profiles_link'] ?? '/profiles.php', ENT_QUOTES, 'UTF-8');

// Kleine helpers
$esc = fn($v) => htmlspecialchars((string)$v, ENT_QUOTES, 'UTF-8');
$iconSvg = function (string $name): string {
    if ($name === 'play') {
        return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><polygon points="6,4 20,12 6,20" fill="currentColor"/></svg>';
    }
    if ($name === 'info') {
        // strakke, subtiele “i”
        return '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" fill="none"/>
            <rect x="11" y="11" width="2" height="7" rx="0.6" fill="currentColor"/>
            <circle cx="12" cy="7.3" r="1.5" fill="currentColor"/>
        </svg>';
    }
    return '';
};
?>
<header class="video-header">
    <video class="background-video" autoplay muted loop playsinline preload="metadata"
        <?php if (is_array($videoConf) && isset($videoConf['poster'])): ?>
        poster="<?= $esc($videoConf['poster']) ?>"
        <?php else: ?>
        poster="/images/beach_poster.jpg"
        <?php endif; ?>>
        <?php if (is_array($videoConf)): ?>
            <?php foreach ($videoConf as $src): ?>
                <?php if (is_array($src) && isset($src['src'])): ?>
                    <source
                        src="<?= $esc($src['src']) ?>"
                        type="<?= $esc($src['type'] ?? 'video/mp4') ?>"
                        <?= isset($src['media']) ? 'media="' . $esc($src['media']) . '"' : '' ?>>
                <?php endif; ?>
            <?php endforeach; ?>
        <?php else: ?>
            <source src="/images/beach_1.mp4" type="video/mp4">
        <?php endif; ?>
    </video>

    <nav class="main-nav">
        <div class="nav-profile">
            <a href="<?= $profiles ?>" aria-label="Profiles">
                <img src="<?= $avatar ?>" alt="Profile icon" class="profile-image">
            </a>
        </div>
    </nav>

    <div class="hero-content">
        <h1 class="hero-title"><?= $titleText ?></h1>

        <?php if ($leadText !== ''): ?>
            <p class="hero-description"><?= $esc($leadText) ?></p>
        <?php endif; ?>

        <?php if ($actions): ?>
            <div class="hero-buttons">
                <?php foreach ($actions as $a): ?>
                    <?php
                    $label   = $esc($a['label'] ?? '');
                    $href    = $esc($a['href']  ?? '#');
                    $variant = $esc($a['variant'] ?? 'primary');
                    $icon    = (string)($a['icon'] ?? (($label === 'Resume') ? 'play' : (($label === 'Info') ? 'info' : '')));
                    $target  = ($label === 'Resume') ? '_blank' : '_self';
                    ?>
                    <a class="btn btn-<?= $variant ?>" href="<?= $href ?>" target="<?= $target ?>">
                        <?php if ($icon): ?>
                            <span class="btn-icon" aria-hidden="true"><?= $iconSvg($icon) ?></span>
                        <?php endif; ?>
                        <span><?= $label ?></span>
                    </a>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </div>
</header>