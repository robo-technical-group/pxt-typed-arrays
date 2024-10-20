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

class TypedArray {
    protected BYTES_PER_ELEMENT: number
    protected _buffer: ArrayBuffer
    protected _byteLength: number
    protected _byteOffset: number
    protected _length: number
    protected _pack: (value: number) => number[]
    protected _unpack: (bytes: number[]) => number

    public constructor(length: number) {
        length = length >> 0
        if (length < 0) {
            throw "length is not a small enough non-negative integer."
        }

        this._length = length
        this._byteOffset = 0
    }

    /**
     * Additional constructors as methods.
     */
    public fromArray(source: number[]): void {
        let byteLength: number = source.length * this.BYTES_PER_ELEMENT
        this._buffer = new ArrayBuffer(byteLength)
        this._byteLength = byteLength
        this._byteOffset = 0
        this._length = source.length

        for (let i: number = 0; i < this.length; i++) {
            this.set(i, source[i])
        }
    }
    
    public fromArrayBuffer(
        source: ArrayBuffer,
        byteOffset: number = 0,
        length: number = null
    ): void {
        byteOffset = byteOffset >>> 0
        if (byteOffset > source.byteLength) {
            throw "byteOffset out of range."
        }

        /**
         * The given byteOffset must be multiple of the
         * element size of the specific type.
         */
        if (byteOffset % this.BYTES_PER_ELEMENT != 0) {
            throw "Buffer length minus the byteOffset is not a multiple of the element size."
        }

        let byteLength: number
        if (length == null) {
            byteLength = source.byteLength - byteOffset
            if (byteLength % this.BYTES_PER_ELEMENT != 0) {
                throw "Length of buffer minus byteOffset not a multiple of the element size."
            }
            length = byteLength / this.BYTES_PER_ELEMENT
        } else {
            length = length >>> 0
            byteLength = length * this.BYTES_PER_ELEMENT
        }

        if ((byteOffset + byteLength) > source.byteLength) {
            throw "byteOffset and length reference are an area beyond the end of the buffer."
        }

        this._buffer = source
        this._byteLength = byteLength
        this._byteOffset = byteOffset
        this._length = length
    }

    public fromTypedArray(source: TypedArray): void {
        let byteLength: number = source.length * this.BYTES_PER_ELEMENT
        this._buffer = new ArrayBuffer(byteLength)
        this._byteLength = byteLength
        this._byteOffset = 0
        this._length = source.length

        for (let i: number = 0; i < this._length; i++) {
            this.set(i, source.get(i))
        }
    }
    
    /**
     * Public properties
     */
    public get buffer(): ArrayBuffer {
        return this._buffer
    }

    public get byteLength(): number {
        return this._byteLength
    }

    public get byteOffset(): number {
        return this._byteOffset
    }

    public get bytesPerElement(): number {
        return this.BYTES_PER_ELEMENT
    }

    public get length(): number {
        return this._length
    }

    /**
     * Public functions
     */
    public get(index: number): number | undefined {
        index = index >>> 0
        if (index >= this._length) {
            return undefined
        }

        let bytes: number[] = []
        let i, o: number
        for (
            i = 0, o = this._byteOffset + index * this.BYTES_PER_ELEMENT;
            i < this.BYTES_PER_ELEMENT;
            i++, o++
        ) {
            bytes.push(this._buffer.bytes[o])
        }

        return this._unpack(bytes)
    }

    public set(index: number, value: number): void {
        index = index >>> 0
        if (index >= this._length) {
            return
        }

        let bytes: number[] = this._pack(value)
        let i, o: number
        for (
            i = 0, o = this.byteOffset + index * this.BYTES_PER_ELEMENT;
            i < this.BYTES_PER_ELEMENT;
            i++, o++
        ) {
            this.buffer.bytes[o] = bytes[i]
        }
    }

    /**
     * Protected functions
     */
    /**
     * Call during construction to finish initialization.
     */
    protected init(): void {
        this._byteLength = this._length * this.BYTES_PER_ELEMENT
        this._buffer = new ArrayBuffer(this._byteLength)
   }
}