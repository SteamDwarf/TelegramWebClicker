from os import environ
from telebot import TeleBot, types

bot_token = environ['TOKEN']
game_url = environ['GAME_URL']
payment_token = environ['PAYMENT_TOKEN']
shop_url = f"{game_url}shop"

game_app = types.WebAppInfo(game_url)
shop_app = types.WebAppInfo(shop_url)

bot = TeleBot(bot_token)

inline_keyboard = types.ReplyKeyboardMarkup()

pay_button = types.KeyboardButton(text='Buy coins')
game_btn = types.KeyboardButton(text='Start game', web_app=game_app)
shop_btn = types.KeyboardButton(text='Shop', web_app=shop_app)



coins_price = types.LabeledPrice(label='100 coins', amount=10000)


inline_keyboard.add(game_btn, shop_btn, pay_button)

@bot.message_handler(content_types=['text'])
def get_text_message(message):
    if message.text == '/start':
        bot.send_message(
            message.from_user.id, 
            'Это игра кликер, в которой тебе необходимо накапливать еду для жителей, а также другие ресурсы для улучшения деревни',
            reply_markup=inline_keyboard
        )

@bot.message_handler(content_types="web_app_data")
def get_message_from_app(message):
    if message.web_app_data.data == 'buy_coin_100':
        bot.send_invoice(
            message.from_user.id,
            title = 'Buy coins',
            description = 'Buy 100 coins per 100 RUB',
            invoice_payload='test-payment',
            provider_token=payment_token,
            currency='RUB',
            prices=[coins_price]
        )

    
        
@bot.callback_query_handler(func=lambda callback: callback.data)
def handle_callbacks(callback):
    if callback.data == 'coins':
        bot.send_invoice(
            callback.message.chat.id,
            title = 'Buy coins',
            description = 'Buy 100 coins per 100 RUB',
            invoice_payload='test-payment',
            provider_token=payment_token,
            currency='RUB',
            prices=[coins_price]
        )

@bot.pre_checkout_query_handler(lambda query: True)
def pre_checkout_query(query):
    bot.answer_pre_checkout_query(query.id, ok=True)


@bot.message_handler(content_types='successful_payment')
def handle_payment(message):
    bot.send_message(
        message.from_user.id, 
        'You succesfully bought coins',
    )

bot.polling(non_stop=True, interval=0)