import { Vector } from "./vectorClass";
/**
 * If the parameter x is a vector, a new vector will be returned as the result of the elementwise addition.
 * @param vector Vector
 * @param x Vector or number
 * @param y Number, by default it is equal to zero
 * @param z Number, by default it is equal to zero
 */
export function add(vector: Vector, x: Vector | number, y = 0, z = 0) {
    if (x instanceof Vector) {
        return new Vector(
            vector.x + x.x,
            vector.y + x.y,
            vector.z + x.z
        )
    }
    return new Vector(
        vector.x + x,
        vector.y + y,
        vector.z + z
    )
}

/**
 * If the parameter x is a vector, a new vector will be returned as the result of the elementwise subtraction.
 * @param vector Vector
 * @param x Vector or number
 * @param y Number, by default it is equal to zero
 * @param z Number, by default it is equal to zero
 */
export function sub(vector: Vector, x: Vector | number, y = 0, z = 0) {
    if (x instanceof Vector) {
        return new Vector(
            vector.x - x.x,
            vector.y - x.y,
            vector.z - x.z
        )
    }
    return new Vector(
        vector.x - x,
        vector.y - y,
        vector.z - z
    )
}
/**
 * If the factor is infinite or not a number, a new vector with the properties of the given vector will be returned
 * @param vector Vector
 * @param factor Number
 */
export function mult(vector: Vector, factor: number) {
    if (isFinite(factor)) {
        return new Vector(vector.x * factor, vector.y * factor, vector.z * factor)
    }
    return new Vector(vector.x, vector.y, vector.z)
}
/**
 * If the divisor is equal to zero, infinite or not a number, a new vector with the properties of the given vector will be returned
 * @param vector Vector
 * @param divisor Number
 */
export function div(vector: Vector, divisor: number) {
    if (divisor !== 0 && isFinite(divisor)) {
        let inverse = 1 / divisor
        return new Vector(vector.x * inverse, vector.y * inverse, vector.z * inverse)
    }
    return new Vector(vector.x, vector.y, vector.z)
}

export function normalize(vector: Vector) {
    return div(vector, Math.hypot(vector.x, vector.y, vector.z))
}

export function setMag(vector: Vector, mag: number) {
    return div(vector, Math.hypot(vector.x, vector.y, vector.z)).mult(mag)
}

export function max(vector: Vector, otherVector: Vector) {
    return vector.mag() > otherVector.mag() ? vector.copy() : otherVector.copy()
}

export function min(vector: Vector, otherVector: Vector) {
    return vector.mag() < otherVector.mag() ? vector.copy() : otherVector.copy()
}

export function equals(vector: Vector, otherVector: Vector) {
    return vector.x == otherVector.x && vector.y == otherVector.y && vector.z == otherVector.z
}
export function dist(vector: Vector, otherVector: Vector) {
    return Math.hypot(vector.x - otherVector.x, vector.y - otherVector.y, vector.z - otherVector.z)
}

export function distSq(vector: Vector, otherVector: Vector) {
    return Math.hypot(vector.x - otherVector.x, vector.y - otherVector.y, vector.z - otherVector.z) ** 2
}

/**
 * The result of the cross product of two vectors (A x B) is perpendicular to both the vectors and normato the plane that contains both the vectors.
 */

export function cross(vector: Vector, otherVector: Vector) {
    return new Vector(
        vector.y * otherVector.z - vector.z * otherVector.y,
        vector.z * otherVector.x - vector.x * otherVector.z,
        vector.x * otherVector.y - vector.y * otherVector.x
    )
}

export function dot(vector: Vector, otherVector: Vector) {
    return vector.x * otherVector.x + vector.y * otherVector.y + vector.z * otherVector.z
}

export function toArray(vector: Vector) {
    return [vector.x, vector.y, vector.z]
}

/**
     * Change of basis is a technique applied to finite-dimensional vector spaces in order to rewrite vectors in terms of a different set of basis elements. It is useful for many types of matrix computations in linear algebra and can be viewed as a type of linear transformation.
     * 
     * @param vi Basis vector Î
     * @param vj Basis vector ĵ
     * @param vk Basis vector k̂
     */
export function changeOfBasis(
    vector: Vector,
    vi: Vector = new Vector(1),
    vj: Vector = new Vector(0, 1),
    vk: Vector = new Vector(0, 0, 1)
) {
    return new Vector(
        vector.x * vi.x + vector.y * vj.x + vector.z * vk.x,
        vector.x * vi.y + vector.y * vj.y + vector.z * vk.y,
        vector.x * vi.z + vector.y * vj.z + vector.z * vk.z
    )
}

/**
* The lerp method stands for linear interpolation and gives you a point that is a fraction of the waalong a line between the start and end point. The fraction is supplied as the alpha parameter
* @param alpha It is constrained to be in the range [0, 1]
*/
export function lerp(vector: Vector, otherVector: Vector, alpha: number) {
    return new Vector(
        vector.x + (otherVector.x - vector.x) * alpha,
        vector.y + (otherVector.y - vector.y) * alpha,
        vector.z + (otherVector.z - vector.z) * alpha
    )
}

export function angleBetween(vector: Vector, otherVector: Vector) {
    let magMult = vector.mag() * otherVector.mag()
    if (magMult !== 0) {
        let dotOverMag = vector.dot(otherVector) / magMult
        return Math.acos(Math.max(Math.min(dotOverMag, 1), -1))
    }
}

export function rotate(vector: Vector, angle: number) {
    let cosOfAngle = Math.cos(angle),
        sinOfAngle = Math.sin(angle)
    return new Vector(vector.x * cosOfAngle + vector.y * -sinOfAngle, vector.x * sinOfAngle + vector.y * cosOfAngle, vector.z)
}



export function rotateX(vector: Vector, angle: number) {
    let cosOfAngle = Math.cos(angle),
        sinOfAngle = Math.sin(angle)
    return new Vector(vector.x, vector.y * cosOfAngle + vector.z * -sinOfAngle, vector.y * sinOfAngle + vector.z * cosOfAngle)
}

export function rotateY(vector: Vector, angle: number) {
    let cosOfAngle = Math.cos(angle),
        sinOfAngle = Math.sin(angle)
    return new Vector(vector.x * cosOfAngle + vector.z * sinOfAngle, vector.y, vector.x * -sinOfAngle + vector.z * cosOfAngle)
}


export function fromAngle(angle: number) {
    return new Vector(Math.cos(angle), Math.sin(angle))
}
export function fromAngles(polar: number, azimuth: number) {
    return new Vector(
        Math.sin(azimuth) * Math.cos(polar),
        Math.sin(azimuth) * Math.sin(polar),
        Math.cos(azimuth)
    )
}

export function random2D() {
    return fromAngle(Math.random() * Math.PI * 2)
}
export function random3D() {
    return fromAngles(Math.random() * Math.PI * 2, Math.random() * Math.PI * 2)
}

export function scalarProyection(vertex: Vector, vector: Vector, otherVector: Vector) {
    let vertexVector = sub(vector, vertex)
    let vertexOtherVector = sub(otherVector, vertex)

    vertexVector.normalize()
    vertexVector.mult(vertexOtherVector.dot(vertexVector))

    return add(vertex, vertexVector)
}