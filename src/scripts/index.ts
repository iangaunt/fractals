const mandelbrot: HTMLCanvasElement = <HTMLCanvasElement> document.getElementById("mandelbrot");
const ctx = mandelbrot.getContext("2d");
ctx.imageSmoothingEnabled = false;
ctx.fillStyle = "white";

const height = mandelbrot.offsetHeight;
const width = mandelbrot.offsetWidth;

const threshold = Math.pow(100000, 2);

/** Class for handling operations with complex numbers in the format `x + yi`. */
class Complex {
    real: number;
    im: number;

    constructor(real: number, im: number) {
        this.real = real;
        this.im = im;
    }

    add(other: Complex) {
        this.real += other.real;
        this.im += other.im;
    }

    multiply(other: Complex) {
        const realP = this.real * other.real - this.im * other.im;
        const imP = this.real * other.im + this.im * other.real;

        this.real = realP;
        this.im = imP;
    }

    greaterThan(other: Complex): boolean {
        return other.real == this.real ? (Math.abs(this.im) >= Math.abs(other.im)) : (Math.abs(this.real) >= Math.abs(other.real)); 
    }
}

function testForDivergence(z: Complex, c: Complex, n: number): boolean {
    for (let i = 0; i < n; i++) {
        z.multiply(z);
        z.add(c);

        if (Math.pow(z.real, 2) + Math.pow(z.im, 2) >= Math.pow(threshold, 2)) return true;
    }

    return false;
}

function setPixel(x: number, y: number) {
    ctx.fillRect(x, y, 1, 1);
}

function generateMandelbrot(n: number) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let xc = (x - width / 2) / 300 - 0.5;
            let yc = (y - height / 2) / 300 - 0.125;
    
            if (!testForDivergence(
                new Complex(0, 0),
                new Complex(xc, yc),
                n
            )) {
                setPixel(x, y);
            }
        }
    }
}
const lower: number = 7;
const upper: number = 50;

let n = lower + 1;
let mod: number = 1;

setInterval(function() {
    ctx.clearRect(0, 0, width, height);
    generateMandelbrot(n); 
    n += mod;

    console.log(n);

    if (n == lower || n == upper) mod *= -1;
}, 250);