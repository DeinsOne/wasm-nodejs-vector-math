import { stderr, stdin, stdout } from '@bytecodealliance/preview2-shim/cli';
import { preopens, types } from '@bytecodealliance/preview2-shim/filesystem';
import { error, streams } from '@bytecodealliance/preview2-shim/io';
const { getStderr } = stderr;
const { getStdin } = stdin;
const { getStdout } = stdout;
const { getDirectories } = preopens;
const { Descriptor,
  filesystemErrorCode } = types;
const { Error: Error$1 } = error;
const { InputStream,
  OutputStream } = streams;

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

function trampoline6() {
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

function trampoline7() {
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


function trampoline8() {
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

let exports2;
let memory0;
let realloc0;
const handleTable0 = [T_FLAG, 0];
const captureTable0= new Map();
let captureCnt0 = 0;
handleTables[0] = handleTable0;

function trampoline9(arg0, arg1) {
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

function trampoline10(arg0, arg1, arg2) {
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


function trampoline11(arg0, arg1) {
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


function trampoline14(arg0, arg1) {
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


function trampoline15(arg0, arg1, arg2, arg3) {
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


function trampoline16(arg0, arg1) {
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


function trampoline17(arg0, arg1, arg2, arg3) {
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


function trampoline18(arg0) {
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
let exports4;
let postReturn0;
let realloc1;
const handleTable5 = [T_FLAG, 0];
const finalizationRegistry5 = finalizationRegistryCreate((handle) => {
  const { rep } = rscTableRemove(handleTable5, handle);
});

handleTables[5] = handleTable5;
const trampoline0 = rscTableCreateOwn.bind(null, handleTable5);
const handleTable4 = [T_FLAG, 0];
const captureTable4= new Map();
let captureCnt4 = 0;
handleTables[4] = handleTable4;
function trampoline1(handle) {
  const handleEntry = rscTableRemove(handleTable4, handle);
  if (handleEntry.own) {
    throw new TypeError('unreachable resource trampoline')
  }
}
function trampoline2(handle) {
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
function trampoline3(handle) {
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
function trampoline4(handle) {
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
function trampoline5(handle) {
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
    finalizationRegistry5.register(rsc0, handle1, rsc0);
    Object.defineProperty(rsc0, symbolDispose, { writable: true, value: emptyFunc });
    return rsc0;
  }
}
let statefulMethodClipProjectorGetComponentsCount;

ClipProjector.prototype.getComponentsCount = function getComponentsCount() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable5[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  const ret = statefulMethodClipProjectorGetComponentsCount(handle0);
  return ret >>> 0;
};
let statefulMethodClipProjectorGetComponents;

ClipProjector.prototype.getComponents = function getComponents() {
  var handle1 = this[symbolRscHandle];
  if (!handle1 || (handleTable5[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
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
  if (!handle1 || (handleTable5[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
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
  if (!handle1 || (handleTable5[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
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
  if (!handle1 || (handleTable5[(handle1 << 1) + 1] & T_FLAG) === 0) {
    throw new TypeError('Resource error: Not a valid "ClipProjector" resource.');
  }
  var handle0 = handleTable5[(handle1 << 1) + 1] & ~T_FLAG;
  statefulMethodClipProjectorProject(handle0);
};

const $init = (() => {
  let gen = (function* init () {
    const module0 = base64Compile('AGFzbQEAAAABVg5gAX8Bf2AAAGADf39/AX9gAX8AYAJ/fwBgAn9/AX9gA39/fwBgBH9/f38Bf2AAAX9gBH9+f38Bf2AEf39/fwBgA39+fwF+YAJ8fwF8YAV/f39/fwF/AqABBBpbZXhwb3J0XXR3aW46dGVzdC9zdGF0ZWZ1bBxbcmVzb3VyY2UtbmV3XWNsaXAtcHJvamVjdG9yAAAWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQhmZF9jbG9zZQAAFndhc2lfc25hcHNob3RfcHJldmlldzEHZmRfc2VlawAJFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfd3JpdGUABwM8OwEBAwcDCAAAAgIDBAQHAQQBBwAEAAAAAwgBCAEIAAUAAwQFAgUGAAMEBQEAAAYKAAICCwUMBg0GBgICBAUBcAEGBgUDAQACBhoEfwFB8KUEC38AQcQgC38AQcAgC38AQcghCweeCi0GbWVtb3J5AgALX2luaXRpYWxpemUABSdfX2NvbXBvbmVudF90eXBlX29iamVjdF9mb3JjZV9saW5rX21haW4ABEJjYWJpX3Bvc3RfdHdpbjp0ZXN0L3N0YXRlZnVsI1ttZXRob2RdY2xpcC1wcm9qZWN0b3IuZ2V0LWNvbXBvbmVudHMABgxjYWJpX3JlYWxsb2MAByd0d2luOnRlc3Qvc3RhdGVmdWwjW2R0b3JdY2xpcF9wcm9qZWN0b3IACC50d2luOnRlc3Qvc3RhdGVmdWwjW2NvbnN0cnVjdG9yXWNsaXAtcHJvamVjdG9yAAk+dHdpbjp0ZXN0L3N0YXRlZnVsI1ttZXRob2RdY2xpcC1wcm9qZWN0b3IuZ2V0LWNvbXBvbmVudHMtY291bnQACjh0d2luOnRlc3Qvc3RhdGVmdWwjW21ldGhvZF1jbGlwLXByb2plY3Rvci5nZXQtY29tcG9uZW50cwALOXR3aW46dGVzdC9zdGF0ZWZ1bCNbbWV0aG9kXWNsaXAtcHJvamVjdG9yLmZpbGwtY29tcG9uZW50cwAMOHR3aW46dGVzdC9zdGF0ZWZ1bCNbbWV0aG9kXWNsaXAtcHJvamVjdG9yLnNldC1wcm9qZWN0aW9uAA0xdHdpbjp0ZXN0L3N0YXRlZnVsI1ttZXRob2RdY2xpcC1wcm9qZWN0b3IucHJvamVjdAAOBV9abndtACEGX1pkbFB2ACQmX1pOU3QzX18yMjJfX2xpYmNwcF92ZXJib3NlX2Fib3J0RVBLY3oAFxlfWk5TdDNfXzIxMl9fbmV4dF9wcmltZUVtABYZX1pTdDE0c2V0X3VuZXhwZWN0ZWRQRnZ2RQAYGF9fY3hhX3VuZXhwZWN0ZWRfaGFuZGxlcgMBGF9aU3QxM3NldF90ZXJtaW5hdGVQRnZ2RQAZF19fY3hhX3Rlcm1pbmF0ZV9oYW5kbGVyAwIaX1pTdDE1c2V0X25ld19oYW5kbGVyUEZ2dkUAGhFfX2N4YV9uZXdfaGFuZGxlcgMDFV9aU3QxNGdldF91bmV4cGVjdGVkdgAcEV9aU3QxMHVuZXhwZWN0ZWR2AB0UX1pTdDEzZ2V0X3Rlcm1pbmF0ZXYAHg9fWlN0OXRlcm1pbmF0ZXYAHxZfWlN0MTVnZXRfbmV3X2hhbmRsZXJ2ACATX1pud21SS1N0OW5vdGhyb3dfdAAiBV9abmFtACMTX1puYW1SS1N0OW5vdGhyb3dfdAAiFF9aZGxQdlJLU3Q5bm90aHJvd190ACUHX1pkbFB2bQAlBl9aZGFQdgAkFF9aZGFQdlJLU3Q5bm90aHJvd190ACUHX1pkYVB2bQAlFF9abndtU3QxMWFsaWduX3ZhbF90ACYiX1pud21TdDExYWxpZ25fdmFsX3RSS1N0OW5vdGhyb3dfdAAnFF9abmFtU3QxMWFsaWduX3ZhbF90ACgiX1puYW1TdDExYWxpZ25fdmFsX3RSS1N0OW5vdGhyb3dfdAAnFV9aZGxQdlN0MTFhbGlnbl92YWxfdAAlI19aZGxQdlN0MTFhbGlnbl92YWxfdFJLU3Q5bm90aHJvd190ACkWX1pkbFB2bVN0MTFhbGlnbl92YWxfdAApFV9aZGFQdlN0MTFhbGlnbl92YWxfdAAlI19aZGFQdlN0MTFhbGlnbl92YWxfdFJLU3Q5bm90aHJvd190ACkWX1pkYVB2bVN0MTFhbGlnbl92YWxfdAApCQsBAEEBCwUfLjM1NgwBEgrD4QE7AgALFABBuCEoAgAEQAALQbghQQE2AgALGwACQCAALQAADQAgACgCCEUNACAAKAIEECsLC/sHAQl/AkAgA0UNAAJ/IABFBEAgAxAqDAELIANBQE8EQEG8JUEwNgIAQQAMAQtBECADQRNq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Agg3AgggASADRw0ACyAAKAIEIQEgACgCAAsiAzYCBCAAIAQ2AgAgAiADNgIAIAIpAgghBiACIAE2AgggACgCCCEEIAAgBjcCBCACIAQ2AgwgASADRwRAIAIgASADIAFrQQ9qQXBxajYCCAsgA0UNACADECsLIAVBIGokAA8LEBIAC4UDAQV/IwBBIGsiBiQAAkACQCAAKAIEIgIgACgCCCIDSQRAIAIgASkCADcCACACIAEpAgg3AgggAkEQaiEFDAELIAIgACgCACIEa0EEdSIFQQFqIgJBgICAgAFPDQEgBkEMakH/////ACADIARrIgNBA3UiBCACIAIgBEkbIANB8P///wdPGyAFIABBCGoQESICKAIIIgMgASkCADcCACADIAEpAgg3AgggAiACKAIIQRBqIgU2AgggAigCBCEBIAICfyAAKAIEIgMgACgCACIERgRAIAMMAQsDQCABQRBrIgEgA0EQayIDKQIANwIAIAEgAykCCDcCCCADIARHDQALIAIoAgghBSAAKAIEIQMgACgCAAsiBDYCBCAAIAE2AgAgACAFNgIEIAIgAzYCCCACIAQ2AgAgACgCCCEBIAAgAigCDDYCCCACIAE2AgwgAyAERwRAIAIgAyAEIANrQQ9qQXBxajYCCAsgBEUNACAEECsLIAAgBTYCBCAGQSBqJAAPCxASAAteAQF/IABBADYCDCAAIAM2AhACQCABBEAgAUGAgICAAU8NASABQQR0ECEhBAsgACAENgIAIAAgBCACQQR0aiICNgIIIAAgBCABQQR0ajYCDCAAIAI2AgQgAA8LEBQACx0BAX8jAEEQayIAJAAgAEGzCDYCAEHNCiAAEBcAC7QEAgh/AX0CQAJ/QQIgAUEBRg0AGiABIAEgAUEBa3FFDQAaIAEQFgsiAyAAKAIEIgFNBEAgASADTQ0BIAFBA0khBAJ/IAAoAgyzIAAqAhCVjSIKQwAAgE9dIApDAAAAAGBxBEAgCqkMAQtBAAshAiABIAMgBCABaUEBS3IEfyACEBYFIAJBAUEgIAJBAWtna3QgAkECSRsLIgIgAiADSRsiA00NAQsgACECQQAhBAJAAkAgAwRAIANBgICAgARPDQEgA0ECdBAhIQEgAigCACEAIAIgATYCACAABEAgABArCyACIAM2AgQgAyEAA0AgAigCACAEakEANgIAIARB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PGsiA24iBCACQQZqIgJJDQQgASADIARsRg0BIAEgBUE6ayIDbiIEIAJBAmoiAkkNBCABIAMgBGxGDQEgASAFQTRrIgNuIgQgAkEGaiICSQ0EIAEgAyAEbEYNASABIAVBLmsiA24iBCACQQZqIgJJDQQgASADIARsRg0BIAEgBUEqayIDbiIEIAJBBGoiAkkNBCABIAMgBGxGDQEgASAFQShrIgNuIgQgAkECaiICSQ0EIAEgAyAEbEYNASABIAVBJGsiA24iBCACQQRqIgJJDQQgASADIARsRg0BIAEgBUEeayIDbiIEIAJBBmoiAkkNBCABIAMgBGxGDQEgASAFQRxrIgNuIgQgAkECaiICSQ0EIAEgAyAEbEYNASABIAVBFmsiA24iBCACQQZqIgJJDQQgASADIARsRg0BIAEgBUESayIDbiIEIAJBBGoiAkkNBCABIAMgBGxGDQEgASAFQRBrIgNuIgQgAkECaiICSQ0EIAEgAyAEbEYNASABIAVBDGsiA24iBCACQQRqIgJJDQQgASADIARsRg0BIAEgBUEKayIDbiIEIAJBAmoiAkkNBCABIAMgBGxGDQEgASAFbiIDIAJBCmpJDQQgAyAFbCECIAVB0gFqIQUgASACRw0ACwtBACAAQQFqIgAgAEEwRiIBGyEAIAEgBmoiBkHSAWwhAgwACwALIwBBEGsiACQAIABBnQg2AgBBiQogABAXAAsgAQshAQF/IwBBEGsiAiQAIAIgATYCDEGgDygCACAAIAEQOQALFwEBf0HEICgCAEHEICAAQQEgABs2AgALFwEBf0HAICgCAEHAICAAQQIgABs2AgALEgEBf0HIISgCAEHIISAANgIAC9gBAQJ/IwBBEGsiAiQAQY8LQQtBAUGgDygCACIBEDIgAkEANgIMIAEgAEEAEDkCQAJAIAEoAkBBCkYNACABKAIUIgAgASgCEEYNACABIABBAWo2AhQgAEEKOgAADAELIwBBEGsiAiQAIAJBCjoADwJAAkAgASgCECIABH8gAAUgARAwDQIgASgCEAsgASgCFCIARg0AIAEoAkBBCkYNACABIABBAWo2AhQgAEEKOgAADAELIAEgAkEPakEBIAEoAiARAgBBAUcNACACLQAPGgsgAkEQaiQACwALCABBxCAoAgALEQBBxCAoAgARAQBBzwkQGwALCABBwCAo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ASACQf4HazYCACADQv////////+HgH+DQoCAgICAgIDwP4S/BSAACwu9AgEDfyMAQdABayIDJAAgAyACNgLMASADQgA3A8ABIANCADcDuAEgA0IANwOwASADQgA3A6gBIANCADcDoAEgAyACNgLIAUEAIAEgA0HIAWogA0HQAGogA0GgAWoQOkEASAR/QX8FIAAoAgAhBCAAKAI8QQBMBEAgACAEQV9xNgIACwJ/AkACQCAAKAIsRQRAIABB0AA2AiwgAEEANgIYIABCADcDECAAKAIoIQUgACADNgIoDAELIAAoAhANAQtBfyAAEDANARoLIAAgASADQcgBaiADQdAAaiADQaABahA6CyECIAUEfyAAQQBBACAAKAIgEQIAGiAAQQA2AiwgACAFNgIoIABBADYCGCAAKAIUIQEgAEIANwMQQQAFIAILGiAAIAAoAgAgBEEgcXI2AgBBAAsaIANB0AFqJAAL8kEDI38CfAJ+IwBB8AZrIggkACADQYADayEgIAhB0ABqIgUhF0GQfyAIayEjIAhBlB9rISQgCEE3aiElIAhBzwBqISEgBUEIciEiIAVBCXIhGiAIQc4AaiEmIAhBOGohFUEAIQUCQAJAA0ACQCABIQcgBSASQf////8Hc0oNACAFIBJqIRICQAJAAkACQAJAAkACQAJAIActAAAiBQRAA0ACQAJAIAVB/wFxIgUEQCAFQSVHDQIgASIGIQUDQCAFLQABQSVHBEAgBSEBDAMLIAZBAWohBiAFLQACIAVBAmoiASEFQSVGDQALDAELIAEhBgsgBiAHayIFIBJB/////wdzIhRKDQsCQCAARQ0AIAAtAABBIHENACAHIAUgABAxCyAFDQwgAUEBaiEFQX8hEAJAIAEsAAEiCkEwayIGQQlLDQAgAS0AAkEkRw0AIAFBA2ohBSABLAADIQpBASEbIAYhEAtBACEMAkAgCkEgayIBQR9LDQBBASABdCIBQYnRBHFFDQAgBUEBaiEJA0AgASAMciEMIAkiBSwAACIKQSBrIgFBIE8NASAFQQFqIQlBASABdCIBQYnRBHENAAsLIApBKkYEQAJ/AkAgBSwAAUEwayIBQQlLDQAgBS0AAkEkRw0AIAQgAUECdGpBCjYCACAFQQNqIQkgICAFLAABQQN0aigCACENQQEMAQsgGw0GIAVBAWohCSAARQRA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SBAAAFN1Y2Nlc3MASWxsZWdhbCBieXRlIHNlcXVlbmNlAERvbWFpbiBlcnJvcgBSZXN1bHQgbm90IHJlcHJlc2VudGFibGUATm90IGEgdHR5AFBlcm1pc3Npb24gZGVuaWVkAE9wZXJhdGlvbiBub3QgcGVybWl0dGVkAE5vIHN1Y2ggZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgdW5yZWFjaGFibGUAQWRkcmVzcyBpbiB1c2UAQnJva2VuIHBpcGUASS9PIGVycm9yAE5vIHN1Y2ggZGV2aWNlIG9yIGFkZHJlc3MATm8gc3VjaCBkZXZpY2UATm90IGEgZGlyZWN0b3J5AElzIGEgZGlyZWN0b3J5AFRleHQgZmlsZSBidXN5AEV4ZWMgZm9ybWF0IGVycm9yAEludmFsaWQgYXJndW1lbnQAQXJndW1lbnQgbGlzdCB0b28gbG9uZwBTeW1ib2xpYyBsaW5rIGxvb3AARmlsZW5hbWUgdG9vIGxvbmcAVG9vIG1hbnkgb3BlbiBmaWxlcyBpbiBzeXN0ZW0ATm8gZmlsZSBkZXNjcmlwdG9ycyBhdmFpbGFibGUAQmFkIGZpbGUgZGVzY3JpcHRvcgBObyBjaGlsZCBwcm9jZXNzAEJhZCBhZGRyZXNzAEZpbGUgdG9vIGxhcmdlAFRvbyBtYW55IGxpbmtzAE5vIGxvY2tzIGF2YWlsYWJsZQBSZXNvdXJjZSBkZWFkbG9jayB3b3VsZCBvY2N1cgBTdGF0ZSBub3QgcmVjb3ZlcmFibGUAUHJldmlvdXMgb3duZXIgZGllZABPcGVyYXRpb24gY2FuY2VsZWQARnVuY3Rpb24gbm90IGltcGxlbWVudGVkAE5vIG1lc3NhZ2Ugb2YgZGVzaXJlZCB0eXBlAElkZW50aWZpZXIgcmVtb3ZlZABMaW5rIGhhcyBiZWVuIHNldmVyZWQAUHJvdG9jb2wgZXJyb3IAQmFkIG1lc3NhZ2UATm90IGEgc29ja2V0AERlc3RpbmF0aW9uIGFkZHJlc3MgcmVxdWlyZWQATWVzc2FnZSB0b28gbGFyZ2UAUHJvdG9jb2wgd3JvbmcgdHlwZSBmb3Igc29ja2V0AFByb3RvY29sIG5vdCBhdmFpbGFibGUAUHJvdG9jb2wgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAE9wZXJhdGlvbiBhbHJlYWR5IGluIHByb2dyZXNzAE9wZXJhdGlvbiBpbiBwcm9ncmVzcwBTdGFsZSBmaWxlIGhhbmRsZQBRdW90YSBleGNlZWRlZABNdWx0aWhvcCBhdHRlbXB0ZWQAQ2FwYWJpbGl0aWVzIGluc3VmZmljaWVudABBwhsL3wF1Ak4A1gHiBLkEGAGOBe0CFgTyAJcDAQM4Ba8BggFPAy8EHgDUBaIAEgMeA8IB3gMIAKwFAAFkAvEBZQU0AowCzwItA0wE4wWfAvgEHAUIBbECSwUVAngAUgI8A/ED5ADDA30EzACqA3kFJAJuAW0DIgSrBEQA+wGuAIMDYADlAQcElAReBCsAWAE5AZIAwgWbAUMCRgH2BQAAAAAAABkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABGwkLGAAACQYLAAALAAYZAAAAGRkZAEGxHQshDgAAAAAAAAAAGQAKDRkZGQANAAACAAkOAAAACQAOAAAOAEHrHQsBDABB9x0LFRMAAAAAEwAAAAAJDAAAAAAADAAADABBpR4LARAAQbEeCxUPAAAABA8AAAAACRAAAAAAABAAABAAQd8eCwESAEHrHgseEQAAAAARAAAAAAkSAAAAAAASAAASAAAaAAAAGhoaAEGiHwsOGgAAABoaGgAAAAAAAAkAQdMfCwEUAEHfHwsVFwAAAAAXAAAAAAkUAAAAAAAUAAAUAEGNIAsBFgBBmSALJxUAAAAAFQAAAAAJFgAAAAAAFgAAFgAAMDEyMzQ1Njc4OUFCQ0RFRgBBwCALCQIAAAABAAAABQBB1CALAQMAQeggCwoEAAAABQAAAMgSAEGAIQsMAgAAAAAAAAD/////AEQJcHJvZHVjZXJzAQxwcm9jZXNzZWQtYnkCDXdpdC1jb21wb25lbnQHMC4yMjUuMA13aXQtYmluZGdlbi1jBjAuMzkuMA');
    const module1 = base64Compile('AGFzbQEAAAABQgtgAX8AYAJ/fwBgBH9/f38AYAABf2AEf39/fwF/YAF/AX9gA39/fwF/YAN/fn8AYAR/fn9/AX9gBX9/f39/AGAAAALxBxQbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zJVtyZXNvdXJjZS1kcm9wXWRpcmVjdG9yeS1lbnRyeS1zdHJlYW0AABt3YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMZW3Jlc291cmNlLWRyb3BdZGVzY3JpcHRvcgAAFXdhc2k6aW8vc3RyZWFtc0AwLjIuMxxbcmVzb3VyY2UtZHJvcF1vdXRwdXQtc3RyZWFtAAAbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zFWZpbGVzeXN0ZW0tZXJyb3ItY29kZQABE3dhc2k6aW8vZXJyb3JAMC4yLjMUW3Jlc291cmNlLWRyb3BdZXJyb3IAABV3YXNpOmlvL3N0cmVhbXNAMC4yLjMbW3Jlc291cmNlLWRyb3BdaW5wdXQtc3RyZWFtAAAVd2FzaTppby9zdHJlYW1zQDAuMi4zIVttZXRob2Rdb3V0cHV0LXN0cmVhbS5jaGVjay13cml0ZQABFXdhc2k6aW8vc3RyZWFtc0AwLjIuMxtbbWV0aG9kXW91dHB1dC1zdHJlYW0ud3JpdGUAAhV3YXNpOmlvL3N0cmVhbXNAMC4yLjMkW21ldGhvZF1vdXRwdXQtc3RyZWFtLmJsb2NraW5nLWZsdXNoAAEPX19tYWluX21vZHVsZV9fDGNhYmlfcmVhbGxvYwAEHndhc2k6ZmlsZXN5c3RlbS9wcmVvcGVuc0AwLjIuMw9nZXQtZGlyZWN0b3JpZXMAABV3YXNpOmNsaS9zdGRlcnJAMC4yLjMKZ2V0LXN0ZGVycgADFXdhc2k6aW8vc3RyZWFtc0AwLjIuMy5bbWV0aG9kXW91dHB1dC1zdHJlYW0uYmxvY2tpbmctd3JpdGUtYW5kLWZsdXNoAAIbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zI1ttZXRob2RdZGVzY3JpcHRvci53cml0ZS12aWEtc3RyZWFtAAcUd2FzaTpjbGkvc3RkaW5AMC4yLjMJZ2V0LXN0ZGluAAMVd2FzaTpjbGkvc3Rkb3V0QDAuMi4zCmdldC1zdGRvdXQAAxt3YXNpOmZpbGVzeXN0ZW0vdHlwZXNAMC4yLjMkW21ldGhvZF1kZXNjcmlwdG9yLmFwcGVuZC12aWEtc3RyZWFtAAEbd2FzaTpmaWxlc3lzdGVtL3R5cGVzQDAuMi4zG1ttZXRob2RdZGVzY3JpcHRvci5nZXQtdHlwZQABG3dhc2k6ZmlsZXN5c3RlbS90eXBlc0AwLjIuMxdbbWV0aG9kXWRlc2NyaXB0b3Iuc3RhdAABA2VudgZtZW1vcnkCAAADGBcDAQAEBgABAAEFBQECBQAIBAkBAAYKAgYQA38BQQALfwFBAAt/AUEACwc3BAhmZF93cml0ZQAjB2ZkX3NlZWsAIghmZF9jbG9zZQAdE2NhYmlfaW1wb3J0X3JlYWxsb2MAFgqlMBe8AwEFfyMBIgFFBEACfyMCQQJGBEBBAyQCQQBBAEEIQYCABBAJIQNBBCQCIANBAjYCpDAgA0EANgIYIANC9c6hi8IANwMAAkAgA0HI/wNqIgAgAEEAIABrQQNxIgJqIgFPDQAgAgRAIAIhBANAIABBADoAACAAQQFqIQAgBEEBayIEDQALCyACQQFrQQdJDQADQCAAQQA6AAAgAEEAOgAHIABBADoABiAAQQA6AAUgAEEAOgAEIABBADoAAyAAQQA6AAIgAEEAOgABIABBCGoiACABRw0ACwsgAUElIAJrIgJBfHFqIgAgAUsEQANAIAFBADYCACABQQRqIgEgAEkNAAsLAkAgACACQQNxIgIgAGoiBE8NACACIgEEQANAIABBADoAACAAQQFqIQAgAUEBayIBDQALCyACQQFrQQdJDQADQCAAQQA6AAAgAEEAOgAHIABBADoABiAAQQA6AAUgAEEAOgAEIABBADoAAyAAQQA6AAIgAEEAOgABIABBCGoiACAERw0ACwsgA0H1zqGLAjYC/P8DIANBrtwAOwH4/wMgA0EANgLw/wMgAwwBC0HZFRAVAAsiASQBCyABCw4AIAAgAUGhFkGdFhApC2IBAX8jAEEwayIBJAAgAUEgOgAvIAFC9MrJg8KtmrflADcAJyABQqDC0YOSjNmw8AA3AB8gAULuwJiLlo3bsuQANwAXIAFC4ebNq6aO3bTvADcADyABQQ9qQSEQGSAAECYAC4wEAgJ/AX4QKCMAQTBrIgQkAAJAAkACQAJAAkACQAJAAkACQBATIgUoAgBB9c6hiwJGBEAgBSgC/P8DQfXOoYsCRw0BIAUpAgQhBiAFQQQ2AgQgBCAFKAIUNgIQIAQgBSkCDDcDCCAEIAY3AwAgAEUNAiABIANNDQMgAkEBRg0JQfkCEBUAC0G5FRAVAAtBuhUQFQALIAQoAgBBAWsOBAMCAQQFC0H4AhAVAAsgBEEMaiEAIAJBAUcEQCAAIAIgAxAXIQAMBQsgBCAEKAIEIgFBAWo2AgQgBCgCCCABRwRAIAQgBCkCDDcCGCAEQRhqQQEgAxAXIQAMBQsgAEEBIAMQFyEADAQLIAJBAUcEQCAEQQxqIAIgAxAXIQAMBAsgBEEEckEBIANBAWoQFyEADAMLIAJBAUcEQCAEQQhqIAIgAxAXIQAMAwsgBCAEKAIEIANqNgIEIAQgBCkDCDcCGCAEQRhqQQEgAxAXIQAMAgtBogMQGCAEQbrAADsAGCAEQRhqIgBBAhAZIARC5tKdq6eumbIKNwAoIARC4ei9k4fk2LfuADcAICAEQu7egYnGjdu34wA3ABggAEEYEBkgBEEKOgAYIABBARAZAAsgBEEEciACIAMQFyEAIARBBDYCAAsgBUEEaiIBIAQpAwA3AgAgASAEKAIQNgIQIAEgBCkDCDcCCCAEQTBqJAAgAAv5AgEDfyMAQSBrIgMkAAJAAkACQCABaUEBRgRAIAAoAgQiBCABIAAoAgAiBWpBAWtBACABa3EgBWsiAUkNASAEIAFrIgQgAk8NAkG2AxAYIANBusAAOwADIANBA2oiAEECEBkgA0EKOgAfIANB4eSdqwY2ABsgA0Lp5oGh9+2bkOwANwATIANC79yBmZfN3rIgNwALIANC4dix+7asmLrpADcAAyAAQR0QGQwDC0HAAxAYIANBusAAOwADIANBA2oiAEECEBkgA0H0FDsAEyADQuHYpbvmrduy7gA3AAsgA0Lp3NmLxq2asiA3AAMgAEESEBkMAgtBxAMQGCADQbrAADsAAyADQQNqIgBBAhAZIANBCjoAFSADQfTKATsAEyADQu/AhOPG7dux4QA3AAsgA0LmwqXj1oyZkPQANwADIABBExAZDAELIAAgBCACazYCBCAAIAEgBWoiACACajYCACADQSBqJAAgAA8LIANBCjoAAyAAQQEQGQALcQEBfyMAQTBrIgEkACABQSA6AC8gAUHs0rmrBjYAKyABQuHIhYPHrpm5IDcAIyABQvXolaOGpJi6IDcAGyABQuLYlYPSjN6y4wA3ABMgAUL13MmrluyYtOEANwALIAFBC2pBJRAZIAAQJiABQTBqJAALXgEBfyMAQRBrIgIkACACEAs2AgwgAkEEaiACQQxqIAAgARAfAkAgAigCBCIAQQJGIAByDQAgAigCCCIAQX9GDQAgABAECyACKAIMIgBBf0cEQCAAEAILIAJBEGokAAsiAQF/IwBBEGsiASQAIAAQGCABQQo6AA8gAUEPakEBEBkACw4AIAAgAUGVFkGRFhApC6wCAQJ/IwBBEGshAUEGIQICQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQCAAQf8BcUEBaw4kJAECAwQFBgcICQoLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIjAAsgAUECOwEOIAEvAQ4PC0EHDwtBCA8LQQoPC0EQDwtBEw8LQRQPC0EWDwtBGQ8LQRoPC0EbDwtBHA8LQR0PC0EfDwtBIA8LQSIPC0EjDwtBJQ8LQSsPC0EsDwtBLg8LQTAPC0EzDwtBNg8LQTcPC0E4DwtBOg8LQTsPC0E8DwtBPQ8LQT8PC0HAAA8LQcUADwtBxgAPC0HKAA8LQcsAIQILIAILmwMCCH8BfhAoIwBBIGsiAiQAAkAQEyIBKAIAQfXOoYsCRgRAIAEoAvz/A0H1zqGLAkcNASACQRhqIAEQG0EIIQMgAigCHCEFAkAgAigCGCIELwGAMCAATQ0AIAQgAEEwbGooAgBBAkYNACAFIAUoAgBBAWo2AgACQCABKALw/wMgAEcNACABKQPI/wMhCSABQgA3A8j/AyAJp0UNACAJQiCIIglC/////w9RDQAgCacQAAsgAkEQaiABEBQgAigCFCEFIAIoAhAhASMAQTBrIgMkAEEBIQdBCCEGAkAgAS8BgDAgAE0NACABIABBMGxqIgQoAgAiCEUNACAELwEEIQYgASkChDAhCSADQQZyIARBBmpBKhAnGiAEIAk3AwhBACEHIARBADYCACABQQE2AoQwIAEgADYCiDAgAyAGOwEEIAMgCDYCACADECELIAIgBjsBCiACIAc7AQggA0EwaiQAIAIvAQpBACACLwEIGyEDCyAFIAUoAgBBAWo2AgAgAkEgaiQAIANB//8DcQ8LQbkVEBUAC0G6FRAVAAvjAQIEfwh+IwBB8ABrIgIkACABKAIAIAJBCGoQEiACLQAQIQEgAi0ACAR+QgIFIAItAEBBAEetIQYgAi0AKEEAR60hByACKAJoIQMgAikDYCEIIAIpA0ghCSACKAJQIQQgAikDMCEKIAIoAjghBSACKQMgIQsgAikDGCEMIAItAFhBAEetCyENIAAgAzYCWCAAIAg3A1AgACANNwNIIAAgBDYCQCAAIAk3AzggACAGNwMwIAAgBTYCKCAAIAo3AyAgACAHNwMYIAAgCzcDECAAIAw3AwggACABOgAAIAJB8ABqJAALRAEBfyMAQRBrIgQkACABKAIAIAIgAyAEQQRqEAwgACAELQAEBH5CASAENQIMQiCGIAQtAAgbBUICCzcCACAEQRBqJAALPgECfyMAQRBrIgEkACAAIAFBDmoQAyABLQAOQQFHBH9BHQUgAS0ADxAcCyAAQX9HBEAgABAECyABQRBqJAALYQEBfwJAIAAoAgBBAUcNAAJAIAAoAghFDQAgACgCDCIBQX9GDQAgARAFCwJAIAAoAhBFDQAgACgCFCIBQX9GDQAgARACCyAALQApQQJGDQAgACgCGCIAQX9GDQAgABABCwuhAwIBfgR/ECgjAEHwAGsiBiQAAkACQAJAEBMiBSgCAEH1zqGLAkYEQCAFKAL8/wNB9c6hiwJHDQEgBkEIaiAFEBRBCCEFIAYoAgwhByAGKAIIIggvAYAwIABNDQNBxgAhBSAIIABBMGxqIgAoAgBBAUcNAyAALQApQQJGDQNBCCEFIAAtABxBA0YNA0EcIQUCQAJAAkAgAg4DAQACBgsgAUIAUyAAKQMgIgQgAXwiASAEU3MNBSABQgBZDQQMBQsgAUIAUw0EDAMLIAZBEGogAEEYahAeIAYpA1hCAlIEQCABQgBTIAYpAyAiBCABfCIBIARTcw0EIAFCAFkNAwwECyAGLQAQEBwhBQwDC0G5FRAVAAtBuhUQFQALIAApAwghBCAAQgA3AwgCQCAEp0UNACAEQiCIIgRC/////w9RDQAgBKcQBQsgACkDECEEIABCADcDEAJAIASnRQ0AIARCIIgiBEL/////D1ENACAEpxACCyAAIAE3AyAgAyABNwMAQQAhBQsgByAHKAIAQQFqNgIAIAZB8ABqJAAgBUH//wNxC+QGAgd/An4QKCMAQfAAayIFJAACQAJAAkAjAkECaw4DAQABAAsgA0EANgIAQR0hAQwBCwJAAkACQAJAAkACQAJAIAJBAk8EQCABIAJBA3RqQQhrA0AgASgCBCIHDQMgAUEIaiEBIAJBAWsiAkEBSw0ACyEBDAELIAJFDQILIAEoAgQhBwsgASgCACEIEBMiASgCAEH1zqGLAkcNASABKAL8/wNB9c6hiwJHDQIgBUEIaiABEBtBCCEBIAUoAgwhCSAFKAIIIgIvAYAwIABNDQQgAiAAQTBsaiIAKAIAQQFHDQQgBUEQaiECIwBBEGsiASQAIABBFGohCgJAAkACQCAAKAIQRQRAAkACQAJAIAAtAClBAkcEQCAALQAcQQNGBEAgAkEIOwECDAMLIAAtAChFBEAgACkDICELIAFCADcDCCAAKAIYIAsgAUEIahANAkAgAS0ACCIGRQRAIAE1AgxCIIYhCwwBCyABMQAMQgiGIQtBASEEIAZBAXENAwsgC0IgiKchBAwECyMAQRBrIgQkACAEQgA3AwggACgCGCAEQQhqEBACfiAEMQAIIgtQBEAgBDUCDEIghgwBCyAEMQAMQgiGCyEMIAEgCyAMhDcCCCAEQRBqJAAgAS0ACEUEQCABKAIMIQQMBAsgAiABLQAJEBw7AQIMAgsgAkEIOwECDAELIAIgC0IIiKcQHDsBAgwDC0EBIQQMAgsgACgCECIGDQICQCAGRQ0AIAAoAhQiBkF/Rg0AIAYQAgsgACAENgIUIABBATYCEAsgAiAKNgIEQQAhBAsgAiAEOwEAIAFBEGokAAwBC0GfARAaAAsCQCAFLwEQDQAgBSgCFCEBIAAtACkiBEECRwRAIAIgBEEBcSABIAggBxAkIAUvARANAQwFCyAFQRBqQQEgASAIIAcQJCAFLwEQRQ0ECyAFLwESIQEMBAtBACEBIANBADYCAAwEC0G5FRAVAAtBuhUQFQALIAUoAhQhAQJAIAAtAClBAkYNACAALQAoRQRAIAAgACkDICABrXw3AyAMAQsgBUEQaiAAQRhqEB4gBSkDWEICUgRAIAAgBSkDIDcDIAwBCyAFLQAQEBwhAQwBCyADIAE2AgBBACEBCyAJIAkoAgBBAWo2AgALIAVB8ABqJAAgAUH//wNxC60DAgN/AX4jAEEgayIFJAACQCABBEAgBCEBAn8CQAJAA0AgBSACIANBgCAgASABQYAgTxsiBhAfIAUoAgAiB0ECRwRAIAdBAWsNAgwDCyADIAZqIQMgASAGayIBDQALIABBADsBACAAIAQ2AgQMBAsgBSgCBBAgDAELQR0LIQEgAEEBOwEAIAAgATsBAgwBCyACKAIAIAUQBgJAAkACQAJAIAUtAABFBEAgBSgCCCEBDAELIAVCASAFNQIMQiCGIAUtAAgbIgg3AxBBACEBIAinQQFHDQELIAIoAgAgAyAEIAEgASAESxsiASAFEAcgBS0AAA0CIAIoAgAgBRAIIAUtAAANASAAQQA7AQAgACABNgIEDAMLIAUpAhSnECAhASAAQQE7AQAgACABOwECDAILIAACf0IBIAU1AghCIIYgBS0ABBsiCKdFBEAgACAIQiCIpxAgOwECQQEMAQsgAEEANgIEQQALOwEADAELIAACf0IBIAU1AghCIIYgBS0ABBsiCKdFBEAgACAIQiCIpxAgOwECQQEMAQsgAEEANgIEQQALOwEACyAFQSBqJAALiQYBCH8jAEHwMGsiAiQAIAJBADYCjDAQDiEDIAJBAjoAMSACQQA6ACAgAkIANwMYIAJBATYCCCACIAOtQiCGQgGENwMQEA8hAyACQQI6AGEgAkEBOgBQIAJCADcDQCACQQE2AjggAiADrUIghkIBhDcDSBALIQMgAkEDOwGIMCACQQI6AJEBIAJBAjoAgAEgAkIANwNwIAJBATYCaCACIAOtQiCGQgGENwN4IAJBmM0DNgKoMCACIAFBsDBqNgKkMCACQgE3ApwwIAJBwDBqIQQjAEEgayIDJAAgASgCBCEGIAEgAkGcMGoiBSkCADcCBCABIAUpAgg3AgwgASAFKAIQNgIUAkAgBkEERgRAIANCADcCACADEAogBCADKQIANwIAIAQgASgCFDYCGCAEIAEpAgw3AhAgBCABKQIENwIIIAFBBDYCBCADQSBqJAAMAQtBxBYQGCADQbrAADsAACADQQIQGSADQQo6ABwgA0Gg5pWjBzYAGCADQqDCsZPXrJiy+QA3ABAgA0Ls2L2blozdt/IANwAIIANC6drB+6aOnZDhADcAACADQR0QGSADQQo6AAAgA0EBEBkACwJAAkAgAigCxDAiCQRAIAIoAsAwIQEgAkGYAWohBCACQcgwaiEFA0AgAkG4MGogASgCCDYCACACIAEpAgA3A7AwQQAhBiMAQRBrIgMkACACQbAwaiIIKAIAIANBDmoQEQJAAkACQCADLQAODgIBAAILQQEhBgsgAy0ADyEICyACIAg6AAEgAiAGOgAAIANBEGokACACLQAADQIgAi0AASEDIAVCADcDACAFQgA3AwggAiACKAK4MDYC7DAgAkGAAjsB6DAgAkIANwPgMCACIAIoArAwNgLYMCACQQE2AsAwIAIgAzoA3DAgB0H9AEYNAyAEIAJBwDBqQTAQJyACIAdBBGo7AYgwIAFBDGohAUEwaiEEIAdBAWoiByAJRw0ACwsgACACQQhqQZAwECcaIAJB8DBqJAAPC0GfARAaAAsgAkHAMGoQIUGfARAaAAs8AQJ/IwBBEGsiASQAIAAEQCAAQQpuIgIQJiABIAJB9gFsIABqQTByOgAPIAFBD2pBARAZCyABQRBqJAALuAQBCH8CQCACQRBJBEAgACEDDAELAkAgAEEAIABrQQNxIgZqIgUgAE0NACAAIQMgASEEIAYEQCAGIQcDQCADIAQtAAA6AAAgBEEBaiEEIANBAWohAyAHQQFrIgcNAAsLIAZBAWtBB0kNAANAIAMgBC0AADoAACADIAQtAAE6AAEgAyAELQACOgACIAMgBC0AAzoAAyADIAQtAAQ6AAQgAyAELQAFOgAFIAMgBC0ABjoABiADIAQtAAc6AAcgBEEIaiEEIANBCGoiAyAFRw0ACwsgBSACIAZrIgdBfHEiCGohAwJAIAEgBmoiBEEDcUUEQCADIAVNDQEgBCEBA0AgBSABKAIANgIAIAFBBGohASAFQQRqIgUgA0kNAAsMAQsgAyAFTQ0AIARBA3QiAkEYcSEGIARBfHEiCUEEaiEBQQAgAmtBGHEhCiAJKAIAIQIDQCAFIAIgBnYgASgCACICIAp0cjYCACABQQRqIQEgBUEEaiIFIANJDQALCyAHQQNxIQIgBCAIaiEBCwJAIAMgAiADaiIGTw0AIAJBB3EiBARAA0AgAyABLQAAOgAAIAFBAWohASADQQFqIQMgBEEBayIEDQALCyACQQFrQQdJDQADQCADIAEtAAA6AAAgAyABLQABOgABIAMgAS0AAjoAAiADIAEtAAM6AAMgAyABLQAEOgAEIAMgAS0ABToABSADIAEtAAY6AAYgAyABLQAHOgAHIAFBCGohASADQQhqIgMgBkcNAAsLIAALIwAjAkUEQEEBJAJBAEEAQQhBgIAEEAlBgIAEaiQAQQIkAgsLcwECfyMAQZAwayIEJAACQCABKAIYRQRAIAFBfzYCGCABQSBqIQUgASgCpDBBAkYEQCAEIAEQJSAFIARBkDAQJxogASgCpDBBAkYNAgsgACABQRhqNgIEIAAgBTYCACAEQZAwaiQADwsgAxAaAAsgAhAaAAsATQlwcm9kdWNlcnMCCGxhbmd1YWdlAQRSdXN0AAxwcm9jZXNzZWQtYnkBBXJ1c3RjHTEuODQuMCAoOWZjNmI0MzEyIDIwMjUtMDEtMDcp');
    const module2 = base64Compile('AGFzbQEAAAABLAdgAn9/AGAEf39/fwBgAX8Bf2AEf35/fwF/YAR/f39/AX9gA39+fwBgAX8AAw4NAgMEAAUAAAAAAQABBgQFAXABDQ0HQw4BMAAAATEAAQEyAAIBMwADATQABAE1AAUBNgAGATcABwE4AAgBOQAJAjEwAAoCMTEACwIxMgAMCCRpbXBvcnRzAQAKqwENCQAgAEEAEQIACw8AIAAgASACIANBAREDAAsPACAAIAEgAiADQQIRBAALCwAgACABQQMRAAALDQAgACABIAJBBBEFAAsLACAAIAFBBREAAAsLACAAIAFBBhEAAAsLACAAIAFBBxEAAAsLACAAIAFBCBEAAAsPACAAIAEgAiADQQkRAQALCwAgACABQQoRAAALDwAgACABIAIgA0ELEQEACwkAIABBDBEGAAsALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyNi4w');
    const module3 = base64Compile('AGFzbQEAAAABLAdgAn9/AGAEf39/fwBgAX8Bf2AEf35/fwF/YAR/f39/AX9gA39+fwBgAX8AAlQOAAEwAAIAATEAAwABMgAEAAEzAAAAATQABQABNQAAAAE2AAAAATcAAAABOAAAAAE5AAEAAjEwAAAAAjExAAEAAjEyAAYACCRpbXBvcnRzAXABDQ0JEwEAQQALDQABAgMEBQYHCAkKCwwALwlwcm9kdWNlcnMBDHByb2Nlc3NlZC1ieQENd2l0LWNvbXBvbmVudAcwLjIyNi4w');
    const module4 = base64Compile('AGFzbQEAAAABBAFgAAACBQEAAAAACAEA');
    ({ exports: exports0 } = yield instantiateCore(yield module2));
    ({ exports: exports1 } = yield instantiateCore(yield module0, {
      '[export]twin:test/stateful': {
        '[resource-new]clip-projector': trampoline0,
      },
      wasi_snapshot_preview1: {
        fd_close: exports0['0'],
        fd_seek: exports0['1'],
        fd_write: exports0['2'],
      },
    }));
    ({ exports: exports2 } = yield instantiateCore(yield module1, {
      __main_module__: {
        cabi_realloc: exports1.cabi_realloc,
      },
      env: {
        memory: exports1.memory,
      },
      'wasi:cli/stderr@0.2.3': {
        'get-stderr': trampoline6,
      },
      'wasi:cli/stdin@0.2.3': {
        'get-stdin': trampoline7,
      },
      'wasi:cli/stdout@0.2.3': {
        'get-stdout': trampoline8,
      },
      'wasi:filesystem/preopens@0.2.3': {
        'get-directories': exports0['12'],
      },
      'wasi:filesystem/types@0.2.3': {
        '[method]descriptor.append-via-stream': exports0['5'],
        '[method]descriptor.get-type': exports0['6'],
        '[method]descriptor.stat': exports0['7'],
        '[method]descriptor.write-via-stream': exports0['4'],
        '[resource-drop]descriptor': trampoline2,
        '[resource-drop]directory-entry-stream': trampoline1,
        'filesystem-error-code': exports0['3'],
      },
      'wasi:io/error@0.2.3': {
        '[resource-drop]error': trampoline4,
      },
      'wasi:io/streams@0.2.3': {
        '[method]output-stream.blocking-flush': exports0['10'],
        '[method]output-stream.blocking-write-and-flush': exports0['11'],
        '[method]output-stream.check-write': exports0['8'],
        '[method]output-stream.write': exports0['9'],
        '[resource-drop]input-stream': trampoline5,
        '[resource-drop]output-stream': trampoline3,
      },
    }));
    memory0 = exports1.memory;
    realloc0 = exports2.cabi_import_realloc;
    ({ exports: exports3 } = yield instantiateCore(yield module3, {
      '': {
        $imports: exports0.$imports,
        '0': exports2.fd_close,
        '1': exports2.fd_seek,
        '10': trampoline16,
        '11': trampoline17,
        '12': trampoline18,
        '2': exports2.fd_write,
        '3': trampoline9,
        '4': trampoline10,
        '5': trampoline11,
        '6': trampoline12,
        '7': trampoline13,
        '8': trampoline14,
        '9': trampoline15,
      },
    }));
    ({ exports: exports4 } = yield instantiateCore(yield module4, {
      '': {
        '': exports1._initialize,
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