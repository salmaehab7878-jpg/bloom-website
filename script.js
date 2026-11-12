var lang = "ar",
  cur = "dashboard";
var I = {
  dashboard:
    '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></svg>',
  case: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></svg>',
  note: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16z"/></svg>',
  settings:
    '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></svg>',
};
var T = {
  dashboard: [
    "لوحة التحكم",
    "Dashboard",
    "صباح الخير د. سارة، لديكِ ٣ جلسات اليوم",
    "Good morning Dr. Sara, you have 3 sessions today",
  ],
  case: [
    "ملف الحالة",
    "Case profile",
    "ليلى ك. · الجلسة ٨ من ١٢",
    "Layla K. · Session 8 of 12",
  ],
  note: [
    "ملاحظة الجلسة",
    "Session note",
    "اكتبي ملاحظة منظمة في دقائق",
    "Write a structured note in minutes",
  ],
  settings: [
    "القوالب والإعدادات",
    "Templates and settings",
    "خصّصي أقسام الملاحظات والخصوصية",
    "Customise note sections and privacy",
  ],
};
var S = [
  { a: "تفاصيل الجلسة", e: "Session details", on: 1, t: "i" },
  { a: "المواضيع الرئيسية", e: "Key topics", on: 1 },
  { a: "الملاحظات السريرية", e: "Observations", on: 1 },
  { a: "التقدم نحو الأهداف", e: "Progress", on: 1 },
  { a: "الواجبات المنزلية", e: "Homework", on: 1 },
  { a: "ظروف عاجلة", e: "Urgent circumstances", on: 1 },
  { a: "الخطوات التالية", e: "Next steps", on: 1 },
];
var C = [
  [
    "ل",
    "ليلى ك.",
    "Layla K.",
    "الجلسة القادمة: الأحد",
    "Next session: Sunday",
    "نشطة",
    "Active",
  ],
  [
    "ع",
    "عمر س.",
    "Omar S.",
    "الجلسة القادمة: الاثنين",
    "Next session: Monday",
    "متابعة مستحقة",
    "Follow-up due",
  ],
  [
    "م",
    "منى ح.",
    "Mona H.",
    "الجلسة القادمة: الاثنين",
    "Next session: Monday",
    "تجديد الموافقة",
    "Consent renewal",
  ],
  [
    "ي",
    "يوسف ر.",
    "Youssef R.",
    "الجلسة القادمة: الثلاثاء",
    "Next session: Tuesday",
    "نشطة",
    "Active",
  ],
];
var $ = function (s) {
  return document.querySelector(s);
};
function tr(r) {
  (r || document).querySelectorAll("[data-en]").forEach(function (n) {
    if (n.dataset.ar === undefined) n.dataset.ar = n.textContent;
    n.textContent = lang == "en" ? n.dataset.en : n.dataset.ar;
  });
}
function esc(s) {
  return s.replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function toast(a, e) {
  var t = $("#toast");
  t.textContent = lang == "en" ? e : a;
  t.classList.add("on");
  setTimeout(function () {
    t.classList.remove("on");
  }, 2200);
}
function nav() {
  var h = "",
    b = "";
  Object.keys(T).forEach(function (k) {
    var n = T[k][lang == "en" ? 1 : 0],
      on = k == cur ? " on" : "";
    h += '<a href="#' + k + '" class="' + on + '">' + I[k] + n + "</a>";
    b += '<a href="#' + k + '" class="' + on + '">' + I[k] + n + "</a>";
  });
  $("#nav").innerHTML = h;
  $("#bnav").innerHTML = b;
}
function head() {
  var i = lang == "en" ? 1 : 0;
  $("#ttl").textContent = T[cur][i];
  $("#sub").textContent = T[cur][i + 2];
}
function go(v) {
  if (!T[v]) v = "dashboard";
  cur = v;
  document.querySelectorAll(".view").forEach(function (s) {
    s.classList.toggle("on", s.id == "v-" + v);
  });
  nav();
  head();
  window.scrollTo(0, 0);
}
function cases() {
  $("#cases").innerHTML = C.map(function (c) {
    return (
      '<button class="item" data-go="case"><div class="av">' +
      c[0] +
      '</div><div style="flex:1"><b data-en="' +
      c[2] +
      '">' +
      c[1] +
      '</b><br><small data-en="' +
      c[4] +
      '">' +
      c[3] +
      '</small></div><span class="tag b" data-en="' +
      c[6] +
      '">' +
      c[5] +
      "</span></button>"
    );
  }).join("");
  tr($("#cases"));
}
function fields() {
  var h = "";
  S.forEach(function (s, i) {
    if (!s.on || s.t == "i") return;
    h +=
      '<label class="f" for="s' +
      i +
      '" data-en="' +
      esc(s.e) +
      '">' +
      esc(s.a) +
      '</label><textarea id="s' +
      i +
      '"></textarea>';
  });
  $("#fields").innerHTML = h;
  tr($("#fields"));
}
function secs() {
  $("#secs").innerHTML = S.map(function (s, i) {
    return (
      '<div class="srow"><button class="btn sm" data-mv="' +
      i +
      '" data-d="-1" aria-label="Up">▲</button><button class="btn sm" data-mv="' +
      i +
      '" data-d="1" aria-label="Down">▼</button><span class="grow" data-en="' +
      esc(s.e) +
      '">' +
      esc(s.a) +
      '</span><label class="sw"><input type="checkbox" data-tg="' +
      i +
      '" ' +
      (s.on ? "checked" : "") +
      ' aria-label="Toggle"><span></span></label></div>'
    );
  }).join("");
  tr($("#secs"));
  fields();
}
document.addEventListener("click", function (e) {
  var g = e.target.closest("[data-go]");
  if (g) {
    location.hash = g.dataset.go;
    return;
  }
  var m = e.target.closest("[data-mv]");
  if (m) {
    var i = +m.dataset.mv,
      j = i + +m.dataset.d;
    if (j >= 0 && j < S.length) {
      var x = S[i];
      S[i] = S[j];
      S[j] = x;
      secs();
    }
  }
});
document.addEventListener("change", function (e) {
  if (e.target.dataset.tg !== undefined) {
    S[+e.target.dataset.tg].on = e.target.checked ? 1 : 0;
    fields();
  }
});
$("#addsec").onclick = function () {
  var v = $("#newsec").value.trim();
  if (!v) return;
  S.push({ a: v, e: v, on: 1 });
  $("#newsec").value = "";
  secs();
  toast("تمت إضافة القسم", "Section added");
};
$("#draft").onclick = function () {
  $("#status").textContent = lang == "en" ? "Draft saved" : "تم حفظ المسودة";
  toast("تم حفظ المسودة", "Draft saved");
};
$("#approve").onclick = function () {
  $("#status").textContent = lang == "en" ? "Approved by you" : "اعتمدتِها";
  toast(
    "تم اعتماد الملاحظة وجدولة المتابعة",
    "Note approved and follow-up scheduled",
  );
};
$("#acc").onclick = function () {
  toast(
    "أُضيف إلى قسم التقدم بعد موافقتك",
    "Added to Progress with your approval",
  );
};
$("#dis").onclick = function () {
  document.querySelectorAll(".ai .sum").forEach(function (n) {
    n.style.opacity = 0.4;
  });
  toast("تم تجاهل المسودة", "Draft dismissed");
};
$("#langBtn").onclick = function () {
  lang = lang == "ar" ? "en" : "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = lang == "ar" ? "rtl" : "ltr";
  $("#langBtn").textContent = lang == "ar" ? "English" : "العربية";
  tr();
  nav();
  head();
};
window.addEventListener("hashchange", function () {
  go(location.hash.slice(1));
});
cases();
secs();
tr();
go(location.hash.slice(1));
