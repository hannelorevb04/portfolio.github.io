<?php
// about.php

$title = "Hannelore Van Buynderen — About";
$hero  = [
    'title'   => 'About',
    'lead'    => "I'm Hannelore Van Buynderen, a UX/UI designer and front-end developer
          based in Boechout (Antwerp). I translate ideas into clear,
          user-friendly interfaces from user flows and wireframes to
          pixel-perfect UI and working prototypes.",
    'actions' => [
        ['label' => 'Resume',  'href' => 'CV_Hannelore_Van_Buynderen.pdf', 'variant' => 'primary', 'icon' => 'play'],
        ['label' => 'LinkedIn',  'href' => 'https://www.linkedin.com/in/hannelore-van-buynderen-056783225/', 'variant' => 'secondary', 'icon' => 'info'],
    ],
    // Optioneel: header-video/poster als je header-partial dit ondersteunt
    'video' => [
        ['src' => 'images/beach_1080.mp4', 'type' => 'video/mp4', 'media' => '(min-width: 1024px)'],
        ['src' => 'images/beach_720.mp4',  'type' => 'video/mp4'],
        'poster' => 'images/beach_poster.jpg'
    ],
    'avatar' => 'images/logos_figma.png',
    'profiles_link' => 'profiles.php'
];

include __DIR__ . '/partials/head.php';
include __DIR__ . '/partials/header.php';
?>
<main class="about-page">

    <!-- CONTENT (ongewijzigd) -->
    <section class="about-wrap">
        <div class="about-content">
            <div class="about-top">
                <figure class="photo">
                    <img
                        class="about-photo"
                        src="images/double_exposure.png"
                        alt="Portrait of Hannelore Van Buynderen"
                        fetchpriority="high"
                        decoding="async" />
                </figure>
                <div class="education-wrap">
                    <h2 class="section-title">Education</h2>
                    <ul class="tl">
                        <li class="tl-item">
                            <div class="tl-head">Bachelor of Digital Experience Design</div>
                            <div class="tl-meta">
                                Thomas More, Mechelen <span class="sep"></span> 2022 – 2025
                            </div>
                        </li>
                        <li class="tl-item">
                            <div class="tl-head">IT &amp; Networking</div>
                            <div class="tl-meta">
                                Sint-Ursula, Lier <span class="sep"></span> 2020 – 2022
                            </div>
                        </li>
                        <li class="tl-item">
                            <div class="tl-head">Graphic Media</div>
                            <div class="tl-meta">
                                Stedelijk Lyceum Cadix, Antwerp <span class="sep"></span> 2018
                                – 2020
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="experience-wrap">
                <h2 class="section-title">Experience</h2>
                <div class="xp-grid">
                    <article class="xp-card">
                        <h3 class="xp-title">Internship — Jstack</h3>
                        <p class="xp-meta">Kontich · 2025</p>
                        <p class="xp-note">
                            Branding &amp; UX/UI for a tokenized real-estate platform ·
                            Next.js, Tailwind, web performance.
                        </p>
                        <ul class="xp-tags">
                            <li>UX/UI</li>
                            <li>Next.js</li>
                            <li>Tailwind</li>
                        </ul>
                    </article>
                    <article class="xp-card">
                        <h3 class="xp-title">Digital Nomad Bootcamp</h3>
                        <p class="xp-meta">Labenne, FR · 2024</p>
                        <p class="xp-note">
                            Remote collaboration, design sprints, rapid prototyping, and
                            presenting.
                        </p>
                        <ul class="xp-tags">
                            <li>Sprints</li>
                            <li>Prototyping</li>
                            <li>Teamwork</li>
                        </ul>
                    </article>
                    <article class="xp-card">
                        <h3 class="xp-title">GSL Classroom</h3>
                        <p class="xp-meta">
                            Tecnológico de Monterrey &amp; Thomas More · 2024
                        </p>
                        <p class="xp-note">
                            International collaboration on global challenges &amp;
                            problem-solving.
                        </p>
                        <ul class="xp-tags">
                            <li>Collaboration</li>
                            <li>Problem-solving</li>
                        </ul>
                    </article>
                </div>
            </div>

            <div class="skills-wrap">
                <h2 class="section-title">Skills</h2>
                <div class="skills-grid">
                    <div class="skill-card">
                        <div class="skill-head">
                            <h3>Frontend</h3>
                        </div>
                        <div class="tags">
                            <span class="tag"><i class="devicon-html5-plain colored"></i>HTML5</span>
                            <span class="tag"><i class="devicon-css3-plain colored"></i>CSS3</span>
                            <span class="tag"><i class="devicon-tailwindcss-original colored"></i>Tailwind</span>
                            <span class="tag"><i class="devicon-javascript-plain colored"></i>JavaScript</span>
                            <span class="tag"><i class="devicon-threejs-original"></i>Three.js</span>
                            <span class="tag"><i class="devicon-react-original colored"></i>React
                                Native</span>
                            <span class="tag"><i class="devicon-vuejs-plain colored"></i>Vue</span>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="skill-head">
                            <h3>Backend</h3>
                        </div>
                        <div class="tags">
                            <span class="tag"><i class="devicon-php-plain colored"></i>PHP</span>
                            <span class="tag"><i class="devicon-python-plain colored"></i>Python</span>
                            <span class="tag"><i class="devicon-mysql-plain colored"></i>MySQL</span>
                            <span class="tag"><i class="devicon-nodejs-plain colored"></i>Node.js</span>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="skill-head">
                            <h3>Design tools</h3>
                        </div>
                        <div class="tags">
                            <span class="tag"><i class="devicon-figma-plain colored"></i>Figma</span>
                            <span class="tag"><i class="devicon-illustrator-plain colored"></i>Illustrator</span>
                            <span class="tag"><i class="devicon-photoshop-plain colored"></i>Photoshop</span>
                        </div>
                    </div>
                    <div class="skill-card">
                        <div class="skill-head">
                            <h3>Soft skills</h3>
                        </div>
                        <div class="tags">
                            <span class="tag">🤝 Empathic</span>
                            <span class="tag">👥 Team player</span>
                            <span class="tag">🎯 Detail-oriented</span>
                            <span class="tag">💡 Helpful</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="certificates-wrap">
                <h2 class="section-title">Certificates</h2>
                <div class="skills-grid">
                    <div class="certificate-card">
                        <div class="skill-head">
                            <h3>GSL Classroom</h3>
                        </div>
                        <img
                            src="images/GLS_certificaat.png"
                            alt="GSL Classroom Certificate"
                            loading="lazy"
                            decoding="async" />

                        <p>Tecnológico de Monterrey &amp; Thomas More — 2024</p>
                    </div>
                    <div class="certificate-card">
                        <div class="skill-head">
                            <h3>Bachelor's degree</h3>
                        </div>
                        <img
                            src="images/Thomas More.png"
                            alt="Bachelor's degree"
                            loading="lazy"
                            decoding="async" />
                        <p>Thomas More, Mechelen — 2025</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</main>

<?php
include __DIR__ . '/partials/contact.php';
?>