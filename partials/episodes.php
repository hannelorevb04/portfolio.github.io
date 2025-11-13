<?php
// partials/episodes.php
// Verwacht $episodes = [ [title, meta, desc, discipline, tools, tags[], thumb, link | slides[], links[]], ... ]
if (!isset($episodes) || !is_array($episodes)) return;
?>
<div class="episodes">
    <?php foreach ($episodes as $e):
        $tagsJson   = isset($e['tags']) ? json_encode($e['tags']) : '[]';
        $slidesJson = isset($e['slides']) ? json_encode($e['slides']) : '';
        $linksJson  = isset($e['links'])  ? json_encode($e['links'])  : '';
    ?>
        <article
            class="project-card episode"
            tabindex="0"
            <?php if (!empty($e['link'])): ?>
            data-link="<?= htmlspecialchars($e['link']) ?>"
            <?php endif; ?>
            <?php if (!empty($slidesJson)): ?>
            data-slides='<?= $slidesJson ?>'
            <?php endif; ?>
            <?php if (!empty($linksJson)): ?>
            data-links='<?= $linksJson ?>'
            <?php endif; ?>
            data-title="<?= htmlspecialchars($e['title'] ?? '') ?>"
            data-meta="<?= htmlspecialchars($e['meta'] ?? '') ?>"
            data-discipline="<?= htmlspecialchars($e['discipline'] ?? '') ?>"
            data-tools="<?= htmlspecialchars($e['tools'] ?? '') ?>"
            data-tags='<?= $tagsJson ?>'
            data-desc="<?= htmlspecialchars($e['desc'] ?? '') ?>">
            <img class="ep-thumb" src="<?= htmlspecialchars($e['thumb'] ?? '/images/placeholder.png') ?>"
                alt="<?= htmlspecialchars(($e['title'] ?? 'Project') . ' thumbnail') ?>">

            <div class="ep-body">
                <h3 class="ep-title"><?= htmlspecialchars($e['title'] ?? 'Project') ?></h3>
                <?php if (!empty($e['meta'])): ?><div class="ep-meta"><?= htmlspecialchars($e['meta']) ?></div><?php endif; ?>
                <?php if (!empty($e['desc'])): ?><p class="ep-desc"><?= htmlspecialchars($e['desc']) ?></p><?php endif; ?>
                <?php if (!empty($e['tags']) && is_array($e['tags'])): ?>
                    <div class="ep-tags">
                        <?php foreach ($e['tags'] as $t): ?><span class="ep-tag"><?= htmlspecialchars($t) ?></span><?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <div class="ep-cta">
                <?php if (!empty($e['link'])): ?>
                    <a class="btn btn-primary ep-btn" href="<?= htmlspecialchars($e['link']) ?>" target="_blank" rel="noopener">▶ View Project</a>
                <?php else: ?>
                    <button class="btn btn-primary ep-btn js-open-modal" type="button">▶ View Project</button>
                <?php endif; ?>
            </div>
        </article>
    <?php endforeach; ?>
</div>