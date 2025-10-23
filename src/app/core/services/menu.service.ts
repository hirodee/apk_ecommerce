import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  menu: any = [
    {
      "id": 1,
      "name": "Penjualan",
      "img": "/assets/svg/penjualan.svg",
      "path": "/laporan/order"
    },
    {
      "id": 2,
      "name": "Pelanggan",
      "img": "/assets/svg/member.svg",
      "path": "/member"
    },
    {
      "id": 3,
      "name": "Piutang",
      "img": "/assets/svg/piutang.svg",
      "path": "/piutang"
    },
    {
      "id": 4,
      "name": "Produk",
      "img": "/assets/svg/produk.svg",
      "path": "/produk"
    },
    {
      "id": 5,
      "name": "Pengaturan",
      "img": "/assets/svg/pengaturan.svg",
      "path": "/setting"
    },
    {
      "id": 6,
      "name": "Riwayat Penjualan",
      "img": "/assets/svg/laporan.svg",
      "path": "/riwayat/order"
    },
    {
      "id": 7,
      "name": "Stok Produk",
      "img": "/assets/svg/stok.svg",
      "path": "/laporan/stok"
    },
    {
      "id": 8,
      "name": "Laporan Penjualan",
      "img": "/assets/svg/chart.svg",
      "path": "/laporan-penjualan"
    },
    {
      "id": 9,
      "name": "Retur Penjualan",
      "img": "/assets/svg/retur.svg",
      "path": "/list-retur"
    },
    {
      "id": 10,
      "name": "Lainya",
      "img": "/assets/svg/lainya.svg",
      "path": "/menu"
    },
    {
      "id": 11,
      "name": "",
      "img": "/assets/svg/lainya.svg",
      "path": ""
    },
  ];


  constructor() { }

  switchMenuByRole(level: string | number) {
    level = level.toString();
    switch (level) {
      case "1":
        return this.filterMenuByRole([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
      case "2":
        return this.filterMenuByRole([1, 6, 7, 8]); // , 11
      default:
        return this.filterMenuByRole([1, 6, 7, 8]); // , 11
    }
  }

  filterMenuByRole(level) {
    let menu: any = [];
    for (let i in level) {
      let find = this.menu.filter((e) => e.id == level[i]);
      if (find.length > 0) {
        menu.push(find[0]);
      }
    }

    var perChunk = 10 // items per chunk    

    var result = menu.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / perChunk)
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [] // start a new chunk
      }
      resultArray[chunkIndex].push(item)
      return resultArray
    }, []);

    return result;
  }

}
