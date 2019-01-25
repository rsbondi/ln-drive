const assert = require('assert');
const Meta = require('../src/meta')
const path = require('path')
const bitcoin = require('bitcoinjs-lib')
const keyPair = bitcoin.ECPair.fromWIF('KwDiBf89QgGbjEhKnhXJuH7LrciVrZi3qYjgd9M7rFU73sVHnoWn')

const filepath = path.resolve('./test/data/file1.txt')
const imgpath = path.resolve('./test/data/basn0g01.png')

describe('Test meta', function () {
    it('should create meta data', function () {
        let meta = new Meta(keyPair.privateKey, keyPair.publicKey)
        meta.addFile(filepath, "myfile", true)
        assert.strictEqual(meta.id.toString('hex'), "bb63e43c4a861ddaac3d3b726fe3650478d0cfc14f52ccd6e5f0315462f02530")
        assert.strictEqual(meta.getFile().toString(), "A file with dummy content for testing")
    })

    it('should create unencrypted meta data', function () {
        let meta = new Meta(keyPair.privateKey, keyPair.publicKey)
        meta.addFile(filepath, "myfile")
        assert.strictEqual(meta.getFile().toString(), "A file with dummy content for testing")
    })

    it('should create meta data for binary file', function () {
        let meta = new Meta(keyPair.privateKey, keyPair.publicKey)
        meta.addFile(imgpath, "myimg", true)
        assert.strictEqual(meta.id.toString('hex'), "8988abb38f818504d2e2076d04818fea874a47e5b7756b39f5c2c9acbbd2bd63")
        assert.strictEqual(meta.getFile().toString('base64'), "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgAQAAAABbAUdZAAAABGdBTUEAAYagMeiWXwAAAFtJREFUeJwtzLEJAzAMBdHr0gSySiALejRvkBU8gsGNCmFFB1Hx4IovqurSpIRszqklUwbnUzRXEuIRsiG/SyY9G0JzJSVei9qynm9qyjBpLp0pYW7pbzBl8L8fEIdJL9AvFMkAAAAASUVORK5CYII=")
    })

    const sigfun = (h) => keyPair.sign(h)

    it('should properly sign meta id', function () {
        let meta = new Meta(keyPair.privateKey, keyPair.publicKey)
        meta.addFile(filepath, "myfile", true)
        meta.sign(sigfun)
        verifyKey = bitcoin.ECPair.fromPublicKey(keyPair.publicKey)
        const ok = verifyKey.verify(meta.id, Buffer.from(meta.signature))
        assert.ok(ok)
    })

})

