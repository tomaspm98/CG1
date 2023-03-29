#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform float timeFactor;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, vTextureCoord);
	vec4 inv_filter = vec4(1.0 - filter.r, 1.0 - filter.g, 1.0 - filter.b, 1.0);
	
	gl_FragColor =  color * 0.8 + inv_filter * 0.2;
}