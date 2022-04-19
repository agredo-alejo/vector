/**
 * @param {Number} [x] x component of the vector
 * @param {Number} [y] y component of the vector
 * @param {Number} [z] z component of the vector
 */
export class Vector {
    x: number; y: number; z: number
    constructor(x = 0, y = 0, z = 0) {
        this.x = x
        this.y = y
        this.z = z
    }
    /**
     * @param x Number | Vector
     * @param y Number, by default it is equal to zero
     * @param z Number, by default it is equal to zero
     */
    add(x: Vector | number, y = 0, z = 0) {
        if (typeof x === "number") {
            this.x += x
            this.y += y
            this.z += z
            return this
        }
        this.x += x.x
        this.y += x.y
        this.z += x.z
        return this
    }
    /**
     * @param x Number | Vector
     * @param y Number, by default it is equal to zero
     * @param z Number, by default it is equal to zero
     */
    sub(x: Vector | number, y = 0, z = 0) {
        if (typeof x === "number") {
            this.x -= x
            this.y -= y
            this.z -= z
            return this
        }
        this.x -= x.x
        this.y -= x.y
        this.z -= x.z
        return this
    }
    /**
     * 
     * @param factor must be a finite number otherwise the method will return the vector without modifications
     */
    mult(factor: number) {
        if (!isFinite(factor)) return this
        this.x *= factor
        this.y *= factor
        this.z *= factor
        return this
    }
    /**
     * 
     * @param divisor must be a finite number and different than 0 otherwise the method will return the vector without modifications
     */
    div(divisor: number) {
        if (!(isFinite(divisor)) ||
            divisor == 0) return this

        this.x /= divisor
        this.y /= divisor
        this.z /= divisor
        return this
    }
    /**
     * @param x Number | Vector
     * @param y Number, by default it is equal to zero
     * @param z Number, by default it is equal to zero
     */
    set(x: Vector | number, y = 0, z = 0) {

        if (!(typeof x == "number")) {
            this.x = x.x
            this.y = x.y
            this.z = x.z
            return this
        }

        this.x = x
        this.y = x
        this.z = x
        return this
    }
    copy() {
        return new Vector(this.x, this.y, this.z)
    }

    magSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    }

    mag() {
        return Math.hypot(this.x, this.y, this.z)
    }

    /**
     * If the magnitude of the vector is equal to zero, the normalize method will convert the vector to a zero vector.
     */
    normalize() {
        let mag = Math.hypot(this.x, this.y, this.z)
        return mag === 0 ? this.set(0, 0, 0) : this.div(mag)
    }

    setMag(mag: number) {
        return this.div(this.mag()).mult(mag)
    }

    max(vector: Vector) {
        return this.mag() > vector.mag() ? this : vector
    }

    min(vector: Vector) {
        return this.mag() < vector.mag() ? this : vector
    }

    equals(vector: Vector) {
        return this.x === vector.x && this.y === vector.y && this.z === vector.z
    }

    dist(vector: Vector) {
        return Math.hypot(this.x - vector.x, this.y - vector.y, this.z - vector.z)
    }

    distSq(vector: Vector) {
        return Math.hypot(this.x - vector.x, this.y - vector.y, this.z - vector.z) ** 2
    }

    /**
     * The result of the cross product of two vectors (A x B) is perpendicular to both the vectors and normal to the plane that contains both the vectors.
     */
    cross(vector: Vector) {
        return new Vector(
            this.y * vector.z - this.z * vector.y,
            this.z * vector.x - this.x * vector.z,
            this.x * vector.y - this.y * vector.x
        )
    }
    /**
     * The dot product is the sum of the products of the corresponding entries of the two sequences of numbers
     */
    dot(vector: Vector) {
        return this.x * vector.x + this.y * vector.y + this.z * vector.z
    }

    maxMag(mag: number) {
        let currentMag = Math.hypot(this.x, this.y, this.z)
        if (currentMag > mag) {
            return this.div(currentMag).mult(mag)
        }
        return this
    }

    minMag(mag: number) {
        let currentMag = Math.hypot(this.x, this.y, this.z)
        if (currentMag < mag) {
            return this.div(currentMag).mult(mag)
        }
        return this
    }

    constrainMag(min: number, max: number) {
        let mag = Math.hypot(this.x, this.y, this.z)
        if (mag < min) {
            return this.div(mag).mult(min)
        } else if (mag > max) {
            return this.div(mag).mult(max)
        }
        return this
    }

    toArray() {
        return [this.x, this.y, this.z]
    }

    /**
     * Change of basis is a technique applied to finite-dimensional vector spaces in order to rewrite vectors in terms of a different set of basis elements. It is useful for many types of matrix computations in linear algebra and can be viewed as a type of linear transformation.
     * 
     * @param vi Basis vector Î
     * @param vj Basis vector ĵ
     * @param vk Basis vector k̂
     */
    changeOfBasis(
        vi: Vector = new Vector(1),
        vj: Vector = new Vector(0, 1),
        vk: Vector = new Vector(0, 0, 1)
    ) {
        let x = this.x, y = this.y, z = this.z
        this.x = x * vi.x + y * vj.x + z * vk.x
        this.y = x * vi.y + y * vj.y + z * vk.y
        this.z = x * vi.z + y * vj.z + z * vk.z
        return this
    }

    /**
     * The lerp method stands for linear interpolation and gives you a point that is a fraction of the way along a line between the start and end point. The fraction is supplied as the alpha parameter
     * @param alpha It is constrained to be in the range [0, 1]
     */
    lerp(vector: Vector, alpha: number) {
        const internAplha = Math.min(Math.max(alpha, 0), 1)
        this.x += (vector.x - this.x) * internAplha
        this.y += (vector.y - this.y) * internAplha
        this.z += (vector.z - this.z) * internAplha
        return this
    }

    /**
     * If the product of both vectors is equal to 0 the method will return 0
     */
    angleBetween(vector: Vector) {
        let magMult = this.mag() * vector.mag()
        if (magMult == 0) return 0

        let dotOverMag = this.dot(vector) / magMult
        return Math.acos(Math.max(Math.min(dotOverMag, 1), -1))

    }

    heading3D() {
        return [
            Math.atan2(this.y, this.x),
            Math.atan2(Math.hypot(this.x, this.y), this.z)
        ]
    }
    heading() {
        return Math.atan2(this.y, this.x)
    }

    rotate(angle: number) {
        let cosOfAngle = Math.cos(angle),
            sinOfAngle = Math.sin(angle),
            x = this.x
        this.x = x * cosOfAngle + this.y * -sinOfAngle || 0
        this.y = x * sinOfAngle + this.y * cosOfAngle || 0
        return this
    }

    rotateX(angle: number) {
        let cosOfAngle = Math.cos(angle),
            sinOfAngle = Math.sin(angle),
            y = this.y
        this.y = y * cosOfAngle + this.z * -sinOfAngle || 0
        this.z = y * sinOfAngle + this.z * cosOfAngle || 0
        return this
    }

    rotateY(angle: number) {
        let cosOfAngle = Math.cos(angle),
            sinOfAngle = Math.sin(angle),
            x = this.x
        this.x = x * cosOfAngle + this.z * sinOfAngle || 0
        this.z = x * -sinOfAngle + this.z * cosOfAngle || 0
        return this
    }
}
