use super::schema::snippets;

#[derive(Queryable, PartialEq, Debug, serde::Serialize)]
pub struct Snippet {
    pub id: String,
    pub title: String,
    pub body: String,
}

#[derive(Insertable)]
#[table_name="snippets"]
pub struct NewSnippet<'a> {
    pub id: &'a str,
    pub title: &'a str,
    pub body: &'a str,
}