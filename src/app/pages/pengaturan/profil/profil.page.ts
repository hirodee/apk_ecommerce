import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { Connect } from 'src/app/core/helper/connect';
import { Camera, PictureSourceType, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Storage } from '@ionic/storage';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, Platform } from '@ionic/angular';
import { Pipe } from 'src/app/core/helper/pipe';
import { StateService } from 'src/app/core/services/state.service';
import { Database } from 'src/app/core/helper/db';

const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})

export class ProfilPage implements OnInit {
  images: any = {};
  dataDetail: any;
  constructor(
    public pipe: Pipe,
    public con: Connect,
    public route: ActivatedRoute,
    private camera: Camera,
    private file: File,
    private webview: WebView,
    private actionSheetController: ActionSheetController,
    private storage: Storage,
    private plt: Platform,
    private ref: ChangeDetectorRef,
    private filePath: FilePath,
    private state: StateService,
    private zone: NgZone,
    private db: Database
  ) { }

  ngOnInit() {
    this.images.path = this.state.users.url_foto;
  }

  pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      let converted = this.webview.convertFileSrc(img);
      return converted;
    }
  }

  async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: 'Use Camera',
        handler: () => {
          this.takePicture(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }

  takePicture(sourceType: PictureSourceType) {
    var options: CameraOptions = {
      quality: 20,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
      }
    });

  }

  createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
      this.updateStoredImages(newFileName);
    }, error => {
      // this.presentToast('Error while storing file.');
      this.pipe.alert('Error', 'Gagal menyimpan gambar');
    });
  }

  updateStoredImages(name) {
    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);

      let newImages = [name];
      this.storage.set(STORAGE_KEY, JSON.stringify(newImages));

      let filePath = this.file.dataDirectory + name;
      let resPath = this.pathForImage(filePath);

      let newEntry = {
        name: name,
        path: resPath,
        filePath: filePath
      };

      this.images = newEntry;
      this.ref.detectChanges(); // trigger change detection cycle
    });
  }

  deleteImage(imgEntry, position) {
    this.images.splice(position, 1);

    this.storage.get(STORAGE_KEY).then(images => {
      let arr = JSON.parse(images);
      let filtered = arr.filter(name => name != imgEntry.name);
      this.storage.set(STORAGE_KEY, JSON.stringify(filtered));

      var correctPath = imgEntry.filePath.substr(0, imgEntry.filePath.lastIndexOf('/') + 1);

      this.file.removeFile(correctPath, imgEntry.name).then(res => {
        this.pipe.alert('Pesan', 'File dihapus');
      });
    });
  }

  confirmAction() {
    this.file.resolveLocalFilesystemUrl(this.images.filePath)
      .then(entry => {
        (<FileEntry>entry).file(file => this.readFile(file))
      })
      .catch(err => {
        // this.presentToast('Error while reading file.');
        this.pipe.alert('Pesan', 'Gagal Mengambil gambar');
      });
  }

  readFile(file: any) {
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      this.uploadImageData(imgBlob, file.name);
    };
    reader.readAsArrayBuffer(file);
  }

  async uploadImageData(imgBlob, name) {
    this.pipe.loadingStart();
    this.con.userID();
    this.con.addImage('file', imgBlob, name);
    this.con.run("users/update_profile", (res) => {
      let foto = res;
      this.zone.run(() => {
        this.db.get('user', (users) => {
          let user = users;
          user.url_foto = foto.data;
          this.db.set('user', user);
        });
        this.state.users.url_foto = res.data;
      });
      this.pipe.loadingEnd();
      this.pipe.next('home');
    }, (err) => {
      console.log(err);
      this.pipe.loadingEnd();
    });
  }

}
