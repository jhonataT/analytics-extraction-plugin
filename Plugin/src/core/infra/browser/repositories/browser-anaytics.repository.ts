import { IBrowserAnalyticsRepository } from "./IGetBrowserAnalyticsRepository";

export class BrowserAnalyticsRepository implements IBrowserAnalyticsRepository {
  static instance: BrowserAnalyticsRepository;
  private themeChangeCount: number = 0;

  private constructor() {
    this.observeThemeChanges();
  };

  static init() {
    // Singleton Pattern
    if(!BrowserAnalyticsRepository.instance) {
      BrowserAnalyticsRepository.instance = new BrowserAnalyticsRepository();
    };

    return BrowserAnalyticsRepository.instance;
  };

  getDevice(): string {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return 'Android';
    } else if (/iPad|iPhone|iPod/.test(ua) && !('MSStream' in window)) {
      return 'iOS';
    } else {
      return 'Desktop';
    }
  };

  getOS(): string {
    const ua = navigator.userAgent;
    if (/windows/i.test(ua)) {
      return 'Windows';
    } else if (/mac/i.test(ua)) {
      return 'MacOS';
    } else if (/linux/i.test(ua)) {
      return 'Linux';
    } else if (/android/i.test(ua)) {
      return 'Android';
    } else if (/iOS/i.test(ua)) {
      return 'iOS';
    } else {
      return 'Unknown';
    }
  };

  getOrigin(): string {
    return window.location.origin;
  };

  getThemeChanges(): number {
    const result = Math.round(this.themeChangeCount / 2);

    return result >= 0 ? result : 0;
  };

  private observeThemeChanges(): void {
    const targetNode = document.getElementById('root');
    if (!targetNode) {
      console.warn('Root element not found for observing theme changes.');
      return;
    }

    const config = { attributes: true, attributeFilter: ['class'] };

    const callback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          this.themeChangeCount++;
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    console.log('MutationObserver started.');
  };
};
