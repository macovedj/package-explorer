import { dropDescriptor as lowering2Callee, writeViaStream as lowering5Callee, appendViaStream as lowering6Callee } from '@bytecodealliance/preview2-shim/filesystem';
import { exit as lowering3Callee } from '@bytecodealliance/preview2-shim/exit';
import { getEnvironment as lowering9Callee } from '@bytecodealliance/preview2-shim/environment';
import { print as lowering7Callee } from '@bytecodealliance/preview2-shim/stderr';
import { dropInputStream as lowering0Callee, dropOutputStream as lowering1Callee, write as lowering4Callee } from '@bytecodealliance/preview2-shim/io';
import { getRandomBytes as lowering8Callee } from '@bytecodealliance/preview2-shim/random';

const instantiateCore = WebAssembly.instantiate;

const hasOwnProperty = Object.prototype.hasOwnProperty;

function getErrorPayload(e) {
  if (hasOwnProperty.call(e, 'payload')) return e.payload;
  if (hasOwnProperty.call(e, 'message')) return String(e.message);
  return String(e);
}

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const toUint64 = val => BigInt.asUintN(64, val);

function toUint32(val) {
  return val >>> 0;
}

function toString(val) {
  if (typeof val === 'symbol') throw new TypeError('symbols cannot be converted to strings');
  return String(val);
}

const utf8Decoder = new TextDecoder();

const utf8Encoder = new TextEncoder();

function myEncode(s, realloc, memory) {
  let encodedLen
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    encodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  encodedLen = writtenTotal;
  return {ptr, encodedLen};
}

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let allocLen = 0;
  let ptr = 0;
  let writtenTotal = 0;
  while (s.length > 0) {
    ptr = realloc(ptr, allocLen, 1, allocLen + s.length);
    allocLen += s.length;
    const { read, written } = utf8Encoder.encodeInto(
    s,
    new Uint8Array(memory.buffer, ptr + writtenTotal, allocLen - writtenTotal),
    );
    writtenTotal += written;
    s = s.slice(read);
  }
  if (allocLen > writtenTotal)
  ptr = realloc(ptr, allocLen, 1, writtenTotal);
  utf8EncodedLen = writtenTotal;
  return ptr;
}

function throwUninitialized() {
  throw new TypeError('Wasm uninitialized use `await $init` first');
}

const isNode = typeof process !== 'undefined' && process.versions && process.versions.node;
let _fs;
async function fetchCompile (url) {
  if (isNode) {
    _fs = _fs || await import('fs/promises');
    return WebAssembly.compile(await _fs.readFile(url));
  }
  return fetch(url).then(WebAssembly.compileStreaming);
}

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

let exports0;
let exports1;

function lowering0(arg0) {
  lowering0Callee(arg0 >>> 0);
}

function lowering1(arg0) {
  lowering1Callee(arg0 >>> 0);
}

function lowering2(arg0) {
  lowering2Callee(arg0 >>> 0);
}

function lowering3(arg0) {
  let variant0;
  switch (arg0) {
    case 0: {
      variant0= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant0= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  lowering3Callee(variant0);
}
let exports2;
let memory0;

function lowering4(arg0, arg1, arg2, arg3) {
  const ptr0 = arg1;
  const len0 = arg2;
  const result0 = new Uint8Array(memory0.buffer.slice(ptr0, ptr0 + len0 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: lowering4Callee(arg0 >>> 0, result0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant2 = ret;
  switch (variant2.tag) {
    case 'ok': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      dataView(memory0).setBigInt64(arg3 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant2.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      const { } = e;
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function lowering5(arg0, arg1, arg2) {
  let ret;
  try {
    ret = { tag: 'ok', val: lowering5Callee(arg0 >>> 0, BigInt.asUintN(64, arg1)) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      dataView(memory0).setInt32(arg2 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      const val0 = toString(e);
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'again': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'badf': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlk': {
          enum0 = 5;
          break;
        }
        case 'dquot': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'fbig': {
          enum0 = 8;
          break;
        }
        case 'ilseq': {
          enum0 = 9;
          break;
        }
        case 'inprogress': {
          enum0 = 10;
          break;
        }
        case 'intr': {
          enum0 = 11;
          break;
        }
        case 'inval': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'isdir': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'mlink': {
          enum0 = 16;
          break;
        }
        case 'msgsize': {
          enum0 = 17;
          break;
        }
        case 'nametoolong': {
          enum0 = 18;
          break;
        }
        case 'nodev': {
          enum0 = 19;
          break;
        }
        case 'noent': {
          enum0 = 20;
          break;
        }
        case 'nolck': {
          enum0 = 21;
          break;
        }
        case 'nomem': {
          enum0 = 22;
          break;
        }
        case 'nospc': {
          enum0 = 23;
          break;
        }
        case 'nosys': {
          enum0 = 24;
          break;
        }
        case 'notdir': {
          enum0 = 25;
          break;
        }
        case 'notempty': {
          enum0 = 26;
          break;
        }
        case 'notrecoverable': {
          enum0 = 27;
          break;
        }
        case 'notsup': {
          enum0 = 28;
          break;
        }
        case 'notty': {
          enum0 = 29;
          break;
        }
        case 'nxio': {
          enum0 = 30;
          break;
        }
        case 'overflow': {
          enum0 = 31;
          break;
        }
        case 'perm': {
          enum0 = 32;
          break;
        }
        case 'pipe': {
          enum0 = 33;
          break;
        }
        case 'rofs': {
          enum0 = 34;
          break;
        }
        case 'spipe': {
          enum0 = 35;
          break;
        }
        case 'txtbsy': {
          enum0 = 36;
          break;
        }
        case 'xdev': {
          enum0 = 37;
          break;
        }
        default: {
          throw new TypeError(`"${val0}" is not one of the cases of errno`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function lowering6(arg0, arg1) {
  let ret;
  try {
    ret = { tag: 'ok', val: lowering6Callee(arg0 >>> 0) };
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  const variant1 = ret;
  switch (variant1.tag) {
    case 'ok': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setInt32(arg1 + 4, toUint32(e), true);
      break;
    }
    case 'err': {
      const e = variant1.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      const val0 = toString(e);
      let enum0;
      switch (val0) {
        case 'access': {
          enum0 = 0;
          break;
        }
        case 'again': {
          enum0 = 1;
          break;
        }
        case 'already': {
          enum0 = 2;
          break;
        }
        case 'badf': {
          enum0 = 3;
          break;
        }
        case 'busy': {
          enum0 = 4;
          break;
        }
        case 'deadlk': {
          enum0 = 5;
          break;
        }
        case 'dquot': {
          enum0 = 6;
          break;
        }
        case 'exist': {
          enum0 = 7;
          break;
        }
        case 'fbig': {
          enum0 = 8;
          break;
        }
        case 'ilseq': {
          enum0 = 9;
          break;
        }
        case 'inprogress': {
          enum0 = 10;
          break;
        }
        case 'intr': {
          enum0 = 11;
          break;
        }
        case 'inval': {
          enum0 = 12;
          break;
        }
        case 'io': {
          enum0 = 13;
          break;
        }
        case 'isdir': {
          enum0 = 14;
          break;
        }
        case 'loop': {
          enum0 = 15;
          break;
        }
        case 'mlink': {
          enum0 = 16;
          break;
        }
        case 'msgsize': {
          enum0 = 17;
          break;
        }
        case 'nametoolong': {
          enum0 = 18;
          break;
        }
        case 'nodev': {
          enum0 = 19;
          break;
        }
        case 'noent': {
          enum0 = 20;
          break;
        }
        case 'nolck': {
          enum0 = 21;
          break;
        }
        case 'nomem': {
          enum0 = 22;
          break;
        }
        case 'nospc': {
          enum0 = 23;
          break;
        }
        case 'nosys': {
          enum0 = 24;
          break;
        }
        case 'notdir': {
          enum0 = 25;
          break;
        }
        case 'notempty': {
          enum0 = 26;
          break;
        }
        case 'notrecoverable': {
          enum0 = 27;
          break;
        }
        case 'notsup': {
          enum0 = 28;
          break;
        }
        case 'notty': {
          enum0 = 29;
          break;
        }
        case 'nxio': {
          enum0 = 30;
          break;
        }
        case 'overflow': {
          enum0 = 31;
          break;
        }
        case 'perm': {
          enum0 = 32;
          break;
        }
        case 'pipe': {
          enum0 = 33;
          break;
        }
        case 'rofs': {
          enum0 = 34;
          break;
        }
        case 'spipe': {
          enum0 = 35;
          break;
        }
        case 'txtbsy': {
          enum0 = 36;
          break;
        }
        case 'xdev': {
          enum0 = 37;
          break;
        }
        default: {
          throw new TypeError(`"${val0}" is not one of the cases of errno`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum0, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}

function lowering7(arg0, arg1) {
  const ptr0 = arg0;
  const len0 = arg1;
  const result0 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr0, len0));
  lowering7Callee(result0);
}
let realloc0;

function lowering8(arg0, arg1) {
  const ret = lowering8Callee(arg0 >>> 0);
  const val0 = ret;
  const len0 = val0.byteLength;
  const ptr0 = realloc0(0, 0, 1, len0 * 1);
  const src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}

function lowering9(arg0) {
  const ret = lowering9Callee();
  const vec3 = ret;
  const len3 = vec3.length;
  const result3 = realloc0(0, 0, 4, len3 * 16);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 16;const [tuple0_0, tuple0_1] = e;
    const ptr1 = utf8Encode(tuple0_0, realloc0, memory0);
    const len1 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len1, true);
    dataView(memory0).setInt32(base + 0, ptr1, true);
    const ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    const len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 12, len2, true);
    dataView(memory0).setInt32(base + 8, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}
let exports3;
let realloc1;
let postReturn0;
const protocol = {
  validate(arg0) {
    if (!_initialized) throwUninitialized();
    const vec4 = arg0;
    const len4 = vec4.length;
    const result4 = realloc1(0, 0, 4, len4 * 24);
    for (let i = 0; i < vec4.length; i++) {
      const e = vec4[i];
      const base = result4 + i * 24;const {contentBytes: v0_0, keyId: v0_1, signature: v0_2 } = e;
      const val1 = v0_0;
      const len1 = val1.byteLength;
      const ptr1 = realloc1(0, 0, 1, len1 * 1);
      const src1 = new Uint8Array(val1.buffer || val1, val1.byteOffset, len1 * 1);
      (new Uint8Array(memory0.buffer, ptr1, len1 * 1)).set(src1);
      dataView(memory0).setInt32(base + 4, len1, true);
      dataView(memory0).setInt32(base + 0, ptr1, true);
      const ptr2 = utf8Encode(v0_1, realloc1, memory0);
      const len2 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len2, true);
      dataView(memory0).setInt32(base + 8, ptr2, true);
      const ptr3 = utf8Encode(v0_2, realloc1, memory0);
      const len3 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 20, len3, true);
      dataView(memory0).setInt32(base + 16, ptr3, true);
    }
    const ret = exports1['protocol#validate'](result4, len4);
    const ptr5 = dataView(memory0).getInt32(ret + 0, true);
    const len5 = dataView(memory0).getInt32(ret + 4, true);
    const result5 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr5, len5));
    let variant7;
    switch (dataView(memory0).getUint8(ret + 8, true)) {
      case 0: {
        variant7 = null;
        break;
      }
      case 1: {
        const ptr6 = dataView(memory0).getInt32(ret + 12, true);
        const len6 = dataView(memory0).getInt32(ret + 16, true);
        const result6 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr6, len6));
        variant7 = result6;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    let variant9;
    switch (dataView(memory0).getUint8(ret + 20, true)) {
      case 0: {
        variant9 = null;
        break;
      }
      case 1: {
        let enum8;
        switch (dataView(memory0).getUint8(ret + 21, true)) {
          case 0: {
            enum8 = 'sha256';
            break;
          }
          default: {
            throw new TypeError('invalid discriminant specified for HashAlgorithm');
          }
        }
        variant9 = enum8;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    let variant15;
    switch (dataView(memory0).getUint8(ret + 24, true)) {
      case 0: {
        variant15 = null;
        break;
      }
      case 1: {
        let variant12;
        switch (dataView(memory0).getUint8(ret + 28, true)) {
          case 0: {
            let enum10;
            switch (dataView(memory0).getUint8(ret + 32, true)) {
              case 0: {
                enum10 = 'sha256';
                break;
              }
              default: {
                throw new TypeError('invalid discriminant specified for HashAlgorithm');
              }
            }
            const ptr11 = dataView(memory0).getInt32(ret + 36, true);
            const len11 = dataView(memory0).getInt32(ret + 40, true);
            const result11 = new Uint8Array(memory0.buffer.slice(ptr11, ptr11 + len11 * 1));
            variant12= {
              tag: 'dyn-hash',
              val: {
                algo: enum10,
                bytes: result11,
              }
            };
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for RecordId');
          }
        }
        let variant14;
        switch (dataView(memory0).getUint8(ret + 44, true)) {
          case 0: {
            variant14 = null;
            break;
          }
          case 1: {
            const ptr13 = dataView(memory0).getInt32(ret + 48, true);
            const len13 = dataView(memory0).getInt32(ret + 52, true);
            const result13 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr13, len13));
            variant14 = result13;
            break;
          }
          default: {
            throw new TypeError('invalid variant discriminant for option');
          }
        }
        variant15 = {
          digest: variant12,
          timestamp: variant14,
        };
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    const len19 = dataView(memory0).getInt32(ret + 60, true);
    const base19 = dataView(memory0).getInt32(ret + 56, true);
    const result19 = [];
    for (let i = 0; i < len19; i++) {
      const base = base19 + i * 16;
      const ptr16 = dataView(memory0).getInt32(base + 0, true);
      const len16 = dataView(memory0).getInt32(base + 4, true);
      const result16 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr16, len16));
      const len18 = dataView(memory0).getInt32(base + 12, true);
      const base18 = dataView(memory0).getInt32(base + 8, true);
      const result18 = [];
      for (let i = 0; i < len18; i++) {
        const base = base18 + i * 1;
        let enum17;
        switch (dataView(memory0).getUint8(base + 0, true)) {
          case 0: {
            enum17 = 'release';
            break;
          }
          case 1: {
            enum17 = 'yank';
            break;
          }
          default: {
            throw new TypeError('invalid discriminant specified for Permission');
          }
        }
        result18.push(enum17);
      }
      result19.push({
        keyId: result16,
        permissions: result18,
      });
    }
    const len28 = dataView(memory0).getInt32(ret + 68, true);
    const base28 = dataView(memory0).getInt32(ret + 64, true);
    const result28 = [];
    for (let i = 0; i < len28; i++) {
      const base = base28 + i * 44;
      const ptr20 = dataView(memory0).getInt32(base + 0, true);
      const len20 = dataView(memory0).getInt32(base + 4, true);
      const result20 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr20, len20));
      const ptr21 = dataView(memory0).getInt32(base + 8, true);
      const len21 = dataView(memory0).getInt32(base + 12, true);
      const result21 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr21, len21));
      const ptr22 = dataView(memory0).getInt32(base + 16, true);
      const len22 = dataView(memory0).getInt32(base + 20, true);
      const result22 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr22, len22));
      let variant27;
      switch (dataView(memory0).getUint8(base + 24, true)) {
        case 0: {
          let enum23;
          switch (dataView(memory0).getUint8(base + 28, true)) {
            case 0: {
              enum23 = 'sha256';
              break;
            }
            default: {
              throw new TypeError('invalid discriminant specified for HashAlgorithm');
            }
          }
          const ptr24 = dataView(memory0).getInt32(base + 32, true);
          const len24 = dataView(memory0).getInt32(base + 36, true);
          const result24 = new Uint8Array(memory0.buffer.slice(ptr24, ptr24 + len24 * 1));
          variant27= {
            tag: 'released',
            val: {
              content: {
                algo: enum23,
                bytes: result24,
              },
            }
          };
          break;
        }
        case 1: {
          const ptr25 = dataView(memory0).getInt32(base + 28, true);
          const len25 = dataView(memory0).getInt32(base + 32, true);
          const result25 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr25, len25));
          const ptr26 = dataView(memory0).getInt32(base + 36, true);
          const len26 = dataView(memory0).getInt32(base + 40, true);
          const result26 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr26, len26));
          variant27= {
            tag: 'yanked',
            val: {
              by: result25,
              timestamp: result26,
            }
          };
          break;
        }
        default: {
          throw new TypeError('invalid variant discriminant for ReleaseState');
        }
      }
      result28.push({
        version: result20,
        by: result21,
        timestamp: result22,
        state: variant27,
      });
    }
    let variant32;
    switch (dataView(memory0).getUint8(ret + 72, true)) {
      case 0: {
        variant32 = null;
        break;
      }
      case 1: {
        const len31 = dataView(memory0).getInt32(ret + 80, true);
        const base31 = dataView(memory0).getInt32(ret + 76, true);
        const result31 = [];
        for (let i = 0; i < len31; i++) {
          const base = base31 + i * 16;
          const ptr29 = dataView(memory0).getInt32(base + 0, true);
          const len29 = dataView(memory0).getInt32(base + 4, true);
          const result29 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr29, len29));
          const ptr30 = dataView(memory0).getInt32(base + 8, true);
          const len30 = dataView(memory0).getInt32(base + 12, true);
          const result30 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr30, len30));
          result31.push({
            keyId: result29,
            publicKey: result30,
          });
        }
        variant32 = result31;
        break;
      }
      default: {
        throw new TypeError('invalid variant discriminant for option');
      }
    }
    const len35 = dataView(memory0).getInt32(ret + 88, true);
    const base35 = dataView(memory0).getInt32(ret + 84, true);
    const result35 = [];
    for (let i = 0; i < len35; i++) {
      const base = base35 + i * 16;
      const ptr33 = dataView(memory0).getInt32(base + 0, true);
      const len33 = dataView(memory0).getInt32(base + 4, true);
      const result33 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr33, len33));
      const ptr34 = dataView(memory0).getInt32(base + 8, true);
      const len34 = dataView(memory0).getInt32(base + 12, true);
      const result34 = utf8Decoder.decode(new Uint8Array(memory0.buffer, ptr34, len34));
      result35.push({
        logId: result33,
        recordId: result34,
      });
    }
    postReturn0(ret);
    return {
      name: result5,
      checkpoint: variant7,
      state: {
        algorithm: variant9,
        head: variant15,
        permissions: result19,
        releases: result28,
        keys: variant32,
      },
      heads: result35,
    };
  },
  proveInclusion(arg0, arg1, arg2) {
    if (!_initialized) throwUninitialized();
    const {log: v0_0, map: v0_1 } = arg0;
    const var1 = myEncode(v0_0, realloc1, memory0);
    const len1 = utf8EncodedLen;
    const var2 = myEncode(v0_1, realloc1, memory0);
    const len2 = utf8EncodedLen;
    const {logRoot: v3_0, logLength: v3_1, mapRoot: v3_2 } = arg1;
    const var4 = myEncode(v3_0, realloc1, memory0);
    const len4 = utf8EncodedLen;
    const var5 = myEncode(v3_2, realloc1, memory0);
    const len5 = utf8EncodedLen;
    const vec9 = arg2;
    const len9 = vec9.length;
    const result9 = realloc1(0, 0, 4, len9 * 16);
    for (let i = 0; i < vec9.length; i++) {
      const e = vec9[i];
      const base = result9 + i * 16;const {logId: v6_0, recordId: v6_1 } = e;
      const ptr7 = utf8Encode(v6_0, realloc1, memory0);
      const len7 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 4, len7, true);
      dataView(memory0).setInt32(base + 0, ptr7, true);
      const ptr8 = utf8Encode(v6_1, realloc1, memory0);
      const len8 = utf8EncodedLen;
      dataView(memory0).setInt32(base + 12, len8, true);
      dataView(memory0).setInt32(base + 8, ptr8, true);
    }
    exports1['protocol#prove-inclusion'](var1.ptr, var1.encodedLen, var2.ptr, var2.encodedLen, var4.ptr, var4.encodedLen, toUint32(v3_1), var5.ptr, var5.encodedLen, result9, len9);
  },
  
};

export { protocol }

let _initialized = false;
export const $init = (async() => {
  const module0 = fetchCompile(new URL('./protocol_wasm.core.wasm', import.meta.url));
  const module1 = fetchCompile(new URL('./protocol_wasm.core2.wasm', import.meta.url));
  const module2 = base64Compile('AGFzbQEAAAABLghgBH9/f38AYAN/fn8AYAJ/fwBgAn9/AGABfwBgBH9/f38Bf2ACf38Bf2ABfwADDAsAAQIDAgQFBgYGBwQFAXABCwsHOQwBMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoIJGltcG9ydHMBAAqLAQsPACAAIAEgAiADQQARAAALDQAgACABIAJBAREBAAsLACAAIAFBAhECAAsLACAAIAFBAxEDAAsLACAAIAFBBBECAAsJACAAQQURBAALDwAgACABIAIgA0EGEQUACwsAIAAgAUEHEQYACwsAIAAgAUEIEQYACwsAIAAgAUEJEQYACwkAIABBChEHAAsALQlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAUwLjcuMQDNAwRuYW1lABMSd2l0LWNvbXBvbmVudDpzaGltAbADCwAWaW5kaXJlY3Qtd2FzaS1pby13cml0ZQEpaW5kaXJlY3Qtd2FzaS1maWxlc3lzdGVtLXdyaXRlLXZpYS1zdHJlYW0CKmluZGlyZWN0LXdhc2ktZmlsZXN5c3RlbS1hcHBlbmQtdmlhLXN0cmVhbQMaaW5kaXJlY3Qtd2FzaS1zdGRlcnItcHJpbnQEJWluZGlyZWN0LXdhc2ktcmFuZG9tLWdldC1yYW5kb20tYnl0ZXMFKWluZGlyZWN0LXdhc2ktZW52aXJvbm1lbnQtZ2V0LWVudmlyb25tZW50BiVhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLWZkX3dyaXRlBydhZGFwdC13YXNpX3NuYXBzaG90X3ByZXZpZXcxLXJhbmRvbV9nZXQIKGFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9nZXQJLmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtZW52aXJvbl9zaXplc19nZXQKJmFkYXB0LXdhc2lfc25hcHNob3RfcHJldmlldzEtcHJvY19leGl0');
  const module3 = base64Compile('AGFzbQEAAAABLghgBH9/f38AYAN/fn8AYAJ/fwBgAn9/AGABfwBgBH9/f38Bf2ACf38Bf2ABfwACSAwAATAAAAABMQABAAEyAAIAATMAAwABNAACAAE1AAQAATYABQABNwAGAAE4AAYAATkABgACMTAABwAIJGltcG9ydHMBcAELCwkRAQBBAAsLAAECAwQFBgcICQoALQlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAUwLjcuMQAcBG5hbWUAFRR3aXQtY29tcG9uZW50OmZpeHVwcw==');
  Promise.all([module0, module1, module2, module3]).catch(() => {});
  ({ exports: exports0 } = await instantiateCore(await module2));
  ({ exports: exports1 } = await instantiateCore(await module0, {
    wasi_snapshot_preview1: {
      environ_get: exports0['8'],
      environ_sizes_get: exports0['9'],
      fd_write: exports0['6'],
      proc_exit: exports0['10'],
      random_get: exports0['7'],
    },
  }));
  ({ exports: exports2 } = await instantiateCore(await module1, {
    __main_module__: {
      cabi_realloc: exports1.cabi_realloc,
    },
    env: {
      memory: exports1.memory,
    },
    'wasi-environment': {
      'get-environment': exports0['5'],
    },
    'wasi-exit': {
      exit: lowering3,
    },
    'wasi-filesystem': {
      'append-via-stream': exports0['2'],
      'drop-descriptor': lowering2,
      'write-via-stream': exports0['1'],
    },
    'wasi-io': {
      'drop-input-stream': lowering0,
      'drop-output-stream': lowering1,
      write: exports0['0'],
    },
    'wasi-random': {
      'get-random-bytes': exports0['4'],
    },
    'wasi-stderr': {
      print: exports0['3'],
    },
  }));
  memory0 = exports1.memory;
  realloc0 = exports2.cabi_import_realloc;
  ({ exports: exports3 } = await instantiateCore(await module3, {
    '': {
      $imports: exports0.$imports,
      '0': lowering4,
      '1': lowering5,
      '10': exports2.proc_exit,
      '2': lowering6,
      '3': lowering7,
      '4': lowering8,
      '5': lowering9,
      '6': exports2.fd_write,
      '7': exports2.random_get,
      '8': exports2.environ_get,
      '9': exports2.environ_sizes_get,
    },
  }));
  realloc1 = exports1.cabi_realloc;
  postReturn0 = exports1['cabi_post_protocol#validate'];
  _initialized = true;
})();
