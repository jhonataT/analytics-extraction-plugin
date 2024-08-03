export class BrowserAnalytics {
  getDevice(): string {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      return 'Android';
    } else if (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) {
      return 'iOS';
    } else {
      return 'Desktop';
    }
  }

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
  }

  getOrigin(): string {
    return window.location.hostname;
  }

  getThemeChanges(): number {
    return 0;
  }
}
