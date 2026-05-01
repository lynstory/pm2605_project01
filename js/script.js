const hamburgerBtn = document.querySelector("#hamburgerBtn");
const drawerCloseBtn = document.querySelector("#drawerCloseBtn");
const drawerOverlay = document.querySelector("#drawerOverlay");
const mobileDrawer = document.querySelector("#mobileDrawer");
const drawerMenuLinks = document.querySelectorAll(".drawer-menu a");

function openDrawer() {
    drawerOverlay.classList.add("is-open");
    mobileDrawer.classList.add("is-open");
    mobileDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
}

function closeDrawer() {
    drawerOverlay.classList.remove("is-open");
    mobileDrawer.classList.remove("is-open");
    mobileDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
}

if (hamburgerBtn && drawerCloseBtn && drawerOverlay && mobileDrawer) {
    hamburgerBtn.addEventListener("click", openDrawer);
    drawerCloseBtn.addEventListener("click", closeDrawer);
    drawerOverlay.addEventListener("click", closeDrawer);

    drawerMenuLinks.forEach((link) => {
        link.addEventListener("click", closeDrawer);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeDrawer();
        }
    });
}

if (typeof Swiper !== "undefined") {
    new Swiper(".swiper", {
        loop: true,
        speed: 700,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
}

const philosophySection = document.querySelector("#philosophySection");
const philosophyInner = document.querySelector(".philosophy-inner");

if (philosophySection) {
    if ("IntersectionObserver" in window) {
        const philosophyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        philosophySection.classList.add("is-in-view");
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
        );
        philosophyObserver.observe(philosophySection);
    } else {
        philosophySection.classList.add("is-in-view");
    }
}

const visionScrollSection = document.querySelector("#visionScrollSection");

if (visionScrollSection) {
    const onVisionScroll = () => {
        if (philosophySection && philosophyInner) {
            const boundaryStart = philosophySection.offsetTop + philosophySection.offsetHeight - window.innerHeight;
            const boundaryEnd = visionScrollSection.offsetTop + window.innerHeight * 0.2;
            const boundaryRange = Math.max(boundaryEnd - boundaryStart, 1);
            const bridgeProgress = Math.min(
                Math.max((window.scrollY - boundaryStart) / boundaryRange, 0),
                1
            );

            philosophyInner.style.setProperty("--bridge-progress", bridgeProgress.toFixed(4));
            visionScrollSection.style.setProperty("--bridge-progress", bridgeProgress.toFixed(4));
        }

        const rect = visionScrollSection.getBoundingClientRect();
        const sectionHeight = visionScrollSection.offsetHeight - window.innerHeight;
        const headerHeight = document.querySelector(".top-header")?.offsetHeight ?? 0;

        if (sectionHeight <= 0) {
            return;
        }

        const progress = Math.min(Math.max(-rect.top / sectionHeight, 0), 1);
        const auroraRevealProgress = rect.top <= headerHeight ? 1 : 0;
        const transitionStart = 0.28;
        const transitionEnd = 0.72;
        const transitionProgress = Math.min(
            Math.max((progress - transitionStart) / (transitionEnd - transitionStart), 0),
            1
        );

        visionScrollSection.style.setProperty("--aurora-reveal", auroraRevealProgress.toFixed(4));
        visionScrollSection.style.setProperty("--vision-progress", transitionProgress.toFixed(4));
    };

    onVisionScroll();
    window.addEventListener("scroll", onVisionScroll, { passive: true });
    window.addEventListener("resize", onVisionScroll);
}
