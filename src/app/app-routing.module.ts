import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService as AuthGuard } from './core/services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canLoad: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'laporan/aktivitas',
    loadChildren: () =>
      import('./pages/report/aktivitas/aktivitas.module').then(
        (m) => m.AktivitasPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'laporan/order',
    loadChildren: () =>
      import('./pages/report/order/order.module').then(
        (m) => m.OrderPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'laporan/order/:id',
    loadChildren: () =>
      import('./pages/report/order/order.module').then(
        (m) => m.OrderPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'laporan/stok',
    loadChildren: () =>
      import('./pages/report/stok/stok.module').then((m) => m.StokPageModule),
  },
  {
    path: 'laporan/stok/:state',
    loadChildren: () =>
      import('./pages/report/stok/stok.module').then((m) => m.StokPageModule),
  },
  {
    path: 'riwayat/order',
    loadChildren: () =>
      import('./pages/history/order/order.module').then(
        (m) => m.OrderPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'riwayat/order/:data',
    loadChildren: () =>
      import('./pages/history/order/order.module').then(
        (m) => m.OrderPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'riwayat/aktivitas',
    loadChildren: () =>
      import('./pages/history/aktivitas/aktivitas.module').then(
        (m) => m.AktivitasPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'aktivitas-detail',
    loadChildren: () =>
      import(
        './pages/history/aktivitas/aktivitas-detail/aktivitas-detail.module'
      ).then((m) => m.AktivitasDetailPageModule),
  },
  {
    path: 'aktivitas-detail/:data',
    loadChildren: () =>
      import(
        './pages/history/aktivitas/aktivitas-detail/aktivitas-detail.module'
      ).then((m) => m.AktivitasDetailPageModule),
  },
  {
    path: 'pengaturan',
    loadChildren: () =>
      import('./pages/pengaturan/pengaturan.module').then(
        (m) => m.PengaturanPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'pengaturan/profile',
    loadChildren: () =>
      import('./pages/pengaturan/profil/profil.module').then(
        (m) => m.ProfilPageModule
      ),
    canLoad: [AuthGuard],
  },
  {
    path: 'pengaturan/password',
    loadChildren: () =>
      import('./pages/pengaturan/password/password.module').then(
        (m) => m.PasswordPageModule
      ),
  },
  {
    path: 'hall',
    loadChildren: () =>
      import('./pages/hall/hall.module').then((m) => m.HallPageModule),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./pages/member/member.module').then((m) => m.MemberPageModule),
  },
  {
    path: 'piutang',
    loadChildren: () =>
      import('./pages/piutang/piutang.module').then((m) => m.PiutangPageModule),
  },
  {
    path: 'produk',
    loadChildren: () =>
      import('./pages/produk/produk.module').then((m) => m.ProdukPageModule),
  },
  {
    path: 'produk-detail',
    loadChildren: () =>
      import('./pages/produk/produk-detail/produk-detail.module').then(
        (m) => m.ProdukDetailPageModule
      ),
  },
  {
    path: 'laporan/penjualan',
    loadChildren: () =>
      import('./pages/report/penjualan/penjualan.module').then(
        (m) => m.PenjualanPageModule
      ),
  },
  {
    path: 'order-detail',
    loadChildren: () =>
      import('./pages/history/order/order-detail/order-detail.module').then(
        (m) => m.OrderDetailPageModule
      ),
  },
  {
    path: 'order-detail/:id',
    loadChildren: () =>
      import('./pages/history/order/order-detail/order-detail.module').then(
        (m) => m.OrderDetailPageModule
      ),
  },
  {
    path: 'retur',
    loadChildren: () =>
      import('./pages/retur/retur.module').then((m) => m.ReturPageModule),
  },
  {
    path: 'list-retur',
    loadChildren: () =>
      import('./pages/retur/list-retur/list-retur.module').then(
        (m) => m.ListReturPageModule
      ),
  },
  {
    path: 'detail-retur',
    loadChildren: () =>
      import('./pages/retur/detail-retur/detail-retur.module').then(
        (m) => m.DetailReturPageModule
      ),
  },
  {
    path: 'setting',
    loadChildren: () =>
      import('./pages/setting/setting.module').then((m) => m.SettingPageModule),
  },
  {
    path: 'detail-member',
    loadChildren: () =>
      import('./pages/member/detail-member/detail-member.module').then(
        (m) => m.DetailMemberPageModule
      ),
  },
  {
    path: 'print',
    loadChildren: () =>
      import('./pages/print/print.module').then((m) => m.PrintPageModule),
  },
  {
    path: 'laporan-kasir',
    loadChildren: () =>
      import('./pages/laporan-kasir/laporan-kasir.module').then(
        (m) => m.LaporanKasirPageModule
      ),
  },
  {
    path: 'menu',
    loadChildren: () =>
      import('./pages/menu/menu.module').then((m) => m.MenuPageModule),
  },
  {
    path: 'detail-piutang',
    loadChildren: () =>
      import('./pages/piutang/detail-piutang/detail-piutang.module').then(
        (m) => m.DetailPiutangPageModule
      ),
  },
  {
    path: 'kategori-produk',
    loadChildren: () =>
      import('./pages/kategori-produk/kategori-produk.module').then(
        (m) => m.KategoriProdukPageModule
      ),
  },
  {
    path: 'detail-kategori-produk',
    loadChildren: () =>
      import(
        './pages/kategori-produk/detail-kategori-produk/detail-kategori-produk.module'
      ).then((m) => m.DetailKategoriProdukPageModule),
  },
  {
    path: 'form-kategori-produk',
    loadChildren: () =>
      import(
        './pages/kategori-produk/form-kategori-produk/form-kategori-produk.module'
      ).then((m) => m.FormKategoriProdukPageModule),
  },
  {
    path: 'satuan-produk',
    loadChildren: () =>
      import('./pages/satuan-produk/satuan-produk.module').then(
        (m) => m.SatuanProdukPageModule
      ),
  },
  {
    path: 'detail-satuan-produk',
    loadChildren: () =>
      import(
        './pages/satuan-produk/detail-satuan-produk/detail-satuan-produk.module'
      ).then((m) => m.DetailSatuanProdukPageModule),
  },
  {
    path: 'form-satuan-produk',
    loadChildren: () =>
      import(
        './pages/satuan-produk/form-satuan-produk/form-satuan-produk.module'
      ).then((m) => m.FormSatuanProdukPageModule),
  },
  {
    path: 'laporan-penjualan',
    loadChildren: () =>
      import('./pages/laporan-penjualan/laporan-penjualan.module').then(
        (m) => m.LaporanPenjualanPageModule
      ),
  },
  {
    path: 'form-member',
    loadChildren: () =>
      import('./pages/member/form-member/form-member.module').then(
        (m) => m.FormMemberPageModule
      ),
  },
  {
    path: 'form-produk',
    loadChildren: () =>
      import('./pages/produk/form-produk/form-produk.module').then(
        (m) => m.FormProdukPageModule
      ),
  },
  {
    path: 'form-stok',
    loadChildren: () =>
      import('./pages/report/stok/form-stok/form-stok.module').then(
        (m) => m.FormStokPageModule
      ),
  },
  {
    path: 'server-setting',
    loadChildren: () =>
      import('./pages/server-setting/server-setting.module').then(
        (m) => m.ServerSettingPageModule
      ),
  },
  {
    path: 'form-piutang',
    loadChildren: () =>
      import('./pages/piutang/form-piutang/form-piutang.module').then(
        (m) => m.FormPiutangPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
