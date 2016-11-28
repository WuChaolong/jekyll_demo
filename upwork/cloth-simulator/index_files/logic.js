function Particle( x, y, z, mass, drag, clothFunction ) {

    this.position = clothFunction( x, y ); // position
    this.previous = clothFunction( x, y ); // previous
    this.original = clothFunction( x, y );
    
    this.a = new THREE.Vector3( 0, 0, 0 ); // acceleration
    
    this.mass = mass;
    
    this.drag = drag;
    
    this.invMass = 1 / mass;
    
    this.tmp = new THREE.Vector3();
    this.tmp2 = new THREE.Vector3();

}

Particle.prototype.addForce = function( force ) {
    this.a.add(
        this.tmp2.copy( force ).multiplyScalar( this.invMass )
    );

};

Particle.prototype.integrate = function( timesq ) {

    var newPos = this.tmp.subVectors( this.position, this.previous );
    // newPos.multiplyScalar( this.drag ).add( this.position );
    newPos.add( this.position );
    newPos.add( this.a.multiplyScalar( timesq ) );

    this.tmp = this.previous;
    this.previous = this.position;
    this.position = newPos;

    this.a.set( 0, 0, 0 );

};

function Cloth( mass, w, h, restDistance, drag, clothFunction ) {
    function index( u, v ) {

        return u + v * ( w + 1 );

    }

    w = w || 10;
    h = h || 10;
    this.w = w;
    this.h = h;

    var particles = [];
    var constraints = [];

    var u, v;

    // Create particles
    for ( v = 0; v <= h; v ++ ) {
        for ( u = 0; u <= w; u ++ ) {

            particles.push(
                new Particle( u / w, -v / h, 0, mass, drag, clothFunction )
            );
        }
    }

    // Structural
    for ( v = 0; v < h; v ++ ) {
        for ( u = 0; u < w; u ++ ) {
            constraints.push( [
                particles[ index( u, v ) ],
                particles[ index( u, v + 1 ) ],
                restDistance
            ] );

            constraints.push( [
                particles[ index( u, v ) ],
                particles[ index( u + 1, v ) ],
                restDistance
            ] );
        }
    }

    for ( u = w, v = 0; v < h; v ++ ) {
        constraints.push( [
            particles[ index( u, v ) ],
            particles[ index( u, v + 1 ) ],
            restDistance

        ] );
    }

    for ( v = h, u = 0; u < w; u ++ ) {
        constraints.push( [
            particles[ index( u, v ) ],
            particles[ index( u + 1, v ) ],
            restDistance
        ] );
    }

    this.particles = particles;
    this.constraints = constraints;

    this.index = index;

}


function animatedProduct( container, size, canvas, image ) {
    this.DAMPING = .02;
    this.DRAG = 1 - this.DAMPING
    this.MASS = 2000;
    this.STIFFNESS = 1;
    this.SEGMENTS = 40;
    this.canvas = canvas;
    this.size = size;
    this.demoMode = !0;
    this.startTime = Date.now();
    this.image = image;
    this.restDistance = this.size / this.SEGMENTS;
    this.container = container;
    this.gravity = new THREE.Vector3( 0, -80, 0 ).multiplyScalar( this.MASS );
    this.TIMESTEP_SQ = Math.pow(.01, 2);

    this.tmpForce = new THREE.Vector3;
    this.diff = new THREE.Vector3;

    this.pins = [];
    
    for( var i = 0; i <= this.SEGMENTS; i++ )
        this.pins.push( i );


    this.degree = 0;
    this.wave = 0;
}

animatedProduct.prototype = {
    createPlane: function( width, height ) {
        return function(c, d) {
            var e = ( c - .5 ) * width,
                f = ( d + .5 ) * height,
                g = 0;

            return new THREE.Vector3( e, f, g )
        }
    },
    satisfyConstraints: function( p1, p2, distance ) {
        this.diff.subVectors( p2.position, p1.position );

        var currentDist = this.diff.length();

        if ( currentDist === 0 )
            return; // prevents division by 0

        this.diff.normalize();

        var correction = this.diff.multiplyScalar( currentDist - distance );
        var correctionHalf = correction.multiplyScalar( 0.5 );

        p1.position.add( correctionHalf );
        p2.position.sub( correctionHalf );
    },
    simulate: function( timestep_sq ) {
        var b, c, d, e, f, g, h, i, j = this.clothGeometry.faces;
        
        for (d = this.cloth.particles, b = 0, c = d.length; c > b; b++) {
            e = d[b];
            e.addForce(this.gravity);
            e.integrate(timestep_sq);
        }
        
        for (f = this.cloth.constraints, c = f.length, b = 0; c > b; b++) {
            g = f[b];
            this.satisfyConstraints(g[0], g[1], g[2]);
        }

        for (d = this.cloth.particles, b = 0, c = d.length; c > b; b++) {
            e = d[b];

            e.position.x = e.original.x;
        }   

        for (b = 0, c = this.pins.length; c > b; b++) {
            var k = this.pins[ b ],
                l = d[ k ];

            l.position.y = l.original.y;
            l.position.x = l.original.x;

            l.position.z = l.position.z + this.wave;
        }

        if( this.degree <= 6 ) {
            this.wave = Math.sin( this.degree ) * 6;

            this.degree += 0.017 * 42;
        }
        else
            this.wave = 0;
    },
    init: function() {
        this.clothFunction = this.createPlane( this.size, this.size );
        
        this.cloth = new Cloth( this.MASS, this.SEGMENTS, this.SEGMENTS, this.restDistance, this.DRAG, this.createPlane( this.size, this.size ) );
        
        this.scene = new THREE.Scene;

        this.camera = new THREE.PerspectiveCamera( 45, this.canvas.width / this.canvas.height, 1, 1e4 );
        this.camera.position.y = 0;
        this.camera.position.z = 1e3;

        this.scene.add( this.camera );

        this.light = new THREE.DirectionalLight( 16777215, 1 );
        this.light.position.set( 20, -20, 100 );

        this.scene.add( this.light );

        THREE.ImageUtils.crossOrigin = "";

        var texture = THREE.ImageUtils.loadTexture( this.image, {}, function() {
            this.canvas.classList.add("play")
        }.bind( this ) );

        texture.flipY = !1;
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.anisotropy = 16;
        
        var b = new THREE.MeshPhongMaterial({
            ambient: 16777215,
            shininess: 20,
            map: texture,
            side: THREE.DoubleSide
        });

        this.clothGeometry = new THREE.ParametricGeometry( this.clothFunction, this.cloth.w, this.cloth.h );
        this.clothGeometry.dynamic = !0;
        this.clothGeometry.computeFaceNormals();
        
        var c = {
                texture: {
                    type: "t",
                    value: texture
                }
            },
            d = "varying vec2 vUV;void main() {vUV = 0.75 * uv;vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );gl_Position = projectionMatrix * mvPosition;}",
            e = "uniform sampler2D texture;varying vec2 vUV;vec4 pack_depth( const in float depth ) {const vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );const vec4 bit_mask  = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );vec4 res = fract( depth * bit_shift );res -= res.xxyz * bit_mask;return res;}void main() {vec4 pixel = texture2D( texture, vUV );if ( pixel.a < 0.5 ) discard;gl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );}";
        
        this.object = new THREE.Mesh( this.clothGeometry, b );
        
        this.object.position.set( 0, 0, 0 );
        this.scene.add( this.object );
        this.object.customDepthMaterial = new THREE.ShaderMaterial({
            uniforms: c,
            vertexShader: d,
            fragmentShader: e
        });

        this.renderer = new THREE.WebGLRenderer({
            antialias: !0,
            canvas: this.canvas
        });

        this.renderer.setSize( this.canvas.width, this.canvas.height );
        this.renderer.setClearColor( 16777215, 1 );
        this.renderer.autoClear = !1;
        this.renderer.autoClearDepth = !1;

        this.container.appendChild( this.renderer.domElement );
        this.renderer.gammaInput = !0;
        this.renderer.gammaOutput = !0;
        this.canvas.addEventListener("mousedown", this.onClick.bind( this ), !1 );

        for (var f = 0; 20 > f; f++) this.simulate(this.TIMESTEP_SQ);

        this.play();
    },
    onClick: function(a) {
    },
    animate: function() {
        this.animationFrame = window.requestAnimationFrame(this.animate.bind(this));
        
        this.simulate(this.TIMESTEP_SQ);
        this.render();
    },
    pause: function() {
        window.cancelAnimationFrame( this.animationFrame );
    },
    play: function() {
        this.scene ? this.animate() : this.init();
    },
    render: function() {
        for ( var a = this.cloth.particles, b = 0, c = a.length; c > b; b++ )
            this.clothGeometry.vertices[ b ].copy( a[ b ].position );

        this.clothGeometry.computeFaceNormals();
        this.clothGeometry.computeVertexNormals();
        this.clothGeometry.normalsNeedUpdate = !0;
        this.clothGeometry.verticesNeedUpdate = !0;
        
        this.camera.lookAt( this.scene.position );
        
        this.renderer.clear();
        this.renderer.render( this.scene, this.camera );
    },
    stop: function() {
        this.pause();
        this.canvas.parentNode.removeChild( this.canvas );
    }
};

var size = 700,
    container = document.getElementById( "product-container" ),
    image = "http://media.hermes.com/media/catalog/product/import/S/S01/S011/item/flat/hd/H001485S-17.jpg",
    canvas = document.createElement( "canvas" );
    canvas.width = canvas.height =  600 + 20,
    canvas.id = "product",
    container.appendChild( canvas ),
    productAnimation = new animatedProduct( container, size, canvas, image );

productAnimation.play();
