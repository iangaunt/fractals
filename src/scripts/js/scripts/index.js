var mandelbrot = document.getElementById("mandelbrot");
var ctx = mandelbrot.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "white";
var height = mandelbrot.offsetHeight;
var width = mandelbrot.offsetWidth;
var threshold = Math.pow(100000, 2);
/** Class for handling operations with complex numbers in the format `x + yi`. */
var Complex = /** @class */ (function () {
    function Complex(real, im) {
        this.real = real;
        this.im = im;
    }
    Complex.prototype.add = function (other) {
        this.real += other.real;
        this.im += other.im;
    };
    Complex.prototype.multiply = function (other) {
        var realP = this.real * other.real - this.im * other.im;
        var imP = this.real * other.im + this.im * other.real;
        this.real = realP;
        this.im = imP;
    };
    return Complex;
}());
function testForMandelbrot(z, c, n) {
    for (var i = 0; i < n; i++) {
        z.multiply(z);
        z.add(c);
        if (Math.pow(z.real, 2) + Math.pow(z.im, 2) >= threshold)
            return true;
    }
    return false;
}
function testForBurningShip(z, c, n) {
    for (var i = 0; i < n; i++) {
        var zc = new Complex(Math.abs(z.real), Math.abs(z.im));
        zc.multiply(zc);
        zc.add(c);
        if (Math.pow(zc.real, 2) + Math.pow(zc.im, 2) >= threshold)
            return true;
        z = zc;
    }
    return false;
}
function setPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}
function generateMandelbrot(n) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height / 2 + 1; y++) {
            var xc = (x - width / 2) / 380 - 0.5;
            var yc = (y - height / 2) / 380;
            if (!testForMandelbrot(new Complex(0, 0), new Complex(xc, yc), n)) {
                setPixel(x, y);
                if (y != height / 2) {
                    setPixel(x, height - y);
                }
            }
        }
    }
}
function generateBurningShip(n) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var xc = (x - width / 2) / 380 - 0.5;
            var yc = (y - height / 2) / 380 - 0.6;
            if (!testForBurningShip(new Complex(0, 0), new Complex(xc, yc), n)) {
                setPixel(x, y);
            }
        }
    }
}
var date = Date.now();
ctx.clearRect(0, 0, width, height);
// generateMandelbrot(50)
generateBurningShip(50);
console.log(Date.now() - date);
