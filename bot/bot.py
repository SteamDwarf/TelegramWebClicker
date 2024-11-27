from os import environ
from telebot import TeleBot, types

bot_token = environ['TOKEN']
game_url = environ['GAME_URL']
web_app_info = types.WebAppInfo(game_url)

bot = TeleBot(bot_token)

inline_keyboard = types.InlineKeyboardMarkup()

game_btn = types.InlineKeyboardButton(text='Start game', web_app=web_app_info)

inline_keyboard.add(game_btn)

@bot.message_handler(content_types=['text'])
def get_text_message(message):
    if message.text == '/start':
        bot.send_message(
            message.from_user.id, 
            'Это игра кликер, в которой тебе необходимо накапливать еду для жителей, а также другие ресурсы для улучшения деревни',
            reply_markup=inline_keyboard
        )

bot.polling(non_stop=True, interval=0)