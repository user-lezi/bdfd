"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = loadContributorsAvatars;
async function loadContributorsAvatars(containerId) {
    const container = document.getElementById(containerId);
    if (!container)
        return;
    try {
        let contributors = await fetchJSON("https://api.github.com/repos/user-lezi/bdfd/contributors?per_page=30");
        renderAvatarsAnimated(container, contributors);
    }
    catch (error) {
        container.className = "hidden";
        if (container.parentElement)
            container.parentElement.className = "hidden";
    }
}
async function fetchJSON(url) {
    const res = await fetch(url);
    if (!res.ok)
        throw new Error();
    return res.json();
}
function renderAvatarsAnimated(container, users) {
    container.innerHTML = "";
    users.forEach((user, index) => {
        const a = document.createElement("a");
        a.href = user.html_url;
        a.target = "_blank";
        a.className = "opacity-0 scale-50 transition duration-300";
        let img = document.createElement("img");
        img.src = user.avatar_url;
        img.title = user.login;
        img.className =
            "w-10 h-10 rounded-full border border-white/10 hover:scale-110 transition";
        a.appendChild(img);
        container.appendChild(a);
        setTimeout(() => {
            a.classList.remove("opacity-0", "scale-50");
            a.classList.add("opacity-100", "scale-100");
        }, index * 60);
    });
}
