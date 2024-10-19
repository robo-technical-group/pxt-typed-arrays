let allPassed: boolean = true

// ArrayBuffer tests.
let b: ArrayBuffer

// No length.
b = new ArrayBuffer()
if (b.byteLength != 0) {
    game.splash("ArrayBuffer test 1a failed.")
    allPassed = false
}

// Creation.
try {
    b = new ArrayBuffer(0)
} catch {
    game.splash("ArrayBuffer test 1b failed.")
    allPassed = false
}

// Creation.
try {
    b = new ArrayBuffer(1)
} catch {
    game.splash("ArrayBuffer test 1c failed.")
    allPassed = false
}

// Creation.
try {
    b = new ArrayBuffer(123)
} catch {
    game.splash("ArrayBuffer test 1d failed.")
    allPassed = false
}

// Length.
b = new ArrayBuffer(123)
if (b.byteLength != 123) {
    game.splash("ArrayBuffer test 1e failed.")
    allPassed = false
}

// Negative length.
try {
    b = new ArrayBuffer(-1)
    game.splash("ArrayBuffer test 1f failed.")
    allPassed = false
} catch {

}

// Absurd length.
try {
    b = new ArrayBuffer(0x80000000)
    game.splash("ArrayBuffer test 1g failed.")
    allPassed = false
} catch {

}

// DataView constructors.

// big endian/big endian
let d: DataView = new DataView(new ArrayBuffer(8))
d.setUint32(0, 0x12345678)
if (d.getUint32(0) !== 0x12345678) {
    game.splash("DataView test 1a failed.")
    allPassed = false
}

// little endian/little endian
d.setUint32(0, 0x12345678, true)
if (d.getUint32(0, true) != 0x12345678) {
    game.splash("DataView test 1b failed.")
    allPassed = false
}

// little endian/big endian
d.setUint32(0, 0x12345678, true)
if (d.getUint32(0) != 0x78563412) {
    game.splash("DataView test 1c failed.")
    allPassed = false
}

// big endian/little endian
d.setUint32(0, 0x12345678)
if (d.getUint32(0, true) != 0x78563412) {
    game.splash("DataView test 1d failed.")
    allPassed = false
}

if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}