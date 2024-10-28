namespace Base64 {
    const PADCHAR: string = '='
    const ALPHA: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
    const STRING_SET_LENGTH: number = 80

    export function decodeBuffer(s: string): Uint8Array {
        let size: number = s.length

        if (size === 0) {
            return new Uint8Array(0)
        }
        if (size % 4 !== 0) {
            throw `Bad string length: ${size}`
        }
        for (let c of s) {
            if (ALPHA.indexOf(c) < 0 && c != PADCHAR) {
                throw `Invalid string encoding character: ${c}.`
            }
        }
        /**
         * Every four base64 characters = 24 bits = 3 bytes.
         * But, we also need to figure out padding, if any.
         */
        let bytes: number = 3 * size / 4
        let numPad: number = 0
        if (s.charAt(size - 1) === '=') {
            numPad++
            bytes--
        }
        if (s.charAt(size - 2) === '=') {
            numPad++
            bytes--
        }
        const buffer: Uint8Array = new Uint8Array(bytes)
        let index: number = 0,
            bufferIndex: number = 0,
            quantum: number
        if (numPad > 0) {
            size -= 4 // Handle the last one specially.
        }
        while (index < size) {
            quantum = 0
            for (let i: number = 0; i < 4; ++i) {
                quantum = (quantum << 6) |
                    ALPHA.indexOf(s.charAt(index + i))
            }
            buffer.set(bufferIndex++, (quantum >> 16) & 0xff)
            buffer.set(bufferIndex++, (quantum >> 8) & 0xff)
            buffer.set(bufferIndex++, quantum & 0xff)
            index += 4
        }
        if (numPad > 0) {
            /**
             * If numPad == 1, then there is one =, and we have 18 bits with 2 zeroes at the end.
             * If numPad == 2, then there are two =, and we have 12 bits with 4 zeroes at the end.
             * First, grab the quantum.
             */
            quantum = 0
            for (let i: number = 0; i < 4 - numPad; ++i) {
                quantum = (quantum << 6) |
                    ALPHA.indexOf(s.charAt(index + i))
            }
            if (numPad === 1) {
                // quantum is 18 bits, but really represents two bytes.
                quantum = quantum >> 2
                buffer.set(bufferIndex++, (quantum >> 8) & 0xff)
                buffer.set(bufferIndex++, quantum & 0xff)
            } else {
                // quantum is 12 bits, but really represents only one byte.
                quantum = quantum >> 4
                buffer.set(bufferIndex++, quantum & 0xff)
            }
        }

        return buffer
    }

    export function decodeBufferFromStringSet(s: string[]): Uint8Array {
        // Make more efficient after testing.
        return decodeBuffer(s.join(''))
    }

    export function encodeBuffer(bytes: ArrayBuffer): string {
        return encode(bytes).join('')
    }

    export function encodeBufferToStringSet(bytes: ArrayBuffer): string[] {
        let chars: string[] = encode(bytes)
        let currString: string = ''
        let stringSet: string[] = []
        for (let c of chars) {
            currString += c
            if (currString.length >= STRING_SET_LENGTH) {
                stringSet.push(currString)
                currString = ''
            }
        }
        if (currString.length > 0) {
            stringSet.push(currString)
        }
        return stringSet
    }

    function encode(bytes: ArrayBuffer): string[] {
        const array: Uint8Array = new Uint8Array(0)
        array.fromArrayBuffer(bytes)
        const base64: string[] = []
        let index: number = 0,
            quantum: number,
            value: number
        // Grab as many sets of 3 bytes as we can, which form 24 bits.
        while (index + 2 < array.byteLength) {
            quantum = (array.get(index) << 16) |
                (array.get(index + 1) << 8) |
                array.get(index + 2)
            value = (quantum >> 18) & 0x3f
            base64.push(ALPHA[value])
            value = (quantum >> 12) & 0x3f
            base64.push(ALPHA[value])
            value = (quantum >> 6) & 0x3f
            base64.push(ALPHA[value])
            value = quantum & 0x3f
            base64.push(ALPHA[value])
            index += 3
        }

        // At this point, there are 0, 1, or 2 bytes left.
        if (index + 1 === array.byteLength) {
            // 8 bits; shift by 4 to pad on the right with 0s to make 12 bits total.
            quantum = array.get(index) << 4
            value = (quantum >> 6) & 0x3f
            base64.push(ALPHA[value])
            value = quantum & 0x3f
            base64.push(ALPHA[value])
            base64.push('==')
        } else if (index + 2 === array.byteLength) {
            // 16 bits; shift by 2 to pad on the right with 0s to make 18 bits total.
            quantum = (array.get(index) << 10) |
                (array.get(index + 1) << 2)
            value = (quantum >> 12) & 0x3f
            base64.push(ALPHA[value])
            value = (quantum >> 6) & 0x3f
            base64.push(ALPHA[value])
            value = quantum & 0x3f
            base64.push(ALPHA[value])
            base64.push('=')
        }

        return base64
    }
}