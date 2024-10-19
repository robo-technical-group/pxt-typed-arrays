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

class DataView {
    public constructor(buffer: ArrayBuffer,
        byteOffset: number = 0,
        byteLength: number = 0) {

        }

    public get buffer(): ArrayBuffer {
        throw "Not yet implemented."
    }

    public get byteLength(): number {
        throw "Not yet implemented."
    }

    public get byteOffset(): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Float32 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    public getFloat32(byteOffset: number, littleEndian?: boolean): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Float64 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    public getFloat64(byteOffset: number, littleEndian?: boolean): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Int8 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    public getInt8(byteOffset: number): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Int16 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    public getInt16(byteOffset: number, littleEndian?: boolean): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Int32 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    public getInt32(byteOffset: number, littleEndian?: boolean): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Uint8 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     */
    public getUint8(byteOffset: number): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Uint16 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    public getUint16(byteOffset: number, littleEndian?: boolean): number {
        throw "Not yet implemented."
    }

    /**
     * Gets the Uint32 value at the specified byte offset from the start of the view. There is
     * no alignment constraint; multi-byte values may be fetched from any offset.
     * @param byteOffset The place in the buffer at which the value should be retrieved.
     * @param littleEndian If false or undefined, a big-endian value should be read.
     */
    public getUint32(byteOffset: number, littleEndian?: boolean): number {
        throw "Not yet implemented."
    }

    /**
     * Stores an Float32 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    public setFloat32(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Float64 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    public setFloat64(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Int8 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     */
    public setInt8(byteOffset: number, value: number): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Int16 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    public setInt16(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Int32 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    public setInt32(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Uint8 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     */
    public setUint8(byteOffset: number, value: number): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Uint16 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    public setUint16(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw "Not yet implemented."
    }

    /**
     * Stores an Uint32 value at the specified byte offset from the start of the view.
     * @param byteOffset The place in the buffer at which the value should be set.
     * @param value The value to set.
     * @param littleEndian If false or undefined, a big-endian value should be written.
     */
    public setUint32(byteOffset: number, value: number, littleEndian?: boolean): void {
        throw "Not yet implemented."
    }
}