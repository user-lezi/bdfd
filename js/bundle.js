"use strict";
(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // js/compiled/contributors.js
  var require_contributors = __commonJS({
    "js/compiled/contributors.js"(exports) {
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
        } catch (error) {
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
          img.className = "w-10 h-10 rounded-full border border-white/10 hover:scale-110 transition";
          a.appendChild(img);
          container.appendChild(a);
          setTimeout(() => {
            a.classList.remove("opacity-0", "scale-50");
            a.classList.add("opacity-100", "scale-100");
          }, index * 60);
        });
      }
    }
  });

  // js/compiled/index.js
  var require_index = __commonJS({
    "js/compiled/index.js"(exports) {
      var __importDefault = exports && exports.__importDefault || function(mod) {
        return mod && mod.__esModule ? mod : { "default": mod };
      };
      Object.defineProperty(exports, "__esModule", { value: true });
      var contributors_1 = __importDefault(require_contributors());
      (0, contributors_1.default)("contrib-avatars");
    }
  });
  require_index();
})();
