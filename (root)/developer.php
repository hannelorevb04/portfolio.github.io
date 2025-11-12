<?php
// developer.php

// 1) Pagina-meta + hero-config
$title = "Hannelore Van Buynderen - Developer Portfolio";
$hero  = [
    'title'   => 'Developer',
    'lead'    => "Building interactive experiences on the web. These projects range from interfaces and apps to animations and games, combining code with creativity to make digital ideas work.",
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary',   'icon' => 'play'],
        ['label' => 'Info',   'href' => '/about.php',                      'variant' => 'secondary', 'icon' => 'info'],
    ],
    'video' => [
        ['src' => '/images/beach_1.mp4', 'type' => 'video/mp4'],
        'poster' => '/images/beach_poster.jpg'
    ],
    'avatar' => '/images/devicon_vscode.png',
    'profiles_link' => '/profiles.php'
];

// 2) Head + Header
include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>

<main class="designer-page">
    <!-- =================== Web Interface =================== -->
    <section class="projects-section">
        <h2 class="section-title">Web Interface</h2>
        <div class="projects">
            <!-- Felicks -->
            <div
                class="project-card"
                data-desc="Responsive website concept for Felicks with clear sections, smooth scrolling and component-based HTML/CSS/JS."
                data-discipline="Frontend"
                data-meta="Website • HTML / CSS / JavaScript"
                data-slides='["iframe:Felicks/iframe_index.html"]'
                data-tags="HTML, CSS, JavaScript"
                data-title="Felicks"
                data-tools="HTML, CSS, JavaScript"
                data-contributors='[{"name":"Amy Bruyninckx","url":"https://amybruyninckx.com/"}]'
                id="felicksCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Felicks/cover.png" alt="Felicks cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Felicks</div>
                        <div class="labels">
                            <div class="label">HTML</div>
                            <div class="label">CSS</div>
                            <div class="label">JavaScript</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Hockey Shop -->
            <div
                class="project-card"
                data-desc="E-commerce UI fragments with Craft CMS &amp; Twig: product listing, detail and cart views with dynamic templates and filters."
                data-discipline="CMS / Templating"
                data-meta="Website • Craft CMS / Twig / PHP / CSS"
                data-slides='["iframe:Hockey_shop/iframe_sticks.html"]'
                data-tags="Craft CMS, Twig, PHP, CSS"
                data-title="Hockey Shop"
                data-tools="Craft CMS, Twig, PHP, CSS"
                id="hockeyCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Hockey_shop/cover.png" alt="Hockey shop cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Hockey Shop</div>
                        <div class="labels">
                            <div class="label">Craft CMS</div>
                            <div class="label">Twig</div>
                            <div class="label">PHP</div>
                            <div class="label">CSS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Disney+ -->
            <div
                class="project-card"
                data-desc="Pixel-accurate landing page recreation using semantic HTML and responsive CSS (Grid/Flex), with accessible navigation and hover states."
                data-discipline="Frontend"
                data-meta="Website • HTML / CSS"
                data-slides='["iframe:Disney+/index.html"]'
                data-tags="HTML, CSS"
                data-title="Disney+"
                data-tools="HTML, CSS"
                id="disneyCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Disney+/cover.png" alt="Disney+ cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Disney+</div>
                        <div class="labels">
                            <div class="label">HTML</div>
                            <div class="label">CSS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Swear -->
            <div
                class="project-card"
                data-desc="3D sneaker configurator built with Three.js &amp; Vue: real-time materials, color options and camera controls (orbit/pan/zoom)."
                data-discipline="3D / WebGL"
                data-meta="Website • Three.js / Vue.js / Node.js"
                data-slides='["iframe:https://challenge7-peach.vercel.app/"]'
                data-tags="Three.js, Vue.js, Node.js"
                data-title="Swear"
                data-tools="Three.js, Vue.js, Node.js"
                data-contributors='[{"name":"Amy Bruyninckx","url":"https://amybruyninckx.com/"}]'
                id="swearCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Swear/cover.png" alt="Swear cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Swear</div>
                        <div class="labels">
                            <div class="label">Three.js</div>
                            <div class="label">Vue.js</div>
                            <div class="label">Node.js</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 2Check (extern) -->
            <div
                class="project-card"
                data-desc="Utility-checking app using Craft CMS/Twig/PHP: forms, templating, and deploy to a PHP host with clean, modular partials."
                data-discipline="CMS / Templating"
                data-meta="Website • Craft CMS / Twig / PHP / CSS"
                data-slides='["iframe:https://lab2-render-qn86.onrender.com/"]'
                data-tags="Craft CMS, Twig, PHP, CSS"
                data-title="2Check"
                data-tools="Craft CMS, Twig, PHP, CSS"
                id="checkCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/2Check/cover.png" alt="2Check cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">2Check</div>
                        <div class="labels">
                            <div class="label">Craft CMS</div>
                            <div class="label">Twig</div>
                            <div class="label">PHP</div>
                            <div class="label">CSS</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dream House (extern) -->
            <div
                class="project-card"
                data-desc="Immersive Three.js scene with reflective materials and basic navigation; optimized for performance on the web."
                data-discipline="3D / WebGL"
                data-meta="Website • Three.js"
                data-slides='["iframe:https://challenge51.vercel.app/"]'
                data-tags="Three.js"
                data-title="Dream House"
                data-tools="Three.js"
                id="dreamCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Huis/cover.png" alt="Dreamhouse cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Dream House</div>
                        <div class="labels">
                            <div class="label">Three.js</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- =================== Motion & Animation =================== -->
    <section class="projects-section">
        <h2 class="section-title">Motion &amp; Animation</h2>
        <div class="projects">
            <!-- Google Doodle -->
            <div
                class="project-card"
                data-desc="CSS animation tribute (Friends anniversary) built with pure keyframes and timing functions — no JS required."
                data-discipline="CSS Animation / Motion"
                data-meta="Website • CSS animation"
                data-slides='["iframe:Google doodle/iframe_version.html"]'
                data-tags="CSS animation"
                data-title="Google Doodle"
                data-tools="CSS animation"
                id="doodleCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Google doodle/cover.png" alt="Google Doodle cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Google Doodle</div>
                        <div class="labels">
                            <div class="label">CSS animation</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Woordlogo (groep + solo) -->
            <div
                class="project-card"
                data-discipline="CSS Animation / Motion"
                data-meta="Website • CSS animation"
                data-slides='[
                    "iframe:Woordlogo/index_1.html",
                    "iframe:Woordlogo - groep/Entertainment/entertainment.html",
                    "iframe:Woordlogo - groep/woordlogos/fitness/index.html",
                    "iframe:Woordlogo - groep/woordlogos/timeline/index.html"
                ]'
                data-tags="CSS animation"
                data-title="Woordlogo"
                data-tools="CSS animation"
                data-contributors='[
                    {"name":"Naomi Goyvaerts","url":"https://anomi.be/"},
                    {"name":"Amy Bruyninckx","url":"https://amybruyninckx.com/"},
                    {"name":"Seda Ezzat","url":"https://sedaezzat.be/"}
                ]'
                data-links='[
                    "Woordlogo/index_1.html",
                    "Woordlogo - groep/woordlogos/Entertainment/entertainment.html",
                    "Woordlogo - groep/woordlogos/fitness/index.html",
                    "Woordlogo - groep/woordlogos/timeline/index.html"
                ]'

                data-episodes='[
    {
      "no": 1,
      "title": "Solo — Basiswoordlogo",
      "desc": "Eerste exploratie met keyframes en transforms.",
      "thumb": "/Woordlogo/cover.jpg",
      "link": "/Woordlogo/index_1.html",
      "duration": "—"
    },
    {
      "no": 2,
      "title": "Groep — Entertainment",
      "desc": "Thema met verschillende micro-animaties.",
      "thumb": "/Woordlogo - groep/woordlogos/Entertainment/cover.png",
      "link": "/Woordlogo - groep/woordlogos/Entertainment/entertainment.html",
      "duration": "—"
    },
    {
      "no": 3,
      "title": "Groep — Fitness",
      "desc": "Expressieve timing (scale/rotate).",
      "thumb": "/Woordlogo - groep/woordlogos/fitness/cover.png",
      "link": "/Woordlogo - groep/woordlogos/fitness/index.html",
      "duration": "—"
    },
    {
      "no": 4,
      "title": "Groep — Timeline",
      "desc": "Lineaire & stapsgewijze animaties met delays.",
      "thumb": "/Woordlogo - groep/woordlogos/timeline/cover.png",
      "link": "/Woordlogo - groep/woordlogos/timeline/index.html",
      "duration": "—"
    }
  ]'
                id="woordlogoCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Woordlogo/cover.jpg" alt="Woordlogo cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Woordlogo</div>
                        <div class="labels">
                            <div class="label">CSS animation</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Useless Web -->
            <div
                class="project-card"
                data-discipline="CSS Animation / Motion"
                data-meta="Website • CSS animation"
                data-slides='[
                    "iframe:Useless web/index_3.html",
                    "iframe:Useless web - groep/Entertainment/entertainment.html",
                    "iframe:Woordlogo - groep/woordlogos/fitness/index.html",
                    "iframe:Woordlogo - groep/woordlogos/timeline/index.html"
                ]'
                data-tags="CSS animation"
                data-title="Woordlogo"
                data-tools="CSS animation"
                data-contributors='[
                    {"name":"Naomi Goyvaerts","url":"https://anomi.be/"},
                    {"name":"Amy Bruyninckx","url":"https://amybruyninckx.com/"},
                    {"name":"Seda Ezzat","url":"https://sedaezzat.be/"}
                ]'
                data-links='[
                    "Woordlogo/index_1.html",
                    "Woordlogo - groep/woordlogos/Entertainment/entertainment.html",
                    "Woordlogo - groep/woordlogos/fitness/index.html",
                    "Woordlogo - groep/woordlogos/timeline/index.html"
                ]'

                data-episodes='[
    {
      "no": 1,
      "title": "Solo — Useless Web",
      "desc": "Eerste exploratie met keyframes en transforms.",
      "thumb": "/Useless web/cover.png",
      "link": "/Useless web/index_3.html",
      "duration": "—"
    },
    {
      "no": 2,
      "title": "Groep — Entertainment",
      "desc": "Thema met verschillende micro-animaties.",
      "thumb": "/Woordlogo - groep/woordlogos/Entertainment/cover.png",
      "link": "/Woordlogo - groep/woordlogos/Entertainment/entertainment.html",
      "duration": "—"
    },
    {
      "no": 3,
      "title": "Groep — Fitness",
      "desc": "Expressieve timing (scale/rotate).",
      "thumb": "/Woordlogo - groep/woordlogos/fitness/cover.png",
      "link": "/Woordlogo - groep/woordlogos/fitness/index.html",
      "duration": "—"
    },
    {
      "no": 4,
      "title": "Groep — Timeline",
      "desc": "Lineaire & stapsgewijze animaties met delays.",
      "thumb": "/Woordlogo - groep/woordlogos/timeline/cover.png",
      "link": "/Woordlogo - groep/woordlogos/timeline/index.html",
      "duration": "—"
    }
  ]'
                id="uselessCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Useless web/cover.png" alt="Useless Web" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Useless Web</div>
                        <div class="labels">
                            <div class="label">CSS animation</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Dynamic Poster -->
            <div
                class="project-card"
                data-desc="Dynamic typographic poster in HTML/CSS; responsive layout with motion accents and parameterized styles."
                data-discipline="CSS Animation / Motion"
                data-meta="Website • HTML / CSS"
                data-slides='["iframe:Dynamic poster/alles_1.html"]'
                data-tags="HTML, CSS"
                data-title="Dynamic Poster"
                data-tools="HTML, CSS"
                id="posterCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/Dynamic poster/cover.png" alt="Dynamic poster cover" loading="eager" decoding="async" />
                        </div>
                        <div class="slideshow-nav">
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
                        <div class="div">Dynamic Poster</div>
                        <div class="labels">
                            <div class="label">HTML</div>
                            <div class="label">CSS</div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                class="project-card"
                data-desc="3D mechanical hinge simulation built with Three.js — interactive board with dynamic lighting and materials."
                data-discipline="3D / WebGL"
                data-meta="Three.js"
                data-slides='["iframe:Flipperboard/Flipperboard.html"]'
                data-tags="Three.js"
                data-title="Flipperboard"
                data-tools="Three.js"
                id="flipperCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img
                                class="image slide active"
                                src="Flipperboard/cover.png"
                                alt="Flipperboard cover"
                                loading="eager"
                                decoding="async" />
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Flipperboard</div>
                        <div class="labels">
                            <div class="label">Three.js</div>
                            <!-- <div class="label">JavaScript</div> -->
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>
    <!-- =================== Microgames =================== -->
    <section class="projects-section">
        <h2 class="section-title">Microgames</h2>
        <div class="projects">

            <!-- Missile Game -->
            <div
                class="project-card"
                data-desc="JavaScript mini-game: dodge missiles with physics, collision detection and difficulty increase."
                data-discipline="Game Dev / JavaScript"
                data-meta="Website • JavaScript / CSS / HTML"
                data-slides='["iframe:Missile game/vierkant.html"]'
                data-tags="JavaScript, CSS, HTML"
                data-title="Missile game"
                data-tools="JavaScript, CSS, HTML"
                id="missileCard">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img
                                class="image slide active"
                                src="Missile game/cover.png"
                                alt="Missile game cover"
                                loading="eager"
                                decoding="async" />
                        </div>
                        <div class="slideshow-nav">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                                    stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                                    stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Missile game</div>
                        <div class="labels">
                            <div class="label">JavaScript</div>
                            <div class="label">CSS</div>
                            <div class="label">HTML</div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Military Game -->
            <div
                class="project-card"
                data-desc="P5.js top-down prototype with sprites, movement and basic interactions."
                data-discipline="Game Dev / P5.js"
                data-meta="Website • P5.js"
                data-slides='["iframe:P5/index.html"]'
                data-tags="P5.js"
                data-title="Military game"
                data-tools="P5.js"
                id="p5Card">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img
                                class="image slide active"
                                src="P5/cover.png"
                                alt="Military game cover"
                                loading="eager"
                                decoding="async" />
                        </div>
                        <div class="slideshow-nav">
                            <button class="slideshow-prev" aria-label="Vorige">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                                    stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                            </button>
                            <button class="slideshow-next" aria-label="Volgende">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none"
                                    stroke="currentColor" stroke-width="3"
                                    stroke-linecap="round" stroke-linejoin="round">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="gradient"></div>
                    <div class="text">
                        <div class="div">Military game</div>
                        <div class="labels">
                            <div class="label">P5.js</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

</main>

<?php
include __DIR__ . '/partials/modal.php';   // 1 modal voor alle pagina’s
include __DIR__ . '/partials/contact.php';  // jouw footer
?>
<link rel="stylesheet" href="/assets/nx-modal.css?v=36">
<script defer src="/assets/nx-inline.js?v=36"></script>
<script defer src="/assets/nx-modal.js?v=36"></script>

</body>

</html>