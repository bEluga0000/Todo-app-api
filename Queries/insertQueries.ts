import { getClient } from "..";

export async function createUsers(email:string,password:string)
{
    const client = await getClient();
    const insertUserText = `INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id`
    const userValues = [email,password]
    let response = await client.query(insertUserText,userValues)
    console.log('User Created successfully')
    return response.rows[0].id
}
export async function createTodo(title:string,desc:string,userId:number)
{
    const client = await getClient()
    const insertTodoQuery = `INSERT INTO todos(title,description,user_id) VALUES($1,$2,$3) RETURNING id`
    let response = await client.query(insertTodoQuery,[title,desc,userId])
    if (response.rows.length > 0) {
        console.log(response.rows[0].id)
        return response.rows[0].id;
    } else {
        console.error('No rows returned from the query.');
        return -1; 
    }
}