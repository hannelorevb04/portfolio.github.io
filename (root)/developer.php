<?php
$title = "Developer — Portfolio";
$hero  = [
    'title' => 'Developer',
    'lead' => 'Building interactive experiences on the web…',
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary'],
        ['label' => 'Info', 'href' => '/about.php', 'variant' => 'secondary'],
    ],
];
include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>
<main class="container designer-page">
    <section class="projects-section">
        <h2 class="section-title">Web Interface</h2>
        <div class="projects">
            <div
                class="project-card"
                id="hockeyCard"
                data-title="Hockey Shop"
                data-meta="Website • Craft CMS / Twig / PHP / CSS"
                data-desc="E-commerce UI fragments…"
                data-tags="Craft CMS, Twig, PHP, CSS"
                data-discipline="CMS / Templating"
                data-tools="Craft CMS, Twig, PHP, CSS"
                data-slides='["iframe:/Hockey_shop/iframe_sticks.html"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Hockey_shop/cover.png" alt="Hockey shop cover" loading="eager" decoding="async">
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Hockey Shop</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<?php include __DIR__ . '/partials/modal.php'; ?>
<?php include __DIR__ . '/partials/footer.php'; ?>