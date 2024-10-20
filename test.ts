let allPassed: boolean = true

function areEquivalent(a: number[], b: ArrayBuffer): boolean {
    if (a.length != b.byteLength) {
        return false
    }
    for (let i: number = 0; i < a.length; i++) {
        if (a[i] != b.bytes[i]) {
            return false
        }
    }
    return true
}

function create(bytes: number[]): ArrayBuffer {
    let buffer: ArrayBuffer = new ArrayBuffer(bytes.length)
    let array: Uint8Array = new Uint8Array()
    array.fromArrayBuffer(buffer)

    for (let i: number = 0; i < bytes.length; i++) {
        array.set(i, bytes[i])
    }

    return buffer
}

let buf: ArrayBuffer = create([0, 1, 2, 3, 4, 5, 6, 7, 8, 9,])
if (buf.byteLength != 10) {
    game.splash("Array buffer slice test 1 failed.")
    allPassed = false
}
if (buf.slice(5).byteLength != 5) {
    game.splash("Array buffer slice test 2 failed.")
    allPassed = false
}
if (buf.slice(-2).byteLength != 2) {
    game.splash("Array buffer slice test 3 failed.")
    allPassed = false
}
if (buf.slice(-4, -2).byteLength != 2) {
    game.splash("Array buffer slice test 4 failed.")
    allPassed = false
}
if (buf.slice(-1000, 5).byteLength != 5) {
    game.splash("Array buffer slice test 5 failed.")
    allPassed = false
}
if (!areEquivalent([5, 6, 7, 8, 9,], buf.slice(5))) {
    game.splash("Array buffer slice test 6 failed.")
    allPassed = false
}
if (!areEquivalent([0, 1, 2, 3, 4,], buf.slice(0, 5))) {
    game.splash("Array buffer slice test 7 failed.")
    allPassed = false
}
if (!areEquivalent([5, 6,], buf.slice(5, 7))) {
    game.splash("Array buffer slice test 8 failed.")
    allPassed = false
}
if (!areEquivalent([6, 7,], buf.slice(-4, -2))) {
    game.splash("Array buffer slice test 9 failed.")
    allPassed = false
}
if (!areEquivalent([2, 3, 4, 5, 6, 7,], buf.slice(2, -2))) {
    game.splash("Array buffer slice test 10 failed.")
    allPassed = false
}

if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}