<?php
$title = "Mixed-media — Portfolio";
$hero  = [
    'title' => 'Mixed-media',
    'lead' => 'A space for creative experimentation…',
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary'],
        ['label' => 'Info', 'href' => '/about.php', 'variant' => 'secondary'],
    ],
];
include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>
<main class="container">
    <section class="projects-section">
        <h2 class="section-title">Photoshop</h2>
        <div class="projects">
            <div
                class="project-card"
                id="colorSeries"
                data-title="Selective color series"
                data-meta="Photo edit — color pop technique"
                data-desc="Isolating the subject in color…"
                data-tags="Photo editing"
                data-discipline="Photo Editing"
                data-tools="Adobe Photoshop"
                data-slides='["image:/Woordlogo/cover.jpg"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Woordlogo/cover.jpg" alt="Selective color cover" loading="eager" decoding="async">
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Selective color series</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>
<?php include __DIR__ . '/partials/modal.php'; ?>
<?php include __DIR__ . '/partials/footer.php'; ?>