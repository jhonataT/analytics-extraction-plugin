import { BrowserAnalyticsRepository } from "./browser-anaytics.repository";

describe('BrowserAnalyticsRepository', () => {
  let browserAnalyticsRepository: BrowserAnalyticsRepository;

  beforeEach(() => {
    jest.clearAllMocks();
    document.body.innerHTML = '<div id="root" class="theme-dark"></div>';
    browserAnalyticsRepository = BrowserAnalyticsRepository.init();
  });

  it('should create an instance using singleton pattern', () => {
    const instance1 = BrowserAnalyticsRepository.init();
    const instance2 = BrowserAnalyticsRepository.init();
    expect(instance1).toBe(instance2);
  });

  it('should detect device type correctly', () => {
    const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (Linux; Android 9; Pixel 3)');
    expect(browserAnalyticsRepository.getDevice()).toBe('Android');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X)');
    expect(browserAnalyticsRepository.getDevice()).toBe('iOS');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    expect(browserAnalyticsRepository.getDevice()).toBe('Desktop');
  });

  it('should detect OS correctly', () => {
    const userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (Linux; Android 9; Pixel 3)');
    expect(browserAnalyticsRepository.getOS()).toBe('Android');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');
    expect(browserAnalyticsRepository.getOS()).toBe('MacOS');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (X11; Linux x86_64)');
    expect(browserAnalyticsRepository.getOS()).toBe('Linux');

    userAgentGetter.mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');
    expect(browserAnalyticsRepository.getOS()).toBe('Windows');
  });

  it('should return the correct origin', () => {
    const origin = 'https://example.com';
    Object.defineProperty(window, 'location', {
      value: {
        origin: origin
      },
      writable: true
    });

    expect(browserAnalyticsRepository.getOrigin()).toBe(origin);
  });

  it('should count theme changes correctly', () => {
    document.body.innerHTML = '<div id="root" class="theme-dark"></div>';
    const targetNode = document.getElementById('root')!;
  
    targetNode.classList.add('theme-light');
    targetNode.classList.remove('theme-dark');
    targetNode.classList.add('theme-dark');
    targetNode.classList.remove('theme-light');
  
    setTimeout(() => {
      expect(browserAnalyticsRepository.getThemeChanges()).toBe(2);
    }, 100);
  });
  

  it('should handle missing root element for theme observation gracefully', () => {
    const warnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    
    document.body.innerHTML = '';
    
    browserAnalyticsRepository = BrowserAnalyticsRepository.init();

    setTimeout(() => {
      expect(warnSpy).toHaveBeenCalledWith('Root element not found for observing theme changes.');
      warnSpy.mockRestore();
    }, 100);
  });
});
