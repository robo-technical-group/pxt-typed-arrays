/*
 Copyright (c) 2010, Linden Research, Inc.
 Copyright (c) 2014, Joshua Bell

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 $/LicenseInfo$
 */

// Original can be found at:
//   https://bitbucket.org/lindenlab/llsd
// Modifications by Joshua Bell inexorabletash@gmail.com
//   https://github.com/inexorabletash/polyfill

// ES3/ES5 implementation of the Krhonos Typed Array Specification
//   Ref: http://www.khronos.org/registry/typedarray/specs/latest/
//   Date: 2011-02-01
//
// Variations:
//  * Allows typed_array.get/set() as alias for subscripts (typed_array[])
//  * Gradually migrating structure from Khronos spec to ES2015 spec
//  * slice() implemention from https://github.com/ttaubert/node-arraybuffer-slice/
//  * Base64 conversions from https://github.com/rrhett/typescript-base64-arraybuffer

class ArrayBuffer {
    protected _byteLength: number
    protected _bytes: number[]

    public constructor(length: number = 0) {
        length = length >> 0
        if (length < 0) {
            throw 'ArrayBuffer size cannot be negative.'
        }
        this._byteLength = length
        this._bytes = []

        for (let i: number = 0; i < length; i++) {
            this._bytes.push(0)
        }
    }

    /**
     * Public properties
     */
    /**
     * The length of the ArrayBuffer (in bytes).
     */
    public get byteLength(): number {
        return this._byteLength
    }

    public get bytes(): number[] {
        return this._bytes
    }

    /**
     * Returns a section of an ArrayBuffer.
     * From https://github.com/ttaubert/node-arraybuffer-slice/
     */
    public slice(from: number, to: number = null): ArrayBuffer {
        let length: number = this.byteLength
        let begin: number = ArrayBuffer.clamp(from, length)
        let end: number = length

        if (to !== null) {
            end = ArrayBuffer.clamp(to, length)
        }

        if (begin > end) {
            return new ArrayBuffer(0)
        }

        let num: number = end - begin
        let target: ArrayBuffer = new ArrayBuffer(num)
        let targetArray: Uint8Array = new Uint8Array()
        targetArray.fromArrayBuffer(target)
        let sourceArray: Uint8Array = new Uint8Array()
        sourceArray.fromArrayBuffer(this, begin, num)
        targetArray.setFromTypedArray(sourceArray)

        return target
    }

    protected static clamp(val: number, length: number): number {
        val = (val | 0) || 0
        if (val < 0) {
            return Math.max(val + length, 0)
        }
        return Math.min(val, length)
    }
}