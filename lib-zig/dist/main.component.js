import { environment, exit as exit$1, stderr, stdin, stdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, streams } from '@bytecodealliance/preview2-shim/io';
import { random } from '@bytecodealliance/preview2-shim/random';
const { getArguments } = environment;
const { exit } = exit$1;
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { InputStream,
  OutputStream } = streams;
const { getRandomBytes } = random;

const base64Compile = str => WebAssembly.compile(typeof Buffer !== 'undefined' ? Buffer.from(str, 'base64') : Uint8Array.from(atob(str), b => b.charCodeAt(0)));

class ComponentError extends Error {
  constructor (value) {
    const enumerable = typeof value !== 'string';
    super(enumerable ? `${String(value)} (see error.payload)` : value);
    Object.defineProperty(this, 'payload', { value, enumerable });
  }
}

let curResourceBorrows = [];

let dv = new DataView(new ArrayBuffer());
const dataView = mem => dv.buffer === mem.buffer ? dv : dv = new DataView(mem.buffer);

const emptyFunc = () => {};

function finalizationRegistryCreate (unregister) {
  if (typeof FinalizationRegistry === 'undefined') {
    return { unregister () {} };
  }
  return new FinalizationRegistry(unregister);
}

function getErrorPayload(e) {
  if (e && hasOwnProperty.call(e, 'payload')) return e.payload;
  if (e instanceof Error) throw e;
  return e;
}

const handleTables = [];

const hasOwnProperty = Object.prototype.hasOwnProperty;

const instantiateCore = WebAssembly.instantiate;

const T_FLAG = 1 << 30;

function rscTableCreateOwn (table, rep) {
  const free = table[0] & ~T_FLAG;
  if (free === 0) {
    table.push(0);
    table.push(rep | T_FLAG);
    return (table.length >> 1) - 1;
  }
  table[0] = table[free << 1];
  table[free << 1] = 0;
  table[(free << 1) + 1] = rep | T_FLAG;
  return free;
}

function rscTableRemove (table, handle) {
  const scope = table[handle << 1];
  const val = table[(handle << 1) + 1];
  const own = (val & T_FLAG) !== 0;
  const rep = val & ~T_FLAG;
  if (val === 0 || (scope & T_FLAG) !== 0) throw new TypeError('Invalid handle');
  table[handle << 1] = table[0] | T_FLAG;
  table[0] = handle | T_FLAG;
  return { rep, scope, own };
}

const symbolCabiDispose = Symbol.for('cabiDispose');

const symbolRscHandle = Symbol('handle');

const symbolRscRep = Symbol.for('cabiRep');

const symbolDispose = Symbol.dispose || Symbol.for('dispose');

const toUint64 = val => BigInt.asUintN(64, BigInt(val));

function toInt32(val) {
  return val >> 0;
}

function toUint32(val) {
  return val >>> 0;
}

const utf8Encoder = new TextEncoder();

let utf8EncodedLen = 0;
function utf8Encode(s, realloc, memory) {
  if (typeof s !== 'string') throw new TypeError('expected a string');
  if (s.length === 0) {
    utf8EncodedLen = 0;
    return 1;
  }
  let buf = utf8Encoder.encode(s);
  let ptr = realloc(0, 0, 1, buf.length);
  new Uint8Array(memory.buffer).set(buf, ptr);
  utf8EncodedLen = buf.length;
  return ptr;
}


let exports0;
let exports1;
const handleTable1 = [T_FLAG, 0];
const captureTable1= new Map();
let captureCnt1 = 0;
handleTables[1] = handleTable1;

function trampoline5() {
  const ret = getStderr();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}

const handleTable2 = [T_FLAG, 0];
const captureTable2= new Map();
let captureCnt2 = 0;
handleTables[2] = handleTable2;

function trampoline6() {
  const ret = getStdin();
  if (!(ret instanceof InputStream)) {
    throw new TypeError('Resource error: Not a valid "InputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt2;
    captureTable2.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable2, rep);
  }
  return handle0;
}


function trampoline7() {
  const ret = getStdout();
  if (!(ret instanceof OutputStream)) {
    throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
  }
  var handle0 = ret[symbolRscHandle];
  if (!handle0) {
    const rep = ret[symbolRscRep] || ++captureCnt1;
    captureTable1.set(rep, ret);
    handle0 = rscTableCreateOwn(handleTable1, rep);
  }
  return handle0;
}


function trampoline8(arg0) {
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
  exit(variant0);
}

let exports2;
let memory0;
let realloc0;

function trampoline9(arg0) {
  const ret = getArguments();
  var vec1 = ret;
  var len1 = vec1.length;
  var result1 = realloc0(0, 0, 4, len1 * 8);
  for (let i = 0; i < vec1.length; i++) {
    const e = vec1[i];
    const base = result1 + i * 8;var ptr0 = utf8Encode(e, realloc0, memory0);
    var len0 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 4, len0, true);
    dataView(memory0).setInt32(base + 0, ptr0, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len1, true);
  dataView(memory0).setInt32(arg0 + 0, result1, true);
}

const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

function trampoline10(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable0[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable0.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Error$1.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  const ret = filesystemErrorCode(rsc0);
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant4 = ret;
  if (variant4 === null || variant4=== undefined) {
    dataView(memory0).setInt8(arg1 + 0, 0, true);
  } else {
    const e = variant4;
    dataView(memory0).setInt8(arg1 + 0, 1, true);
    var val3 = e;
    let enum3;
    switch (val3) {
      case 'access': {
        enum3 = 0;
        break;
      }
      case 'would-block': {
        enum3 = 1;
        break;
      }
      case 'already': {
        enum3 = 2;
        break;
      }
      case 'bad-descriptor': {
        enum3 = 3;
        break;
      }
      case 'busy': {
        enum3 = 4;
        break;
      }
      case 'deadlock': {
        enum3 = 5;
        break;
      }
      case 'quota': {
        enum3 = 6;
        break;
      }
      case 'exist': {
        enum3 = 7;
        break;
      }
      case 'file-too-large': {
        enum3 = 8;
        break;
      }
      case 'illegal-byte-sequence': {
        enum3 = 9;
        break;
      }
      case 'in-progress': {
        enum3 = 10;
        break;
      }
      case 'interrupted': {
        enum3 = 11;
        break;
      }
      case 'invalid': {
        enum3 = 12;
        break;
      }
      case 'io': {
        enum3 = 13;
        break;
      }
      case 'is-directory': {
        enum3 = 14;
        break;
      }
      case 'loop': {
        enum3 = 15;
        break;
      }
      case 'too-many-links': {
        enum3 = 16;
        break;
      }
      case 'message-size': {
        enum3 = 17;
        break;
      }
      case 'name-too-long': {
        enum3 = 18;
        break;
      }
      case 'no-device': {
        enum3 = 19;
        break;
      }
      case 'no-entry': {
        enum3 = 20;
        break;
      }
      case 'no-lock': {
        enum3 = 21;
        break;
      }
      case 'insufficient-memory': {
        enum3 = 22;
        break;
      }
      case 'insufficient-space': {
        enum3 = 23;
        break;
      }
      case 'not-directory': {
        enum3 = 24;
        break;
      }
      case 'not-empty': {
        enum3 = 25;
        break;
      }
      case 'not-recoverable': {
        enum3 = 26;
        break;
      }
      case 'unsupported': {
        enum3 = 27;
        break;
      }
      case 'no-tty': {
        enum3 = 28;
        break;
      }
      case 'no-such-device': {
        enum3 = 29;
        break;
      }
      case 'overflow': {
        enum3 = 30;
        break;
      }
      case 'not-permitted': {
        enum3 = 31;
        break;
      }
      case 'pipe': {
        enum3 = 32;
        break;
      }
      case 'read-only': {
        enum3 = 33;
        break;
      }
      case 'invalid-seek': {
        enum3 = 34;
        break;
      }
      case 'text-file-busy': {
        enum3 = 35;
        break;
      }
      case 'cross-device': {
        enum3 = 36;
        break;
      }
      default: {
        if ((e) instanceof Error) {
          console.error(e);
        }
        
        throw new TypeError(`"${val3}" is not one of the cases of error-code`);
      }
    }
    dataView(memory0).setInt8(arg1 + 1, enum3, true);
  }
}

const handleTable3 = [T_FLAG, 0];
const captureTable3= new Map();
let captureCnt3 = 0;
handleTables[3] = handleTable3;

function trampoline11(arg0, arg1, arg2) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.writeViaStream(BigInt.asUintN(64, arg1))};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable1, rep);
      }
      dataView(memory0).setInt32(arg2 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg2 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg2 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline12(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.appendViaStream()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      if (!(e instanceof OutputStream)) {
        throw new TypeError('Resource error: Not a valid "OutputStream" resource.');
      }
      var handle3 = e[symbolRscHandle];
      if (!handle3) {
        const rep = e[symbolRscRep] || ++captureCnt1;
        captureTable1.set(rep, e);
        handle3 = rscTableCreateOwn(handleTable1, rep);
      }
      dataView(memory0).setInt32(arg1 + 4, handle3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 4, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline13(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.getType()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var val3 = e;
      let enum3;
      switch (val3) {
        case 'unknown': {
          enum3 = 0;
          break;
        }
        case 'block-device': {
          enum3 = 1;
          break;
        }
        case 'character-device': {
          enum3 = 2;
          break;
        }
        case 'directory': {
          enum3 = 3;
          break;
        }
        case 'fifo': {
          enum3 = 4;
          break;
        }
        case 'symbolic-link': {
          enum3 = 5;
          break;
        }
        case 'regular-file': {
          enum3 = 6;
          break;
        }
        case 'socket': {
          enum3 = 7;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val3}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum3, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val4 = e;
      let enum4;
      switch (val4) {
        case 'access': {
          enum4 = 0;
          break;
        }
        case 'would-block': {
          enum4 = 1;
          break;
        }
        case 'already': {
          enum4 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum4 = 3;
          break;
        }
        case 'busy': {
          enum4 = 4;
          break;
        }
        case 'deadlock': {
          enum4 = 5;
          break;
        }
        case 'quota': {
          enum4 = 6;
          break;
        }
        case 'exist': {
          enum4 = 7;
          break;
        }
        case 'file-too-large': {
          enum4 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum4 = 9;
          break;
        }
        case 'in-progress': {
          enum4 = 10;
          break;
        }
        case 'interrupted': {
          enum4 = 11;
          break;
        }
        case 'invalid': {
          enum4 = 12;
          break;
        }
        case 'io': {
          enum4 = 13;
          break;
        }
        case 'is-directory': {
          enum4 = 14;
          break;
        }
        case 'loop': {
          enum4 = 15;
          break;
        }
        case 'too-many-links': {
          enum4 = 16;
          break;
        }
        case 'message-size': {
          enum4 = 17;
          break;
        }
        case 'name-too-long': {
          enum4 = 18;
          break;
        }
        case 'no-device': {
          enum4 = 19;
          break;
        }
        case 'no-entry': {
          enum4 = 20;
          break;
        }
        case 'no-lock': {
          enum4 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum4 = 22;
          break;
        }
        case 'insufficient-space': {
          enum4 = 23;
          break;
        }
        case 'not-directory': {
          enum4 = 24;
          break;
        }
        case 'not-empty': {
          enum4 = 25;
          break;
        }
        case 'not-recoverable': {
          enum4 = 26;
          break;
        }
        case 'unsupported': {
          enum4 = 27;
          break;
        }
        case 'no-tty': {
          enum4 = 28;
          break;
        }
        case 'no-such-device': {
          enum4 = 29;
          break;
        }
        case 'overflow': {
          enum4 = 30;
          break;
        }
        case 'not-permitted': {
          enum4 = 31;
          break;
        }
        case 'pipe': {
          enum4 = 32;
          break;
        }
        case 'read-only': {
          enum4 = 33;
          break;
        }
        case 'invalid-seek': {
          enum4 = 34;
          break;
        }
        case 'text-file-busy': {
          enum4 = 35;
          break;
        }
        case 'cross-device': {
          enum4 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 1, enum4, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline14(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable3[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable3.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(Descriptor.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.stat()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant12 = ret;
  switch (variant12.tag) {
    case 'ok': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      var {type: v3_0, linkCount: v3_1, size: v3_2, dataAccessTimestamp: v3_3, dataModificationTimestamp: v3_4, statusChangeTimestamp: v3_5 } = e;
      var val4 = v3_0;
      let enum4;
      switch (val4) {
        case 'unknown': {
          enum4 = 0;
          break;
        }
        case 'block-device': {
          enum4 = 1;
          break;
        }
        case 'character-device': {
          enum4 = 2;
          break;
        }
        case 'directory': {
          enum4 = 3;
          break;
        }
        case 'fifo': {
          enum4 = 4;
          break;
        }
        case 'symbolic-link': {
          enum4 = 5;
          break;
        }
        case 'regular-file': {
          enum4 = 6;
          break;
        }
        case 'socket': {
          enum4 = 7;
          break;
        }
        default: {
          if ((v3_0) instanceof Error) {
            console.error(v3_0);
          }
          
          throw new TypeError(`"${val4}" is not one of the cases of descriptor-type`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum4, true);
      dataView(memory0).setBigInt64(arg1 + 16, toUint64(v3_1), true);
      dataView(memory0).setBigInt64(arg1 + 24, toUint64(v3_2), true);
      var variant6 = v3_3;
      if (variant6 === null || variant6=== undefined) {
        dataView(memory0).setInt8(arg1 + 32, 0, true);
      } else {
        const e = variant6;
        dataView(memory0).setInt8(arg1 + 32, 1, true);
        var {seconds: v5_0, nanoseconds: v5_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 40, toUint64(v5_0), true);
        dataView(memory0).setInt32(arg1 + 48, toUint32(v5_1), true);
      }
      var variant8 = v3_4;
      if (variant8 === null || variant8=== undefined) {
        dataView(memory0).setInt8(arg1 + 56, 0, true);
      } else {
        const e = variant8;
        dataView(memory0).setInt8(arg1 + 56, 1, true);
        var {seconds: v7_0, nanoseconds: v7_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 64, toUint64(v7_0), true);
        dataView(memory0).setInt32(arg1 + 72, toUint32(v7_1), true);
      }
      var variant10 = v3_5;
      if (variant10 === null || variant10=== undefined) {
        dataView(memory0).setInt8(arg1 + 80, 0, true);
      } else {
        const e = variant10;
        dataView(memory0).setInt8(arg1 + 80, 1, true);
        var {seconds: v9_0, nanoseconds: v9_1 } = e;
        dataView(memory0).setBigInt64(arg1 + 88, toUint64(v9_0), true);
        dataView(memory0).setInt32(arg1 + 96, toUint32(v9_1), true);
      }
      break;
    }
    case 'err': {
      const e = variant12.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var val11 = e;
      let enum11;
      switch (val11) {
        case 'access': {
          enum11 = 0;
          break;
        }
        case 'would-block': {
          enum11 = 1;
          break;
        }
        case 'already': {
          enum11 = 2;
          break;
        }
        case 'bad-descriptor': {
          enum11 = 3;
          break;
        }
        case 'busy': {
          enum11 = 4;
          break;
        }
        case 'deadlock': {
          enum11 = 5;
          break;
        }
        case 'quota': {
          enum11 = 6;
          break;
        }
        case 'exist': {
          enum11 = 7;
          break;
        }
        case 'file-too-large': {
          enum11 = 8;
          break;
        }
        case 'illegal-byte-sequence': {
          enum11 = 9;
          break;
        }
        case 'in-progress': {
          enum11 = 10;
          break;
        }
        case 'interrupted': {
          enum11 = 11;
          break;
        }
        case 'invalid': {
          enum11 = 12;
          break;
        }
        case 'io': {
          enum11 = 13;
          break;
        }
        case 'is-directory': {
          enum11 = 14;
          break;
        }
        case 'loop': {
          enum11 = 15;
          break;
        }
        case 'too-many-links': {
          enum11 = 16;
          break;
        }
        case 'message-size': {
          enum11 = 17;
          break;
        }
        case 'name-too-long': {
          enum11 = 18;
          break;
        }
        case 'no-device': {
          enum11 = 19;
          break;
        }
        case 'no-entry': {
          enum11 = 20;
          break;
        }
        case 'no-lock': {
          enum11 = 21;
          break;
        }
        case 'insufficient-memory': {
          enum11 = 22;
          break;
        }
        case 'insufficient-space': {
          enum11 = 23;
          break;
        }
        case 'not-directory': {
          enum11 = 24;
          break;
        }
        case 'not-empty': {
          enum11 = 25;
          break;
        }
        case 'not-recoverable': {
          enum11 = 26;
          break;
        }
        case 'unsupported': {
          enum11 = 27;
          break;
        }
        case 'no-tty': {
          enum11 = 28;
          break;
        }
        case 'no-such-device': {
          enum11 = 29;
          break;
        }
        case 'overflow': {
          enum11 = 30;
          break;
        }
        case 'not-permitted': {
          enum11 = 31;
          break;
        }
        case 'pipe': {
          enum11 = 32;
          break;
        }
        case 'read-only': {
          enum11 = 33;
          break;
        }
        case 'invalid-seek': {
          enum11 = 34;
          break;
        }
        case 'text-file-busy': {
          enum11 = 35;
          break;
        }
        case 'cross-device': {
          enum11 = 36;
          break;
        }
        default: {
          if ((e) instanceof Error) {
            console.error(e);
          }
          
          throw new TypeError(`"${val11}" is not one of the cases of error-code`);
        }
      }
      dataView(memory0).setInt8(arg1 + 8, enum11, true);
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline15(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.checkWrite()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      dataView(memory0).setBigInt64(arg1 + 8, toUint64(e), true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 8, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 12, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 8, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline16(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.write(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline17(arg0, arg1) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingFlush()};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant5 = ret;
  switch (variant5.tag) {
    case 'ok': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant5.val;
      dataView(memory0).setInt8(arg1 + 0, 1, true);
      var variant4 = e;
      switch (variant4.tag) {
        case 'last-operation-failed': {
          const e = variant4.val;
          dataView(memory0).setInt8(arg1 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle3 = e[symbolRscHandle];
          if (!handle3) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle3 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg1 + 8, handle3, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg1 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant4.tag)}\` (received \`${variant4}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline18(arg0, arg1, arg2, arg3) {
  var handle1 = arg0;
  var rep2 = handleTable1[(handle1 << 1) + 1] & ~T_FLAG;
  var rsc0 = captureTable1.get(rep2);
  if (!rsc0) {
    rsc0 = Object.create(OutputStream.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    Object.defineProperty(rsc0, symbolRscRep, { writable: true, value: rep2});
  }
  curResourceBorrows.push(rsc0);
  var ptr3 = arg1;
  var len3 = arg2;
  var result3 = new Uint8Array(memory0.buffer.slice(ptr3, ptr3 + len3 * 1));
  let ret;
  try {
    ret = { tag: 'ok', val: rsc0.blockingWriteAndFlush(result3)};
  } catch (e) {
    ret = { tag: 'err', val: getErrorPayload(e) };
  }
  for (const rsc of curResourceBorrows) {
    rsc[symbolRscHandle] = undefined;
  }
  curResourceBorrows = [];
  var variant6 = ret;
  switch (variant6.tag) {
    case 'ok': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 0, true);
      break;
    }
    case 'err': {
      const e = variant6.val;
      dataView(memory0).setInt8(arg3 + 0, 1, true);
      var variant5 = e;
      switch (variant5.tag) {
        case 'last-operation-failed': {
          const e = variant5.val;
          dataView(memory0).setInt8(arg3 + 4, 0, true);
          if (!(e instanceof Error$1)) {
            throw new TypeError('Resource error: Not a valid "Error" resource.');
          }
          var handle4 = e[symbolRscHandle];
          if (!handle4) {
            const rep = e[symbolRscRep] || ++captureCnt0;
            captureTable0.set(rep, e);
            handle4 = rscTableCreateOwn(handleTable0, rep);
          }
          dataView(memory0).setInt32(arg3 + 8, handle4, true);
          break;
        }
        case 'closed': {
          dataView(memory0).setInt8(arg3 + 4, 1, true);
          break;
        }
        default: {
          throw new TypeError(`invalid variant tag value \`${JSON.stringify(variant5.tag)}\` (received \`${variant5}\`) specified for \`StreamError\``);
        }
      }
      break;
    }
    default: {
      throw new TypeError('invalid variant specified for result');
    }
  }
}


function trampoline19(arg0, arg1) {
  const ret = getRandomBytes(BigInt.asUintN(64, arg0));
  var val0 = ret;
  var len0 = val0.byteLength;
  var ptr0 = realloc0(0, 0, 1, len0 * 1);
  var src0 = new Uint8Array(val0.buffer || val0, val0.byteOffset, len0 * 1);
  (new Uint8Array(memory0.buffer, ptr0, len0 * 1)).set(src0);
  dataView(memory0).setInt32(arg1 + 4, len0, true);
  dataView(memory0).setInt32(arg1 + 0, ptr0, true);
}


function trampoline20(arg0) {
  const ret = getDirectories();
  var vec3 = ret;
  var len3 = vec3.length;
  var result3 = realloc0(0, 0, 4, len3 * 12);
  for (let i = 0; i < vec3.length; i++) {
    const e = vec3[i];
    const base = result3 + i * 12;var [tuple0_0, tuple0_1] = e;
    if (!(tuple0_0 instanceof Descriptor)) {
      throw new TypeError('Resource error: Not a valid "Descriptor" resource.');
    }
    var handle1 = tuple0_0[symbolRscHandle];
    if (!handle1) {
      const rep = tuple0_0[symbolRscRep] || ++captureCnt3;
      captureTable3.set(rep, tuple0_0);
      handle1 = rscTableCreateOwn(handleTable3, rep);
    }
    dataView(memory0).setInt32(base + 0, handle1, true);
    var ptr2 = utf8Encode(tuple0_1, realloc0, memory0);
    var len2 = utf8EncodedLen;
    dataView(memory0).setInt32(base + 8, len2, true);
    dataView(memory0).setInt32(base + 4, ptr2, true);
  }
  dataView(memory0).setInt32(arg0 + 4, len3, true);
  dataView(memory0).setInt32(arg0 + 0, result3, true);
}

let exports3;
let postReturn0;
let realloc1;
const handleTable4 = [T_FLAG, 0];
const finalizationRegistry4 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable4, handle);
});

handleTables[4] = handleTable4;
const trampoline0 = rscTableCreateOwn.bind(null, handleTable4);
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable3, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable3.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable3.delete(handleEntry.rep);
    } else if (Descriptor[symbolCabiDispose]) {
      Descriptor[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline2(handle) {
  const handleEntry = rscTableRemove(handleTable1, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable1.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable1.delete(handleEntry.rep);
    } else if (OutputStream[symbolCabiDispose]) {
      OutputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline3(handle) {
  const handleEntry = rscTableRemove(handleTable0, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable0.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable0.delete(handleEntry.rep);
    } else if (Error$1[symbolCabiDispose]) {
      Error$1[symbolCabiDispose](handleEntry.rep);
    }
  }
}
function trampoline4(handle) {
  const handleEntry = rscTableRemove(handleTable2, handle);
  if (handleEntry.own) {
    
    const rsc = captureTable2.get(handleEntry.rep);
    if (rsc) {
      if (rsc[symbolDispose]) rsc[symbolDispose]();
      captureTable2.delete(handleEntry.rep);
    } else if (InputStream[symbolCabiDispose]) {
      InputStream[symbolCabiDispose](handleEntry.rep);
    }
  }
}
let statefulConstructorClipProjector;

class ClipProjector{
  constructor() {
    const ret = statefulConstructorClipProjector();
    var handle1 = ret;
    var rsc0 = new.target === ClipProjector ? this : Object.create(ClipProjector.prototype);
    Object.defineProperty(rsc0, symbolRscHandle, { writable: true, value: handle1});
    finalizationRegistry4.register(rsc0, handle1, rsc0);
    Object.defineProperty(rsc0, symbolDispose, { writable: true, value: emptyFunc });
    return rsc0;
  }
}
let statefulMethodClipProjectorGetComponentsCount;

ClipProjector.prototype.getComponentsCount = function getComponentsCount() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = statefulMethodClipProjectorGetComponentsCount(handle0);
  return ret >>> 0;
};
let statefulMethodClipProjectorGetComponents;

ClipProjector.prototype.getComponents = function getComponents() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = statefulMethodClipProjectorGetComponents(handle0);
  let variant3;
  switch (dataView(memory0).getUint8(ret + 0, true)) {
    case 0: {
      var len2 = dataView(memory0).getInt32(ret + 8, true);
      var base2 = dataView(memory0).getInt32(ret + 4, true);
      var result2 = [];
      for (let i = 0; i < len2; i++) {
        const base = base2 + i * 16;
        result2.push({
          id: dataView(memory0).getInt32(base + 0, true),
          position: {
            x: dataView(memory0).getFloat32(base + 4, true),
            y: dataView(memory0).getFloat32(base + 8, true),
            z: dataView(memory0).getFloat32(base + 12, true),
          },
        });
      }
      variant3= {
        tag: 'ok',
        val: result2
      };
      break;
    }
    case 1: {
      variant3= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant3;
  postReturn0(ret);
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let statefulMethodClipProjectorFillComponents;

ClipProjector.prototype.fillComponents = function fillComponents(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  var vec4 = arg1;
  var len4 = vec4.length;
  var result4 = realloc1(0, 0, 4, len4 * 16);
  for (let i = 0; i < vec4.length; i++) {
    const e = vec4[i];
    const base = result4 + i * 16;var {id: v2_0, position: v2_1 } = e;
    dataView(memory0).setInt32(base + 0, toInt32(v2_0), true);
    var {x: v3_0, y: v3_1, z: v3_2 } = v2_1;
    dataView(memory0).setFloat32(base + 4, +v3_0, true);
    dataView(memory0).setFloat32(base + 8, +v3_1, true);
    dataView(memory0).setFloat32(base + 12, +v3_2, true);
  }
  const ret = statefulMethodClipProjectorFillComponents(handle0, result4, len4);
  let variant5;
  switch (ret) {
    case 0: {
      variant5= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant5= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant5;
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let statefulMethodClipProjectorSetProjection;

ClipProjector.prototype.setProjection = function setProjection(arg1) {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  var val2 = arg1;
  var len2 = val2.length;
  var ptr2 = realloc1(0, 0, 4, len2 * 4);
  var src2 = new Uint8Array(val2.buffer, val2.byteOffset, len2 * 4);
  (new Uint8Array(memory0.buffer, ptr2, len2 * 4)).set(src2);
  const ret = statefulMethodClipProjectorSetProjection(handle0, ptr2, len2);
  let variant3;
  switch (ret) {
    case 0: {
      variant3= {
        tag: 'ok',
        val: undefined
      };
      break;
    }
    case 1: {
      variant3= {
        tag: 'err',
        val: undefined
      };
      break;
    }
    default: {
      throw new TypeError('invalid variant discriminant for expected');
    }
  }
  const retVal = variant3;
  if (typeof retVal === 'object' && retVal.tag === 'err') {
    throw new ComponentError(retVal.val);
  }
  return retVal.val;
};
let statefulMethodClipProjectorProject;

ClipProjector.prototype.project = function project() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable4[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable4[(handle1 << 1) + 1] & ~T_FLAG;
  statefulMethodClipProjectorProject(handle0);
};

const $init = (() => {
  let gen = (function* init () {
    const module0 = base64Compile('AGFzbQEAAAABmwEXYAF/AX9gAn9/AGAAAGABfwBgBH9/f38Bf2ADf39/AX9gA39/fwBgBH9/f38AYAJ/fwF/YAV/f39/fwBgBn9/f39/fwF/YAF/AX5gBH9+fn8AYAR/fn5+AGAAAX9gBX9+fn9/AGADfn5/AX9gAn5+AX9gAX4Bf2AFf35+fn8AYAN/fn4AYAd/f39/f39/AGAJf39/f39/f39/AALuAQYWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhhcmdzX2dldAAIFndhc2lfc25hcHNob3RfcHJldmlldzEOYXJnc19zaXplc19nZXQACBZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX3dyaXRlAAQWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQlwcm9jX2V4aXQAAxZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCnJhbmRvbV9nZXQACBpbZXhwb3J0XXR3aW46dGVzdC9zdGF0ZWZ1bBxbcmVzb3VyY2UtbmV3XWNsaXAtcHJvamVjdG9yAAADenkCAAUDAwMDBAMOAAAFBQMAAQECAgYCAgEBCwMCAgEBAQEBBwMBAwEHBQICAgIEBQQCBwIFBQQCBAQBAgIIAAAPEAYHEQcJBwYAAAIBAAgAAAADBQMGAAAACxIACAELBgYBAQMBBgYEAAEAAAAKCgkMDBMUDQ0EFRYBBAUBcAEICAUEAQCBAgYJAX8BQYCAgAgLB+kDCwZtZW1vcnkCAAZfc3RhcnQABkJjYWJpX3Bvc3RfdHdpbjp0ZXN0L3N0YXRlZnVsI1ttZXRob2RdY2xpcC1wcm9qZWN0b3IuZ2V0LWNvbXBvbmVudHMADAxjYWJpX3JlYWxsb2MADSd0d2luOnRlc3Qvc3RhdGVmdWwjW2R0b3JdY2xpcF9wcm9qZWN0b3IADi50d2luOnRlc3Qvc3RhdGVmdWwjW2NvbnN0cnVjdG9yXWNsaXAtcHJvamVjdG9yAA8+dHdpbjp0ZXN0L3N0YXRlZnVsI1ttZXRob2RdY2xpcC1wcm9qZWN0b3IuZ2V0LWNvbXBvbmVudHMtY291bnQAEDh0d2luOnRlc3Qvc3RhdGVmdWwjW21ldGhvZF1jbGlwLXByb2plY3Rvci5nZXQtY29tcG9uZW50cwAROXR3aW46dGVzdC9zdGF0ZWZ1bCNbbWV0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IABB/OOACCkCADcCJCAAQfTjgAgpAgA3AhwgAEHcAGoiAUHI44AIKQIANwIAIAEgACkCBDcCCCABIAApAhQ3AhggASAAKQIMNwIQIAEgACkCHDcCICABIAApAlQ3AlggASAAKQJMNwJQIAEgACkCRDcCSCABIAApAjw3AkAgASAAKQI0NwI4IAEgACkCLDcCMCABIAApAiQ3AiggAkEcaiIFIAFB4AD8CgAAAkBB0PWACCgCACAAKAK8AUYEQCAAQcABaiQADAELAAsgBCAFQeAA/AoAACMAQRBrIgAkACAAIAQ2AgggACAAKAIIEAU2AgwgACgCDCEBIABBEGokACACIAE2AgwgAigCDCEAQdD1gAgoAgAgAigCfEcNAAwBCwALIAJBgAFqJAAgAyAANgIMIAMoAgwgA0EQaiQAC88BAQN/IwBBEGsiAiQAIAIgADYCDCACAn8gAigCDCEBIwBBEGsiACQAIABB0PWACCgCADYCDCABRQRAEFAACyABQQNxBEAQMQALIAAgATYCCAJ/IAAoAgghAyMAQRBrIgEkACABQdD1gAgoAgA2AgwgASADNgIIIAEoAghBCGoQViEDQdD1gAgoAgAgASgCDEYEQCABQRBqJAAgAwwBCwALIQFB0PWACCgCACAAKAIMRgRAIABBEGokACABDAELAAs2AgggAigCCCACQRBqJAALmx4BDX8jAEEwayIHJAAgB0HQ9YAIKAIANgIsIAcgADYCFCAHAn8gBygCFCEAIwBBoAFrIgMkACADQdD1gAgoAgA2ApwBIAMgB0EYajYCACAARQRAEFAACyAAQQNxBEAQMQALIAMgADYCBCADKAIEIQEjAEGwAWsiAiQAIAJB0PWACCgCADYCrAEgAiABNgIMIwBBIGsiACQAIABB0PWACCgCADYCHCAAQQA2AgwgAEGq1arVejYCCCAAQQA2AhAgACABKQIANwIUIAIgACkCCDcCJCACIAAoAhg2AjQgAiAAKQIQNwIsAkBB0PWACCgCACAAKAIcRgRAIABBIGokAAwBCwALIAIgAigCNDYCICACIAIpAiw3AxggAiACKQIkNwMQAkACQAJ/IAIoAgxBCGoQViEAIwBBEGsiCSQAIAlB0PWACCgCADYCDCAJIAJBEGo2AggCQCAAIAIoAhhNBEBB0PWACCgCACAJKAIMRw0BIAlB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IABBA3EEQBAxAAsgASAANgIIIAEoAgghBSADKAIUIgBFBEAQUAALIwBBEGsiAiQAIAJB0PWACCgCADYCDCACIAA2AgggAUEMaiIAIAIoAggiBCkCADcCACAAIAQpAgg3AgggACACKAIIIgQpAhA3AhAgACAEKQIYNwIYIAAgAigCCCIEKQIgNwIgIAAgBCkCKDcCKCAAIAIoAggiBCkCMDcCMCAAIAQpAjg3AjgCQEHQ9YAIKAIAIAIoAgxGBEAgAkEQaiQADAELAAsjAEEQayIEJAAgBEHQ9YAIKAIANgIMIAQgBTYCCCAEKAIIIgIgACkCADcCICACIAApAjg3AlggAiAAKQIwNwJQIAIgACkCKDcCSCACIAApAiA3AkAgAiAAKQIYNwI4IAIgACkCEDcCMCACIAApAgg3AigCQEHQ9YAIKAIAIAQoAgxGBEAgBEEQaiQADAELAAtB0PWACCgCACABKAJMRw0AIAFB0ABqJABBAQwBCwALQX9zQQFxOgAHIAMtAAciAEEBSwRAQcj0gAggABAdCwJAIABBAXEEQCADQQE2AgAMAQsgA0EANgIACyADKAIAIQBB0PWACCgCACADKAIcRgRAIANBIGokACAADwsAC5kGAwR/B30BfiMAQRBrIgQkACAEIAA2AgwgBCgCDCEAIwBBEGsiAyQAIANB0PWACCgCADYCDCAARQRAEFAACyAAQQNxBEAQMQALIAMgADYCCCADKAIIIQIjAEHAAWsiACQAIABB0PWACCgCADYCvAEgACACNgIMIABBHGogACgCDEEIahBmIAAgACkCHDcDEANAIABBJGogAEEQahBnIAAtACwEQCAAIAIpAlg3A2ggACACKQJQNwNgIAAgAikCSDcDWCAAIAIpAkA3A1AgACACKQI4NwNIIAAgAikCMDcDQCAAIAIpAig3AzggACACKQIgNwMwIAAgACgCKCIBKQMANwNwIAAgASkDCDcDeCAAKgJ4IQUgACAAKQNwIgw+ApABIAAgDEIgiD4ClAEgACAFOAKYASAAQYCAgPwDNgKcASAAKgKQASEFIAAqApQBIQYgACoCmAEhByAAIAAqApwBOAKMASAAIAc4AogBIAAgBjgChAEgACAFOAKAASMAQUBqIgEkACABQdD1gAgoAgA2AjwgASAAKQOIATcDCCABIAApA4ABNwMAIAAq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ahArIAMgAygCaDYCbCADQewAakH4ioAIQSAQLhoMAwtBAQwBC0EACyAGckEBcUUEQBAvAAsgBEH//wNxBEAACyADIAA2AjggAyABNgI8IAMgAygCHDYCQCADIANBQGs2AkQgAyADKAJENgJIIANBATYCTCADIAMpAkg3A1ACfyMAQRBrIgAkACAAQdD1gAgoAgA2AgwgACADQdAAaiIBKQIANwMAAkACQCADKAI4IAMoAjxBqJeACCABEDsiAUH//wNxBEBB0PWACCgCACAAKAIMRw0BDAILIABBwJeACEEBEDQiAUH//wNxBEBB0PWACCgCACAAKAIMRw0BDAILQdD1gAgoAgAgACgCDEcNACAAQRBqJABBAAwCCwALIABBEGokACABCyIAQf//A3EiAUUgAUEBRyAAQQhrQf//A3FBEE9xRXJFBEAQLwALIABB//8DcQRAAAsCQCACLQAEBEAgAyACKAIANgJYIANBAToAXAwBCyADQQA2AmAgA0EBOgBkCxAwEDhB5PWACEHk9YAILQAAIgBBAWs6AAAgAEEBRwRAEDIACwsACwsAQRBBn4CACBB+CwsAQRJB44aACBB+C/1rBBp/B34BfQF8IwBBQGoiDSQAIA0gADYCFCANIAE2AhwgDSAAKAIMNgIYIA1BADYCICANQQE6ACQgDSANKQIYNwMoIA1BCGogDSgCFCgCDBAWIA0oAgghACANKAIMIQEgDSANKQMoNwMwIA0gATYCPCANIAA2AjggDUEgaiEbIwBBsCBrIg8kACAPQQ1qIgBBqgFBjyD8CwAgD0GcIGohGCMAQdAAayIKJAAgCkHQ9YAIKAIANgJMIApBIGogABAmIAogCigCKDYCGCAKIAopAiA3AxAgCkEsaiAKQRBqECcgCiAKKAIsNgIwIAogCkEwajYCNCAKIAooAjQ2AjggCkECNgI8AkACQAJAAkACQAJ/IwBBEGsiECQAIBBB0PWACCgCADYCDCAQIApBOGoiGikCADcDAAJAAkAgEEHCj4AIQQ4QNCIAQf//A3EEQEHQ9YAIKAIAIBAoAgxHDQEMAgsCfyMAQSBrIhEkACARQdD1gAgoAgA2AhwgESANKQIwNwMIIBEgGikCADcDEAJAAkACfyMAQaABayIGJAAgBkHQ9YAIKAIANgKcASAGIBEpAgg3AzggBiAaKQIANwNA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NwO4BCABQqrVqtWq1arVqn83A7AEIAFCqtWq1arVqtWqfzcDyAQgAUKq1arVqtWq1ap/NwPABCABQarVqtV6NgLUBCABQQA6AIkEIAFBADoAigQCQAJAAkAgASgCjARBAE4EQCABKAKMBCIDQQBODQEMBgtBACABKAKMBCICayIDQQBIIAJBAEpzDQgMAQsjAEEQayICJAAgA0GAgAJNECAgAiADrULP95PUicQmEHggAikDACACKQMIQgBSDQcgAkEQaiQAQjGIpyIDIAEoAowEQQNKayECIAIgA0sNByABIAIQQzYC1AQgAhBEIgRB+QFqIQMgAyAESQ0HIAMgA0EBayIESQ0HIARB/////wdLDR9BACABKAKMBCIDayIFQQBIIANBAEpzDQcgAhBDIgkgBWohAyAJQQBIIAMgBUhzDQcgBEEASCADIAMgBGoiBUpzDQcgBUEASA0EIwBBMGsiAyQAIANB0PWACCgCADYCLCACIAJBOGoiBEsNByAEIARBAWsiCUkNByAJQThuIgStQjh+Ih1CIIinDQcgBEHZAE8EQCAEQdkAEBcACyAEQQV0QaicgAhqIQQCQAJAAkACQCAdpyIJIAJGBEAgBCkDAEIBfCIdUA0MDAELIAkgCSACayIUSQ0LDAELIAEgHTcD2AQgASAEKQMINwPgBCABIAQpAxA3A+gEIAEgBCkDGDcD8ARB0PWACCgCACADKAIsRw0BDAILIBRBOE8EQCAUQTgQFwALIAkQRCIJIAIQRGshEiAJIBJJDQkgAkEfcSITIBNqIQkgCSATSQ0JIAlBP0sNISACQQV2IhNBmgFPBEAgE0GaARAXAAsgE0EDdEHIuYAIaikDACAJrYhCA4NCAXwiHVANCSADQQhqIBRBBHRByLKACGogBCASIB2nEEsgASADKQMINwPYBCABIAMpAyA3A/AEIAEgAykDGDcD6AQgASADKQMQNwPgBEHQ9YAIKAIAIAMoAixHDQAMAQsACyADQTBqJAAgASABKQPwBDcDkAUgASABKQPoBDcDiAUgASABKQPgBDcDgAUgASABKQPYBDcD+AQgASkDmAQhHSABQbgCaiABKQOQBEIEEHggASkDwAIiICAdQgKGfCEfIAEpA7gCISEgHUL//////////z+DIB1SIB8gIFRyDQcgAUGYAmogISAfIAFB+ARqIgMg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aiACaiABLwBLOwAAIAFBCGogASkD0AEgASkD2AFC5AAQeSABKQMIIR4gASABKQMQNwPYASABIB43A9ABDAIFDBkLAAsLAkACQAJAAkAgASkD2AFQIAEpA9ABQgpUcQRAIAEoAuABIgRBAWshAiACIARLDRwMAQsgASgC4AEiBEECayECIAIgBEsNGwwBCyABIAI2AuABIAEoAuABIgJBgQFJDQEMAwsgASACNgLgASABKALgASICQQJqIgRBgQFLBEAMGwsgASkD2AFQIAEpA9ABIh5CgAJUcUUEQAwZCyABQc0AaiAepxA/IAFBzwBqIAJqIAEvAE07AAAMAQsgASkD2AFQIAEpA9ABIh5CgAJUcUUEQAwYCyAep0H/AXFBMGoiBCAEQf8BcUcNGCABQc8AaiACaiAEOgAACwJAAkACfwJAAkACQCAcQj+IpwRAIAEoAuABIgRBAWshAiACIARLDR4MAQtB/JiACC0AAEUNAQwCCyABIAI2AuABIAEoAuABIgJBgQFJDQMMBQtBAQwBC0H8mIAILQAARQRAEEEAC0H4mIAIKAIARQtBAXFFBEAgASgC4AEiBEEBayECIAIgBEsNGiABIAI2AuABIAEoAuABIgJBgQFPDQMgAUHPAGogAmpBKzoAAAsMAQsgAUHPAGogAmpBLToAAAsgASgC4AEiAiABQc8AamohBCACQYEBSwRAIAJBgQEQJQALIAJBgQFLDQAgAUGBASACazYC6AEgASAENgLkASABKALkASABKALoAUHwmIAIIAAQNSEAQdD1gAgoAgAgASgC7AFGBEAgAUHwAWokACAADAILAAsgAkGBARAXAAshAEHQ9YAIKAIAIAcoAhxGBEAgB0EgaiQAIAAMAQsACyIAQf//A3EEQEHQ9YAIKAIAIAMoAgxHDQEgA0EQaiQAIAAMAgtB0PWACCgCACADKAIMRw0AIANBEGokAEEADAELAAsiAEH//wNxDQEMBQsgBiAGKQNANwNgIwBBEGsiACQAIABB0PWACCgCADYCDCAAIAYpAjg3AwAgACgCABAVQX9zECACQAJAIAAoAgAQHyIeQiBYBEAgBigCPCEBQdD1gAgoAgAgACgCDEcNASAGIAGtNwMQIAZCADcDGAwCCwJAAkACQAJAIB5CwABSBEAgHkKAAVENAQwCCyAGKAI8IgFBB3FFDQMMDwsgBigCPCIBQQdxRQ0BDA4LAAsgASkDCCEcCyABKQMAIR5B0PWACCgCACAAKAIMRw0AIAYgHjcDECAGIBw3AxgMAQsACyAAQRBqJAAgBikDECEcIAYgBikDGDcDcCAGIBw3A2gCfyMAQRBrIgIkACACQdD1gAgoAgA2AgwgAiAGQeAAaiIAKQIANwMAAkACfyAGKQNoIRwgBikDcCEeIwBBIGsiAyQAIANB0PWACCgCADYCHCADIB43AwggAyAcNwMAIAMgACkCADcDEAJ/IwBB8AFrIgEkACABQdD1gAgoAgA2AuwBQQEQICABQc8AakGqAUGBAfwLACABIB43A9gBIAEgHDcD0AEgAUGBATYC4AEDQCABKQPQAULjAFYgASkD2AEiHEIAUiAcUBtBAXEEQCABKALgASIEQQJrIQcgBCAHSQRADBgLIAEgBzYC4AEgASgC4AEiB0ECaiIEQYEBSwRADBkLIAFBGGogASkD0AEgASkD2AFC5AAQeiABKQMgUCABKQMYIhxCgAJUcQRAIAFBywBqIBynED8gAUHPAGogB2ogAS8ASzsAACABQQhqIAEpA9ABIAEpA9gBQuQAEHkgASkDCCEcIAEgASkDEDcD2AEgASAcNwPQAQwCBQwXCwALCwJAAkACQAJAIAEpA9gBUCABKQPQAUIKVHEEQCABKALgASIEQQFrIQcgBCAHSQ0aDAELIAEoAuABIgRBAmshByAEIAdJDRkMAQsgASAHNgLgASABKALgASIHQYEBSQ0BIAdBgQEQFwALIAEgBzYC4AEgASgC4AEiB0ECaiIEQYEBSwRADBkLIAEpA9gBUCABKQPQASIcQoACVHFFBEAMFwsgAUHNAGogHKcQPyABQc8AaiAHaiABLwBNOwAADAELIAEpA9gBUCABKQPQASIcQoACVHFFBEAMFgsgHKdB/wFxQTBqIgQgBEH/AXFHBEAMFwsgAUHPAGogB2ogBDoAAAsgASgC4AEiByABQc8AamohBCAHQYEBSwRAIAdBgQEQJQALIAdBgQFLBEAgB0GBARAXAAsgAUGBASAHazYC6AEgASAENgLkASABKALkASABKALoAUGImYAIIAAQNSEAQdD1gAgoAgAgASgC7AFGBEAgAUHwAWokACAADAELAAshAEHQ9YAIKAIAIAMoAhxGBEAgA0EgaiQAIAAMAQsACyIAQf//A3EEQEHQ9YAIKAIAIAIoAgxHDQEgAkEQaiQAIAAMAgtB0PWACCgCACACKAIMRw0AIAJBEGokAEEADAELAAsiAEH//wNxDQEMBAtB0PWACCgCACAGKAKcAUcNBAwFC0HQ9YAIKAIAIAYoApwBRw0DDAQLQdD1gAgoAgAgBigCnAFHDQIMAwtB0PWACCgCACAGKAKcAUcNAQwCC0HQ9YAIKAIAIAYoApwBRw0AIAZBoAFqJABBAAwCCwALIAZBoAFqJAAgAAsiAEH//wNxBEBB0PWACCgCACARKAIcRw0BIBFBIGokACAADAMLQdD1gAgoAgAgESgCHEcNACARQSBqJABBAAwCCwALEDEACyIAQf//A3EEQEHQ9YAIKAIAIBAoAgxHDQEMAgsgEEHoj4AIQR4QNCIAQf//A3EEQEHQ9YAIKAIAIBAoAgxHDQEMAgsgDSgCOCANKAI8QdCPgAggGhAzIgBB//8DcQRAQdD1gAgoAgAgECgCDEcNASAQQRBqJAAgAAwDC0HQ9YAIKAIAIBAoAgxHDQAgEEEQaiQAQQAMAgsACyAQQRBqJAAgAAsiAEH//wNxBEAgAEH//wNxQQFGBEAgGEGQkIAIKAIANgIIIBhBiJCACCkCADcCAEHQ9YAIKAIAIAooAkxHDQIMAwsgABApAAsgCkEIaiAKQRBqECogCigCCCEAIAooAgwhASAKQQA7AUggCiABNgJEIAogADYCQCAYIAopAkA3AgAgGCAKKAJINgIIQdD1gAgoAgAgCigCTEcNAAwBCwALIApB0ABqJAAgDwJ/IA8vAaQgRQRAIA8oAqAgIQEgDygCnCAMAQsCQCAPLwGkIEEBRgRAIA9BjSBqIQAMAQsQGAALIABBD2pB6IqACE0gAEH3ioAIT3JFBEAQGQALIABB74qACCkAADcAByAAQeiKgAgpAAA3AABBjyAhASAPQQ1qCzYCqCAgDyABNgKsICAPKAKoICAPKAKsICAbEBoACxAiAAsQGwALIARBgQEQFwALyx8BBn8jAEHQAGsiAyQAAkACQAJAAkACQAJAAkACQAJAIABFBEAgAUUNAQwCCyABRQ0CDAMLIANBADYCACADQQE6AAQjAEGwIGsiAiQAIAJBDWoiAUGqAUGPIPwLACACQZwgaiEEIwBB0ABrIgAkACAAQdD1gAgoAgA2AkwgAEEgaiABECYgACAAKAIoNgIYIAAgACkCIDcDECAAQSxqIABBEGoQJyAAIAAoAiw2AjAgACAAQTBqNgI0IAAgACgCNDYCOCAAQQI2AjwCQAJAAn8jAEEQayIBJAAgAUHQ9YAIKAIANgIMIAEgACkCODcDAAJAIAFBlJCACEEkEDQiB0H//wNxBEBB0PWACCgCACABKAIMRw0BIAFBEGokACAHDAILQdD1gAgoAgAgASgCDEcNACABQRBqJABBAAwBCwwJCyIBQf//A3EEQCABQf//A3FBAUYEQCAEQcCQgAgoAgA2AgggBEG4kIAIKQIANwIAQdD1gAgoAgAgACgCTEcNAgwDCyABECkACyAAQQhqIABBEGoQKiAAKAIIIQEgACgCDCEHIABBADsBSCAAIAc2AkQgACABNgJAIAQgACkCQDcCACAEIAAoAkg2AghB0PWACCgCACAAKAJMRw0ADAELAAsgAEHQAGokACACAn8gAi8BpCBFBEAgAigCoCAhASACKAKcIAwBCwJAIAIvAaQgQQFGBEAgAkGNIGohAAwBCwwFCyAAQQ9qQeiKgAhNIABB94qACE9yRQ0FIABB74qACCkAADcAByAAQeiKgAgpAAA3AABBjyAhASACQQ1qCzYCqCAgAiABNgKsICACKAKoICACKAKsICADEBoACyADQQA2AgggA0EBOgAMIAMgATYCECADQQhqIQcjAEGwIGsiACQAIABBDWoiAkGqAUGPIPwLACAAQZwgaiEEIwBB0ABrIgEkACABQdD1gAgoAgA2AkwgAUEgaiACECYgASABKAIoNgIYIAEgASkCIDcDECABQSxqIAFBEGoQJyABIAEoAiw2AjAgASABQTBqNgI0IAEgASgCNDYCOCABQQI2AjwCQAJAAn8jAEEQayICJAAgAkHQ9YAIKAIANgIMIAIgAUE4aiIFKQIANwMAIAJBxJCACEEZEDQiBkH//wNxBEBB0PWACCgCACACKAIMRw0JIAJBEGokACAGDAELAkAgAygCEEHgkIAIIAUQOSIDQf//A3EEQAwBCyACQfiQgAhBEBA0IgNB//8DcQRADAELQdD1gAgoAgAgAigCDEcNCSACQRBqJABBAAwBC0HQ9YAIKAIAIAIoAgxHDQggAkEQaiQAIAMLIgNB//8DcQRAIANB//8DcUEBRgRAIARBkJGACCgC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KAIMRw0BDAMLQdD1gAgoAgAgAygCDEcNACADQRBqJABBAAwDCwALIANBEGokACAEDAELIANBEGokACACCyICQf//A3EEQCACQf//A3FBAUYEQCAFQYyVgAgoAgA2AgggBUGElYAIKQIANwIAQdD1gAgoAgAgASgCTEcNAgwDCyACECkACyABQQhqIAFBEGoQKiABKAIIIQIgASgCDCEDIAFBADsBSCABIAM2AkQgASACNgJAIAUgASkCQDcCACAFIAEoAkg2AghB0PWACCgCACABKAJMRw0ADAELAAsMAQsgAkEANgJ0IAJBAToAeCACQTBqIAIoAjgtABEQJCACKAIwIQAgAigCNCEDIAJBKGogAigCOCgCDBAWIAIoAighBCACKAIsIQUgAiADNgKAASACIAA2AnwgAiABNgKEASACIAU2AowBIAIgBDYCiAEgAkH0AGohByMAQbAgayIAJAAgAEENaiIDQaoBQY8g/AsAIABBnCBqIQQjAEHQAGsiASQAIAFB0PWACCgCADYCTCABQSBqIAMQJiABIAEoAig2AhggASABKQIgNwMQIAFBLGogAUEQahAnIAEgASgCLDYCMCABIAFBMGo2AjQgASABKAI0NgI4IAFBAjYCPAJAAkACfyMAQRBrIgMkACADQdD1gAgoAgA2AgwgAyABQThqIgYpAgA3AwACQAJAIAIoAnwgAigCgAFBkJWACCAGEDsiBUH//wNxBEBB0PWACCgCACADKAIMRw0BDAILIANBqJWACEELEDQiBUH//wNxBEBB0PWACCgCACADKAIMRw0BDAILIAIoAoQBQZCVgAggBhA6IgVB//8DcQRAQdD1gAgoAgAgAygCDEcNAQwCCyADQbOVgAhBLxA0IgVB//8DcQRAQdD1gAgoAgAgAygCDEcNAQwCCyACKAKIASACKAKMAUGQlYAIIAYQMyICQf//A3EEQEHQ9YAIKAIAIAMoAgxHDQEgA0EQaiQAIAIMAwtB0PWACCgCACADKAIMRw0AIANBEGokAEEADAILAAsgA0EQaiQAIAULIgJB//8DcQRAIAJB//8DcUEBRgRAIARB7JWACCgCADYCCCAEQeSVgAgpAgA3AgBB0PWACCgCACABKAJMRw0CDAMLIAIQKQALIAFBCGogAUEQahAqIAEoAgghAiABKAIMIQMgAUEAOwFIIAEgAzYCRCABIAI2AkAgBCABKQJANwIAIAQgASgCSDYCCEHQ9YAIKAIAIAEoAkxHDQAMAQsACwsgAUHQAGokACAAAn8gAC8BpCBFBEAgACgCoCAhASAAKAKcIAwBCwJAIAAvAaQgQQFGBEAgAEGNIGohAQwBCxAYAAsgAUEPakHoioAITSABQfeKgAhPckUEQBAZAAsgAUHvioAIKQAANwAHIAFB6IqACCkAADcAAEGPICEBIABBDWoLNgKoICAAIAE2AqwgIAAoAqggIAAoAqwgIAcQGgAL4AEBAX8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCABQf8BcQ4MAAECAwQFCgoGBwgJCwtB3YWACCEBQQchAgwLC0HUhYAIIQFBCCECDAoLQZ2DgAghAUEUIQIMCQtBooSACCEBQRQhAgwIC0GThIAIIQFBDiECDAcLQf+DgAghAUETIQIMBgtBpoWACCEBQQkhAgwFC0G8hYAIIQFBFyECDAQLQYmDgAghAUETIQIMAwtB6oOACCEBQRQhAgwCC0GwhYAIIQFBCyECDAELEBgACyAAIAE2AgAgACACNgIECyUAIAAgAUGEmIAIQYyYgAhB0JeACEEaQeiXgAhBDEHBl4AIEH0LGAAgAEGAIDYCBCAAIAE2AgAgAEEANgIICwkAIAAgATYCAAv3AwEEfyMAQRBrIgYkACAGQdD1gAgoAgA2AgwgAUEDcQRAEDEACyABKAIAIQQjAEEgayIBJAAgAUHQ9YAIKAIANgIcIAEgBDYCCCABIAM2AhAgASACNgIMAkACQCADRQRAIAZCADcCBEHQ9YAIKAIAIAEoAhxHDQEMAgsgBCgCABogBCgCCCAEKAIETwRAIAZB+JaACCkCADcCBEHQ9YAIKAIAIAEoAhxHDQEMAgsgBCgCABogBCgCBCIFIAQoAghrIQIgAiAFSwRAEBsACyABKAIIIgUoAgQhByAEKAIIIgQgBSgCAGohBSAEIAIgAyACIANJGyICaiIDIAdLBEAgAyAHEBcACyADIARJBEAgBCADEBcACyABKAIMIQMgASgCECIEIAJJBEAgAiAEEBcACyACIANqIAVNIAIgBWogA01yRQRAEBkACyACBEAgBSADIAL8CgAACyABKAIIIgQoAggiBSACaiEDIAMgBUkEQBAbAAsgBCADNgIIIAJFBEAgBkH4loAIKQIANwIEQdD1gAgoAgAgASgCHEcNAQwCCyABQQA7ARggASACNgIUIAYgASkCFDcCBEHQ9YAIKAIAIAEoAhxHDQAMAQsACyABQSBqJAAgACAGKQIENwIAQdD1gAgoAgAgBigCDEYEQCAGQRBqJAAPCwALuwUBBn8jAEEQayIDJAAgA0EANgIAIANBAToABEGsloAIKAIAIADBQQN0aiIAKAIAIQIgAyAAKAIENgIMIAMgAjYCCCMAQbAgayICJAAgAkENaiIBQaoBQY8g/AsAIAJBnCBqIQUjAEHQAGsiACQAIABB0PWACCgCADYCTCAAQSBqIAEQJiAAIAAoAig2AhggACAAKQIgNwMQIABBLGogAEEQahAnIAAgACgCLDYCMCAAIABBMGo2AjQgACAAKAI0NgI4IABBAjYCPAJAAkACfyMAQRBrIgEkACABQdD1gAgoAgA2AgwgASAAQThqIgQpAgA3AwACQCABQbiZgAhBGRA0IgZB//8DcQRAQdD1gAgoAgAgASgCDEcNASABQRBqJAAgBgwCCyADKAIIIAMoAgxB1JmACCAEEDMiBEH//wNxBEBB0PWACCgCACABKAIMRw0BIAFBEGokACAEDAILQdD1gAgoAgAgASgCDEcNACABQRBqJABBAAwBCwALIgFB//8DcQRAIAFB//8DcUEBRgRAIAVB9JmACCgCADYCCCAFQeyZgAgpAgA3AgBB0PWACCgCACAAKAJMRw0CDAMLIAEQKQALIABBCGogAEEQahAqIAAoAgghASAAKAIMIQQgAEEAOwFIIAAgBDYCRCAAIAE2AkAgBSAAKQJANwIAIAUgACgCSDYCCEHQ9YAIKAIAIAAoAkxHDQAMAQsACyAAQdAAaiQAIAICfyACLwGkIEUEQCACKAKgICEAIAIoApwgDAELAkAgAi8BpCBBAUYEQCACQY0gaiEADAELEBgACyAAQQ9qQeiKgAhNIABB94qACE9yRQRAEBkACyAAQe+KgAgpAAA3AAcgAEHoioAIKQAANwAAQY8gIQAgAkENags2AqggIAIgADYCrCAgAigCqCAgAigCrCAgAxAaAAuHAQEDfyMAQRBrIgIkACACQdD1gAgoAgA2AgwgAiABKAIINgIIIAIgASkCADcDACACKAIEIQMgAigCACEEIAEoAggiAUEASQRAQQAgARAlAAsg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NwOYBCAAIAY3A6AEIAAgACkDmAQgACkDoAQQeCAAKQMIIQYgACAAKQMANwOYBCAAIAY3A6AEIAApA5gEIQYgACkDoAQhB0HQ9YAIKAIAIAAoAqwERgRAIABBsARqJAAgBiAHhQwDCwALDAILQQQgARAXAAshBkHQ9YAIKAIAIAMoAgxGBEAgA0EQaiQAIAYPCwALQQAgARAlAAsIACAAQjmIpwsJACAAQf8BcUULBwAgACABRgtoAQF/IwBBEGsiAiQAIAJB0PWACCgCADYCDCACIAA2AgggAigCCCIAIAAtAABBgAFyOgAAIAIoAggiACAALQAAQYB/cSABQf8AcXI6AABB0PWACCgCACACKAIMRgRAIAJBEGokAA8LAAt4AQF/IABBAEcQICAAIABBAWsiAUkEQBAbAAtBICABZ2siACAAQf//A3FHBEAQGwALIABB//8DcUE/SwRAECIACyAAQT9xQSFPBEAjAEEQayIAJAAgAEEANgIIIABBAToADEGghoAIQSogAEEIahAaAAtCASAArYYLowECAX8BfiMAQSBrIgMkACADQdD1gAgoAgA2AhwgAyACrSABrX4iBD4CDCADIARCIIinQQBHOgAQAkAgAy0AEEEBcQRAIABBwOWACCkCADcCAEHQ9YAIKAIAIAMoAhxHDQEgA0EgaiQADwsgAygCDCEBIANBADsBGCADIAE2AhQgACADKQIUNwIAQdD1gAgoAgAgAygCHEcNACADQSBqJAAPCwALGAAgACABIAJBD0HQ5YAIQRBByOWACBB8C1YBAX8jAEEQayICJAAgAkHQ9YAIKAIANgIMIAIgATYCACACIAIoAgA2AgQgAkEANgIIIAAgAikCBDcCAEHQ9YAIKAIAIAIoAgxGBEAgAkEQaiQADwsAC7YDAQR/IwBBMGsiAiQAIAJB0PWACCgCADYCLCACIAE2AgggASgCBCACKAIIKAIAEFJNECACQAJAIAEoAgAoAgRFBEAgAEIANwIAIABBADYCCEHQ9YAIKAIAIAIoAixHDQEMAgsgAigCCCgCABBSIAEoAgAoAgAiBEUEQBBBAAsgASgCACgCACIFRQRAEEEACyAEaiEDIAIgASgCBCAFajYCDANAIAMgAigCDEcEQCACKAIMLQAAEF1BAXEEQCACIAIoAggoAgAQWzYCECACKAIQIAEoAgRBAnRqIQMgAiACKAIIKAIAEFw2AhQgAigCFCABKAIEQQR0aiEBIAIoAggiBCgCBEEBaiIFRQRAEBsACyAEIAU2AgQgAiADNgIYIAIgATYCHCACIAIpAhg3AiAgAkEBOgAoIAAgAikCIDcCACAAIAIoAig2AghB0PWACCgCACACKAIsRw0DDAQLIAIgAigCDEEBajYCDCACKAIIIgQoAgRBAWoiBQRAIAQgBTYCBAwCBRAbAAsACwsgAEIANwIAIABBADYCCEHQ9YAIKAIAIAIoAixHDQAMAQsACyACQTBqJAALeAEBfyMAQTBrIgEkACABQdD1gAgoAgA2AiwgASAAKAIQNgIYIAEgACkCCDcDECABIAApAgA3AwggASABQQhqIgApAgw3AyAgASAAEGkgAUEgaiABKAIAIAEoAgQQakHQ9YAIKAIAIAEoAixGBEAgAUEwaiQADwsAC3sBAn8jAEEgayICJAAgAkHQ9YAIKAIANgIcIAIgASgCEDYCGCACIAEpAgg3AxAgAiABKQIANwMIIAIoAgghAyABKAIIIgFBAEkEQEEAIAEQJQALQdD1gAgoAgAgAigCHEYEQCAAIAM2AgAgACABNgIEIAJBIGokAA8LAAvnAQEBfyMAQUBqIgMkACADQdD1gAgoAgA2AjwgAyAAKQIANwMQIANBCGogASACEGsgAygCCCEBAkAgAygCDCIARQRAQdD1gAgoAgAgAygCPEcNASADQUBrJAAPCyADIAE2AhwgAygCHCEBIAAEQCABQaoBIAD8CwALIAMgAykDEDcDICADKAIcIQEgAyAANgIsIAMgATYCKCADKAIsIQAgAygCKCEBQRAQTiECIAMgAykDIDcDMCADKAIgIAEgACACQQAgAygCNCgCDBEJAEHQ9YAIKAIAIAMoAjxHDQAgA0FAayQADwsAC6cBAQF/IwBBEGsiAyQAIANB0PWACCgCADYCDAJAIAJFBEBB0PWACCgCACADKAIMRw0BIABBADYCBCAAQarVqtV6NgIAIANBEGokAA8LIAMgATYCCCACIAJB////P3FHBEAQGwALIAMoAgghASACQQV0IgJBAEkEQEEAIAIQJQALQdD1gAgoAgAgAygCDEcNACAAIAE2AgAgACACNgIEIANBEGokAA8LAAvpAwEBfyMAQRBrIgMkACADQdD1gAgoAgA2AgwgAyACQR9xOgADIANBBGpBfyABQQRqIgAgACABSRsiACADLQADEG0iASAAIAFLGyIAEG4CQAJAAkACQAJAAkAgAy8BCEUEQCADKAIEIQEMAQtB0PWACCgCACADKAIMRw0BDAMLIAEQbyIEQQNrIgIgBEsNASACQQ1JIgQEQCAERQ0EAkAgAkECdEGsloEIaigCACIABEAgASABQQRrIgRJDQQgACAAIARqIgFLDQQgAUUEQBBQAAsgAUEDcQRAEDEACyACQQ1PDQYgAkECdEGsloEIaiABKAIANgIADAELIAJBDU8NBQJAAkACQCACQQJ0QeCWgQhqKAIAIgBB//8DcUUEQEEBEHAiAEUNAQwDCyACQQ1JDQEMCAtB0PWACCgCACADKAIMRw0EDAYLIAAgACABaiIBSw0EIAJBAnRB4JaBCGogATYCAAwBCyACQQ1PDQUgACAAIAFqIgFLDQMgAkECdEHgloEIaiABNgIAC0HQ9YAIKAIAIAMoAgxHDQEMBQsgACAAQYOABGoiAUsNASABQRB2EHAhAEHQ9YAIKAIAIAMoAgxHDQAMBAsACxAbAAsgA0EQaiQAQQAPCyACQQ0QFwALIANBEGokACAACwcAQQEgAHQLmgECAX8BfiMAQRBrIgIkACACQdD1gAgoAgA2AgwCQCABEGMiA0KAgICAEINCIIinBEAgAEHw5YAIKQIANwIAQdD1gAgoAgAgAigCDEcNASACQRBqJAAPCyADQh+GQh+HQgBTBEAQIgALIAJBADsBCCACIAM+AgQgACACKQIENwIAQdD1gAgoAgAgAigCDEcNACACQRBqJAAPCwALNAAgAEEARxAgQR8gAGdrIgAgAEH//wNxRwRAEBsACyAAQf//A3FBH0sEQBAiAAsgAEEfcQvSAQEDfyAAEHEiASABQf//A3FHBEAQGwALIAFBEHQhAyABEG8iAEEPTwRAIABBDxAXAAsgAEECdEGUl4EIaigCACICBEACQCADQQRrIgEgA00EQAwBCxAbAAsgAiABIAJqIgFLBEAQGwALIAFFBEAQUAALIAFBA3EEQBAxAAsgAEEPTwRAIABBDxAXAAsgAEECdEGUl4EIaiABKAIANgIAIAIPCyABQAAiAEF/RgRAQQAPCyAAQQBIBEAQIQALIAAgAEH//wNxRwRAEBsACyAAQRB0C1wBAX8jAEEQayIBJAAgAUHQ9YAIKAIANgIMIAFBBGogABBuAkAgAS8BCEUEQCABKAIEIQAMAQsgAS8BCBApAAtB0PWACCgCACABKAIMRgRAIAFBEGokACAADwsAC+wCAQF/IwBBIGsiACQAIABB0PWACCgCADYCHCAAIANBH3E6AAsgAC0ACxBtIQEgAiACQQRqIgNLBEAQGwALIAMgASABIANJGyICEHEiBRBvIgZBA2shAyADIAZLBEAQGwALQX8gBEEEaiIGIAQgBksbIgQgASABIARJGyEBAkACQAJAAkACQAJAAkAgA0ENSQRAIABBDGogARBuIAAvARBFDQEMAgsgAiACQYOABGoiA0sNAgwDCyAAKAIMIQEMAwtB0PWACCgCACAAKAIcRw0DDAQLEBsACyADQRB2EHEhAiABIAFBg4AEaiIDSwRAEBsACyAAQRRqIANBEHYQbgJAIAAvARhFBEAgACgCFCEBDAELQdD1gAgoAgAgACgCHEcNAgwDC0HQ9YAIKAIAIAAoAhxHDQEgAEEgaiQAIAEgAkYPC0HQ9YAIKAIAIAAoAhxHDQAgAEEgaiQAIAEgBUYPCwALIABBIGokAEEACx0AIAAgASACIAMgBCAFEHJBAXFFBEBBACEBCyABC5cDAQF/IwBBEGsiBCQAIARB0PWACCgCADYCDCAEIANBH3E6AAsgBC0ACxBtIQACQCACIAJBBGoiA0sNACADIAAgACADSRsiAhBxIgMQbyIFQQNrIQAgACAFSw0AAkACQAJAAkAgAEENSQRAIAMgA0EEayICSQ0FDAELIAIgAkGDgARqIgBLDQQMAQsgASABIAJqIgJLDQMgAg0BEFAACyAAQRB2EHEiACAAQf//A3FHDQIgAEEQdCIDQQRrIQIgAiADSw0CIAEgASACaiICSw0CIAJFBEAQUAALIAJBA3EEQBAxAAsgABBvIgBBD08EQCAAQQ8QFwALIAIgAEECdEGUl4EIaigCADYCACAAQQ9PBEAgAEEPEBcACyAAQQJ0QZSXgQhqIAE2AgAMAQsgAkEDcQRAEDEACyAAQQ1PBEAgAEENEBcACyACIABBAnRBrJaBCGooAgA2AgAgAEENTwRAIABBDRAXAAsgAEECdEGsloEIaiABNgIAC0HQ9YAIKAIAIAQoAgxGBEAgBEEQaiQADwsACxAbAAtUAQF+AkAgA0E/SgRAIAEgA0E/ca2GIQJCACEBDAELIANFDQAgAiADQT9xrSIEhiABQQAgA2tBP3GtiIQhAiABIASGIQELIAAgATcDACAAIAI3AwgLVAEBfgJAIANBP0oEQCACIANBP3GtiCEBQgAhAgwBCyADRQ0AIAJBACADa0E/ca2GIAEgA0E/ca0iBIiEIQEgAiAEiCECCyAAIAE3AwAgACACNwMIC/sEAgd+AX8jAEEQayIMJAACQAJAIAEgA1pBASACUBtFBEAgBEUNASAEIAE3AwAgBCACNwMIDAELAkAgAiADWgRAIAIgAiADgCIJIAN+fSECAkAgA3kiB1AEQAwBCyACIAeGIAFCACAHfYiEIQIgASAHhiEBIAMgB4YhAwsgAiACIANCIIgiCIAiBiAIfn0hBSABQv////8PgyEKIAFCIIghASADQv////8PgyELA0AgBkL/////D1ggBiALfiAFQiCGIAGEWHFFBEAgBkIBfSEGIAUgCHwiBUL/////D1gNAQsLIAJCIIYgAYQgAyAGfn0iAiACIAiAIgUgCH59IQEDQCAFQv////8PWCAFIAt+IAFCIIYgCoRYcUUEQCAFQgF9IQUgASAIfCIBQoCAgIAQVA0BCwsgAkIghiAKhCADIAV+fSAHiCEBDAELIAN5IgdQRQRAIAIgB4YgAUIAIAd9iIQhAiADIAeGIQMgASAHhiEBCyACIAIgA0IgiCIIgCIGIAh+fSEFIAFC/////w+DIQkgAUIgiCEBIANC/////w+DIQoDQCAGQv////8PWCAGIAp+IAVCIIYgAYRYcUUEQCAGQgF9IQYgBSAIfCIFQv////8PWA0BCwsgAkIghiABhCADIAZ+fSICIAIgCIAiBSAIfn0hAQNAIAVC/////w9YIAUgCn4gAUIghiAJhFhxRQRAIAVCAX0hBSABIAh8IgFCgICAgBBUDQELCyACQiCGIAmEIAMgBX59IAeIIQFCACEJCyAFIAZCIIZ8IQUgBEUNASAEQgA3AwggBCABNwMADAELCyAAIAU3AwAgACAJNwMIIAxBEGokAAtpAQN+IAAgAkIgiCIDIAFCIIgiBH4gAkL/////D4MiAiABQv////8PgyIBfiIFQiCIIAIgBH58IgJCIIh8IAEgA34gAkL/////D4N8IgFCIIh8NwMIIAAgBUL/////D4MgAUIghoQ3AwALOAEBfyMAQRBrIgQkACAEIAEgAiADQQAQdyAEKQMAIQEgACAEKQMINwMIIAAgATcDACAEQRBqJAALNwEBfyMAQSBrIgQkACAEIAEgAiADIARBEGoQdyAAIAQpAxg3AwggACAEKQMQNwMAIARBIGokAAtTAQF/IwBBIGsiBCQAIARB0PWACCgCADYCHCAEIAA2AgwgBCACKQIANwMQIAAgAyABIAIQPiEAQdD1gAgoAgAgBCgCHEYEQCAEQSBqJAAgAA8LAAv4AQECfyMAQTBrIgckACAHQdD1gAgoAgA2AiwgByABKQIANwMIAkACQCACRQRAIAAgBikCADcCAEHQ9YAIKAIAIAcoAixHDQEMAgsgByAHKQMINwMQIAUQTiEBIAcgBykCEDcDGCAHKAIQIAIgAUEAIAcoAhwoAgARBAAiAUUEQCAAIAQpAgA3AgBB0PWACCgCACAHKAIsRw0BDAILIAcgATYCICAHKAIgIQggAgRAIAhBqgEgAvwLAAsgASADcQRAEDEACyAHQQA7ASggByABNgIkIAAgBykCJDcCAEHQ9YAIKAIAIAcoAixHDQAMAQsACyAHQTBqJAAL3wUBBX8jAEEQayIKJAAgCkEANgIAIApBAToABCAKIAA2AgggCiABNgIMIwBBsCBrIgkkACAJQQ1qIgFBqgFBjyD8CwAgCUGcIGohDCMAQdAAayIAJAAgAEHQ9YAIKAIANgJMIABBIGogARAmIAAgACgCKDYCGCAAIAApAiA3AxAgAEEsaiAAQRBqECcgACAAKAIsNgIwIAAgAEEwajYCNCAAIAAoAjQ2AjggAEECNgI8AkACQAJ/IwBBEGsiASQAIAFB0PWACCgCADYCDCABIABBOGoiDSkCADcDAAJAAkAgASAIIAcQNCILQf//A3EEQEHQ9YAIKAIAIAEoAgxHDQEMAgsgCigCCCAEIA0QOSILQf//A3EEQEHQ9YAIKAIAIAEoAgxHDQEMAgsgASAGIAUQNCILQf//A3EEQEHQ9YAIKAIAIAEoAgxHDQEMAgsgCigCDCAEIA0QOSILQf//A3EEQEHQ9YAIKAIAIAEoAgxHDQEgAUEQaiQAIAsMAwtB0PWACCgCACABKAIMRw0AIAFBEGokAEEADAILAAsgAUEQaiQAIAsLIgFB//8DcQRAIAFB//8DcUEBRgRAIAwgAygCADYCCCAMIAIpAgA3AgBB0PWACCgCACAAKAJMRw0CDAMLIAEQKQALIABBCGogAEEQahAqIAAoAgghASAAKAIMIQsgAEEAOwFIIAAgCzYCRCAAIAE2AkAgDCAAKQJANwIAIAwgACgCSDYCCEHQ9YAIKAIAIAAoAkxHDQAMAQsACyAAQdAAaiQAIAkCfyAJLwGkIEUEQCAJKAKgICEBIAkoApwgDAELAkAgCS8BpCBBAUYEQCAJQY0gaiEADAELEBgACyAAQQ9qQeiKgAhNIABB94qACE9yRQRAEBkACyAAQe+KgAgpAAA3AAcgAEHoioAIKQAANwAAQY8gIQEgCUENags2AqggIAkgATYCrCAgCSgCqCAgCSgCrCAgChAaAAsnAQF/IwBBEGsiAiQAIAJBADYCCCACQQE6AAwgASAAIAJBCGoQGgALC9BvZgBBgICACAuYC3sgLi4uIH0ARGV2aWNlQnVzeQBPdXRPZk1lbW9yeQBpbnRlZ2VyIG92ZXJmbG93AE92ZXJmbG93AElucHV0T3V0cHV0AFRydW5jYXRlZElucHV0AEludmFsaWRBcmd1bWVudABpbmNvcnJlY3QgYWxpZ25tZW50AE5vU3BhY2VMZWZ0AGludGVnZXIgY2FzdCB0cnVuY2F0ZWQgYml0cwBmb3IgbG9vcCBvdmVyIG9iamVjdHMgd2l0aCBub24tZXF1YWwgbGVuZ3RocwBAbWVtY3B5IGFyZ3VtZW50cyBoYXZlIG5vbi1lcXVhbCBsZW5ndGhzAFN5c3RlbVJlc291cmNlcwBAbWVtY3B5IGFyZ3VtZW50cyBhbGlhcwBhdHRlbXB0IHRvIGNhc3QgbmVnYXRpdmUgdmFsdWUgdG8gdW5zaWduZWQgaW50ZWdlcgBDb25uZWN0aW9uUmVzZXRCeVBlZXIAZXhhY3QgZGl2aXNpb24gcHJvZHVjZWQgcmVtYWluZGVyAF9Ob25udWxsIGJpbmRpbmcgdG8AcmVmZXJlbmNlIGJpbmRpbmcgdG8AZGl2aXNpb24gYnkgemVybwBVdGY4RXhwZWN0ZWRDb250aW51YXRpb24ATG9ja1Zpb2xhdGlvbgBkeW5hbWljIG9wZXJhdGlvbiBvbgBjb25zdHJ1Y3RvciBjYWxsIG9uAG1lbWJlciBjYWxsIG9uAG1lbWJlciBhY2Nlc3Mgd2l0aGluAG5hbgBjYXN0IGNhdXNlcyBwb2ludGVyIHRvIGJlIG51bGwAQnVmZmVyVG9vU21hbGwAV291bGRCbG9jawBOb3RPcGVuRm9yV3JpdGluZwBVdGY4T3ZlcmxvbmdFbmNvZGluZwBGaWxlVG9vQmlnAHVwY2FzdCBvZgBkb3duY2FzdCBvZgBjYXN0IHRvIHZpcnR1YWwgYmFzZSBvZgBzdG9yZSBvZgBsb2FkIG9mAGluZgBVdGY4RW5jb2Rlc1N1cnJvZ2F0ZUhhbGYAVXRmOENhbm5vdEVuY29kZVN1cnJvZ2F0ZUhhbGYAc2hpZnQgYW1vdW50IGlzIGdyZWF0ZXIgdGhhbiB0aGUgdHlwZSBzaXplAHN3aXRjaCBvbiBjb3JydXB0IHZhbHVlAGludmFsaWQgZW51bSB2YWx1ZQBhdHRlbXB0IHRvIHVzZSBudWxsIHZhbHVlAFV0ZjhJbnZhbGlkU3RhcnRCeXRlAEJyb2tlblBpcGUAVXRmOENvZGVwb2ludFRvb0xhcmdlAGludmFsaWQgZXJyb3IgY29kZQByZWFjaGVkIHVucmVhY2hhYmxlIGNvZGUATm9EZXZpY2UAUHJvY2Vzc05vdEZvdW5kAE9wZXJhdGlvbkFib3J0ZWQAVW5leHBlY3RlZABBY2Nlc3NEZW5pZWQAL2hvbWUvZGVpbnMvQ29kZS93YXNtLXZzLW5vZGUtdmVjLW1hdGgvbGliLXppZy9iaW5kaW5ncy9tYWluLmMARGlza1F1b3RhABtbSgAwMDAxMDIwMzA0MDUwNjA3MDgwOTEwMTExMjEzMTQxNTE2MTcxODE5MjAyMTIyMjMyNDI1MjYyNzI4MjkzMDMxMzIzMzM0MzUzNjM3MzgzOTQwNDE0MjQzNDQ0NTQ2NDc0ODQ5NTA1MTUyNTM1NDU1NTY1NzU4NTk2MDYxNjI2MzY0NjU2NjY3Njg2OTcwNzE3MjczNzQ3NTc2Nzc3ODc5ODA4MTgyODM4NDg1ODY4Nzg4ODk5MDkxOTI5Mzk0OTU5Njk3OTg5OQBJbnZhbGlkVXRmOAAoZmxvYXQpACh1bmtub3duKQAobXNnIHRydW5jYXRlZCkAYWJvcnRpbmcgZHVlIHRvIHJlY3Vyc2l2ZSBwYW5pYwoAQaKLgAgLIQYAJ3VpbnQ4X3QnIChha2EgJ3Vuc2lnbmVkIGNoYXInKQBB0ouACAsgCgAnc2l6ZV90JyAoYWthICd1bnNpZ25lZCBsb25nJykAQYCMgAgLMv//AAAndWludDhfdCAqJyAoYWthICd1bnNpZ25lZCBjaGFyIConKQAAAAYAJ2Jvb2wnAEHAjIAIC2L//wAAJ3VuaW9uICh1bm5hbWVkIHVuaW9uIGF0IC9ob21lL2RlaW5zL0NvZGUvd2FzbS12cy1ub2RlLXZlYy1tYXRoL2xpYi16aWcvYmluZGluZ3MvbWFpbi5oOjQ3OjMpJwBBso2ACAseBwAnaW50OF90JyAoYWthICdzaWduZWQgY2hhcicpAEHgjYAICzf//wAAJ2NvbnN0IGV4cG9ydHNfdHdpbl90ZXN0X3N0YXRlZnVsX2xpc3RfY29tcG9uZW50X3QnAEGijoAIC64BCgAnY29uc3Qgc2l6ZV90JyAoYWthICdjb25zdCB1bnNpZ25lZCBsb25nJykAAP//AAAnZXhwb3J0c190d2luX3Rlc3Rfc3RhdGVmdWxfY29tcG9uZW50X3QgKmNvbnN0JyAoYWthICdzdHJ1Y3QgZXhwb3J0c190d2luX3Rlc3Rfc3RhdGVmdWxfY29tcG9uZW50X3QgKmNvbnN0JykAAGxvYWQgb2YgdmFsdWUgAEHgj4AICyYgAAAAAgAAACwgd2hpY2ggaXMgbm90IHZhbGlkIGZvciB0eXBlIABBkJCACAtNAQAAAGFwcGx5aW5nIHplcm8gb2Zmc2V0IHRvIG51bGwgcG9pbnRlcgAAAAAAAAAAAQAAAGFwcGx5aW5nIG5vbi16ZXJvIG9mZnNldCAAQfCQgAgLUyAAAAACAAAAIHRvIG51bGwgcG9pbnRlcgAAAAAAAAAAAQAAAGFwcGx5aW5nIG5vbi16ZXJvIG9mZnNldCB0byBub24tbnVsbCBwb2ludGVyIDB4AEHUkYAICx4gAAAAAgAAACBwcm9kdWNlZCBudWxsIHBvaW50ZXIAQfyRgAgLJQEAAABhZGRpdGlvbiBvZiB1bnNpZ25lZCBvZmZzZXQgdG8gMHgAQbSSgAgLGSAAAAACAAAAIG92ZXJmbG93ZWQgdG8gMHgAQdiSgAgLKAEAAABzdWJ0cmFjdGlvbiBvZiB1bnNpZ25lZCBvZmZzZXQgdG8gMHgAQZCTgAgLBSAAAAACAEGgk4AICykBAAAAcG9pbnRlciBpbmRleCBleHByZXNzaW9uIHdpdGggYmFzZSAweABB3JOACAsFIAAAAAIAQeyTgAgLAQEAQYCUgAgLHiAAAAACAAAAIG51bGwgcG9pbnRlciBvZiB0eXBlIABBqJSACAsBAQBBvJSACAtRIAAAAAIAAAAgbWlzYWxpZ25lZCBhZGRyZXNzIDB4IGZvciB0eXBlICwgd2hpY2ggcmVxdWlyZXMgIGJ5dGUgYWxpZ25tZW50AAAAAAAAAAABAEGglYAIC0IgAAAAAgAAACBhZGRyZXNzIDB4IHdpdGggaW5zdWZmaWNpZW50IHNwYWNlIGZvciBhbiBvYmplY3Qgb2YgdHlwZSAAQeyVgAgLMgEAAABleGVjdXRpb24gcmVhY2hlZCBhbiB1bnJlYWNoYWJsZSBwcm9ncmFtIHBvaW50AEGoloAICyMBAAAA+DIAAWluZGV4IG91dCBvZiBib3VuZHM6IGluZGV4IABB3JaACAsOIAAAAAIAAAAsIGxlbiAAQfSWgAgLMgEAAAAAAAAAAQAAAAAAAQAAAAIAAAADAAAABAAYAAAAAAAAABkAAADvv71wYW5pYzogAEG4l4AICxUgAAAAAgAAAApzdGFydCBpbmRleCAAQeCXgAgLIiAAAAACAAAAIGlzIGxhcmdlciB0aGFuIGVuZCBpbmRleCAAQYyYgAgLIAEAAABzZW50aW5lbCBtaXNtYXRjaDogZXhwZWN0ZWQgAEG8mIAICzEgAAAAAgAAACwgZm91bmQgAAAAAAAAAAABAAAAAAABAAAAAgAAAAMAAAAEABsAAAAaAEGAmYAICwUgAAAAAgBBmJmACAsFIAAAAAIAQbCZgAgLISAAAAACAAAAYXR0ZW1wdCB0byB1bndyYXAgZXJyb3I6IABB5JmACAsFIAAAAAIAQfSZgAgL0QEBAAAAAAAAAAwAAAAAAAAAFQAAAAAAAAATAAAAAAAAABEAAAAAAAAACAAAAAAAAAAJAAAAAAAAAAoAAAAAAAAAAQAAAAAAAAANAAAAAAAAAA4AAAAAAAAAFAAAAAAAAAALAAAAAAAAABYAAABVbmFibGUgdG8gZHVtcCBzdGFjayB0cmFjZTogbm90IGltcGxlbWVudGVkIGZvciBXYXNtCgAAAAAAAAAEAAAAAAAAAAUAAAAAAAAABgAAAAAAAAAEAAAAAAAAAAUAAAAAAAAABwBB1JuACAsJBAAAAAAAAAAFAEHom4AICwEcAEH0m4AICxYcAAAAdW5leHBlY3RlZCBlcnJubzogAEGcnIAICwUgAAAAAgBBx5yACAuCFgLBmnZA63jXFaj1WSyeXFglzqrh4cWt3V0aDXwlCyv2ARz/KE1/M9yzSqmyOqASVKstlP5rL4ya+qbL4HlrhuwB6DqjVQMDsWmUYY4ubB7wgzVPlofNibhDGX94YzMR4wGjG0xC+Lc3bZQz8bhYE4xQyEhqrH7xSXudYpTYecrZAc8bwh/BgNQoXkaQ7PMh8tH+OR8fgGajk0W4HklasdABQtp/M9OZ6MSHG61YPnZsSjYtEEY2NvpvMRubiPTExwE89U43jNevY2s2i5f67hcbCNpf1rlQlqeo9pK4bAS/AbTouoy7FLlOP3EKFYlNTvjccM2dx4wJiYQObDPrbrYBdY7IM49Apz09vl80gSxCP4fN4+SgqYyPfg+nd5wDrgGGgX2AveW1KeAYtoJ3tuUcGRv4G1sXwMH6J4QTscGlARIlPVfxvo+4A1cSVWBWgPcQeSJOwqtQfbezC5FdqJ0BqxFalvWCJUtOpgId99+EtZgANVHi/1/4bQ55Ytq2lQFiry/0kUfAyrxcOurxOQ3Q0yHfSBisYC3hqgXPY+yNATu8bRm57pjdE8ZYXaDB2iLjdS2iXLQc4RyVEuA5SIYBCYnOfJRGo4DwTRY/DWw/Lmayr4FJrCThvI+uTqDJfgGq4M8eftxO6NJ8q7PnvAEauGsXakuV2lr+BHdx3m93AQeIyfBFy4nt5GxIm5tn3BIGSoGKraRJHBsN0io/OnABnkNkgy5E7u14WA224nNuLN+ryLZ8yWmHAdR/1xAoaQHBQxfgOWn681AibsNfUNpajj9wievgjdHksIE9pThiAdYBwvFnY/uGu8k67GPFUMqDNCwNbWzComBKVXtRa1sB0y315Xss3gFh7ZFX5ktQTyBk7bIYFgoXAiqC922/VAEej3pplXaMTKjaZmsHy95iXZwYcPUZAE33KXhQVjROAeheO9kZoOFVRsPsTd3n106+7PIsfKX11W4vvUxpyUcBYePy0fa7x9xk6V4fx0VQkFXXhSz+PtxC0qtoywh+QQGtv6gGiEKcExxy86412uav7UgjvxqLS2uDZuu0mVE7AVUzYoLv76EUSiitZLEryJ3uzuvQrxAfoRsYIuyDQzUBtCwVaQde93lC5VZURcI2NwRfxE0x8XCAX2exPzJTLwFIEWnwvgn4Y42CRbvio8nQ8PqJq+OehyIq36lbEoApAeM1rNrTsJE377yD0pHMFv2vunDNEOCs2H97cruUySMB7xiV68Yc9v6oLwHCww++AOvMYzX/2oLkw3L4mywvHgHziI6c/9wljYHgty4uQMAbvecEDOVdsI225iLuT7AYARLtOFImS2ztrfcX2s0xgelB/sEkWgfZHGoviUl3TBMB5P2TJjwWAO9URtlc+jmNqOX0YbMIJ9JKxnhq3x0DDgFmsYwKcrpwQ7R/wngNvs8Xkz0dHZJE1DZ7ceVtwdMIASaSZpCtfIm77hxZA7cRwwhgwZRFc+H0kW/QbjPivQMBl6H0xugTK6OUHAZghQTVIztZPnbYytjyg/cKxQWC/QGBNA4iGOCQyT9m8js9l0dO2PCs6CvYLBLIREYrUbnzAapDKb+Rl18mKgBBAhXa8pj+BVFnCwe/LE4+0Ia1IOoB7W6tGzEvt6vD72voDULWvYk+3oU59pmhjgMDZka34AH3oX9M64vRsfQ6flIkmBk0UrtnfMsqJoo1QJDhG3zXAcKMdzLTmajzwNv3Wzb57iwnzxB/0xJU+A0uL4ZSbs4BkxNoFkYgF8t8qILl3e06OVcOf6QWMoZghFC4PguNxQFQviLewe5THryTg4CP3MEnSEIAbT4jGLVZzqw+a9e8AVrTXsrs4EFVXujrg4YzOpHFigzncVXoYHxYJ+2bTLQBMLrLmrc9Qg+xUjTQtR2XjeQEghvNSXoKJZc00MrrqwFv5QuxY0h0IezTUIg/D5Px/Y88FeZsbtRLIJF4KbSjAUkHSG73z6epXjOwCkZEGRfeU2DmdtStn1AEy23tpJsB+DcuP18GhDCgZtUI7Go//9Q6/GN5lo6YRgfFGlC9kwFggnkQI7paeUFzKZHqFAw3hY2++s7QjP65ppm6jvyLAX8tqqTu8rZqNhmEJGEi60h0CMlbj4Kfhf8U3EXqYYQBbGkxzhGOoKToVQSBKJv2L7qYljOZCd/LJ1w1YKfsfAFs5Q/K2/sQT3MpoEEfNWusmMK4osuY+ASQ41tGDpx1AbZXYtH0hTqcZmnlZ0+NWNUW5RCV+hFSCbybY7xqb24BbGCNv5x82Om+H/3VYpOPGuNndj94wyU/rhxl/AtmZwHT+r7dtbU1hk6VkiRtCOKSrTobqE5LeSpQC3qlRH9gAfZZMhinOtdqwViaeue1OKKh03rygoPYo7MiDatqulkBaW0cELxexqnHYl3+Yb51LqZxu7M7Z2mPAUZ8RNcWUwH9fw/GfcgYtYDN3jhC0+bt6K8n7mW2mjTQBwvd5pNMAVjtXq0A24GsyGg8wDhKEE7u8CPhjQPozFkbJAT5MEYBKC4NBzrxDEK253zr1Iz0Hqx2iFSxt8FEpCvoXXDtPwHGgb+RdDWSZEWAxh2svKd7DXLvCnBbuzcenAiUssg5AcMiHvEzHGSyn8+ZwX/S5XCY1Ejd4AhDoIO97EYowjMBO4TdobJ+SkN5e8eO6rB3Qr3+3UTg51g3Bwkg/zzZLQGcWKfSyVYwZ5GeQb5g34sMfHgdnMablsrE+gcfXw0oATXyzDzkQD+ZivriOgwSL3y3FYNB/zCCi2Ur4NT/XSIBf3P7Ha2yepnorzFZHl9SoteTBGzqqYA0ok/7DJPKHAECpZUsrhZsYVBLWK6ot7xFFY9yFuMPWXzwykdkj1IXAdBARM8YuBf2pqzf2tRMiWxTeSjjJz9+VCqJFhtu9REB5ULilKxBjQkqWC8jzS5EKvpQ1118oYR4XtkiCKuyDAGRG8Ab4yfzJT9xQ0D7wio2SVeNP7YFb4M7CtqLxIkHARu0NM1c1f7dAHIPobL9SUJoC0jxRmADrKmO4YM7egIBO+mK2VJyPbu/7aZOnGSQZkYePlHSpaAWWO60fSYH+wG4Yi0GxeijvSamIUgyLFyJUXrhnkrRhPgSJcLgokrxAaU2CZhQdUeFxrA23M2IfZWnt53++AsdlA4cj0r8vecBYWtVoocgYTIm4SP+eZLzcM/eRx4AT+snW+YUcEdg3gF8up5NL3Fycxsy1Jjf6DCEQbt8SpLQzSY+zfuKnTDVATNMz7l+4EqbrqqWUIckbKyDdrs8HLUErggiZUMcLswBpMl+q4yaw3hnC8UfsT9jCy6rAw1KoiIgzEAimuVXwwH3HwNm+4j8RrJQERgMQ5/qnJ3/3LD5Yokmq1bTH626AZbB5ossu7XXZ9mhZiwg5Ze2yZ+5/9tRMa8sg2H1LLIBrrXSN6DI/GrwnRW7Cj2KEGlY9OA8wDzRpwT40JTWqQFphftBoTKoaG8dPrTnQt2HnvhUZe1bn0eBGqyzMKmhAWieUgE9FqmqbtD5QtIxyBH5B2OMcDwAQ3xMd43/o5kBodj3xLVuybf5+8sug2BL3K9gFZusKhIyOPGtwDvGkQHqgzetWEj+nZkY0LB0z7jS4f2P8uereLZdrht7Iw+KActPniGqZwb29kLVB4d5nBCqR/lAyL/Ayb7PW6P4fYIBc9efr3ikRe/aWj0HuCw+e2p1gr//RBCbRlONxgASewErEad7eDa0Y00JdRVwTufGTfHH+1u2e8Xm5mAGhcpzAQEAQdiygAgLAQUAQeiygAgLARkAQfiygAgLAX0AQYizgAgLAnECAEGYs4AICwI1DABBqLOACAsCCT0AQbizgAgLAy0xAQBByLOACAsD4fUFAEHYs4AICwNlzR0AQeizgAgLA/kClQBB+LOACAsE3Q7pAgBBiLSACAsEUUqNDgBBmLSACAsElXPCSABBqLSACAsF6UHMawEAQbi0gAgLBY1J/RoHAEHItIAICwXBb/KGIwBB2LSACAsFxS68orEAQei0gAgLBtnprC14AwBB+LSACAsGPZFg5FgRAEGItYAICwYx1uJ1vFYAQZi1gAgLB/Uubk2usQEAQai1gAgLB8nqJoNneAgAQbi1gAgLB+2Vwo8FWioAQci1gAgLB6HtzM4bwtMAQdi1gAgL/gMlpAAKi8oiBAAAAAAAAAAAuTQDMrf0rRQAAAAAAAAAAJ0HEPqTx2VnAAAAAAAAAAARJlDi4+X8BAIAAAAAAAAAVb6Qa3N98BgKAAAAAAAAAKm30xlBc7J8MgAAAAAAAABNliKBRUB8b/wAAAAAAAAAge+shVtBbS3uBAAAAAAAAIWtYJzJRiLjphgAAAAAAACZY+MN8GGrb0J7AAAAAAAA/fFwRbDpWC5MaAIAAAAAAPG5NFtxkLznfAkMAAAAAAC1oQfINtKuhnAvPAAAAAAAiSgm6BEbaqEy7SwBAAAAAK3KvohZhxIn/aHgBQAAAABh9bmrv6Rcw/EpYx0AAAAA5cqhWr43z9C40e+SAAAAAHn2KMW3FgwUnBiv3gIAAABd0MzZlnE8ZAx7a1kOAAAA0REAQfI3LvU9Zxm/RwAAABVZAEW7F+fJNQR/u2YBAABpvQFZqHaD8QwVe6kBBwAADbMIvUlRkbdAaWdPCCMAAEF/K7FwltaVQw4FjSmvAABFfNl1M/Aw7VFHGcHPawMAWW0/TQGx9KGZZH7FDhsRAL0iPYIGdccpAPd320mHVQCxrTGLIEnl0ADTV0lxpKsBdWT4t6JtehQEH7duNjZaCEn22ZctJGRmFJuTKRAPwyltz0H347T0/2UH4s9QS8/QBFUUFFUVRBFBEUBVFVQAQeS5gAgLgAJARVQBQERUFVUQFEEVBFAREQABAAAQARAUQUFAFFAVFUURUFVRRVVBABAEFBBEQFAEABUFBAAUAURUVFAFUVUFEFBVURVVEAAQFEQRAABQAABQQQVAQURAVRAEERBBUVVQAQBABUAAUAQBVAAFABAEVFFVQVVVFUVQFFVRWAVEFVVVERVVVVFVRVRYVRAAAAAAAAAAUAAAAAAABFAQAAAAAVEVFABFUURUVUVFUVVVVRUVVVFURQREAVRBFABEVEVAEFBRQEBEAVRUUFQAFFBFUEVUVUVRVVVVFVVGVVBFVQABABAEUAUAQAAAEAUAAARRQFVERQUVBEURAEUAAAAUAEHuu4AICypQVFVVRBEVVRRVUVRVQBBQEUFERAUAVUQVRUEEEAQBUAFRVVBUVVERRRUAQaK8gAgLuAIQAAAAVBVVFVWVVVRVVVVZRVEYBVVVWVVVVVVVVVVVFQARAEAAAAAABABEAAAAVEVVVRVRVVRFVBFEVVUUVlVRVUVhFVVkVVRBVVSFVVRFVVVEUVUVVVVRFAAAQBQBEQVFABAFAAAAUURURRVVRFVEVEEBFVRFZVmaVVVVlWVZlVVUWFVVVZVlYVlFZWmVZVUAQEAEQBBEEAEABQEQEEBFFUVVAVQVQVRUAVRVQEQFAVVQFEQUEEVBUBAEQEVFUQEEQRURFVAQBABUEQVFUURQVEQQAEAQEBQVAABAAUAAAAREAABABUQVQVRUVRAFUBUUVEAFAAQAEQBFEQQBEAAAAEABAAAAAAAQFAAAAABAAQBUVABEFUVRRAVVBVBAVUFQBBFREQBVUAQVRFQFVVRVUUVEFVURVUUAQei+gAgLqQQEAEAQBQEBUQAERERQBBQVVVVRVZVRFVVFVVVBVFRURRUVVVVZBVEVFVVQEQAAUAEAAEBAUABEAFAAAQQQAAQAFARFBBAFAABEEQABEQAUAQEAAAEAAAEEAQQAAQABAEUAUAAAABAEAAAREEEEAAUBQEVFUFVFVQQFVRBEAQUEVFVUVUAFUQFBVRVFERRUVRAFVREQUURRVEUVEBAAEVQRVUAFUAQURRFUFVUVVFZVVVVVVVWVVVAVQVEERRVUVVUAAVBQVEVVRVVFVUVFRRBVVVQEFQEUEBUQFRFAAAUBEARVVVVFRVVVVFVRRVUVVJlVVVVVZWWWZVlVVVEAQUABRBUAEEAQEQABBWiaZWlWllVpVVVZpVVWFEVAFBARFUBFUVBUVRUUFAQUBREABEAFBVABAAAAEBAQRABQQAUQAAABABRAEEFQAQAQAAUBQERUVVQEBVFVEUFVEUUVFVAEQAQRAAQQAEBARFEQAEQEEAAARVBQEQAAABVUVURARQUBUVBVFQVREERBVFRFFAVVUFVRVVVUUEVFVARQBEAVABVEVQBUFRRFUQEFUVAFVUUUEABQFEQRFRREQBBFVURFUFRURVURFUFVFVVVFVQAVRVQFUQFAVBVAFVURUBBRAFQAQUBAAVUQUUBABERUVBVUQEAVUBQFBFAEEUBEQQEUUEUBQEUUBAAAURQUBRQEABERARAVFhURVUERVFZVVVRVVUQAAQAQAABAEG3w4AICwEBAEHGw4AIC/IVQEhDEvUc4vF/P4naAyUeAwUB5VfS477uoi4h8jAD3k/pYLsJjNeexQc8ZUYygVsfCgGr3tCyZwlkpUMvhJMfI/aFELrgpYn2IQ1FCPL+NVUPAZNiBv+XJK8b+VKbi4sheN9UNbPh1noFX5J5xv8tpRQBQv94Wg76TA1oAephboz90MNHyPaQFrZl/caqaMYPGgH8bLhrVN6oHBjeSLHHICljT9FLFZ50QszJHauuhJUfAccdOMQ0wqB8LVUtohJbQL6/Fja63mA4ckX+vOPwNiUB77lPFOdM/wWQuBqGsCN4biidcRA51U+n5+/Xw5X0KgHTe4Ee2Oa3BsY+3QFMl1DQvJqZlZM6funJ2U/CAM8wAVyinQZv0k3NANdecN3k5+TvupKLKanKjHxIchfCxjYB0rgVzG6pGdbz1vERDQ0fqxasf3IQwAXCqvBnzmzcPAF42rAPMPd9ilvrRToUggm7qXeWdJvAq8iSxFvTlhBDAWe+AygRyuCrTqOI4UaAP37XYz3oRGSJWgn56AHZY0kBz/ltUBtaTBkJap0BZybr3vQTeIdL6Tkyk13RM8/WTwEt4UHwG4D0qlsaDQqBWAC5KWWjoq6UeJgVcv1PGGpWAd3gu26iFum9avpVztNfgmoeO0cOGxUO07erx1lWHl0BJGAypAYxEEu+aWv5p3/KWevfhxM+JbvRy2GUgC70YwFmHWnisxlOnvnrOP0F22/8OoZSB2tjMjz14rcvSexqAT17tjRgMxI50974e9Ps1AylGx98YBvGxUs6rB5SB3IBNUBoTSqM4Our/MLfG8j/ihHqyDKWaz0h4TOYYfhFeQEXL0Wo5vesP8x83YI4dhtKolUIAJh6SdbkNyl67qiAARGq3iVjErofmHkoC2FY3cbzSP16G0b9UpmbwWjqMIgBu6RtG+Sf/IWUxjMqtbq6nL1pLfKZnuyibg/9vaXejwGYkgBc9luxndDhdQ2lhuRuFn05uPdvfQPh2Yys3bKXASnrCYc8+MATo5oOcSHXGMZ+VDOM5ci55SyXbRtTrp8BkUgfjQWyuxzJiSp7LRrVn9yAlILf+8ihhz54uMrRpwG5fa8mr0ckalilbgiFzdXTCpREwfgqbgNVNlALDR6wAcjzeMla7p/xrtnbRliKmZfhiXftMRf2wcZJsIjmk7gB/7sg1+5jboQ8VaKvu1e8KvwInOyCjY3FdFsYpic0wQH4tFXesbHWjzLx1uR2NHh1hrcT+LnRD7HMud3tpP/JAbu6uA24NEnMfy99gSjhUZ+eRxtVyEZjZ7UDoBM399IBGQXG8v5pfheRonD08QqE91ZDdubhgFoYcZUkCbsb3AHD5mIiCloATkNTIgg8I62dwClQxxh+Rbmmf5oTEm7lAbnjWVH+UD/yQaMDE1FBz49OOJ8rc+IRnIsUSeEh7+4BNrF8X/HfNiIk1jV/dqOQ9YkoZH0yb/QUaCGrn9Sf+AHhc4CXSUfeHePlUjEJf3abUNebU1tjb+OTevyIjEABAcRWwFaeiFnw5NYyb+lj5Jdl07rYDI0ZIqivEVTxSQYBmHQ0xS5ZBPPNgZK3+TUVR+OXG2Foxf8czO4gy5RsCwEtkVro+dnsi2faQVQKIz7IkodVfd7nOrK3HDt29agQAWBblaF1EsbgtZkCBCl8Y47N6j02Umg8kgrxo1eU/xUBHeeQIO2hVtFXEOlfhk1CA9GQeq4HJz3nsK08+PRwGwFOYWUoy/zKcQ3z+LvCQY80Algso9yLOWeTEi10nf0gARU/s6Dy3xSn7bQA+naXo4cuWd2fD2iCUoLFy4cWpiYBGaqO0G3NqQ3ucE/EIEatbiOciFP69P1aZmzHnOtqLAFECBMWkmuwhVS0g0wDPm3fOLrIshAJtYb8vZHXqkwyAZqdQHjOFTZfWKO0vPopDz7AaPYS1dujbLvTDSXlSzgBO0xhn5BgYsrmREekIG5lPtJTSrIRAGpJ+Q2DSC5pPgFDcX6qbKAZ+xKviz79Mr2ycQSZF/A84fkD4tXpHKVEAaFrEXZo8cP57oJb7OfVQctCAy4NUbB0jpbwB6RKAEsBTp8qxsX+eKq3Yv0k5w2vnImo1uE0RhaJ9MkAFFR7UQEUrjlDSXg9cA3gGKK7fwhJrWqOPrw39Jnxy6Dn2BZYAU36mcZVbY3Q2CY2I/u2AaqatEMIwGHugE6NH+17014BiYl/cLmdONBnedeq24HDKDplBG45K/9KGVG3IuOxZQEF50gaCBmFSEsmNq1ihznPqh5E4kCHgSYpBJ/Gt7JsAdgPj+ZccH3tLLQaUCT+fafXZHAFGokjNl1OVGem1nMBjotewpNGYDjJp9qSeSlpN+ylN4zKzqza+kg39F4eewGN0uLr1wmuTPRY0dgRJ4akNN2eHAMScZ1jc3nOlIqCATZfzSKGYLSA/aODPwZaJj7LkJBSZ6bw+V2HYdr+G4oBdMn/Z6nn6q4MRIAUkxDxezoVn8/VNTSCV9blkFfTkQE9ooLo3tVrySxSawAzn5MTLAyyEz7FJQhb4Z4RXbGZAZoeIeOpXecer0jZfc+nGGsWRPmKAuy+Y/PlEzXRtqEBm8Mtraq3tUzscEkooZOSIO2YR16guZfr2yJjn3nkqQFrQJ2eGaB+VOygNpBVATf1OrE2pDtRiJgzoEfTHzuyAQk3z/RMmSaaRyVCScgTEi8GoYMdI1Qr7+dPfkWRu7oB/rNn7nk80W24LhTMiIYC9hR2rpWlieUIOmSMcJ9mwwFdW4CNRYHRrr623RQsIhbaIJ8m4hEVxFObw+joHz3MAayCziCp9I/qI6o8dFknVDunPWi4OpKPw6mKinHsP9UBOE4i28GobGhT7F8tacZX2Ys0K8Tbs+whzZbeEONv3gFG949Z6ZfJcWOr4L4iHWpecKlydY2y8d7hHSYm5s3nAbC39JtZJc09BfNGQKap6dOEEx+bjmKTK3phQH/cWvEBo3FHHQNA2duE5eBs2/HQKfYcaIpOOtY8jZbhbrEX+wH5cDUp2b+chxFpSq+5owJEeambX6Bc5Kt3kpxxqoICAQYY//djLryCTR9feOqlzhl5Anf4ay74WlK2hL5dkgcBj35QXSCkakdn7V8ApB++Hy80HRWgzgY8B6WZU2+7DAGQHcBf96DsmIaostmtZON0Ukq8jqBYk2OKzltXXv4RAWw0UXTrQLyYtbxoUd5uWDkW3e3LZfMQgmaRmG2sWxcB0CPGvLAPV3susJqiDe9vb/UleqWMZ17KV37kw93THAGr5K7RNtv/BOO8MzBIuGuuatFREcbUWssfJlQeeWciAXqpM1HOFeWqVCgoKHuCykGDwt/LSHU7VQirdOQHFygB942kKIDuHgaCljWH5d0wbmi2+GU1GRGjrlWFLhbjLQGNB0N0H3axLwOehtmszX5/CqLjjAwBdOPxcvPSMswzARzy1lna4za7PpizWoZV39SfXFWAOqvDekHHGXTv0jkBOTLHvNpUQTnNilhBX5AyAm8GyLA5eACTCOpEjuD3PwF/cQk8KVMrqZNV4IVHFSAhvEpLLioURWGW4v2FnTtGARm8tS0pn3WAfUd6JJ8deyf8BUZepQi3mqVmnLbAnkwB0LFWuoQIxKAKSUJRxcK9J39RkFeZcAWJiiEigechUwE+x8CxTDQSwnDBnQlD9M0aT8hForpTGrMWcmBbssVZAetIZiK0WQFRcDXbhPOivY1NB1jA+/GxzmsUat/EimABAEHU2YAIC8kBZFlVlVVVViWVVqZlVZZERRRVFURBRRQEVQEFUWRZlqZpmaZlVpaVaVmVVFBFQVUVRRUFUVUVWVEQUVVAFQFVVURRAFUVVRQUABRBAFEQUUUFRAUQBBBBUFRAFAAAAFAQAEQUBEAAAUAEAEQAAUAAAFAVUVUUQVRUVFVURUFUAERVBFBRAUUFABQRAQBURVVVVZVQZVmVVUWWFQQVRUVFQVEFBUFUVEAQFFQRFFVVVERQVRUEUFVAFUEVFABFFEFAUAVAFQAAAAAFAEGm24AIC+oERFZVZVmRVVVVEWWVVlQARBAEBQABEAAQRVFQAVAFFARVBVAEFFUERUFBQAEARAEAAAAQVBABQAAUUQRVAAQEEEREFRAAEEQBFAQVUFVVUQVFUUBVREQUBEEBFBRUUQQQAABQVRUEEQQFQUURRVARUAAFFEEAAAAFARBFEBQARFBRVVQUFRBUVBBRQEAAABQAAAEAAAQRAQFAUAARVFABAEABEEEQAAQUAEQEUFQFRAERUEBUFUQAAAAAAAAAEAAAAAABAEREFEAAERFRBRAQQEAAVFRAUVUVVVERRFEVAEREBAFBAVRQUFQAEVURQVQBUQRRBRQBFEFBFRBRRBRFEFVBFVUUUFQUQUFQUBVVUERRVFQAEVRVUQBEURFQBFEUEVEBBVBVVGVaVlVZUlVVVWVVlVZAABVRUAVERQVRQFAVRFRVVWVZWVVlVVZVFVmRAAEBEAAQFQBAVUQFABQUBVBUUVVVVQUBBRRVQWRVVVFVVVVlSZVVBVVVAFBBBFAEUVREAQREAVFQVFVkVVVVFVRVVVVBlVRVUVBFVVVVRVVVVVVUABAAAAAAAAAEAFAAAEBUWVVVVVVlVQVVVVWVVVRVVSVVlVRURZZkVZVVAEAAQAEAAAAAAEAAAAAAAAEQBEARBABABARAVURWVFVZVWVFVhVlSZVlQBEAAAEQBAAAAQFAAABUUVVVVVIVVVVUVVlWVVBFVQVRURVFVRBFRVFQVFVBUABQAQUFEEQFQBVEUFUEVVBURFUURUUUVUAUEAAEAAAAEUAAABAAAFBQFFAQQBUBVEUAFQRQERUAAVEAEEQRAAAEBAABAEGZ4IAIC/UCAQAARABQBVERRUFQFFEBUFQAAARAAAAEAAFEABAAAEAABQBBBQABEABBBQBABAUFAVBFBEERQBFEFABAQAAAAABQBERQAQEABEBEUAAAAAABABQAAAAAAAAAFAREBARAAQAQBBBUVVVVUERVRVVFVVRFVVAQVFQVQEVVQUUVAQBRBAAAEQREARUQABEAAESUapZWWZWWZWVZZlVZZUAAVQEQAEQUVFVBEAEBVElJpVVVlWVVVZZVVZVUWVmWaVVWVFVVpmWVlgAAAAAQAAAAQAEAQAAAAAAAAAAAAQQAAAAAAABERRUUFEFFEVRBEFRUAQAEAQQABBEEAABQBAQFEAAAABAAAABAEAAAAABUVZVlVVFVFUlVVVVRVRBUVRRBRVVUVFUQBVUEVFVVVVWVZWRVVWVFVWQURWVVVVYkRUWVVVVSZVRVVlUVQVRFVZVVVVFRAAAAAFAFAEBQABAAAAAAQEAERFAABQFABARFEAAABAAAQABBmOOACAsHZXJyb3I6IABBsOOACAsxIAAAAAIA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');
    const module1 = base64Compile('AGFzbQEAAAABRQxgAX8AYAJ/fwBgAAF/YAR/f39/AGAEf39/fwF/YAJ/fwF/YAN/f38Bf2ABfwF/YAJ+fwBgA39+fwBgBX9/f39/AGAAAAKfCBYad2FzaTpjbGkvZW52aXJvbm1lbnRAMC4yLjMNZ2V0LWFyZ3VtZW50cwAAG3dhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMxlbcmVzb3VyY2UtZHJvcF1kZXNjcmlwdG9yAAAVd2FzaTppby9zdHJlYW1zQDAuMi4zHFtyZXNvdXJjZS1kcm9wXW91dHB1dC1zdHJlYW0AABt3YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMVZmlsZXN5c3RlbS1lcnJvci1jb2RlAAETd2FzaTppby9lcnJvckAwLjIuMxRbcmVzb3VyY2UtZHJvcF1lcnJvcgAAFXdhc2k6aW8vc3RyZWFtc0AwLjIuMxtbcmVzb3VyY2UtZHJvcF1pbnB1dC1zdHJlYW0AABh3YXNpOnJhbmRvbS9yYW5kb21AMC4yLjMQZ2V0LXJhbmRvbS1ieXRlcwAIFXdhc2k6aW8vc3RyZWFtc0AwLjIuMyFbbWV0aG9kXW91dHB1dC1zdHJlYW0uY2hlY2std3JpdGUAARV3YXNpOmlvL3N0cmVhbXNAMC4yLjMbW21ldGhvZF1vdXRwdXQtc3RyZWFtLndyaXRlAAMVd2FzaTppby9zdHJlYW1zQDAuMi4zJFttZXRob2Rdb3V0cHV0LXN0cmVhbS5ibG9ja2luZy1mbHVzaAABD19fbWFpbl9tb2R1bGVfXwxjYWJpX3JlYWxsb2MABB53YXNpOmZpbGVzeXN0ZW0vcHJlb3BlbnNAMC4yLjMPZ2V0LWRpcmVjdG9yaWVzAAAVd2FzaTpjbGkvc3RkZXJyQDAuMi4zCmdldC1zdGRlcnIAAhV3YXNpOmlvL3N0cmVhbXNAMC4yLjMuW21ldGhvZF1vdXRwdXQtc3RyZWFtLmJsb2NraW5nLXdyaXRlLWFuZC1mbHVzaAADG3dhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMyNbbWV0aG9kXWRlc2NyaXB0b3Iud3JpdGUtdmlhLXN0cmVhbQAJFHdhc2k6Y2xpL3N0ZGluQDAuMi4zCWdldC1zdGRpbgACFXdhc2k6Y2xpL3N0ZG91dEAw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');
    const module2 = base64Compile('AGFzbQEAAAABKgdgAn9/AGACf38Bf2ABfwBgBH9/f38AYAR/f39/AX9gA39+fwBgAn5/AAMSEQEBBAIBAgAFAAAAAAMAAwYCBAUBcAEREQdXEgEwAAABMQABATIAAgEzAAMBNAAEATUABQE2AAYBNwAHATgACAE5AAkCMTAACgIxMQALAjEyAAwCMTMADQIxNAAOAjE1AA8CMTYAEAgkaW1wb3J0cwEACtUBEQsAIAAgAUEAEQEACwsAIAAgAUEBEQEACw8AIAAgASACIANBAhEEAAsJACAAQQMRAgALCwAgACABQQQRAQALCQAgAEEFEQIACwsAIAAgAUEGEQAACw0AIAAgASACQQcRBQALCwAgACABQQgRAAALCwAgACABQQkRAAALCwAgACABQQoRAAALCwAgACABQQsRAAALDwAgACABIAIgA0EMEQMACwsAIAAgAUENEQAACw8AIAAgASACIANBDhEDAAsLACAAIAFBDxEGAAsJACAAQRARAgALAC8JcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkBDXdpdC1jb21wb25lbnQHMC4yMjYuMA');
    const module3 = base64Compile('AGFzbQEAAAABKgdgAn9/AGACf38Bf2ABfwBgBH9/f38AYAR/f39/AX9gA39+fwBgAn5/AAJsEgABMAABAAExAAEAATIABAABMwACAAE0AAEAATUAAgABNgAAAAE3AAUAATgAAAABOQAAAAIxMAAAAAIxMQAAAAIxMgADAAIxMwAAAAIxNAADAAIxNQAGAAIxNgACAAgkaW1wb3J0cwFwARERCRcBAEEACxEAAQIDBAUGBwgJCgsMDQ4PEAAvCXByb2R1Y2VycwEMcHJvY2Vzc2VkLWJ5AQ13aXQtY29tcG9uZW50BzAuMjI2LjA');
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      '[export]twin:test/stateful': {
        '[resource-new]clip-projector': trampoline0,
      },
      wasi_snapshot_preview1: {
        args_get: exports0['0'],
        args_sizes_get: exports0['1'],
        fd_write: exports0['2'],
        proc_exit: exports0['3'],
        random_get: exports0['4'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/environment@0.2.3': {
        'get-arguments': exports0['5'],
      },
      'wasi:cli/exit@0.2.3': {
        exit: trampoline8,
      },
      'wasi:cli/stderr@0.2.3': {
        'get-stderr': trampoline5,
      },
      'wasi:cli/stdin@0.2.3': {
        'get-stdin': trampoline6,
      },
      'wasi:cli/stdout@0.2.3': {
        'get-stdout': trampoline7,
      },
      'wasi:filesystem/preopens@0.2.3': {
        'get-directories': exports0['16'],
      },
      'wasi:filesystem/types@0.2.3': {
        '[method]descriptor.append-via-stream': exports0['8'],
        '[method]descriptor.get-type': exports0['9'],
        '[method]descriptor.stat': exports0['10'],
        '[method]descriptor.write-via-stream': exports0['7'],
        '[resource-drop]descriptor': trampoline1,
        'filesystem-error-code': exports0['6'],
      },
      'wasi:io/error@0.2.3': {
        '[resource-drop]error': trampoline3,
      },
      'wasi:io/streams@0.2.3': {
        '[method]output-stream.blocking-flush': exports0['13'],
        '[method]output-stream.blocking-write-and-flush': exports0['14'],
        '[method]output-stream.check-write': exports0['11'],
        '[method]output-stream.write': exports0['12'],
        '[resource-drop]input-stream': trampoline4,
        '[resource-drop]output-stream': trampoline2,
      },
      'wasi:random/random@0.2.3': {
        'get-random-bytes': exports0['15'],
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports2.cabi_import_realloc;
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': exports2.args_get,
        '1': exports2.args_sizes_get,
        '10': trampoline14,
        '11': trampoline15,
        '12': trampoline16,
        '13': trampoline17,
        '14': trampoline18,
        '15': trampoline19,
        '16': trampoline20,
        '2': exports2.fd_write,
        '3': exports2.proc_exit,
        '4': exports2.random_get,
        '5': trampoline9,
        '6': trampoline10,
        '7': trampoline11,
        '8': trampoline12,
        '9': trampoline13,
      },
    }));
    postReturn0 = exports1['cabi_post_twin:test/stateful#[method]clip-projector.get-components'];
    realloc1 = exports1.cabi_realloc;
    statefulConstructorClipProjector = exports1['twin:test/stateful#[constructor]clip-projector'];
    statefulMethodClipProjectorGetComponentsCount = exports1['twin:test/stateful#[method]clip-projector.get-components-count'];
    statefulMethodClipProjectorGetComponents = exports1['twin:test/stateful#[method]clip-projector.get-components'];
    statefulMethodClipProjectorFillComponents = exports1['twin:test/stateful#[method]clip-projector.fill-components'];
    statefulMethodClipProjectorSetProjection = exports1['twin:test/stateful#[method]clip-projector.set-projection'];
    statefulMethodClipProjectorProject = exports1['twin:test/stateful#[method]clip-projector.project'];
  })();
  let promise, resolve, reject;
  function runNext (value) {
    try {
      let done;
      do {
        ({ value, done } = gen.next(value));
      } while (!(value instanceof Promise) && !done);
      if (done) {
        if (resolve) resolve(value);
        else return value;
      }
      if (!promise) promise = new Promise((_resolve, _reject) => (resolve = _resolve, reject = _reject));
      value.then(runNext, reject);
    }
    catch (e) {
      if (reject) reject(e);
      else throw e;
    }
  }
  const maybeSyncReturn = runNext(null);
  return promise || maybeSyncReturn;
})();

await $init;
const stateful = {
  ClipProjector: ClipProjector,
  
};

export { stateful, stateful as 'twin:test/stateful',  }