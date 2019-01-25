const crypto = require('crypto')
const fs = require('fs')

class Meta {
    constructor(sk, pk) {
        this.pk = pk
        this.sk = sk
    }

    addFile(filepath, filename, encrypt) {
        this.id = crypto.createHash('sha256').update(Buffer.concat([this.pk, Buffer.from(filename)])).digest()
        let file = fs.readFileSync(filepath)
        if (encrypt) {
            this.iv = crypto.randomBytes(16)
            var cipher = crypto.createCipheriv('aes-256-ctr', this.sk, this.iv);
            file = cipher.update(file);

        }
        this.file = file
        this.update(this.file)
    }

    update(file) {
        this.current = crypto.createHash('sha256').update(file)
    }

    getFile() {
        if(this.iv) {
            let decipher = crypto.createDecipheriv('aes-256-ctr', this.sk, this.iv)
            return decipher.update(this.file)
        }
        return this.file
    }

    sign(signer) {
        this.signature = signer(this.id)
    }
}

module.exports = Meta