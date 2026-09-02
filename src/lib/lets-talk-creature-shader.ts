export const LETS_TALK_CREATURE_BG = "#000000";

const VERTEX_SHADER = `#version 300 es
precision highp float;
in vec4 position;
void main() {
  gl_Position = position;
}`;

const FRAGMENT_SHADER = `#version 300 es
/*********
* made by Matthias Hurrle (@atzedent)
* https://codepen.io/atzedent/pen/XJMJxae
*/
precision highp float;
out vec4 O;
uniform float time;
uniform vec2 resolution;
uniform vec2 wheel;
#define FC gl_FragCoord.xy
#define R resolution
#define T (time+wheel.y/1e3)
#define S smoothstep
#define SE(v,a) S(a+1./MN,a-1./MN,v)
#define MN min(R.x,R.y)
#define hue(a) (.5+.5*sin(3.14*(a)+vec3(0,1,2)))
vec3 render(vec2 uv, out float d) {
  vec2 p=uv*6.;
  float
  r=length(p),
  t=atan(p.x,p.y);
  d=sin(p.x*t-.5)*.9;
  d-=cos(t*12.-(p.x*.5*sin(T-p.y*1.6-.4*sin(p.x))));
  float s=d;
  d=SE(abs(d-r),1.);
  return max(d*hue(S(.0,1.,s*s)+r),S(1.,.0,sqrt(r))*hue(6.*r));
}
void main(void) {
  vec2 uv=(FC-.5*R)/MN,
  w=.01*vec2(cos(uv.x+T*.5),cos(uv.y-T*.5-sin(T)));
  float d, k=400., bg=sin(uv.x*k*2.-uv.y*k)-sin(uv.x*k*2.+uv.y*k);
  uv*=mat2(cos(.2*sin(T*.1)-vec4(0,11,33,0)));
  uv+=w-vec2(0,.05);
  vec3 col=render(uv,d);
  O=vec4(max(col,mix(.125*bg*clamp(dot(16.*uv,uv),.0,1.),.08,d)),1);
  vec2 c=FC/R;
  c*=1.-c.yx;
  float v=c.x*c.y*25.;
  O.rgb=tanh(O.rgb)*sqrt(v);
}`;

function compileShader(
  gl: WebGL2RenderingContext,
  type: number,
  source: string,
) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Failed to create shader");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "shader compile failed";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

export function createCreatureRenderer(canvas: HTMLCanvasElement) {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    antialias: false,
    powerPreference: "high-performance",
  });

  if (!gl) {
    throw new Error("WebGL2 is not available");
  }

  const program = gl.createProgram();
  if (!program) throw new Error("Failed to create program");

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

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, 1, -1, -1, 1, 1, 1, -1]),
    gl.STATIC_DRAW,
  );

  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const uniforms = {
    time: gl.getUniformLocation(program, "time"),
    resolution: gl.getUniformLocation(program, "resolution"),
    wheel: gl.getUniformLocation(program, "wheel"),
  };

  const render = (width: number, height: number, time: number, wheelY = 0) => {
    if (width <= 0 || height <= 0) return;

    gl.viewport(0, 0, width, height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(uniforms.resolution, width, height);
    gl.uniform1f(uniforms.time, time);
    gl.uniform2f(uniforms.wheel, 0, wheelY);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const dispose = () => {
    gl.deleteBuffer(buffer);
    gl.deleteVertexArray(vao);
    gl.deleteProgram(program);
  };

  return { render, dispose };
}
