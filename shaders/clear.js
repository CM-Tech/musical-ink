export default "precision highp float;\nprecision mediump sampler2D;\n\nvarying vec2 coords;\nuniform sampler2D pressure;\nuniform float dissipation;\n\nvoid main() {\n    gl_FragColor = dissipation * texture2D(pressure, coords);\n}\n"