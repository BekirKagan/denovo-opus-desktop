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

#[tauri::command]
fn save_tasks(tasks: Vec<Task>) {
    for task in tasks {
        println!("{:?}", task);
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .invoke_handler(tauri::generate_handler![save_tasks])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
