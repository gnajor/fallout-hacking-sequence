const SPEED_PX_PER_SEC = 300;   // how fast the bar sweeps down
const PAUSE_SECONDS = 8;      // pause before looping back to top
const BAR_HEIGHT = 400;          // px — roughly 4 rows tall, tune to your font size

const FLASH_COLOR = "color-mix(in srgb, #0cff06 50%, white)"; // lightened tint, tune the 55% to taste

let started = false;

export function startScanClock(containerEl: HTMLElement, barEl: HTMLElement) {
/*     if (started) return;
    started = true;

    let start: number | null = null;

    function frame(now: number) {
        if (start === null) start = now;

        const containerRect = containerEl.getBoundingClientRect();
        const travel = containerRect.height + BAR_HEIGHT;
        const sweepDuration = travel / SPEED_PX_PER_SEC;
        const cycle = sweepDuration + PAUSE_SECONDS;

        const t = ((now - start) / 1000) % cycle;
        const y = t <= sweepDuration ? t * SPEED_PX_PER_SEC - BAR_HEIGHT : -BAR_HEIGHT;

        barEl.style.transform = `translateY(${y}px)`;

        const barTop = containerRect.top + y;
        const barBottom = barTop + BAR_HEIGHT;
        const barCenter = barTop + BAR_HEIGHT / 2;

        const targets = containerEl.querySelectorAll<HTMLElement>(".scan-text");
        targets.forEach((el) => {
            const r = el.getBoundingClientRect();
            const elCenter = (r.top + r.bottom) / 2;

            const overlaps = r.bottom > barTop && r.top < barBottom;

            if (!overlaps) {
                el.style.color = "";
                return;
            }

            const dist = Math.abs(elCenter - barCenter) / (BAR_HEIGHT / 2);
            const core = Math.max(0, 1 - dist * 1.6);
            const edge = Math.max(0, 1 - dist);

            const mix = Math.min(85, edge * 20 + core * 65);

            el.style.color = `color-mix(in srgb, var(--main-color) ${(100 - mix).toFixed(0)}%, ${FLASH_COLOR})`;
        });

        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame); */
}