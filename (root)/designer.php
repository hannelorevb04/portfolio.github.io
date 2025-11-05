<?php
$title = "Designer — Portfolio";
$hero = [
    'title' => 'Designer',
    'lead'  => 'Exploring the balance between function and identity…',
    'actions' => [
        ['label' => 'Resume', 'href' => '/resume.pdf', 'variant' => 'secondary'],
        ['label' => 'LinkedIn', 'href' => 'https://www.linkedin.com/in/…', 'variant' => 'primary'],
    ]
];
include __DIR__ . "/partials/head.php";
include __DIR__ . "/partials/header.php";
?>

<main class="container">
    <?php
    // ⤵️ Plak hier de BODY-inhoud uit designer_component.html
    //    (laat <html>, <head>, <body>, <video-header> etc. achterwege,
    //     die komen al uit de includes)
    ?>
</main>

<?php include __DIR__ . "/partials/modal.php"; ?>
<?php include __DIR__ . "/partials/footer.php"; ?>