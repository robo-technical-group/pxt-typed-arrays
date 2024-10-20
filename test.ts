let allPassed: boolean = true

function areEquivalent(a: number[], b: TypedArray): boolean {
    if (a.length != b.length) {
        return false
    }
    if (a instanceof TypedArray) {
        for (let i: number = 0; i < a.length; i++) {
            if (a.get(i) != b.get(i)) {
                return false
            }
        }
    } else {
        for (let i: number = 0; i < a.length; i++) {
            if (a[i] != b.get(i)) {
                return false
            }
        }
    }
    return true
}

let a: Uint8Array = new Uint8Array()
a.fromArray([0, 1, 2, 3, 4, 5, 6, 7,])
let r: ArrayBuffer = a.buffer
let b: Int8Array = new Int8Array()
b.fromArrayBuffer(r)

if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}