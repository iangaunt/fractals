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
    Complex.prototype.greaterThan = function (other) {
        return other.real == this.real ? (Math.abs(this.im) >= Math.abs(other.im)) : (Math.abs(this.real) >= Math.abs(other.real));
    };
    return Complex;
}());
function testForDivergence(z, c, n) {
    for (var i = 0; i < n; i++) {
        z.multiply(z);
        z.add(c);
        if (Math.pow(z.real, 2) + Math.pow(z.im, 2) >= Math.pow(threshold, 2))
            return true;
    }
    return false;
}
function setPixel(x, y) {
    ctx.fillRect(x, y, 1, 1);
}
function generateMandelbrot(n) {
    for (var x = 0; x < width; x++) {
        for (var y = 0; y < height; y++) {
            var xc = (x - width / 2) / 300 - 0.5;
            var yc = (y - height / 2) / 300 - 0.125;
            if (!testForDivergence(new Complex(0, 0), new Complex(xc, yc), n)) {
                setPixel(x, y);
            }
        }
    }
}
var lower = 7;
var upper = 50;
var n = lower + 1;
var mod = 1;
setInterval(function () {
    ctx.clearRect(0, 0, width, height);
    generateMandelbrot(n);
    n += mod;
    console.log(n);
    if (n == lower || n == upper)
        mod *= -1;
}, 250);
