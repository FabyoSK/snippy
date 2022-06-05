#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[macro_use]
extern crate diesel;
extern crate dotenv;

use diesel::prelude::*;
use diesel::SqliteConnection;
use dotenv::dotenv;
use std::env;

use uuid::Uuid;

use self::models::*;

// fn create_snippet(title: String, body: String) {
//   let connection = establish_connection();
  
//   println!("I was invoked from JS!");
// }


#[path = "models.rs"] mod models;
#[path = "schema.rs"] mod schema;


fn establish_connection() -> SqliteConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    SqliteConnection::establish(&database_url)
        .unwrap_or_else(|_| panic!("Error connecting to {}", database_url))
}

#[tauri::command]
fn create_snippet(title: &str, body: &str) -> usize {
  use schema::{snippets};

  let conn = establish_connection();

  let new_snippet = NewSnippet {
      id: &Uuid::new_v4().to_string(),
      title: title,
      body: body
  };

  diesel::insert_into(snippets::table)
      .values(&new_snippet)
      .execute(&conn)
      .expect("Error saving new snippet")
}

#[tauri::command]
fn update_snippet(id: &str, updated_title: &str, updated_body: &str) {
  use crate::schema::snippets::dsl::{snippets, body};

  let conn = establish_connection();

  println!("update -> ");

  let _ = diesel::update(snippets.find(id))
    .set(body.eq(updated_body))
    .execute(&conn)
    .expect("Error while update");
  
  println!("update finish-> ");
}

#[tauri::command]
fn get_snippets() -> Result<Vec<Snippet>, String> {
  let conn = establish_connection();
  use crate::schema::snippets::dsl::*;

  let results = snippets
    .load::<Snippet>(&conn)
    .expect("Error loading posts");
  
    println!("Displaying {} posts", results.len());
    // for post in results {
    //     println!("{}", post.);
    //     println!("----------\n");
    // }
    Ok(results)
}

fn main() {
  tauri::Builder::default()
  .invoke_handler(
    tauri::generate_handler![
      create_snippet,
      get_snippets,
      update_snippet
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
