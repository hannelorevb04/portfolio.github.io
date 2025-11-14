<?php
// PARTIAL: <head> + open <body>
// Verwacht: $title (string)
// Optioneel: $extra_styles = ['/assets/profiles.css', ...]
$title = $title ?? 'Portfolio';
?>
<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content="Portfolio van Hannelore Van Buynderen — UX/UI designer & front-end developer." />

    <title><?= htmlspecialchars($title) ?></title>

    <!-- Fonts non-blocking -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="preload" as="style"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap"
        media="print" onload="this.media='all'">
    <noscript>
        <link rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap">
    </noscript>

    <!-- Site base styles -->
    <link rel="stylesheet" href="assets/styles.css">

    <!-- Page-specific styles (optioneel) -->
    <?php if (!empty($extra_styles) && is_array($extra_styles)): ?>
        <?php foreach ($extra_styles as $href): ?>
            <link rel="stylesheet" href="<?= htmlspecialchars($href) ?>">
        <?php endforeach; ?>
    <?php endif; ?>
</head>

<body>