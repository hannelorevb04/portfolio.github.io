<?php
// mixed-media.php

// 1) Pagina meta + hero-config
$title = "Hannelore Van Buynderen - Mixed Media Portfolio";
$hero  = [
    'title'   => 'Mixed-media',
    'lead'    => "A space for creative experimentation. Using Illustrator, Photoshop, and photography, I freely explore techniques and styles, focusing on trying out ideas, learning new skills, and playing with visual possibilities.",
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary',   'icon' => 'play'],
        ['label' => 'Info',   'href' => '/about.php',                      'variant' => 'secondary', 'icon' => 'info'],
    ],
    // Optioneel: video/poster voor je header (als je header-partial dit gebruikt)
    'video' => [
        ['src' => '/images/beach_1080.mp4', 'type' => 'video/mp4', 'media' => '(min-width: 1024px)'],
        ['src' => '/images/beach_720.mp4',  'type' => 'video/mp4'],
        'poster' => '/images/beach_poster.jpg'
    ],
    // Optioneel: avatar/icoon in de nav (als je header dit toont)
    'avatar' => '/images/logos_creative_cloud.png',
    'profiles_link' => '/profiles.php'
];

// 2) Head + Header
include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>

<main class="designer-page">

    <!-- =================== Photoshop =================== -->
    <section class="projects-section">
        <h2 class="section-title">Photoshop</h2>
        <div class="projects">

            <!-- Double exposure -->
            <div
                class="project-card"
                data-title="Double exposure series"
                data-meta="Creative portrait compositing study"
                data-discipline="Compositing"
                data-tools="Adobe Photoshop"
                data-tags='["Double exposure","Layer masks","Blend modes","Compositing","Color grading"]'
                data-desc="Portraits blended with scenery to mimic in-camera double exposure. Non-destructive masks and Lighten/Screen blends create airy overlaps; color grading ties the two layers into a single mood."
                data-slides='["/Double exposure/jen_1_de.jpg","/Double exposure/Hannelore_1_de.png","/Double exposure/jen_2_de.jpg"]'
                data-compare='[
                    "Double exposure/jen_1_de.jpg|Double exposure/jen_1.png|Double exposure|Original",
                    "Double exposure/Hannelore_1_de.png|Double exposure/Hannelore_1.png|Double exposure|Original",
                    "Double exposure/jen_2_de.png|Double exposure/jen_2.png|Double exposure|Original"
                ]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Double exposure/jen_1_de.jpg" alt="Double Exposure 1" />
                            <img class="image slide" src="/Double exposure/Hannelore_1_de.png" alt="Double Exposure 2" />
                            <img class="image slide" src="/Double exposure/jen_2_de.jpg" alt="Double Exposure 3" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Double exposure series</div>
                    </div>
                </div>
            </div>

            <!-- Selective color -->
            <div
                class="project-card"
                data-title="Selective color series"
                data-meta="Photo edit — color pop technique"
                data-discipline="Photo Editing"
                data-tools="Adobe Photoshop"
                data-tags='["Selective color","Masking","Hue/Saturation","Black & White","Color pop"]'
                data-desc="Isolating the subject in color while converting the environment to black & white. Built with B/W and Hue/Saturation adjustments and precise masking for clean edges."
                data-slides='["/Selective color/jen_1_sc.png","/Selective color/rood_sc.jpg"]'
                data-compare='[
                    "Selective color/jen_1_sc.png|Selective color/jen_1.png|Selective color|Original",
                    "Selective color/paddenstoel_sc.jpg|Selective color/paddenstoel.jpg|Selective color|Original",
                    "Selective color/big_ben_sc.jpg|Selective color/big_ben.jpg|Selective color|Original",
                    "Selective color/roos_sc.jpg|Selective color/roos.png|Selective color|Original",
                    "Selective color/londen_sc.jpg|Selective color/londen.jpg|Selective color|Original"
                ]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Selective color/jen_1_sc.png" alt="Selective Color Portrait" />
                            <img class="image slide" src="/Selective color/rood_sc.jpg" alt="Selective Color Effect" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Selective color series</div>
                    </div>
                </div>
            </div>

            <!-- United colors -->
            <div
                class="project-card"
                data-title="United colors series"
                data-meta="Recolor experiments"
                data-discipline="Photo Editing"
                data-tools="Adobe Photoshop"
                data-tags='["Recoloring","Eye color swap","Hair recolor","Gradient maps","Masks"]'
                data-desc="Targeted recoloring practice: eye and hair changes and stylized characters. Done with Selective Color, Gradient Maps and non-destructive layer masks."
                data-slides='["/United colors/smurf_uc.jpg","/United colors/jen_1_uc.png","/United colors/court_1_uc.jpg"]'
                data-compare='[
                    "United colors/smurf_uc.jpg|United colors/smurf.jpg|Blue|Grey",
                    "United colors/jen_1_uc.png|United colors/jen_1.jpg|Original|Pink hair",
                    "United colors/court_1_uc.jpg|United colors/court_1.webp|Brown eyes|Blue eyes"
                ]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/United colors/smurf_uc.jpg" alt="United Colors - Eye Color" />
                            <img class="image slide" src="/United colors/jen_1_uc.png" alt="United Colors - Character" />
                            <img class="image slide" src="/United colors/court_1_uc.jpg" alt="United Colors - Hair Color" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">United colors series</div>
                    </div>
                </div>
            </div>

            <!-- Smart Water -->
            <div
                class="project-card"
                data-title="Smart Water mockup"
                data-meta="Packaging mockup"
                data-discipline="Mockup / Packaging"
                data-tools="Adobe Photoshop"
                data-tags='["Packaging","Mockup","Smart Objects","Branding","Lighting","Shadows"]'
                data-desc="Bottle label placed into a retail mockup using Smart Objects for artwork. Highlights and shadows are tuned to match the scene for believable integration."
                data-slides='["/images/mock_up_smartwater.png"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mock_up_smartwater.png" alt="Smart Water Mockup" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Smart Water mockup</div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- =================== Illustrator =================== -->
    <section class="projects-section">
        <h2 class="section-title">Illustrator</h2>
        <div class="projects">

            <!-- Illustration -->
            <div
                class="project-card"
                data-title="Illustration"
                data-meta=""
                data-discipline="Compositing"
                data-tools="Adobe Illustrator"
                data-tags='["illustration","vector","pen tool","shading","coloring"]'
                data-desc=""
                data-slides='["/illustrations/parasol_dog-03.png"]'
                data-compare='["illustrations/parasol_dog-03.png|illustrations/parasol_dog.jpg|Illustration|Original"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/illustrations/parasol_dog-03.png" alt="Illustration dog" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Illustration</div>
                    </div>
                </div>
            </div>

            <!-- Bauhaus -->
            <div
                class="project-card"
                data-title="Bauhaus"
                data-meta="Poster study"
                data-discipline="Poster / Illustration"
                data-tools="Adobe Illustrator"
                data-tags='["Bauhaus","Geometry","Grid","Primary colors","Typography","Print"]'
                data-desc="Graphic poster inspired by Bauhaus: strict grid, basic shapes and a primary palette balanced with bold type and clear visual hierarchy."
                data-slides='["/images/bauhaus.png"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/bauhaus.png" alt="Bauhaus Design" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Bauhaus</div>
                    </div>
                </div>
            </div>

            <!-- Sidekick -->
            <div
                class="project-card"
                data-title="Sidekick"
                data-meta="Logo & mascot concept"
                data-discipline="Logo / Illustration"
                data-tools="Adobe Illustrator"
                data-tags='["Logo","Mascot","Vector","Monoline","Icon grid","Branding"]'
                data-desc="Friendly monoline mark exploring mascot proportions. Built on an icon grid for balance; rounded terminals and consistent stroke for a cohesive brand feel."
                data-slides='["/images/sidekick_definitief_1.png"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/sidekick_definitief_1.png" alt="Sidekick Design" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Sidekick</div>
                    </div>
                </div>
            </div>

            <!-- Christmas Cards -->
            <div
                class="project-card"
                data-title="Christmas Cards"
                data-meta="Print series"
                data-discipline="Illustration / Print"
                data-tools="Adobe Illustrator, Adobe InDesign"
                data-tags='["Illustration","Greeting cards","CMYK","Bleeds","Print production"]'
                data-desc="Playful holiday cards prepared for print in CMYK with bleeds and safe margins. Alternate layouts and colorways included for small series printing."
                data-slides='["/images/Christmas_card-02.png","/images/Cristmas_card_1-03.png"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/Christmas_card-02.png" alt="Christmas Card 1" />
                            <img class="image slide" src="/images/Cristmas_card_1-03.png" alt="Christmas Card 2" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Christmas Cards</div>
                    </div>
                </div>
            </div>

            <!-- Skyline -->
            <div
                class="project-card"
                data-title="Skyline"
                data-meta="Vector illustration"
                data-discipline="Illustration"
                data-tools="Adobe Illustrator"
                data-tags='["Vector","Cityscape","Gradients","Depth","Perspective"]'
                data-desc="Stylized city skyline created with the Pen Tool and Shape Builder. Layered forms and soft gradients add depth and a subtle sense of perspective."
                data-slides='["/Skyline/stad.jpg"]'>
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Skyline/stad.jpg" alt="Skyline Design" />
                        </div>
                        <div class="slideshow-nav" aria-hidden="true">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Skyline</div>
                    </div>
                </div>
            </div>

        </div>
    </section>
</main>

<?php
include __DIR__ . '/partials/modal.php';   // 1 modal voor alle pagina’s
include __DIR__ . '/partials/footer.php';  // jouw footer
?>
<link rel="stylesheet" href="/assets/nx-modal.css?v=36">
<script defer src="/assets/nx-inline.js?v=36"></script>
<script defer src="/assets/nx-modal.js?v=36"></script>