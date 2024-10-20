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

let a: number[] = [0, 0, 0,]
let b: Int8Array = new Int8Array(3)
if (!areEquivalent(a, b)) {
    game.splash("Test failed.")
    allPassed = false
}

if (allPassed) {
    game.splash("All tests passed!")
} else {
    game.splash("At least one test failed.")
}