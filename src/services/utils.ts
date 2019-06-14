/* tslint:disable:object-literal-shorthand prefer-const semicolon */
import {Injectable} from '@angular/core';
import {
    AlertController,
    LoadingController, ToastController,
    ActionSheetController
} from '@ionic/angular';

@Injectable()
export class Utils {


    constructor(private alrtCtrl: AlertController,
                private loadingCtrl: LoadingController,
                private toastCtrl: ToastController,
                private actionSheetCtrl: ActionSheetController) {
    }

    async presentAlert(header: string,
                       message: string,
                       buttons: (string)[],
                       subHeader?: string,
                       inputs?: [{}]) {

        let alrt = await this.alrtCtrl.create({
            header: header,
            subHeader: subHeader,
            message: message,
            buttons: buttons,
            inputs: inputs
        });
        alrt.present();

    }

    async presentToast(message: string, duration?: number,
                       position?: 'top' | 'bottom' | 'middle',
                       showCloseButton?: boolean,
                       closeButtonText?: string) {

        let toast = await this.toastCtrl.create({
            message: message,
            position: position,
            duration: duration,
            showCloseButton: showCloseButton,
            closeButtonText: closeButtonText
        });
        toast.present();
    }
}
