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
}

function testForMandelbrot(z: Complex, c: Complex, n: number): boolean {
    for (let i = 0; i < n; i++) {
        z.multiply(z);
        z.add(c);

        if (Math.pow(z.real, 2) + Math.pow(z.im, 2) >= threshold) return true;
    }

    return false;
}

function testForBurningShip(z: Complex, c: Complex, n: number): boolean {
    for (let i = 0; i < n; i++) {
        const zc = new Complex(
            Math.abs(z.real),
            Math.abs(z.im)
        );

        zc.multiply(zc);
        zc.add(c);

        if (Math.pow(zc.real, 2) + Math.pow(zc.im, 2) >= threshold) return true;
        z = zc;
    }

    return false;
}

function setPixel(x: number, y: number) {
    ctx.fillRect(x, y, 1, 1);
}

function generateMandelbrot(n: number) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height / 2 + 1; y++) {
            const xc = (x - width / 2) / 380 - 0.5;
            const yc = (y - height / 2) / 380;
    
            if (!testForMandelbrot(
                new Complex(0, 0),
                new Complex(xc, yc),
                n
            )) {
                setPixel(x, y);
                if (y != height / 2) {
                    setPixel(x, height - y);
                }
            }
        }
    }
}

function generateBurningShip(n: number) {
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            const xc = (x - width / 2) / 380 - 0.5;
            const yc = (y - height / 2) / 380 - 0.6;

            if (!testForBurningShip(
                new Complex(0, 0),
                new Complex(xc, yc),
                n
            )) {
                setPixel(x, y);
            }
        }
    }
}

const date = Date.now();

ctx.clearRect(0, 0, width, height);
// generateMandelbrot(50)
generateBurningShip(50);
console.log(Date.now() - date);