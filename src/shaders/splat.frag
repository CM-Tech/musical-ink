precision highp float;
precision mediump sampler2D;

varying vec2 coords;
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;

void main() {
  vec2 p = coords - point;
  vec2 p2 = coords + point * vec2(1, -1);
  p2.x -= 1.0;
  p.x *= aspectRatio;
  p2.x *= aspectRatio;
  float radiusW = radius * aspectRatio * aspectRatio;
  float splat = length(p);
  float splat2 = exp(-dot(p2, p2) / radiusW);
  vec3 base = texture2D(uTarget, coords).xyz;
  splat = exp(-pow(length(p), 2.0)/radius/radius)/radius/200.0;//pow(max(radius * radius - pow(length(p), 2.0), 0.0), 0.5) / radiusW;
  splat2 = pow(max(radius * radius - pow(length(p2), 2.0), 0.0), 0.5) / radiusW;
  float interp=min(splat, 1.0);
  gl_FragColor = vec4(base*(1.0-interp/10.0) + interp * color, 1.0);
}
