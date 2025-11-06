<?php
$title = "Welcome — Portfolio";
$hero  = [
    'title' => 'Start',
    'lead'  => 'Kies je focus: design, development of mixed-media.',
    'actions' => [
        ['label' => 'Designer', 'href' => '/designer.php', 'variant' => 'primary'],
        ['label' => 'Developer', 'href' => '/developer.php', 'variant' => 'secondary'],
    ],
];
include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>
<main class="container">
    <section class="tiles">
        <a class="tile" href="/designer.php">Designer</a>
        <a class="tile" href="/developer.php">Developer</a>
        <a class="tile" href="/mixed-media.php">Mixed-media</a>
    </section>
</main>
<?php include __DIR__ . '/partials/modal.php'; ?>
<?php include __DIR__ . '/partials/footer.php'; ?>