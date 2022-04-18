import { Vector } from "./vectorClass";

export function add(vector: Vector, x: Vector | number, y: number, z: number) {
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