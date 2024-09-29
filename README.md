# DenovoOpus

DenovoOpus is a personal task management application that helps you organize and manage your tasks efficiently. The app allows you to create, edit, delete, and prioritize tasks while tracking their status across different categories: To-Do, Doing, and Done.

## Features

- Add new tasks with customizable title, content, priority, and status.
- Edit or remove tasks based on your workflow needs.
- Move tasks between "To Do", "Doing", and "Done" sections.
- Set priority levels for tasks: Negligible, Low, Moderate, High, and Critical.

## Installation

### Using the Installer (Windows)

1. Download the latest `.msi` or `.exe` setup file from the [releases](https://github.com/BekirKagan/denovo-opus-desktop/releases) page.
2. Run the installer and follow the installation steps.
3. Once installed, launch the application using the generated `.exe` file.

### Building from Source

To build the app from the source code, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/BekirKagan/denovo-opus-desktop.git
    cd denovo-opus-desktop
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Ensure that [Rust](https://www.rust-lang.org/tools/install) and [Tauri prerequisites](https://tauri.app/v1/guides/getting-started/prerequisites) are installed.

4. Build the application:
    ```bash
    npm run tauri build
    ```

5. Run the application in development mode:
    ```bash
    npm run tauri dev
    ```

> **Note:** The application has only been tested on Windows so far.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
