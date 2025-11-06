<?php
$title = "Designer — Portfolio";
$hero  = [
    'title' => 'Designer',
    'lead' => 'Exploring the balance between function and identity…',
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
        <h2 class="section-title">UX/UI</h2>
        <div class="projects">
            <!-- Voorbeeld project-card -->
            <div
                class="project-card"
                id="felicksCard"
                data-title="Felicks"
                data-meta="App • UX/UI"
                data-desc="Awareness-first dog adoption app…"
                data-tags="Figma"
                data-discipline="UX/UI"
                data-tools="Figma"
                data-slides='["image:/Felicks/cover.png"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Felicks/cover.png" alt="Felicks cover" loading="eager" decoding="async">
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Felicks</div>
                    </div>
                </div>
            </div>
            <!-- /project-card -->
        </div>
    </section>
</main>
<?php include __DIR__ . '/partials/modal.php'; ?>
<?php include __DIR__ . '/partials/footer.php'; ?>