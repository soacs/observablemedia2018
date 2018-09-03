import { Component, OnInit, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import {MediaChange, ObservableMedia} from '@angular/flex-layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ObservableMedia Demo';
  content: string;
  invisible = false;
  watcher: Subscription;
  activeMediaQuery = '';

  constructor(public media: ObservableMedia) {
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : '';
      if ( change.mqAlias === 'xs') {
        this.loadMobileContent();
      } else if ( change.mqAlias === 'lg') {
        this.invisible = true;
        this.loadDesktopContent();
      } else if ( change.mqAlias === 'sm') {
        this.loadSmallContent();
      } else if ( change.mqAlias === 'md') {
        this.loadMediumContent();
      }
    });
  }

  ngOnInit() {
  }

  isMobile() {
    return false;
  }

  invisibleOnDesktop() {
    return this.invisible;
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

  loadMobileContent() {
    console.log('loading mobile content');
    this.content = 'MOBILE CONTENT';
  }

  loadDesktopContent() {
    console.log('loading desktop content');
    this.content = 'DESKTOP CONTENT';
    return this.invisible;
  }

  loadMediumContent() {
    console.log('loading medium content');
    this.content = 'MEDIUM CONTENT';
  }

  loadSmallContent() {
    console.log('loading small content');
    this.content = 'SMALL CONTENT';
  }


}

