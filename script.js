(function () {
  var CONFIG = {
    name: "Hân Qiu",
    host: "Hai",
    age: 22,
    date: { y: 2026, m: 11, d: 14 },
    time: "7:30 PM",
    place: "Làng Khét",
    dress: "72 Hẻm 496 Dương Quảng Hàm, An Nhơn, Hồ Chí Minh, Vietnam",
    escaperoom: "Bể nha",
    max: 5,
    captions: [
      "Mời ae tới chung dui nhá",
      "Đừng coai",
      "Đừng coai",
      "Cay liền con",
      "Cay liền con",
      "T hỏi lần nữa thôi nha."
    ],
    noLabels: [
      "Tao bận rồi",
      "Tao nói này đừng giận nha Hui...",
      "Má khó mày ơi",
      "Má 3 tuần rồi chưa về BD",
      "Tao mắc đi bida rùi",
      "Tao đến nè"
    ]
  };

  var $ = function (id) { return document.getElementById(id); };
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var attempts = 0, tx = 0, ty = 0, done = false;
  var photo = $("photo"), no = $("no"), yes = $("yes"), choices = $("choices"), caption = $("caption");
  var fill = function (s) { return s.replace(/\{name\}/g, CONFIG.name); };

  document.querySelectorAll("[data-name]").forEach(function (el) { el.textContent = CONFIG.name; });
  document.title = "Invitation"

  var img = $("photo-img");
  function noPhoto() { photo.classList.add("no-photo"); }
  img.addEventListener("error", noPhoto);
  if (img.complete && img.naturalWidth === 0) noPhoto();

  var balloons = $("balloons");
  for (var i = 0; i < 9; i++) {
    var b = document.createElement("span");
    b.style.setProperty("--x", (4 + (i * 11) % 90) + "%");
    b.style.setProperty("--w", (2.6 + (i % 3) * 0.8).toFixed(1) + "rem");
    b.style.setProperty("--d", (16 + (i % 4) * 4) + "s");
    b.style.setProperty("--delay", (-i * 3.1).toFixed(1) + "s");
    b.style.setProperty("--sway", (i % 2 ? 1 : -1) * (20 + (i % 3) * 14) + "px");
    balloons.appendChild(b);
  }

  function render() {
    var n = Math.min(attempts, CONFIG.max);
    caption.textContent = fill(CONFIG.captions[n]);
    no.textContent = CONFIG.noLabels[n];
    no.classList.toggle("soft", attempts >= CONFIG.max);
    var pct = done ? 0 : (attempts >= CONFIG.max ? 100 : Math.round(100 * attempts / (CONFIG.max + 1)));
    $("meter-num").textContent = pct + "%";
    $("meter-fill").style.width = pct + "%";
    $("meter").setAttribute("aria-valuenow", String(pct));
    yes.style.fontSize = (1.3 + attempts * 0.05).toFixed(2) + "rem";
    yes.style.padding = (0.9 + attempts * 0.06).toFixed(2) + "rem " + (1.4 + attempts * 0.1).toFixed(2) + "rem";
  }

  function intersects(a, b) {
    return !(a.right < b.left || a.left > b.right || a.bottom < b.top || a.top > b.bottom);
  }

  
function dodge() {
  // Keep the No button inside the choices container
  const padding = 12;
  const gap = 20;

  // Use absolute positioning for the moving button
  no.style.position = "absolute";
  no.style.transform = "none";

  // Limit button width, including long messages
  const containerWidth = choices.clientWidth;

  const buttonWidth = Math.min(
    270,
    Math.max(1, containerWidth - padding * 2)
  );

  no.style.width = buttonWidth + "px";
  no.style.maxWidth = "100%";

  // Measure positions after changing the layout
  const containerRect = choices.getBoundingClientRect();
  const yesRect = yes.getBoundingClientRect();

  const noWidth = no.offsetWidth;
  const noHeight = no.offsetHeight;

  // The No button must always stay BELOW the Yes button
  const minTop =
    yesRect.bottom - containerRect.top + gap;

  // Make the container tall enough for both buttons
  const requiredHeight =
    minTop + noHeight + padding + 50;

  choices.style.minHeight =
    Math.max(
      window.innerWidth <= 600 ? 304 : 256,
      requiredHeight
    ) + "px";

  // Calculate safe horizontal movement
  const minLeft = padding;

  const maxLeft = Math.max(
    minLeft,
    choices.clientWidth - noWidth - padding
  );

  // Calculate safe vertical movement
  const maxTop = Math.max(
    minTop,
    choices.clientHeight - noHeight - padding
  );

  // Generate a position that cannot overlap the Yes button
  const left =
    minLeft + Math.random() * (maxLeft - minLeft);

  const top =
    minTop + Math.random() * (maxTop - minTop);

  // Move the button to its new safe position
  no.style.left = left.toFixed(1) + "px";
  no.style.top = top.toFixed(1) + "px";
}


  
function bump() {
  if (done || attempts >= CONFIG.max) return;

  attempts++;
  render();

  if (attempts < CONFIG.max) {
    dodge();
  }
}


  no.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse") bump(); });
  no.addEventListener("click", function () { if (attempts >= CONFIG.max) accept(); else bump(); });
  yes.addEventListener("click", accept);

  function burst(originEl, count) {
    if (reduce) return;
    var r = originEl.getBoundingClientRect();
    var ox = r.left + r.width / 2, oy = r.top + r.height / 2;
    var colors = ["var(--pink)", "var(--yellow)", "var(--teal)", "var(--violet)"];
    for (var i = 0; i < (count || 48); i++) {
      var p = document.createElement("span");
      p.className = "confetti";
      var ang = Math.random() * Math.PI * 2, dist = 80 + Math.random() * 210;
      p.style.setProperty("--ox", ox + "px");
      p.style.setProperty("--oy", oy + "px");
      p.style.setProperty("--dx", Math.cos(ang) * dist + "px");
      p.style.setProperty("--dy", (Math.sin(ang) * dist + 120) + "px");
      p.style.setProperty("--r", (Math.random() * 720 - 360) + "deg");
      p.style.setProperty("--w", (0.4 + Math.random() * 0.4).toFixed(2) + "rem");
      p.style.setProperty("--h", (0.7 + Math.random() * 0.6).toFixed(2) + "rem");
      p.style.setProperty("--c", colors[i % colors.length]);
      document.body.appendChild(p);
      setTimeout(function (el) { el.remove(); }.bind(null, p), 2000);
    }
  }

  function accept() {
    if (done) return;
    done = true;
    render();
    photo.dataset.mood = "happy";
    photo.classList.remove("hop");
    void photo.offsetWidth;
    photo.classList.add("hop");
    $("ask").hidden = true;
    $("answer").hidden = false;
    burst(photo, 60);
    window.scrollTo(0, 0);
  }

  function pad2(n) { return n < 10 ? "0" + n : String(n); }
  var dt = new Date(CONFIG.date.y, CONFIG.date.m - 1, CONFIG.date.d);
  var days = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
  var dateText = pad2(CONFIG.date.d) + "/" + pad2(CONFIG.date.m) + "/" + CONFIG.date.y;
  $("when-day").textContent = days[dt.getDay()] + ", " + dateText;

  var now = new Date();
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var left = Math.round((dt - today) / 86400000);
  $("countdown").textContent = left > 1 ? "Còn " + left + " ngày nữa"
    : left === 1 ? "Ngày mai bể chetme dới t."
    : left === 0 ? "Hôm nay rồi, Mày bể phút chót đi he"
    : "Đợi năm sau đi m";

  [["Giờ", CONFIG.time], ["Địa điểm", CONFIG.place], ["Địa chỉ", CONFIG.dress], ["Escape Room", CONFIG.escaperoom]].forEach(function (r) {
    var row = document.createElement("div"); row.className = "row";
    var dtEl = document.createElement("dt"); dtEl.textContent = r[0];
    var dd = document.createElement("dd");
    if (r[1]) dd.textContent = r[1]; else { dd.textContent = "Đang chốt, sẽ báo sau"; dd.className = "tbd"; }
    row.appendChild(dtEl); row.appendChild(dd);
    $("details").appendChild(row);
  });
  $("note").textContent = CONFIG.note;

  var msg = $("msg"), guest = $("guest");
  function buildMsg() {
    var name = guest.value.trim();
    msg.value = (name ? "Tao là " + name + ". " : "") +
      "Tao sẽ đến sinh nhật " + CONFIG.age + " tuổi của " + CONFIG.name + " ngày " + dateText + " nha!";
  }
  guest.addEventListener("input", buildMsg);
  buildMsg();
  $("rsvp-hint").textContent = "Bấm copy rồi dán vào Zalo hoặc Messenger gửi cho tao nha.";

  $("copy").addEventListener("click", function () {
    var status = $("status");
    function ok() { status.textContent = "Đã copy. Dán gửi cho tao nha."; burst($("copy"), 30); }
    function fallback() {
      msg.focus(); msg.select();
      status.textContent = "Lỗi cụ r, ráng copy bằng tay nha.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(msg.value).then(ok, fallback);
    else fallback();
  });
  msg.addEventListener("focus", function () { msg.select(); });

  $("replay").addEventListener("click", function () {
  
done = false;
attempts = 0;

no.style.position = "";
no.style.left = "";
no.style.top = "";
no.style.width = "";
no.style.maxWidth = "";
no.style.transform = "";

choices.style.minHeight = "";

    $("answer").hidden = true;
    $("ask").hidden = false;
    $("status").textContent = "";
    render();
    window.scrollTo(0, 0);
  });

  render();
})();
