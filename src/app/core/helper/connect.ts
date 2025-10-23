import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Crypt } from './crypt';
import { StateService } from '../services/state.service';
import { Database } from './db';

@Injectable({
	providedIn: 'root'
})
export class Connect {
	// public server: string = "http://192.168.8.104/aipos_basic/";
	// public server: string = "https://develop.test/aipos_basic/";
	// private url: string = this.server + "api/v2/";
	// private url_access: string = this.url;
	private api: string = "7124b58v63b187634b5f1346v85456b3457re66745rewr64fwer64r";
	private strToken: string = "";
	private type: string = "get";
	private post: any = new FormData();
	public ajaxProcess = false;
	private ajax:any;
	private array_post: any = [];
	private defSetkey: string = '?key=' + this.api + this.strToken;
	private setkey: string = this.defSetkey;

	constructor(
		public http: HttpClient,
		private sanitizer: DomSanitizer,
		public crypt: Crypt,
		public database: Database,
		public state: StateService
	) { }

	changeURL(strUrl: string) {
		this.state.url_server = strUrl;
		this.setkey = this.defSetkey;
		this.options = {};
		for (var item in this.array_post) {
			this.post.delete(this.array_post[item]);
		}
	}

	defaultURL() {
		this.database.get('url_server', (res) => {
			this.state.url_server = res;
		});
		this.setkey = this.defSetkey;
		this.options = {};
		for (var item in this.array_post) {
			this.post.delete(this.array_post[item]);
		}
		this.post = new FormData();
	}

	nokey() {
		this.setkey = "";
	}

	generateURL(page: string) {
		return this.state.url_server + this.state.api_endpoint + page + this.setkey;
	}

	safe(url: string) {
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	tokenGET(str: string) {
		this.strToken = "&token=" + str;
		this.defSetkey = '?key=' + this.api + this.strToken;
		this.setkey = this.defSetkey;
	}

	tokenPOST(str: string) {
		this.add("token", str);
	}

	userID() {
		this.add("user_id", this.state.users.id_user);
		this.add("id_toko", this.state.users.id_toko);
	}

	add(key: string, value: string, type: boolean = false) {
		this.type = "post";
		if (type == true) {
			value = this.crypt.encrypt(value);
		}
		this.post.append(key, value);
		this.array_post.push(key);
	}

	addImage(key: string, blob: any, name: string) {
		this.type = "post";
		this.post.append(key, blob, name);
		this.array_post.push(key);
	}

	run(page:string, onsuccess:any, onerror:any) {
		if (this.type == "get") {
			this.httpGet(page, onsuccess, onerror);
		} else if (this.type == "post") {
			this.httpPost(page, onsuccess, onerror);
		} else {
			onsuccess({ status: "error" });
			onerror("error");
		}
	}


	observable(page: any) {
		let postData = this.post;
		setTimeout(() => {
			for (var item in this.array_post) {
				this.post.delete(this.array_post[item]);
			}
		}, 100);
		return this.http.post(this.generateURL(page), postData);
	}

	options: any = {};

	setHeaders() {
		this.options = {
			headers: {
				tokijokey: 'd2953806c7a41752d4d6adf5fc7f2c0a'
			}
		};
	}

	private async httpGet(page:any, onsuccess:any, onerror:any) {
		this.ajaxProcess = true;
		this.http.get(this.generateURL(page), this.options).subscribe((response: any) => {
			this.ajaxProcess = false;
			if (response._s == true) {
				let d = this.crypt.decrypt(response._d);
				onsuccess(JSON.parse(d));
				console.log(JSON.parse(d));
			} else {
				onsuccess(response);
				console.log(response);
			}
			this.defaultURL();
		}, err => {
			this.ajaxProcess = false;
			if (typeof (err.error._s) !== "undefined" && err.error._s == true) {
				let d = this.crypt.decrypt(err.error._d);
				onerror(JSON.parse(d));
				console.log(JSON.parse(d));
			} else {
				onerror(err.error);
				console.log(err);
			}
			this.defaultURL();
		});
	}

	private async httpPost(page:any, onsuccess:any, onerror:any) {
		this.ajaxProcess = true;
		this.http.post(this.generateURL(page), this.post, this.options).subscribe((response: any) => {
			this.ajaxProcess = false;
			if (response._s == true) {
				let d = this.crypt.decrypt(response._d);
				onsuccess(JSON.parse(d));
				console.log(JSON.parse(d));
			} else {
				onsuccess(response);
				console.log(response);
			}
			this.defaultURL();
			this.post = new FormData();
		}, err => {
			this.ajaxProcess = false;
			if (typeof (err.error._s) !== "undefined" && err.error._s == true) {
				let d = this.crypt.decrypt(err.error._d);
				onerror(JSON.parse(d));
				console.log(JSON.parse(d));
			} else {
				onerror(err.error);
				console.log(err);
			}
			this.defaultURL();
			this.post = new FormData();
		});
	}

	httpCancel() {
		if (this.ajaxProcess == true) {
			this.ajax.unsubscribe();
		}
	}

}