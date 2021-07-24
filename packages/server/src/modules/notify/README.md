# Setup guide

## Telegram

1. Create channel (first create a public channel, then change change to private later)
2. Add [BTS bot](https://t.me/bts_bug_notify_bot) to administrator of your channel [guide](https://stackoverflow.com/questions/33126743/how-do-i-add-my-bot-to-a-channel)
3. Obtain channel ID [guide](https://stackoverflow.com/questions/33858927/how-to-obtain-the-chat-id-of-a-private-telegram-channel)
4. Set telegram ID to project `@Patch(':projectId/telegram')`
5. Unset telegram ID `@Delete(':projectId/telegram')`