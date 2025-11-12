<?php
// designer.php

// 1) Pagina meta + hero-config
$title = "Hannelore Van Buynderen - Designer Portfolio";
$hero  = [
    'title'   => 'Designer',
    'lead'    => "Exploring the balance between function and identity. From crafting intuitive user experiences to shaping strong visual brands. These projects combine creativity and strategy to make digital products both usable and memorable.",
    'actions' => [
        ['label' => 'Resume', 'href' => '/CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary',   'icon' => 'play'],
        ['label' => 'Info',   'href' => '/about.php',                      'variant' => 'secondary', 'icon' => 'info'],
    ],
    // Optioneel: video/poster voor je header (indien je header-partial dit gebruikt)
    'video' => [
        ['src' => '/images/beach_1080.mp4', 'type' => 'video/mp4', 'media' => '(min-width: 1024px)'],
        ['src' => '/images/beach_720.mp4',  'type' => 'video/mp4'],
        'poster' => '/images/beach_poster.jpg'
    ],
    // Optioneel: avatar/icoon in de nav (indien je header dit toont)
    'avatar' => '/images/logos_figma.png',
    'profiles_link' => '/profiles.php'
];

// 2) Head + Header
include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>

<main class="designer-page">
    <!-- =================== UX/UI =================== -->
    <section class="projects-section">
        <h2 class="section-title">UX/UI</h2>
        <div class="projects">

            <!-- Felicks -->
            <div
                class="project-card"
                data-title="Felicks"
                data-meta="Awareness-first dog adoption app"
                data-discipline="UX/UI"
                data-tools="Figma"
                data-tags='["Education","Adoption","Matching","Onboarding","Accessibility"]'
                data-desc="Awareness-first dog adoption app that helps prospective owners understand responsibilities before committing."
                data-link="https://embed.figma.com/proto/frdQclrLRjueLxFQxEwPyW/DesignFileBachelorproef?page-id=1%3A5&node-id=932-12471&p=f&viewport=627%2C531%2C0.03&scaling=scale-down&content-scaling=fixed&starting-point-node-id=932%3A12443&show-proto-sidebar=1&embed-host=share">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_bachelorproef.png" alt="Felicks mock-up" />
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
                        <div class="div">Felicks</div>
                    </div>
                </div>
            </div>

            <!-- 2Check -->
            <div
                class="project-card"
                data-title="2Check"
                data-meta="Public information &amp; fact-checking"
                data-discipline="UX/UI"
                data-tools="Figma"
                data-tags='["Content Design","Fact-Checking","Accessibility","Government"]'
                data-desc="Public information and fact-checking companion that explains policy plainly and debunks misinformation with transparent sources."
                data-link="https://www.figma.com/proto/H2XfAg8GOZ2wuztZWOmm8z/New-2CHECK?page-id=1%3A4&node-id=219-2630&p=f&viewport=645%2C474%2C0.07&t=HOgPHsmGpZwJlzKU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=219%3A2626&show-proto-sidebar=1">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_2Check.png" alt="2Check mock-up" />
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
                        <div class="div">2Check</div>
                    </div>
                </div>
            </div>

            <!-- Find me -->
            <div
                class="project-card"
                data-title="Find me"
                data-meta="Friend-finder for crowded venues"
                data-discipline="UX"
                data-tools="Figma"
                data-tags='["Location","Privacy","Events","Mobile"]'
                data-desc="A simple way to reunite in crowded venues. Set a meet spot, share temporary live location and follow a clear compass."
                data-link="https://www.figma.com/proto/4Gf25AnQDaxSre6dZXmiVJ/Hackaton?page-id=0%3A1&node-id=5-2&p=f&viewport=403%2C453%2C0.19&t=OrKWG0N1HZuzJt2P-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=5%3A2">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_find_me.png" alt="Find me mock-up" />
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
                        <div class="div">Find me</div>
                    </div>
                </div>
            </div>

            <!-- XD Promoting -->
            <div
                class="project-card"
                data-title="XD Promoting"
                data-meta="Community &amp; collaboration for XD students"
                data-discipline="UX"
                data-tools="Figma"
                data-tags='["Community","Messaging","Collaboration","Students","Design"]'
                data-desc="Community space for XD students to chat, ask for feedback and collaborate."
                data-link="https://www.figma.com/proto/Z1xxeDSuq4bxy92W8XdhuK/Engels?page-id=0%3A1&node-id=6-1243&p=f&viewport=554%2C427%2C0.25&t=8bypZ1p0uVE9jCee-1&scaling=scale-down&content-scaling=fixed">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_TM.png" alt="XD Promoting mock-up" />
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
                        <div class="div">XD Promoting</div>
                    </div>
                </div>
            </div>

            <!-- Hoppin -->
            <div
                class="project-card"
                data-title="Hoppin"
                data-meta="Figma • UX/UI"
                data-discipline="UX/UI"
                data-tools="Figma"
                data-tags='["Accessibility","Flows"]'
                data-desc="Public transport redesign focused on one-handed use and zero-friction journeys."
                data-link="https://www.figma.com/proto/ZefNVzjOiAlbKq2lDlGAVz/Hoppin-medium-fi?page-id=324%3A3758&node-id=779-6534&p=f&viewport=-2363%2C231%2C0.18&t=J3Z3yZIx1dSL52WU-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=779%3A6534">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_hoppin.png" alt="Hoppin mock-up" />
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
                        <div class="div">Hoppin</div>
                    </div>
                </div>
            </div>

            <!-- CarGov -->
            <div
                class="project-card"
                data-title="CarGov"
                data-meta="Figma • UX/UI"
                data-discipline="UX"
                data-tools="Figma"
                data-tags='["Dashboard"]'
                data-desc="Secure vehicle documents wallet that keeps registration, inspection, insurance and service history in one place."
                data-link="https://www.figma.com/proto/hzBlpfqvboJgRg4VVFpdO4/CarGov?page-id=0%3A1&node-id=6-180&p=f&viewport=1060%2C475%2C0.22&t=T5oOhdYUIMTtue2d-1&scaling=scale-down&content-scaling=fixed">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_cargov.png" alt="CarGov mock-up" />
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
                        <div class="div">CarGov</div>
                    </div>
                </div>
            </div>

            <!-- Nevah -->
            <div
                class="project-card"
                data-title="Nevah"
                data-meta="Anxiety &amp; panic support coach"
                data-discipline="UX/UI"
                data-tools="Figma"
                data-tags='["Mental Health","Breathing","Grounding","Journal","Privacy"]'
                data-desc="Discreet support for anxiety and panic with an SOS flow, calm visual focus mode and preventive tools."
                data-link="https://www.figma.com/proto/iWPPKwrjtrrePgxPld5WMx/Nevah-def?page-id=0%3A1&node-id=40-330&p=f&viewport=159%2C232%2C0.2&t=oBX8PSiitnCVimVX-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=40%3A330&show-proto-sidebar=1">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_nevah.png" alt="Nevah mock-up" />
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
                        <div class="div">Nevah</div>
                    </div>
                </div>
            </div>

            <!-- Forcia -->
            <div
                class="project-card"
                data-title="Forcia"
                data-meta="Figma • UX/UI"
                data-discipline="UX/UI"
                data-tools="Figma"
                data-tags='["Minimal","Identity"]'
                data-desc="Study planner that turns deadlines into manageable focus blocks. Backward scheduling and focus mode."
                data-link="https://www.figma.com/proto/lPmocMJZk3cvGyMO4ocJui/Forcia---Hi---fi-wireframes?page-id=0%3A1&node-id=2-2&p=f&viewport=250%2C282%2C0.15&t=Ohp6bwjdMx2ggYW0-1&scaling=scale-down&content-scaling=fixed&starting-point-node-id=2%3A2">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/mockup_forcia.png" alt="Forcia mock-up" />
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
                        <div class="div">Forcia</div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <!-- =================== Branding =================== -->
    <section class="projects-section">
        <h2 class="section-title">Branding</h2>
        <div class="projects">

            <!-- Felicks — Branding -->
            <div
                class="project-card"
                data-title="Felicks — Branding"
                data-meta="Branding"
                data-discipline="Branding"
                data-tools="Figma"
                data-tags="Brand,Guidelines"
                data-desc="Warm, friendly brand kit with soft colors and playful typography."
                data-link="https://acrobat.adobe.com/id/urn:aaid:sc:EU:df82d263-e9e7-4c2c-98d2-04e70f50673d">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/moodboard_bach.png" alt="Felicks moodboard" />
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
                        <div class="div">Felicks</div>
                    </div>
                </div>
            </div>

            <!-- 2Check — Branding -->
            <div
                class="project-card"
                data-title="2Check — Branding"
                data-meta="Branding"
                data-discipline="Branding"
                data-tools="Illustrator"
                data-tags="Moodboard,Visuals"
                data-desc="Bold contrasts and clean typographic system for clarity and trust."
                data-link="https://acrobat.adobe.com/id/urn:aaid:sc:eu:9308b656-591c-43e8-adfe-646e84fb6fb8">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/moodboard_lab2.jpg" alt="2Check moodboard" />
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
                        <div class="div">2Check</div>
                    </div>
                </div>
            </div>

            <!-- Nevah — Branding -->
            <div
                class="project-card"
                data-title="Nevah — Branding"
                data-meta="Branding"
                data-discipline="Branding"
                data-tools="Illustrator"
                data-tags="Palette,Layout"
                data-desc="Ocean-inspired palette and light grids for a calm, modern feel."
                data-link="https://acrobat.adobe.com/id/urn:aaid:sc:EU:3fab1fc7-27c1-4a31-850c-3a5bb4c7b43e">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/moodboard_lab1.jpg" alt="Nevah moodboard" />
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
                        <div class="div">Nevah</div>
                    </div>
                </div>
            </div>

            <!-- Forcia — Branding -->
            <div
                class="project-card"
                data-title="Forcia — Branding"
                data-meta="Branding"
                data-discipline="Branding"
                data-tools="Illustrator"
                data-tags="Grid,Logo,System"
                data-desc="Modular grid with muted greens and soft greys for a subtle identity."
                data-link="https://acrobat.adobe.com/id/urn:aaid:sc:EU:97f95844-3974-4ee3-b23a-6afbbfd79329">
                <div class="overlap-group">
                    <div class="slideshow-container">
                        <div class="slides">
                            <img class="image slide active" src="/images/moodboard_creatie1.png" alt="Forcia moodboard" />
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
                        <div class="div">Forcia</div>
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