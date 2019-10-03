export const NumbToBits = int => {
    let Bits = '';

    let numb = String(int);
    while (true) {
        Bits = (numb % 2) + Bits;
        numb = Math.floor(numb / 2);

        if (numb <= 1) {
            Bits = numb + Bits;
            break;
        }
    }

    return Bits;
};

export const BitsToByts = Bits => {
    let Lng = 0;
    if (Bits.length % 8 === 0) {
        Lng = Math.floor(Bits.length / 8);
    } else {
        Lng = Math.floor(Bits.length / 8) + 1;
    }

    let Byts = new Uint8Array(Lng);
    let Stage = 1;
    let i = Bits.length - 1;
    while (true) {
        if (Math.floor((i + 1) % 8) === 0) {
            Stage = 1;
        }
        Byts[Math.floor(i / 8)] += Stage * Bits[i];
        Stage *= 2;
        if (i === 0) {
            break;
        }
        i -= 1;
    }

    return Byts;
};

export const BitsToNumb = Bits => {
    let numb = 0;
    let mnoj = 1;
    for (var i = Bits.length - 1; i > 0; i -= 1) {
        if (Bits[i] !== 0) {
            numb += mnoj * Bits[i];
        }
        mnoj *= 2;
    }
    return numb;
};

export const getBitArray = (n, i) => {
    var Ar = new Uint8Array(i);
    for (var index in Ar) {
        Ar[index] = index > 0 ? (n >> (index * 8)) & 0xff : n & 0xff;
    }
    return Ar;
};

export const concatTypedArrays = (a, b) => {
    var c = new Uint8Array.prototype.constructor(a.length + b.length);
    c.set(a, 0);
    c.set(b, a.length);
    return c;
};
