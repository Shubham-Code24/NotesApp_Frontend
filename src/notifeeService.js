


// GoogleKeep/notifeeService.js

import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

class NotifeeService {
  /**
   * scheduleReminder(noteId, title, date)
   * - date: JavaScript Date object (future time)
   * - यह function Notifee के trigger notification को schedule करता है
   */
  async scheduleReminder(noteId, title, date) {
    // Permission request (for Android 13+ & iOS)
    const settings = await notifee.requestPermission();
    if (!settings) {
      console.log('Notification permission not granted');
      return;
    }

    // Create an Android channel (for Android)
    const channelId = await notifee.createChannel({
      id: 'reminder-channel',
      name: 'Reminder Channel',
      vibration: true,
    });

    // Create a timestamp trigger – scheduled for the provided date
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // time in ms
      alarmManager: true, // ensures exact timing on Android
    };

    // Schedule the local notification
    await notifee.createTriggerNotification(
      {
        title: 'Reminder',
        body: `Reminder for note: ${title}`,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      },
      trigger
    );

    console.log(`Scheduled reminder for noteId=${noteId} at ${date}`);
  }
}

export const notifeeService = new NotifeeService();
