# This is a simple example of a chainlit app.

from chainlit import AskUserMessage, Message, on_chat_start, on_window_message


@on_window_message
async def window_message(data):
    await Message(content=f"received data: {data}").send()


@on_chat_start
async def main():
    res = await AskUserMessage(content="What is your name?", timeout=30).send()
    if res:
        await Message(
            content=f"Your name is: {res['output']}.\nChainlit installation is working!\nYou can now start building your own chainlit apps!",
        ).send()
