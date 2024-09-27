use std::fs;
use std::io::{BufReader, BufWriter};
use std::path::PathBuf;

#[derive(Debug, serde::Serialize, serde::Deserialize)]
enum Priority {
    Negligible,
    Low,
    Moderate,
    High,
    Critical,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
enum Status {
    Todo,
    Doing,
    Done,
}

#[derive(Debug, serde::Serialize, serde::Deserialize)]
struct Task {
    title: String,
    content: String,
    priority: Priority,
    status: Status,
}

fn get_save_path() -> PathBuf {
    if let Some(local_data_dir) = dirs_next::data_local_dir() {
        let path = local_data_dir.join("DenovoOpus").join("tasks.json");
        path
    } else {
        // TODO: Add default paths for Linux and MacOS too.
        #[cfg(target_os = "windows")]
        let path = PathBuf::from("C:/DenovoOpus/tasks.json");
        path
    }
}

#[tauri::command]
fn save_tasks(tasks: Vec<Task>) {
    // TODO: Create an error log file and write the errors in there.
    // Also inform the user where the log files have been placed.
    // We are panicking here for now.

    let save_file_path = get_save_path();
    let save_dir = save_file_path.parent().unwrap();
    fs::create_dir_all(save_dir).expect("Could not create save directory.");
    let file = fs::OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open(save_file_path.as_path())
        .expect("Could not create save file.");

    let writer = BufWriter::new(file);
    serde_json::to_writer_pretty(writer, &tasks).expect("Could not save tasks.");
}

#[tauri::command]
fn load_tasks() -> Vec<Task> {
    // TODO: Create an error log file and write the errors in there.
    // Also inform the user where the log files have been placed.
    // We are panicking here for now.

    let save_file_path = get_save_path();
    let file = fs::OpenOptions::new()
        .read(true)
        .open(save_file_path.as_path())
        .expect("Could not read save file.");

    let reader = BufReader::new(file);
    let tasks: Vec<Task> = serde_json::from_reader(reader).expect("Could not load tasks.");
    tasks
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![save_tasks, load_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
