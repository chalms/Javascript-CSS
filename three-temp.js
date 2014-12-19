

      var Pyramid = function (cb) {
        this.frame = {
          width: 200.0,
          height: 200.0
        };
        this.base = 2.0;
        this.Ce = 1.0;
        this.points = [];
        this.vectors = [];
        this.animate = cb;
        this.max = 5.0;
        this.level = 2.0;
        this.geometry = new THREE.Geometry();
        };

        Pyramid.prototype.initBro = function () {
        if (!(this.geometry)) throw new Error("Must set up model before calling run!");
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 1000 );
        this.position = this.camera.position.z = 500;
        this.scene = new THREE.Scene();

        this.materials = {
          mesh: new THREE.MeshBasicMaterial( {
          color: 0x0000ff,
          wireframe: true,
          wireframeLinewidth: 2
          } ),
          line: new THREE.LineBasicMaterial({
          color: 0x0000ff
          })
        };
        this.mesh = new THREE.Mesh( this.geometry, this.materials.mesh );
        this.scene.add( this.mesh );
        };

        Pyramid.prototype.objects = function (name, obj) {
        this.objects[name] = obj;
        };

        Pyramid.prototype.AddPoint = function (point) {
        this.points.add(point);
        };

        Pyramid.prototype.getPoint = function (index) {
        return this.points[index];
        };

        Pyramid.prototype.setBounds = function (b) {
        this.bounds = b;
        };

        Pyramid.prototype.getBounds = function () {
        return this.bounds;
        };

        Pyramid.prototype.setFrame = function (f) {
        this.frame = f;
        };

        Pyramid.prototype.getFrame = function () {
        return this.frame;
        };

        Pyramid.prototype.getLowerBound = function (z) {
        if (z < 2) throw new Error("Cannot get expansion rate for values less than two!");
        return (1.0/z) * ((z < 0) ? -1 : 1) ;
        };

        Pyramid.prototype.getUpperBound = function (z) {
        if (z < 2) throw new Error("Cannot get expansion rate for values less than two!");
        return (this.getLowerBound(z) * (z - 1));
        };

        Pyramid.prototype.getSpan = function (z) {
        return (this.getUpperBound(z) - this.getLowerBound(z));
        };

        Pyramid.prototype.getExpansion = function (z) {
        return (this.getSpan(z) - this.getSpan(z-1));
        };

        Pyramid.prototype.getExpansionRate = function (z) {
        return (this.Ce)*(this.getExpansion(z) / this.getSpan(z));
        };

        Pyramid.prototype.getZ = function (z) {
        return 0;
        };

        Pyramid.prototype.nextLevel = function (cb) {
        _this = this;
        var val = _this.level;
        _this.level += 1;
        _this.geometry.vertices.push(_this.buildLevel(val));
        if (_this.level < _this.max) {
          _this.nextLevel(cb);
        } else if (_this.level === this.max) {  cb(_this); }
        };

        Pyramid.prototype.buildLevel = function (k) {
        return new THREE.Vector3(getSpan(k), getExpansionRate(k), getZ());
        };

        var pyramid = new Pyramid();
        pyramid.init((function (_this) {
        pyramid.animate = (function (cb) {
          requestAnimationFrame( this.animate );
          renderer.render( this.scene, this.camera );
        }).call(_this);
        pyramid.animate();
    }));