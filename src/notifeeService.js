


// // // GoogleKeep/notifeeService.js

// // import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

// // class NotifeeService {
// //   /**
// //    * scheduleReminder(noteId, title, date)
// //    * - date: JavaScript Date object (future time)
// //    * - यह function Notifee के trigger notification को schedule करता है
// //    */
// //   async scheduleReminder(noteId, title, date) {
// //     // Permission request (for Android 13+ & iOS)
// //     const settings = await notifee.requestPermission();
// //     if (!settings) {
// //       console.log('Notification permission not granted');
// //       return;
// //     }

// //     // Create an Android channel (for Android)
// //     const channelId = await notifee.createChannel({
// //       id: 'reminder-channel',
// //       name: 'Reminder Channel',
// //       vibration: true,
// //     });

// //     // Create a timestamp trigger – scheduled for the provided date
// //     const trigger = {
// //       type: TriggerType.TIMESTAMP,
// //       timestamp: date.getTime(), // time in ms
// //       alarmManager: true, // ensures exact timing on Android
// //     };

// //     // Schedule the local notification
// //     await notifee.createTriggerNotification(
// //       {
// //         title: 'Reminder',
// //         body: `Reminder for note: ${title}`,
// //         android: {
// //           channelId,
// //           pressAction: {
// //             id: 'default',
// //           },
// //         },
// //       },
// //       trigger
// //     );

// //     console.log(`Scheduled reminder for noteId=${noteId} at ${date}`);
// //   }
// // }

// // export const notifeeService = new NotifeeService();









// // notifeeService.js
// import notifee, { TimestampTrigger, TriggerType } from '@notifee/react-native';

// class NotifeeService {
//   async scheduleReminder(noteId, title, date) {
//     // Request permission
//     await notifee.requestPermission();

//     // Create an Android channel
//     const channelId = await notifee.createChannel({
//       id: 'reminder-channel',
//       name: 'Reminder Channel',
//     });

//     // Create a timestamp trigger
//     const trigger = {
//       type: TriggerType.TIMESTAMP,
//       timestamp: date.getTime(), // ms
//       alarmManager: true,
//     };

//     await notifee.createTriggerNotification(
//       {
//         title: title || 'Keep notes',
//         body: 'You have a reminder for this note',
//         android: {
//           channelId,
//           pressAction: { id: 'default' },
//         },
//       },
//       trigger
//     );

//     console.log(`Reminder scheduled for noteId=${noteId} at ${date}`);
//   }
// }

// export const notifeeService = new NotifeeService();






















// notifeeService.js
import notifee from '@notifee/react-native';

class NotifeeService {
  async requestPermissionAndChannel() {
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });
    return channelId;
  }

  async displayNotification(title, description) {
    const channelId = await this.requestPermissionAndChannel();
    await notifee.displayNotification({
      title: title || 'Reminder',
      body: description || 'Yeh aapka set kiya hua reminder hai.',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }

  async scheduleReminder(noteId, title, description, date) {
    const now = new Date().getTime();
    const triggerTime = date.getTime();
  //  const delay = triggerTime - now;
  const delay = triggerTime - now - 15000;   // my change

    if (delay <= 0) {
      console.log('Please select a future time.');
      return;
    }

    console.log(`Notification scheduled in ${Math.round(delay / 1000)} seconds for noteId=${noteId}`);

    // Using setTimeout as in dummy code (works when app is in foreground)
    setTimeout(() => {
      this.displayNotification(title, description);
    }, delay);
  }
}

export const notifeeService = new NotifeeService();




















// // notifeeService.js
// import notifee from '@notifee/react-native';

// class NotifeeService {
//   async requestPermissionAndChannel() {
//     await notifee.requestPermission();
//     const channelId = await notifee.createChannel({
//       id: 'default',
//       name: 'Default Channel',
//     });
//     return channelId;
//   }

//   // displayNotification now accepts title and description from the note
//   async displayNotification(title, description) {
//     const channelId = await this.requestPermissionAndChannel();
//     await notifee.displayNotification({
//       title: title || 'Reminder',
//       body: description || 'Yeh aapka set kiya hua reminder hai.',
//       android: {
//         channelId,
//         pressAction: { id: 'default' },
//       },
//     });
//   }

//   // scheduleReminder now accepts description also
//   async scheduleReminder(noteId, title, description, date) {
//     const now = new Date().getTime();
//     const triggerTime = date.getTime();
//     const delay = triggerTime - now;

//     if (delay <= 0) {
//       console.log('Please select a future time.');
//       return;
//     }

//     console.log(`Notification scheduled in ${Math.round(delay / 1000)} seconds for noteId=${noteId}`);

//     // Using setTimeout as in dummy code (works in foreground)
//     setTimeout(() => {
//       this.displayNotification(title, description);
//     }, delay);
//   }
// }

// export const notifeeService = new NotifeeService();
