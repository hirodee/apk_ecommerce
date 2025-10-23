import { Injectable } from '@angular/core';
import { Md5 } from 'ts-md5/dist/md5';
import CryptoJS from 'crypto-js';

@Injectable({
    providedIn: 'root'
})
export class Crypt {

	private aesKey = "rs57drsa5d4s8a7df5gf87s8fr57v6d7s5f68sd5f7ds5gf7asd5f76asd5f80asd9f7asdfbg67"; // STATIC

	private CryptoJSAesJson = {
    stringify: function (cipherParams) {
    	let ct = cipherParams.ciphertext.toString(CryptoJS.enc.Base64);
    	let iv = cipherParams.iv.toString();
    	let salt = cipherParams.salt.toString();
      return ct+';'+iv+';'+salt;
    },
    parse: function (data) {
      var j = data.split(';');
      var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j[0])});
      if (j[1]) cipherParams.iv = CryptoJS.enc.Hex.parse(j[1])
      if (j[2]) cipherParams.salt = CryptoJS.enc.Hex.parse(j[2])
      return cipherParams;
    }
	}

	constructor(
	) {
	}

	md5(value:string) {
    return Md5.hashStr(value);
	}

	sha1(value:string) {
    return CryptoJS.SHA1(value).toString();
	}

	pin(value:string) {
		return this.md5(this.sha1(value));
	}

	encrypt(value:string) {
    if (value!="" && value!=null) {
			let a = CryptoJS.AES.encrypt(value, this.aesKey, { format: this.CryptoJSAesJson });
			return a.toString();
		} else {
			return value;
		}
	}

	decrypt(value:string) {
		var a = CryptoJS.AES.decrypt(value, this.aesKey, { format: this.CryptoJSAesJson });
		var b = a.toString(CryptoJS.enc.Utf8);
		return b;
	}

}