export function requestNotificationPermission(): Promise<NotificationPermission> {
    if (!("Notification" in window)) {
      console.warn("This browser does not support desktop notification");
      return Promise.resolve("denied"); // Or throw error
    }
  
    return Notification.requestPermission();
  }
  
  export function showNotification(title: string, options?: NotificationOptions) {
    if (Notification.permission === "granted") {
      new Notification(title, options);
    } else {
      console.warn("Notification permission not granted.");
    }
  }
