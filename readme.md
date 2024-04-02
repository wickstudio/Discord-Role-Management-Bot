# Discord Role Management Bot

This Discord bot allows users to manage their roles through slash commands. Users can select roles from a list of options provided by the bot.

## Features

- Allows users to select roles from a list of options.
- Administrators can define the roles available for selection.
- Handles role assignment and removal based on user interaction.

## Setup

1. Clone this repository to your local machine.
2. Install dependencies using `npm install`.
3. Configure the bot by editing the `config.js` file.
4. Make sure to set up your Discord application and obtain the necessary credentials (token, client ID, guild ID).
5. Run the bot using `node index.js`.

## Usage

Once the bot is running and invited to your Discord server, users can interact with it using the `/role` command. Administrators can customize the roles available for selection by editing the `config.js` file.

### Commands

- `/role`: Displays a list of selectable roles for users.

## Configuration

You need to edit the `config.js` file to configure the bot. Here are the configuration options :

- `token` : Your Discord bot token.
- `clientId` : The client ID of your Discord application.
- `guildId` : The ID of the guild where the bot operates.
- `thumbnail` : URL of the thumbnail image to display in the role selection message.
- `image` : URL of the image to display in the role selection message.
- `footer` : URL of the footer icon to display in the role selection message.
- `roles` : Define the roles available for selection. Each role should have a label and value.

## Dependencies

- [discord.js](https://discord.js.org) - Discord API wrapper for Node.js.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or create a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

- Email : info@wickdev.xyz

- Website : https://wickdev.xyz

- Discord : https://discord.gg/wicks

- Youtube : https://www.youtube.com/@wick_studio

```
██╗    ██╗██╗ ██████╗██╗  ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
██║    ██║██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
██║ █╗ ██║██║██║     █████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
██║███╗██║██║██║     ██╔═██╗     ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
╚███╔███╔╝██║╚██████╗██║  ██╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
 ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 
Copyright (c) 2024 Wick Studio
```