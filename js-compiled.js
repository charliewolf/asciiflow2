var g;
try {
  throw 1;
} catch (aa) {
  window.R = window.R || {};
}
var h = ["+", "\u2012", "\u2013", "-", "|"], m = [">", "<", "^", "v"], ba = h.concat(m), n = "ontouchstart" in window || "onmsgesturechange" in window;
function q(a, b) {
  this.x = a;
  this.y = b;
}
function r(a, b) {
  return null != b && a.x == b.x && a.y == b.y;
}
function s(a, b) {
  return new q(a.x - b.x, a.y - b.y);
}
q.prototype.add = function(a) {
  return new q(this.x + a.x, this.y + a.y);
};
q.prototype.clone = function() {
  return new q(this.x, this.y);
};
q.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};
q.prototype.scale = function(a) {
  return new q(this.x * a, this.y * a);
};
function t(a, b) {
  this.u = Math.min(a.x, b.x);
  this.v = Math.min(a.y, b.y);
  this.F = Math.max(a.x, b.x);
  this.G = Math.max(a.y, b.y);
}
function v(a) {
  return new q(a.u, a.v);
}
t.prototype.contains = function(a) {
  return a.x >= this.u && a.x <= this.F && a.y >= this.v && a.y <= this.G;
};
var w = new q(-1, 0), x = new q(1, 0), y = new q(0, -1), z = new q(0, 1), A = [w, x, y, z];
function ca() {
  this.h = this.value = null;
}
function B(a) {
  return null != a.h ? a.h : a.value;
}
function D(a) {
  return-1 != ba.indexOf(B(a));
}
function E(a) {
  return null == a.value && null == a.h;
}
function da(a, b, c, d) {
  this.left = a;
  this.right = b;
  this.j = c;
  this.i = d;
  this.M = this.I = this.N = this.J = !1;
}
function F(a) {
  return a.left + a.right + a.j + a.i;
}
function G(a, b) {
  this.position = a;
  this.value = b;
}
function ea(a, b) {
  this.position = a;
  this.n = b;
}
;function I(a) {
  this.state = a;
  this.canvas = document.getElementById("ascii-canvas");
  this.context = this.canvas.getContext("2d");
  this.zoom = 1;
  this.offset = new q(9E3, 5100);
  this.f = !0;
  this.w = !1;
  J(this);
}
function J(a) {
  a.canvas.width = document.documentElement.clientWidth;
  a.canvas.height = document.documentElement.clientHeight;
  a.f = !0;
}
I.prototype.animate = function() {
  if (this.f || this.state.f) {
    this.f = !1, this.state.f = !1, fa(this);
  }
  var a = this;
  window.requestAnimationFrame(function() {
    a.animate();
  });
};
function fa(a) {
  var b = a.context;
  b.setTransform(1, 0, 0, 1, 0, 0);
  b.clearRect(0, 0, a.canvas.width, a.canvas.height);
  b.scale(a.zoom, a.zoom);
  b.translate(a.canvas.width / 2 / a.zoom, a.canvas.height / 2 / a.zoom);
  var c = s(K(a, new q(0, 0)), new q(3, 3)), d = K(a, new q(a.canvas.width, a.canvas.height)).add(new q(3, 3));
  c.x = Math.max(0, Math.min(c.x, 2E3));
  d.x = Math.max(0, Math.min(d.x, 2E3));
  c.y = Math.max(0, Math.min(c.y, 600));
  d.y = Math.max(0, Math.min(d.y, 600));
  b.lineWidth = "1";
  b.strokeStyle = "#EEEEEE";
  b.beginPath();
  for (var e = c.x;e < d.x;e++) {
    b.moveTo(9 * e - a.offset.x, 0 - a.offset.y), b.lineTo(9 * e - a.offset.x, 17 * a.state.cells.length - a.offset.y);
  }
  for (e = c.y;e < d.y;e++) {
    b.moveTo(0 - a.offset.x, 17 * e - a.offset.y), b.lineTo(9 * a.state.cells.length - a.offset.x, 17 * e - a.offset.y);
  }
  a.context.stroke();
  e = !a.w;
  b.font = "15px Courier New";
  for (var f = c.x;f < d.x;f++) {
    for (var l = c.y;l < d.y;l++) {
      var k = L(a.state, new q(f, l));
      if (D(k) || null != k.h && " " != B(k)) {
        a.context.fillStyle = null != k.h ? "#DEF" : "#F5F5F5", b.fillRect(9 * f - a.offset.x, 17 * (l - 1) - a.offset.y, 9, 17);
      }
      var p = M(a.state, new q(f, l));
      null == p || D(k) && !e || (a.context.fillStyle = "#000000", b.fillText(p, 9 * f - a.offset.x, 17 * l - a.offset.y - 3));
    }
  }
  if (a.w) {
    b.lineWidth = "1";
    b.strokeStyle = "#000000";
    b.beginPath();
    for (e = c.x;e < d.x;e++) {
      for (k = !1, f = c.y;f < d.y;f++) {
        l = L(a.state, new q(e, f)), D(l) && f != d.y - 1 || !k || (b.moveTo(9 * e - a.offset.x + 4.5, 17 * k - a.offset.y - 8.5), b.lineTo(9 * e - a.offset.x + 4.5, 17 * (f - 1) - a.offset.y - 8.5), k = !1), D(l) && !k && (k = f);
      }
    }
    for (f = c.y;f < d.y;f++) {
      for (k = !1, e = c.x;e < d.x;e++) {
        l = L(a.state, new q(e, f)), D(l) && e != d.x - 1 || !k || (b.moveTo(9 * k - a.offset.x + 4.5, 17 * f - a.offset.y - 8.5), b.lineTo(9 * (e - 1) - a.offset.x + 4.5, 17 * f - a.offset.y - 8.5), k = !1), D(l) && !k && (k = e);
      }
    }
    a.context.stroke();
  }
}
function K(a, b) {
  return new q(Math.min(Math.max(1, Math.round(((new q((b.x - a.canvas.width / 2) / a.zoom + a.offset.x, (b.y - a.canvas.height / 2) / a.zoom + a.offset.y)).x - 4.5) / 9)), 1998), Math.min(Math.max(1, Math.round(((new q((b.x - a.canvas.width / 2) / a.zoom + a.offset.x, (b.y - a.canvas.height / 2) / a.zoom + a.offset.y)).y + 8.5) / 17)), 598));
}
;function N(a, b, c, d, e) {
  e = e || "+";
  var f = new t(b, c), l = f.u, k = f.v, p = f.F, f = f.G, C = d ? c.x : b.x;
  for (d = d ? b.y : c.y;l++ < p;) {
    var u = new q(l, d), H = a.getContext(new q(l, d));
    " " == e && 2 == H.j + H.i || O(a, u, e);
  }
  for (;k++ < f;) {
    u = new q(C, k), H = a.getContext(new q(C, k)), " " == e && 2 == H.left + H.right || O(a, u, e);
  }
  P(a, b, e);
  P(a, c, e);
  O(a, new q(C, d), e);
}
function Q(a) {
  this.state = a;
  this.a = null;
}
g = Q.prototype;
g.start = function(a) {
  this.a = a;
};
g.move = function(a) {
  this.b = a;
  S(this.state);
  N(this.state, this.a, a, !0);
  N(this.state, this.a, a, !1);
};
g.end = function() {
  T(this.state);
};
g.l = function() {
  return "crosshair";
};
g.g = function() {
};
function U(a, b) {
  this.state = a;
  this.S = b;
  this.a = null;
}
g = U.prototype;
g.start = function(a) {
  this.a = a;
};
g.move = function(a) {
  S(this.state);
  var b = this.state.getContext(this.a), c = this.state.getContext(a);
  N(this.state, this.a, a, b.j && b.i || c.left && c.right);
  this.S && P(this.state, a, "^");
};
g.end = function() {
  T(this.state);
};
g.l = function() {
  return "crosshair";
};
g.g = function() {
};
function ga(a, b) {
  this.state = a;
  this.value = b;
  n && ($("#freeform-tool-input").val(""), $("#freeform-tool-input").hide(0, function() {
    $("#freeform-tool-input").show(0, function() {
      $("#freeform-tool-input").focus();
    });
  }));
}
g = ga.prototype;
g.start = function(a) {
  P(this.state, a, this.value);
};
g.move = function(a) {
  P(this.state, a, this.value);
};
g.end = function() {
  T(this.state);
};
g.l = function() {
  return "crosshair";
};
g.g = function(a) {
  n && (this.value = $("#freeform-tool-input").val().substr(0, 1), $("#freeform-tool-input").blur(), $("#freeform-tool-input").hide(0));
  1 == a.length && (this.value = a);
};
function ha(a) {
  this.state = a;
  this.a = null;
}
g = ha.prototype;
g.start = function(a) {
  T(this.state);
  $("#text-tool-input").val("");
  this.a = a;
  a = B(L(this.state, this.a));
  P(this.state, this.a, null == a ? "\u2009" : a);
};
g.move = function() {
};
g.end = function() {
  null != this.a && (this.b = this.a, this.a = null, $("#text-tool-widget").hide(0, function() {
    $("#text-tool-widget").show(0, function() {
      $("#text-tool-input").focus();
    });
  }));
};
g.l = function() {
  return "pointer";
};
g.g = function() {
  var a = $("#text-tool-input").val();
  S(this.state);
  for (var b = 0, c = 0, d = 0;d < a.length;d++) {
    "\n" == a[d] ? (c++, b = 0) : (P(this.state, this.b.add(new q(b, c)), a[d]), b++);
  }
};
function V(a) {
  this.state = a;
  this.b = this.a = null;
}
g = V.prototype;
g.start = function(a) {
  this.a = a;
  this.move(a);
};
g.move = function(a) {
  S(this.state);
  this.b = a;
  var b = Math.min(this.a.x, this.b.x);
  a = Math.min(this.a.y, this.b.y);
  for (var c = Math.max(this.a.x, this.b.x), d = Math.max(this.a.y, this.b.y);b <= c;b++) {
    for (var e = a;e <= d;e++) {
      P(this.state, new q(b, e), "\u2009");
    }
  }
};
g.end = function() {
  T(this.state);
};
g.l = function() {
  return "crosshair";
};
g.g = function() {
};
function ia(a) {
  this.state = a;
  this.e = this.a = null;
}
g = ia.prototype;
g.start = function(a) {
  var b;
  if (n) {
    if (D(L(this.state, a))) {
      b = a;
    } else {
      b = A.concat([w.add(y), w.add(z), x.add(y), x.add(z)]);
      var c = null, d = 0, e;
      for (e in b) {
        var f = a.add(b[e]), l = F(this.state.getContext(f));
        D(L(this.state, f)) && l > d && (c = b[e], d = l);
      }
      b = null == c ? a : a.add(c);
    }
  } else {
    b = a;
  }
  this.a = b;
  this.e = null;
  if (D(L(this.state, this.a))) {
    this.state.getContext(this.a);
    b = [];
    for (var k in A) {
      var c = ja(this, this.a, A[k]), p;
      for (p in c) {
        if (d = c[p], e = 0 != A[k].x, f = -1 != m.indexOf(B(L(this.state, a))), l = -1 != m.indexOf(B(L(this.state, d))), 1 == F(this.state.getContext(d))) {
          b.push({position:d, o:e, Q:f, P:l});
        } else {
          for (var C in A) {
            if (0 != A[k].add(A[C]).length() && 2 != A[k].add(A[C]).length()) {
              var u = ja(this, d, A[C]);
              0 != u.length && (u = u[0], b.push({position:u, o:e, Q:f, T:l, P:-1 != m.indexOf(B(L(this.state, u)))}));
            }
          }
        }
      }
    }
    this.e = b;
    this.move(this.a);
  }
};
g.move = function(a) {
  S(this.state);
  for (var b in this.e) {
    N(this.state, this.a, this.e[b].position, this.e[b].o, " ");
  }
  for (b in this.e) {
    N(this.state, a, this.e[b].position, this.e[b].o);
  }
  for (b in this.e) {
    this.e[b].Q && P(this.state, a, "^"), this.e[b].P && P(this.state, this.e[b].position, "^"), this.e[b].T && P(this.state, new q(this.e[b].o ? this.e[b].position.x : a.x, this.e[b].o ? a.y : this.e[b].position.y), "^");
  }
};
g.end = function() {
  T(this.state);
};
function ja(a, b, c) {
  for (var d = b.clone(), e = [];;) {
    var f = d.add(c);
    if (!D(L(a.state, f))) {
      return r(b, d) || e.push(d), e;
    }
    d = f;
    3 == F(a.state.getContext(d)) && e.push(d);
  }
}
g.l = function(a) {
  return D(L(this.state, a)) ? "pointer" : "default";
};
g.g = function() {
};
function ka(a) {
  this.state = a;
  this.B = this.p = this.b = this.a = null;
  this.H = !0;
  this.t = null;
}
g = ka.prototype;
g.start = function(a) {
  null != this.a && null != this.b && (new t(this.a, this.b)).contains(a) ? (this.p = a, la(this), ma(this, a)) : (this.a = a, this.b = null, this.H = !1, this.move(a));
};
function la(a) {
  var b = a.state.k.filter(function(a) {
    return null != B(a.n) && "\u2009" != B(a.n);
  }), c = v(new t(a.a, a.b));
  a.t = b.map(function(a) {
    return new G(s(a.position, c), B(a.n));
  });
}
g.move = function(a) {
  if (null != this.p) {
    ma(this, a);
  } else {
    if (!0 != this.H) {
      this.b = a;
      S(this.state);
      a = new t(this.a, a);
      for (var b = a.u;b <= a.F;b++) {
        for (var c = a.v;c <= a.G;c++) {
          var d = new q(b, c), e = B(L(this.state, d));
          P(this.state, d, null == e ? "\u2009" : e);
        }
      }
    }
  }
};
function ma(a, b) {
  a.B = b;
  S(a.state);
  var c = new V(a.state);
  c.start(a.a);
  c.move(a.b);
  c = s(a.B, a.p).add(v(new t(a.a, a.b)));
  na(a, c);
}
function na(a, b) {
  for (var c in a.t) {
    P(a.state, a.t[c].position.add(b), a.t[c].value);
  }
}
g.end = function() {
  null != this.p && (T(this.state), this.b = this.a = null);
  this.B = this.p = null;
  this.H = !0;
};
g.l = function(a) {
  return null != this.a && null != this.b && (new t(this.a, this.b)).contains(a) ? "pointer" : "default";
};
g.g = function(a) {
  if (null != this.a && null != this.b && ("<copy>" != a && "<cut>" != a || la(this), "<cut>" == a)) {
    var b = new V(this.state);
    b.start(this.a);
    b.move(this.b);
    T(this.state);
  }
  "<paste>" == a && (na(this, this.a), T(this.state));
};
function W() {
  this.cells = Array(2E3);
  this.k = [];
  this.f = !0;
  this.O = [];
  this.L = [];
  for (var a = 0;a < this.cells.length;a++) {
    this.cells[a] = Array(600);
    for (var b = 0;b < this.cells[a].length;b++) {
      this.cells[a][b] = new ca;
    }
  }
}
W.prototype.clear = function() {
  for (var a = 0;a < this.cells.length;a++) {
    for (var b = 0;b < this.cells[a].length;b++) {
      null != B(this.cells[a][b]) && P(this, new q(a, b), "\u2009");
    }
  }
  T(this);
};
function L(a, b) {
  return a.cells[b.x][b.y];
}
function P(a, b, c) {
  var d = L(a, b);
  a.k.push(new ea(b, d));
  d.h = c;
  a.f = !0;
}
function O(a, b, c) {
  B(L(a, b)) != c && P(a, b, c);
}
function S(a) {
  for (var b in a.k) {
    a.k[b].n.h = null;
  }
  a.k.length = 0;
}
function M(a, b) {
  var c = L(a, b), d = null != c.h ? c.h : c.value, e = -1 != h.indexOf(d), f = -1 != m.indexOf(d);
  if (!e && !f) {
    return d;
  }
  c = a.getContext(b);
  if (e && c.left && c.right && !c.j && !c.i) {
    return "-";
  }
  if (e && !c.left && !c.right && c.j && c.i) {
    return "|";
  }
  if (4 == F(c)) {
    return "-";
  }
  if (f && 3 == F(c)) {
    if (!c.left) {
      return "<";
    }
    if (!c.j) {
      return "^";
    }
    if (!c.i) {
      return "v";
    }
    if (!c.right) {
      return ">";
    }
  }
  if ((e || f) && 3 == F(c)) {
    c.J = D(L(a, b.add(w).add(y)));
    c.N = D(L(a, b.add(x).add(y)));
    c.I = D(L(a, b.add(w).add(z)));
    c.M = D(L(a, b.add(x).add(z)));
    if (!c.right && c.J && c.I || !c.left && c.N && c.M) {
      return "|";
    }
    if (!c.i && c.J && c.N || !c.j && c.M && c.I) {
      return "-";
    }
    d = E(L(a, b.add(w).add(y)));
    e = E(L(a, b.add(x).add(y)));
    if (c.j && c.left && c.right && (!d || !e)) {
      return "-";
    }
    d = E(L(a, b.add(w).add(z)));
    e = E(L(a, b.add(x).add(z)));
    return!c.i || !c.left || !c.right || d && e ? "+" : "-";
  }
  if (f && 1 == F(c)) {
    if (c.left) {
      return ">";
    }
    if (c.j) {
      return "v";
    }
    if (c.i) {
      return "^";
    }
    if (c.right) {
      return "<";
    }
  }
  return d;
}
W.prototype.getContext = function(a) {
  var b = D(L(this, a.add(w))), c = D(L(this, a.add(x))), d = D(L(this, a.add(y)));
  a = D(L(this, a.add(z)));
  return new da(b, c, d, a);
};
function T(a, b) {
  var c = [], d = a.k.map(function(a) {
    return a.position.x.toString() + a.position.y.toString();
  }), e = a.k.filter(function(a, b) {
    return d.indexOf(d[b]) == b;
  });
  a.k.length = 0;
  for (var f in e) {
    var l = e[f].position, k = e[f].n;
    c.push(new G(l, null != k.value ? k.value : " "));
    var p = B(k);
    if ("\u2009" == p || " " == p) {
      p = null;
    }
    D(k) && (p = M(a, l));
    k.h = null;
    k.value = p;
  }
  e = b ? a.L : a.O;
  0 < c.length && (50 < e.length && e.shift(), e.push(c));
  a.f = !0;
}
function oa(a) {
  if (0 != a.O.length) {
    var b = a.O.pop(), c;
    for (c in b) {
      var d = b[c];
      P(a, d.position, d.value);
    }
    T(a, !0);
  }
}
function pa(a) {
  if (0 != a.L.length) {
    var b = a.L.pop(), c;
    for (c in b) {
      var d = b[c];
      P(a, d.position, d.value);
    }
    T(a);
  }
}
function qa(a) {
  for (var b = new q(Number.MAX_VALUE, Number.MAX_VALUE), c = new q(-1, -1), d = 0;d < a.cells.length;d++) {
    for (var e = 0;e < a.cells[d].length;e++) {
      null != B(a.cells[d][e]) && (d < b.x && (b.x = d), e < b.y && (b.y = e), d > c.x && (c.x = d), e > c.y && (c.y = e));
    }
  }
  if (0 > c.x) {
    return "";
  }
  for (var f = "", e = b.y;e <= c.y;e++) {
    for (var l = "", d = b.x;d <= c.x;d++) {
      var k = M(a, new q(d, e)), l = l + (null == k || "\u2009" == k ? " " : k)
    }
    f += l.replace(/\s+$/, "") + "\n";
  }
  return f;
}
;function X(a, b) {
  this.view = a;
  this.state = b;
  this.d = new Q(b);
  this.mode = 0;
  this.q();
}
X.prototype.s = function(a) {
  var b = K(this.view, a);
  null == this.r && (this.r = b);
  r(b, this.r) || (this.view.canvas.style.cursor = this.d.l(b));
  2 != this.mode || r(b, this.r) || this.d.move(b);
  if (1 == this.mode) {
    var c = this.view;
    a = this.D.add(s(this.C, a).scale(1 / this.view.zoom));
    c.offset = a;
    c.f = !0;
  }
  this.r = b;
};
function Y(a) {
  2 == a.mode && a.d.end();
  a.mode = 0;
  a.C = null;
  a.D = null;
  a.r = null;
}
X.prototype.q = function() {
  var a = this;
  $(window).resize(function() {
    J(a.view);
  });
  $("#draw-tools > button.tool").click(function(a) {
    $("#text-tool-widget").hide(0);
    a = a.target.id;
    $("#draw-tools > button.tool").removeClass("active");
    $("#" + a).toggleClass("active");
    $(".dialog").removeClass("visible");
    "box-button" == a && (this.d = new Q(this.state));
    "line-button" == a && (this.d = new U(this.state, !1));
    "arrow-button" == a && (this.d = new U(this.state, !0));
    "freeform-button" == a && (this.d = new ga(this.state, "X"));
    "erase-button" == a && (this.d = new V(this.state));
    "move-button" == a && (this.d = new ia(this.state));
    "text-button" == a && (this.d = new ha(this.state));
    "select-button" == a && (this.d = new ka(this.state));
    T(this.state);
    this.view.canvas.focus();
  }.bind(this));
  $("#file-tools > button.tool").click(function(a) {
    a = a.target.id;
    $(".dialog").removeClass("visible");
    $("#" + a + "-dialog").toggleClass("visible");
    "import-button" == a && ($("#import-area").val(""), $("#import-area").focus());
    "export-button" == a && ($("#export-area").val(qa(this.state)), $("#export-area").select());
    "clear-button" == a && this.state.clear();
    "undo-button" == a && oa(this.state);
    "redo-button" == a && pa(this.state);
  }.bind(this));
  $("button.close-dialog-button").click(function() {
    $(".dialog").removeClass("visible");
  }.bind(this));
  $("#import-submit-button").click(function() {
    this.state.clear();
    for (var a = this.state, c = $("#import-area").val(), d = K(this.view, new q(this.view.canvas.width / 2, this.view.canvas.height / 2)), c = c.split("\n"), e = new q(0, Math.round(c.length / 2)), f = 0;f < c.length;f++) {
      e.x = Math.max(e.x, Math.round(c[f].length / 2));
    }
    for (f = 0;f < c.length;f++) {
      for (var l = c[f], k = 0;k < l.length;k++) {
        var p = l.charAt(k);
        -1 != h.indexOf(p) && (p = "+");
        -1 != m.indexOf(p) && (p = "^");
        P(a, s((new q(k, f)).add(d), e), p);
      }
    }
    T(this.state);
    $("#import-area").val("");
    $(".dialog").removeClass("visible");
  }.bind(this));
  $("#use-lines-button").click(function() {
    $(".dialog").removeClass("visible");
    var a = this.view;
    a.w = !0;
    a.f = !0;
  }.bind(this));
  $("#use-ascii-button").click(function() {
    $(".dialog").removeClass("visible");
    var a = this.view;
    a.w = !1;
    a.f = !0;
  }.bind(this));
  $(window).keypress(function(a) {
    a.ctrlKey || a.metaKey || 13 == a.keyCode || this.d.g(String.fromCharCode(a.keyCode));
  }.bind(this));
  $(window).keydown(function(a) {
    var c = null;
    if (a.ctrlKey || a.metaKey) {
      67 == a.keyCode && (c = "<copy>"), 86 == a.keyCode && (c = "<paste>"), 90 == a.keyCode && oa(this.state), 89 == a.keyCode && pa(this.state), 88 == a.keyCode && (c = "<cut>");
    }
    8 == a.keyCode && (c = "<backspace>");
    13 == a.keyCode && (c = "<enter>");
    38 == a.keyCode && (c = "<up>");
    40 == a.keyCode && (c = "<down>");
    37 == a.keyCode && (c = "<left>");
    39 == a.keyCode && (c = "<right>");
    null != c && this.d.g(c);
  }.bind(this));
  $("#text-tool-input, #freeform-tool-input").keyup(function() {
    this.d.g("");
  }.bind(this));
  $("#text-tool-input, #freeform-tool-input").change(function() {
    this.d.g("");
  }.bind(this));
  $("#text-tool-close").click(function() {
    $("#text-tool-widget").hide();
    T(this.state);
  }.bind(this));
};
function ra(a) {
  this.c = a;
  this.q();
}
ra.prototype.q = function() {
  var a = this.c.view.canvas;
  $(a).bind("mousewheel", function(a) {
    a = this.c.view.zoom * (0 < a.originalEvent.wheelDelta ? 1.1 : 0.9);
    a = Math.max(Math.min(a, 5), 0.2);
    var c = this.c.view;
    c.zoom = a;
    c.f = !0;
  }.bind(this));
  $(a).mousedown(function(a) {
    if (a.ctrlKey || a.metaKey) {
      var c = this.c;
      a = new q(a.clientX, a.clientY);
      c.mode = 1;
      c.C = a;
      c.D = c.view.offset;
    } else {
      c = this.c, a = new q(a.clientX, a.clientY), c.mode = 2, c.d.start(K(c.view, a));
    }
  }.bind(this));
  $(a).mouseup(function() {
    Y(this.c);
  }.bind(this));
  $(a).mouseleave(function() {
    Y(this.c);
  }.bind(this));
  $(a).mousemove(function(a) {
    this.c.s(new q(a.clientX, a.clientY));
  }.bind(this));
};
function Z(a) {
  this.c = a;
  this.A = this.m = !1;
  this.q();
}
function sa(a, b) {
  a.K = b;
  a.V = $.now();
  a.m = !1;
  window.setTimeout(function() {
    if (!this.m && !this.A && null != this.K) {
      var a = this.c;
      a.mode = 2;
      a.d.start(K(a.view, b));
    }
  }.bind(a), 150);
}
Z.prototype.s = function(a) {
  if (!this.m && 150 > $.now() - this.V && 6 < s(a, this.K).length()) {
    this.m = !0;
    var b = this.c;
    b.mode = 1;
    b.C = a;
    b.D = b.view.offset;
  }
  this.c.s(a);
};
Z.prototype.reset = function() {
  this.A = this.m = !1;
  this.K = null;
};
Z.prototype.q = function() {
  var a = this.c.view.canvas;
  $(a).bind("touchstart", function(a) {
    a.preventDefault();
    if (1 == a.originalEvent.touches.length) {
      sa(this, new q(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY));
    } else {
      if (1 < a.originalEvent.touches.length) {
        var c = new q(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY);
        a = new q(a.originalEvent.touches[1].pageX, a.originalEvent.touches[1].pageY);
        Y(this.c);
        this.A = !0;
        this.m = !1;
        this.W = s(c, a).length();
        this.U = this.c.view.zoom;
      }
    }
  }.bind(this));
  $(a).bind("touchmove", function(a) {
    a.preventDefault();
    if (1 == a.originalEvent.touches.length) {
      this.s(new q(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY));
    } else {
      if (1 < a.originalEvent.touches.length) {
        var c = new q(a.originalEvent.touches[0].pageX, a.originalEvent.touches[0].pageY);
        a = new q(a.originalEvent.touches[1].pageX, a.originalEvent.touches[1].pageY);
        this.A && (c = this.U * s(c, a).length() / this.W, c = Math.max(Math.min(c, 5), 0.5), a = this.c.view, a.zoom = c, a.f = !0);
      }
    }
  }.bind(this));
  $(a).bind("touchend", function(a) {
    a.preventDefault();
    this.reset();
    Y(this.c);
  }.bind(this));
};
var ta = new W, ua = new I(ta), va = new X(ua, ta);
new Z(va);
new ra(va);
ua.animate();

