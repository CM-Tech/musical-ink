export default "precision highp float;\nprecision mediump sampler2D;\n\nvarying vec2 coords;\nuniform sampler2D velocity;\nuniform sampler2D density;\nuniform float aspectRatio;\nuniform vec3 inkColor;\nuniform vec3 inkVelocity;\nuniform vec2 point;\nuniform float radius;\nfloat veLen(vec3 inp){\n  return inp.x+inp.y+inp.z;\n}\nvoid main() {\n  vec2 p = coords - point;\n  vec2 p2 = coords + point * vec2(1, -1);\n  p2.x -= 1.0;\n  p.x *= aspectRatio;\n  p2.x *= aspectRatio;\n  float radiusW = radius * aspectRatio * aspectRatio;\n  float splat = length(p);\n\n  splat = pow(max(radius*radius-pow(length(p), 2.0),0.0),0.5)/radius;//exp(-pow(length(p), 2.0)/radius/radius)/radius/50.0;\n\n  float interp=min(splat, 1.0);\n  vec3 baseD = texture2D(density, coords).xyz;\n  vec3 baseV = texture2D(velocity, coords).xyz;\n  \n  vec3 newBaseD=baseD+interp * inkColor;\n  \n  float originalMass=veLen(baseD);\n  float newMass=veLen(newBaseD)+0.00000001;\n  float addedMass=newMass-originalMass;\n  vec3 newV=(baseV*originalMass+addedMass*inkVelocity)/newMass;\n  vec3 newD=(baseD*originalMass+addedMass*inkColor)/newMass;\n  \n  gl_FragColor = vec4(newD, 1.0);\n}\n"