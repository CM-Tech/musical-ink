export default "precision highp float;\nprecision mediump sampler2D;\n\nvarying vec2 coords;\nuniform sampler2D density;\nuniform vec2 texelSize; // 1 / grid scale\nvec3 rgb2hsv(vec3 c) {\n  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);\n  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));\n  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));\n\n  float d = q.x - min(q.w, q.y);\n  float e = 1.0e-10;\n  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);\n}\nvec3 hsv2rgb(vec3 c) {\n  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n}\nvoid main() {\n  float pixelSize = 0.5;\n  vec2 coords2 = floor(coords / texelSize / pixelSize) * texelSize * pixelSize;\n  vec2 coordsTL =\n      floor(coords / texelSize / pixelSize) * texelSize * pixelSize +\n      vec2(-texelSize.x, texelSize.y);\n  vec2 coordsTR =\n      floor(coords / texelSize / pixelSize) * texelSize * pixelSize +\n      vec2(texelSize.x, texelSize.y);\n  float w = texture2D(density, coords2).a;\n  vec3 gog=texture2D(density, coords2).rgb;\n  vec3 hsvT = rgb2hsv(texture2D(density, coords2).rgb);\n  vec3 hsvTE = rgb2hsv(texture2D(density, coords2).rgb);\n  vec3 cTL = vec3(vec2(-1.0, -1.0) * 0.025,\n                  rgb2hsv(texture2D(density, coordsTL).rgb).z);\n  vec3 cTR = vec3(vec2(1.0, -1.0) * 0.025,\n                  rgb2hsv(texture2D(density, coordsTR).rgb).z);\n  vec3 c = vec3(0.0, 0.0, rgb2hsv(texture2D(density, coords2).rgb).z);\n  vec3 norm = normalize(cross(cTL - c, cTR - c));\n  //hsvT.y = 0.0;\n  hsvTE.y = hsvTE.z*(1.0-hsvTE.z)*4.0;\n  hsvTE.z = 1.0-hsvTE.z*2.0 ;\n  //hsvT.z = -dot(norm, normalize(vec3(1.0, 1.0, -1.0))) / 2.0 + 0.5;\n  //hsvTE.z = hsvT.z * (hsvTE.z > 0.1 ? 1.0 : hsvTE.z / 0.1);\n  float posterCount = 100.0;\n\n  gl_FragColor = vec4(hsv2rgb(hsvTE), w);\n}\n"