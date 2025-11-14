<?php
$title = "Welkom – Hannelore Van Buynderen";

// Automatische redirect na 3 seconden
$redirectUrl = "/profiles.php";
?>

<?php include __DIR__ . "/partials/head.php"; ?>

<style>
    body {
        margin: 0;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #102e4a;
        color: #fff;
        font-family: 'Montserrat', sans-serif;
        overflow: hidden;
    }

    h1 {
        font-size: clamp(2rem, 6vw, 4rem);
        font-weight: 800;
        animation: fadeIn 1.5s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

<body>
    <h1>Hannelore Van Buynderen</h1>

    <script>
        setTimeout(() => {
            window.location.href = "<?= $redirectUrl ?>";
        }, 3000);
    </script>
</body>

</html>