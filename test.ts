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

game.splash(`Big endian: ${DataView.IS_BIG_ENDIAN}`)

let d: DataView = new DataView(new ArrayBuffer(8))
d.setUint32(0, 0x12345678)
if (d.getUint32(0) != 0x12345678) {
    game.splash("DataView constructor test 1 failed.")
    allPassed = false
}
d.setUint32(0, 0x12345678, true)
if (d.getUint32(0, true) != 0x12345678) {
    game.splash("DataView constructor test 2 failed.")
    allPassed = false
}
d.setUint32(0, 0x12345678, true)
if (d.getUint32(0) != 0x78563412) {
    game.splash("DataView constructor test 3 failed.")
    allPassed = false
}
d.setUint32(0, 0x12345678)
if (d.getUint32(0, true) != 0x78563412) {
    game.splash("DataView constructor test 4 failed.")
    allPassed = false
}

if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}