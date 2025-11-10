<?php // PARTIAL: universele NX modal 
?>
<div aria-label="Project modal" aria-modal="true" class="modal-overlay" id="nxModal" role="dialog" style="display:none">
    <div class="nx-card">
        <button aria-label="Close" class="nx-close">×</button>

        <div aria-label="Project media" class="nx-hero-slider">
            <div class="nx-slides"></div>
            <button aria-label="Previous" class="nx-nav prev">‹</button>
            <button aria-label="Next" class="nx-nav next">›</button>
            <div aria-label="Slide indicators" class="nx-dots"></div>
        </div>

        <section class="nx-panel">
            <div class="nx-panel-inner">
                <div class="nx-left">
                    <h2 class="nx-title">Title</h2>
                    <div class="nx-meta"><span class="nx-meta-text">Meta</span></div>
                    <p class="nx-desc">Description…</p>
                    <div class="nx-actions">
                        <!-- inside .nx-actions -->
                        <div class="nx-actions">
                            <a id="nxViewProject"
                                class="btn btn-primary"
                                href="#"
                                target="_blank"
                                rel="noopener">▶ View Project</a>
                            <button class="btn btn-secondary" type="button">Contact</button>
                        </div>
                        <h3 class="nx-h3">Tags</h3>
                        <div class="nx-taglist"></div>
                    </div>
                    <aside class="nx-right">
                        <div class="nx-spec">
                            <div class="nx-spec-title">DISCIPLINE</div>
                            <ul class="nx-spec-list">
                                <li class="nx-discipline">—</li>
                            </ul>
                        </div>
                        <div class="nx-spec">
                            <div class="nx-spec-title">TOOLS</div>
                            <ul class="nx-spec-list">
                                <li class="nx-tools">—</li>
                            </ul>
                        </div>
                    </aside>
                </div>
        </section>
    </div>
</div>