export type OrbValues = {
  radius: number;
  deform: number;
  frequency: number;
  morphSpeed: number;
  rotSpeed: number;
  specular: number;
  shininess: number;
  glowStrength: number;
  colorBlue: string;
  colorMagenta: string;
  glowA: string;
  glowB: string;
  liquidSpeed: number;
  liquidScale: number;
  liquidBright: number;
  filament: number;
  core: number;
  background: string;
};

export type OrbPlacement = {
  x: number;
  y: number;
  size: number;
  values: OrbValues;
  parallax: number;
};

export const HOW_WE_WORK_BG = "#070A18";

export const ORB_PLACEMENTS: OrbPlacement[] = [
  {
    x: 0.08,
    y: 0.12,
    size: 0.42,
    parallax: 36,
    values: {
      radius: 0.32,
      deform: 0.38,
      frequency: 2.1,
      morphSpeed: 1.15,
      rotSpeed: 0.13,
      specular: 1.1,
      shininess: 150,
      glowStrength: 0.78,
      colorBlue: "#4099FF",
      colorMagenta: "#E633BF",
      glowA: "#33B5FF",
      glowB: "#E24DD0",
      liquidSpeed: 0.52,
      liquidScale: 2.25,
      liquidBright: 1.05,
      filament: 1.55,
      core: 0.32,
      background: HOW_WE_WORK_BG,
    },
  },
  {
    x: 0.72,
    y: 0.08,
    size: 0.38,
    parallax: 28,
    values: {
      radius: 0.3,
      deform: 0.34,
      frequency: 2.0,
      morphSpeed: 1.25,
      rotSpeed: 0.11,
      specular: 1.0,
      shininess: 140,
      glowStrength: 0.72,
      colorBlue: "#9CFF4D",
      colorMagenta: "#00E5A0",
      glowA: "#57FF3C",
      glowB: "#00FFC8",
      liquidSpeed: 0.48,
      liquidScale: 2.15,
      liquidBright: 1.0,
      filament: 1.45,
      core: 0.28,
      background: HOW_WE_WORK_BG,
    },
  },
  {
    x: 0.14,
    y: 0.58,
    size: 0.36,
    parallax: 44,
    values: {
      radius: 0.31,
      deform: 0.4,
      frequency: 2.3,
      morphSpeed: 1.35,
      rotSpeed: 0.16,
      specular: 1.05,
      shininess: 135,
      glowStrength: 0.75,
      colorBlue: "#FFC24D",
      colorMagenta: "#FF3B2F",
      glowA: "#FF7A18",
      glowB: "#FF2D55",
      liquidSpeed: 0.62,
      liquidScale: 2.4,
      liquidBright: 1.08,
      filament: 1.65,
      core: 0.34,
      background: HOW_WE_WORK_BG,
    },
  },
  {
    x: 0.76,
    y: 0.54,
    size: 0.4,
    parallax: 32,
    values: {
      radius: 0.33,
      deform: 0.32,
      frequency: 1.9,
      morphSpeed: 1.1,
      rotSpeed: 0.09,
      specular: 1.2,
      shininess: 165,
      glowStrength: 0.68,
      colorBlue: "#9CE3FF",
      colorMagenta: "#E6F7FF",
      glowA: "#6FD2FF",
      glowB: "#BFEFFF",
      liquidSpeed: 0.4,
      liquidScale: 2.05,
      liquidBright: 0.95,
      filament: 1.25,
      core: 0.3,
      background: HOW_WE_WORK_BG,
    },
  },
  {
    x: 0.48,
    y: 0.72,
    size: 0.34,
    parallax: 24,
    values: {
      radius: 0.29,
      deform: 0.36,
      frequency: 2.2,
      morphSpeed: 1.2,
      rotSpeed: 0.14,
      specular: 0.95,
      shininess: 125,
      glowStrength: 0.7,
      colorBlue: "#B14DFF",
      colorMagenta: "#FF2DA0",
      glowA: "#9B5CFF",
      glowB: "#FF3DBE",
      liquidSpeed: 0.58,
      liquidScale: 2.35,
      liquidBright: 1.0,
      filament: 1.4,
      core: 0.26,
      background: HOW_WE_WORK_BG,
    },
  },
];

export const VERTEX_SHADER = `#version 300 es
layout(location=0) in vec2 a_pos;
out vec2 v_uv;
void main(){ v_uv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }`;

export const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform float u_time;
uniform vec2  u_res;
uniform float u_radius;
uniform float u_deform;
uniform float u_freq;
uniform float u_morphSpeed;
uniform float u_rotSpeed;
uniform float u_specular;
uniform float u_shininess;
uniform float u_glowStrength;
uniform vec3  u_colBlue;
uniform vec3  u_colMag;
uniform vec3  u_glowA;
uniform vec3  u_glowB;
uniform float u_liquidSpeed;
uniform float u_liquidScale;
uniform float u_liquidBright;
uniform float u_filament;
uniform float u_core;
uniform vec3  u_bg;
uniform float u_blend;

mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

float blobField(vec3 p){
  float t = u_time * u_morphSpeed;
  float f = u_freq;
  float d = 0.0;
  d += sin(p.x * 2.6 * f + t * 1.00);
  d += sin(p.y * 2.9 * f - t * 0.80 + 1.3);
  d += sin(p.z * 3.2 * f + t * 1.20 + 2.7);
  d += sin((p.x + p.z) * 2.2 * f - t * 0.90 + 4.1);
  d += sin((p.y - p.x) * 2.4 * f + t * 0.70 + 0.6);
  return d * 0.2;
}

float mapBlob(vec3 p){
  float t = u_time * u_rotSpeed;
  p.xy *= rot(t * 0.7);
  p.yz *= rot(t * 0.5);
  float r = u_radius + u_deform * blobField(p);
  return length(p) - r;
}

vec3 calcNormal(vec3 p){
  vec2 e = vec2(0.0015, 0.0);
  return normalize(vec3(
    mapBlob(p + e.xyy) - mapBlob(p - e.xyy),
    mapBlob(p + e.yxy) - mapBlob(p - e.yxy),
    mapBlob(p + e.yyx) - mapBlob(p - e.yyx)));
}

float hash13(vec3 p3){ p3 = fract(p3 * 0.1031); p3 += dot(p3, p3.zyx + 31.32); return fract((p3.x + p3.y) * p3.z); }
float vnoise3(vec3 p){
  vec3 i = floor(p), f = fract(p); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash13(i + vec3(0,0,0)), hash13(i + vec3(1,0,0)), f.x),
                 mix(hash13(i + vec3(0,1,0)), hash13(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash13(i + vec3(0,0,1)), hash13(i + vec3(1,0,1)), f.x),
                 mix(hash13(i + vec3(0,1,1)), hash13(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm3(vec3 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 3; i++){ v += a * vnoise3(p); p *= 2.03; a *= 0.5; } return v; }

float liquid(vec3 p){
  float t = u_time * u_liquidSpeed;
  p *= u_liquidScale;
  p.xy *= rot(t * 0.15);
  p.yz *= rot(t * 0.10);
  vec3 w = vec3(fbm3(p + t * 0.2), fbm3(p + vec3(4.3, 1.2, -t * 0.15)), fbm3(p.zxy + vec3(7.7, 2.3, t * 0.10)));
  return fbm3(p + 1.8 * w);
}

void main(){
  vec2 p = v_uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;

  vec3 ro = vec3(0.0, 0.0, 3.0);
  vec3 rd = normalize(vec3(p, -1.8));

  float t = 0.0;
  bool hit = false;
  vec3 pos = ro;
  float minD = 1e3;
  for (int i = 0; i < 160; i++) {
    pos = ro + rd * t;
    float d = mapBlob(pos);
    minD = min(minD, d);
    if (d < 0.001) { hit = true; break; }
    t += d * 0.40;
    if (t > 6.0) break;
  }

  vec3 E = vec3(0.0);

  if (hit) {
    vec3 n = calcNormal(pos);
    vec3 v = -rd;
    float fres = pow(1.0 - max(dot(n, v), 0.0), 3.0);

    vec3 rp = pos + rd * 0.04;
    float trans = 1.0;
    vec3 inner = vec3(0.0);
    for (int k = 0; k < 10; k++) {
      float raw = liquid(rp);
      float dens = smoothstep(0.30, 0.70, raw);
      float fil = pow(1.0 - abs(2.0 * raw - 1.0), 5.0);
      vec3 c = mix(u_colMag, u_colBlue, 0.5 + 0.5 * sin(raw * 6.0 + u_time * 0.3 + rp.y * 2.5));
      vec3 emit = c * dens * 0.55 + c * fil * u_filament + vec3(1.0) * pow(fil, 3.0) * u_filament * 0.4;
      emit += u_colBlue * smoothstep(0.5, 0.0, length(rp)) * u_core;
      inner += trans * emit * 0.17;
      trans *= 0.84;
      rp += rd * 0.11;
      if (length(rp) > 1.0) break;
    }
    E += inner * (1.0 - fres * 0.6) * u_liquidBright;

    vec3 rim = mix(u_colMag, u_colBlue, 0.5 + 0.5 * (n.x * 0.7 + n.y * 0.45));
    E += rim * fres * 1.3;
    vec3 l1 = normalize(vec3(0.6, 0.85, 0.6));
    vec3 l2 = normalize(vec3(-0.7, 0.25, 0.55));
    vec3 h1 = normalize(l1 + v);
    vec3 h2 = normalize(l2 + v);
    E += vec3(1.0) * pow(max(dot(n, h1), 0.0), u_shininess) * 1.3 * u_specular;
    E += vec3(0.8, 0.9, 1.0) * pow(max(dot(n, h2), 0.0), u_shininess * 0.45) * 0.6 * u_specular;
  } else {
    float g = exp(-minD * 5.5);
    float ang = atan(rd.y, rd.x);
    vec3 gc = mix(u_glowA, u_glowB, 0.5 + 0.5 * sin(ang * 3.0 + u_time * 0.5));
    E += (gc * g * 1.4 + vec3(0.6, 0.8, 1.0) * pow(g, 3.0) * 0.7) * u_glowStrength;
  }

  vec3 glowCol = u_bg + E;
  float cov = clamp(max(E.r, max(E.g, E.b)), 0.0, 1.0);
  vec3 inkCol = mix(u_bg, E / (1.0 + E), cov);
  vec3 col = mix(glowCol, inkCol, u_blend);

  fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

export function hexToRgb(hex: string): [number, number, number] {
  let h = hex.replace("#", "");
  if (h.length === 3) h = h.split("").map((c) => c + c).join("");
  const n = parseInt(h, 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

export function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  src: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create shader");

  gl.shaderSource(shader, src);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "shader compile failed";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

export function createOrbRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
  if (!gl) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER));
  gl.attachShader(
    program,
    compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER),
  );
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) ?? "shader link failed");
  }

  gl.useProgram(program);

  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    time: gl.getUniformLocation(program, "u_time"),
    res: gl.getUniformLocation(program, "u_res"),
    radius: gl.getUniformLocation(program, "u_radius"),
    deform: gl.getUniformLocation(program, "u_deform"),
    freq: gl.getUniformLocation(program, "u_freq"),
    morphSpeed: gl.getUniformLocation(program, "u_morphSpeed"),
    rotSpeed: gl.getUniformLocation(program, "u_rotSpeed"),
    specular: gl.getUniformLocation(program, "u_specular"),
    shininess: gl.getUniformLocation(program, "u_shininess"),
    glowStrength: gl.getUniformLocation(program, "u_glowStrength"),
    colBlue: gl.getUniformLocation(program, "u_colBlue"),
    colMag: gl.getUniformLocation(program, "u_colMag"),
    glowA: gl.getUniformLocation(program, "u_glowA"),
    glowB: gl.getUniformLocation(program, "u_glowB"),
    liquidSpeed: gl.getUniformLocation(program, "u_liquidSpeed"),
    liquidScale: gl.getUniformLocation(program, "u_liquidScale"),
    liquidBright: gl.getUniformLocation(program, "u_liquidBright"),
    filament: gl.getUniformLocation(program, "u_filament"),
    core: gl.getUniformLocation(program, "u_core"),
    bg: gl.getUniformLocation(program, "u_bg"),
    blend: gl.getUniformLocation(program, "u_blend"),
  };

  const drawOrb = (
    x: number,
    y: number,
    w: number,
    h: number,
    values: OrbValues,
    time: number,
  ) => {
    if (w <= 0 || h <= 0) return;

    gl.viewport(x, y, w, h);
    gl.scissor(x, y, w, h);
    gl.uniform1f(uniforms.time, time);
    gl.uniform2f(uniforms.res, w, h);
    gl.uniform1f(uniforms.radius, values.radius);
    gl.uniform1f(uniforms.deform, values.deform);
    gl.uniform1f(uniforms.freq, values.frequency);
    gl.uniform1f(uniforms.morphSpeed, values.morphSpeed);
    gl.uniform1f(uniforms.rotSpeed, values.rotSpeed);
    gl.uniform1f(uniforms.specular, values.specular);
    gl.uniform1f(uniforms.shininess, values.shininess);
    gl.uniform1f(uniforms.glowStrength, values.glowStrength);
    gl.uniform3fv(uniforms.colBlue, hexToRgb(values.colorBlue));
    gl.uniform3fv(uniforms.colMag, hexToRgb(values.colorMagenta));
    gl.uniform3fv(uniforms.glowA, hexToRgb(values.glowA));
    gl.uniform3fv(uniforms.glowB, hexToRgb(values.glowB));
    gl.uniform1f(uniforms.liquidSpeed, values.liquidSpeed);
    gl.uniform1f(uniforms.liquidScale, values.liquidScale);
    gl.uniform1f(uniforms.liquidBright, values.liquidBright);
    gl.uniform1f(uniforms.filament, values.filament);
    gl.uniform1f(uniforms.core, values.core);
    gl.uniform3fv(uniforms.bg, hexToRgb(values.background));
    gl.uniform1f(uniforms.blend, 0);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const render = (width: number, height: number, time: number, scroll = 0) => {
    const bg = hexToRgb(HOW_WE_WORK_BG);
    gl.clearColor(bg[0], bg[1], bg[2], 1);
    gl.disable(gl.SCISSOR_TEST);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.SCISSOR_TEST);

    for (const placement of ORB_PLACEMENTS) {
      const side = Math.min(width, height) * placement.size;
      const px = placement.x * width - side * 0.5;
      const py =
        placement.y * height -
        side * 0.5 +
        (scroll - 0.5) * placement.parallax;

      drawOrb(
        Math.floor(px),
        Math.floor(py),
        Math.ceil(side),
        Math.ceil(side),
        placement.values,
        time,
      );
    }
  };

  return { gl, render };
}
