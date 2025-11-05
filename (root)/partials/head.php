<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title><?= isset($title) ? htmlspecialchars($title) : 'Portfolio'; ?></title>

    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">

    <!-- Globale CSS -->
    <link rel="stylesheet" href="/assets/styles.css">
    <link rel="stylesheet" href="/assets/nx-inline.css">
    <link rel="stylesheet" href="/assets/nx-modal.css">

    <?php
    // pagina-specifieke extra css (optioneel)
    if (!empty($extraCss) && is_array($extraCss)) {
        foreach ($extraCss as $href) {
            echo '<link rel="stylesheet" href="' . htmlspecialchars($href) . '">' . PHP_EOL;
        }
    }
    ?>
</head>

<body>