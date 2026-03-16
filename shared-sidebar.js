
(function () {
  const current = document.body.getAttribute("data-sidebar-current") || "";
  const version = document.body.getAttribute("data-sidebar-version") || "v 1.1.7 demo";
  const org = document.body.getAttribute("data-sidebar-org") || "HKU Nurse Portal Demo";

  const items = [
    { key: "dashboard", label: "Dashboard", href: "./dashboard.html", gray: "./assets/dashboardGray.svg", blue: "./assets/dashboardBlue.svg" },
    { key: "case-management", label: "Case Management", href: "#", gray: "./assets/clockGray.svg", blue: "./assets/clockBlue.svg" },
    { key: "patient-management", label: "Patient Management", href: "#", gray: "./assets/patientGray.svg", blue: "./assets/patientBlue.svg" },
    { key: "carer-management", label: "Carer Management", href: "#", gray: "./assets/carerGray.svg", blue: "./assets/carerBlue.svg" },
    { key: "staff-management", label: "Staff Management", href: "#", gray: "./assets/peopleGray.svg", blue: "./assets/peopleBlue.svg" },
    { key: "audit-log", label: "Audit Log", href: "#", gray: "./assets/auditLogGray.svg", blue: "./assets/auditLogBlue.svg" },
    { key: "nurse-tickets", label: "Nurse Tickets", href: "./nurse-tickets.html", gray: "./assets/file-lines.08dbc7ec491f453696227b1a3407a35e.svg", blue: "./assets/file-lines.08dbc7ec491f453696227b1a3407a35e.svg" },
    { key: "nurse-symptoms", label: "Nurse Symptoms", href: "./nurse-symptoms.html", gray: "./assets/chartGray.svg", blue: "./assets/chartBlue.svg" },
    { key: "trusted-sources", label: "Trusted Sources", href: "./trusted-sources.html", gray: "./assets/databaseGray.svg", blue: "./assets/databaseBlue.svg" },
    { key: "settings", label: "Settings", href: "#", gray: "./assets/settingGray.svg", blue: "./assets/settingBlue.svg" }
  ];

  function renderModernSidebar() {
    const sidebar = document.querySelector(".sidebar");
    if (!sidebar) return false;
    const nav = sidebar.querySelector(".nav");
    if (!nav) return false;

    nav.innerHTML = items.map(function (item) {
      const active = item.key === current;
      const icon = active ? item.blue : item.gray;
      return '<a class="nav-item' + (active ? ' active' : '') + '" href="' + item.href + '">' +
               '<img src="' + icon + '" alt=""/>' + item.label +
             '</a>';
    }).join("");

    const orgNode = sidebar.querySelector(".org");
    if (orgNode) orgNode.textContent = org;
    const versionNode = sidebar.querySelector(".version");
    if (versionNode) versionNode.textContent = version;
    return true;
  }

  function renderLegacySidebar() {
    const drawer = document.querySelector(".custom-drawer .MuiDrawer-paper") || document.querySelector(".MuiDrawer-paper");
    if (!drawer) return false;

    const wave = drawer.querySelector('img[src*="Wave"]');
    const versionNode = drawer.querySelector('p[style*="bottom: 25px"]');

    Array.from(drawer.children).forEach(function (child) {
      if (child === wave || child === versionNode) return;
      child.remove();
    });

    function legacyItem(item) {
      const active = item.key === current;
      const wrapperTag = item.href && item.href !== "#" ? "a" : "div";
      const hrefAttr = wrapperTag === "a" ? ' href="' + item.href + '"' : "";
      const cls = active ? "sc-kgUAyh beaRYn" : "sc-kgUAyh Rroof";
      const iconGray = item.gray || item.blue;
      const iconBlue = item.blue || item.gray;
      return '<' + wrapperTag + ' class="' + cls + '"' + hrefAttr + ' style="text-decoration:none;">' +
               '<div class="sc-hTtwUo csmlIp">' +
                 '<img alt="" class="grayImage" src="' + iconGray + '" style="background-color: transparent; width: 30px; height: 30px;"/>' +
                 '<img alt="" class="blueImage" src="' + iconBlue + '" style="background-color: transparent; width: 30px; height: 30px;"/>' +
                 '<p class="MuiTypography-root MuiTypography-body1 title css-1ea6976-MuiTypography-root">' + item.label + '</p>' +
               '</div>' +
             '</' + wrapperTag + '>';
    }

    const html = items.map(legacyItem).join("");
    if (wave) {
      wave.insertAdjacentHTML("beforebegin", html);
    } else {
      drawer.insertAdjacentHTML("beforeend", html);
    }
    if (versionNode) versionNode.textContent = version;
    return true;
  }

  renderModernSidebar() || renderLegacySidebar();
})();
