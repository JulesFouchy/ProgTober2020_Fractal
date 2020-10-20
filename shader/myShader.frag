precision mediump float;

varying vec2 vTexCoord;
uniform vec2 botLeft;
uniform vec2 topRight;

vec2 mult(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}
vec2 conj(vec2 a) {
    return vec2(a.x, -a.y);
}
vec2 quotient(vec2 a, vec2 b) {
    return mult(a, conj(b)) / dot(b, b);
}

vec2 f(vec2 z) {
    return mult(mult(z, z), z) - vec2(1., 0.);
}
vec2 df(vec2 z) {
    return mult(z, z) * 3.;
}

vec2 iter(vec2 z) {
    return z - quotient(f(z), df(z));
}

int getRoot(vec2 z, out float d0, out float d1, out float d2) {
    const float threshhold = .1;
    const vec2 r0 = vec2(1, 0);
    const vec2 r1 = vec2(-0.5,  0.866);
    const vec2 r2 = vec2(-0.5, -0.866);
    d0 = length(z - r0);
    d1 = length(z - r1);
    d2 = length(z - r2);
    if (d0 < threshhold)
        return 0;
    else if (d1 < threshhold)
        return 1;
    else if (d2 < threshhold)
        return 2;
    else
        return -1;
}

void main() {
    vec2 z = mix(botLeft, topRight, vTexCoord);
    int root;

    int nbIters = 0;
    const int MAX_ITERS = 300;
    float minDist0 = 5000.;
    float minDist1 = 5000.;
    float minDist2 = 5000.;
    for (int i = 0; i < MAX_ITERS; ++i) {
        nbIters++;
        z = iter(z);
        float d0, d1, d2;
        root = getRoot(z, d0, d1, d2);
        minDist0 = min(minDist0, d0);
        minDist1 = min(minDist1, d1);
        minDist2 = min(minDist2, d2);
        if (root != -1)
            break;
    }

    vec3 col = vec3(1.);
    float minDist;
    if (root == 0) {
        col = vec3(226, 94, 255)/255.;
        minDist = min(minDist1, minDist2);
    }
    else if (root == 1) {
        col = vec3(252, 186, 3)/255.;
        minDist = min(minDist0, minDist2);
    }
    else if (root == 2) {
        col = vec3(51, 235, 255)/255.;
        minDist = min(minDist0, minDist1);
    }
    //col *= clamp(pow(minDist*.8, .8), 0. , 2.5);
    col = vec3(smoothstep(0.1, 0.5, pow(float(nbIters) / float(MAX_ITERS), .5)));
    
    gl_FragColor = vec4(col, 1.);
}