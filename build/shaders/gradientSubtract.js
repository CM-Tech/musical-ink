export default "precision highp float;\nprecision mediump sampler2D;\n\nvarying vec2 coords;\nuniform vec2 texelSize;\nuniform sampler2D pressure;\nuniform sampler2D velocity;\n\nvoid main() {\n  float pL = texture2D(pressure, coords - vec2(texelSize.x, 0.0)).x;\n  float pR = texture2D(pressure, coords + vec2(texelSize.x, 0.0)).x;\n  float pB = texture2D(pressure, coords - vec2(0.0, texelSize.y)).x;\n  float pT = texture2D(pressure, coords + vec2(0.0, texelSize.y)).x;\n  vec2 v = texture2D(velocity, coords).xy;\n  gl_FragColor = vec4(v - vec2(pR - pL, pT - pB), 0.0, 1.0);\n}\n"