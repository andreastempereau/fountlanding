export type Platform = 'macOS' | 'Windows' | 'Linux' | 'Unknown';

export function getPlatform(): Platform {
  if (typeof window === 'undefined') {
    return 'Unknown';
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = window.navigator.platform?.toLowerCase() || '';

  // Check for macOS
  if (platform.includes('mac') || userAgent.includes('mac')) {
    return 'macOS';
  }

  // Check for Windows
  if (platform.includes('win') || userAgent.includes('win')) {
    return 'Windows';
  }

  // Check for Linux
  if (platform.includes('linux') || userAgent.includes('linux')) {
    return 'Linux';
  }

  return 'Unknown';
}

export function getPlatformDisplayName(platform: Platform): string {
  return platform === 'macOS' ? 'MacOS' : platform;
}
