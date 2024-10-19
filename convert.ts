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

// Internal conversion functions:
//    pack<Type>()   - take a number (interpreted as Type), output a byte array
//    unpack<Type>() - take a byte array, output a Type-like number

namespace Convert {
    function as_signed(value: number, bits: number): number { let s: number = 32 - bits; return (value << s) >> s; }
    function as_unsigned(value: number, bits: number) { let s: number = 32 - bits; return (value << s) >>> s; }

    export function packI8(n: number): number[] { return [n & 0xff]; }
    export function unpackI8(bytes: number[]): number { return as_signed(bytes[0], 8); }

    export function packU8(n: number): number[] { return [n & 0xff]; }
    export function unpackU8(bytes: number[]): number { return as_unsigned(bytes[0], 8); }

    export function packU8Clamped(n: number): number[] { n = Math.round(n); return [n < 0 ? 0 : n > 0xff ? 0xff : n & 0xff]; }

    export function packI16(n: number): number[] { return [n & 0xff, (n >> 8) & 0xff]; }
    export function unpackI16(bytes: number[]): number { return as_signed(bytes[1] << 8 | bytes[0], 16); }

    export function packU16(n: number): number[] { return [n & 0xff, (n >> 8) & 0xff]; }
    export function unpackU16(bytes: number[]): number { return as_unsigned(bytes[1] << 8 | bytes[0], 16); }

    export function packI32(n: number): number[] { return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff]; }
    export function unpackI32(bytes: number[]): number { return as_signed(bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0], 32); }

    export function packU32(n: number): number[] { return [n & 0xff, (n >> 8) & 0xff, (n >> 16) & 0xff, (n >> 24) & 0xff]; }
    export function unpackU32(bytes: number[]): number { return as_unsigned(bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0], 32); }
}