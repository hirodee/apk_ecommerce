import { Injectable, Inject } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
	providedIn: 'root'
})
export class Database {

	constructor(
		private storage: Storage
	) {
	}

	close() {
		this.storage.clear();
	}

	get(key: string, res) {
		return this.storage.get(key).then(res);
	}

	getCommon(key: string) {
		return this.storage.get(key);
	}

	set(key: string, value: any) {
		this.storage.set(key, value);
	}

	remove(key: string) {
		this.storage.remove(key);
	}

}