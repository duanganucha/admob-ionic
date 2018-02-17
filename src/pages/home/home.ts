import { Component } from '@angular/core';

import { NavController, Platform, ToastController } from 'ionic-angular';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  admobId: any;
  id: string;
  platformCheck: any;

  constructor(
    private navController: NavController,
    private toastCtrl: ToastController,
    private adMobFree: AdMobFree,
    private platForm: Platform
  ) {
    if (this.platForm.is('ios')) {
      this.id = 'ca-app-pub-9309829064818731/6285912184'
    } else if (this.platForm.is('android')) {
      this.id = 'ca-app-pub-9309829064818731/4815195643'
    }
    this.platformCheck = this.platForm._platforms;
  }


  createBanner() {
    // this.createToast('createBanner');
    if (this.platForm.is("android")) {
      const bannerConfig: AdMobFreeBannerConfig = {
        
        id: this.id,
        isTesting: true,
        autoShow: true
      };
      this.adMobFree.banner.config(bannerConfig);
      
      this.adMobFree.banner.prepare()
      .then(() => {
        this.adMobFree.banner.show();
        this.createToastPlatform(this.platformCheck);

        })
        .catch(e => console.log(e));
    }
  }

  showInterstitial() {
    this.adMobFree.interstitial.config({
      id: this.id,
      autoShow: true
    });
    this.adMobFree.interstitial.prepare()
    .then(() => {
      this.adMobFree.interstitial.show();
      this.createToast('showInterstitial');
      })
      .catch(e => console.log(e));
  }

  showVideoRewardAd() {
    this.adMobFree.rewardVideo.config({
      id: this.id,
      autoShow: true
    });
    this.adMobFree.rewardVideo.prepare()
      .then(() => {
        this.adMobFree.rewardVideo.show();
        this.createToast('showVideoRewardAd');
      })
      .catch(e => console.log(e));

  }

  createToast(string) {
    let toast = this.toastCtrl.create({
      message: 'Creating your ad ' + string,
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }
  createToastPlatform(platform) {
    let toast = this.toastCtrl.create({
      message: 'Platform your :' + platform,
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

  removeBanner() {
    this.createToast('removeBanner');
    this.adMobFree.banner.hide();
  }
}
