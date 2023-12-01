import { getClient } from "..";

export async function getUser(email:string)
{
    const client = await getClient()
    const emailCheckQuery =  `SELECT COUNT(*) FROM users WHERE email=$1`
    let response = await client.query(emailCheckQuery,[email])
    return response.rows[0].count>0
}
export async function userCheck(email:string,password:string)
{
    const client = await getClient()
    const userCheckQuery = `SELECT id FROM users WHERE email=$1 AND password=$2`
    let response = await client.query(userCheckQuery,[email,password])
    if (response.rows.length  > 0)
    {
        return response.rows[0].id
    }
    else
    {
        return -1
    } 
}
export async function getMe(userId:number)
{
    const client = await getClient()
    const getUserQuery = `SELECT email FROM users WHERE id=$1`
    let response =await client.query(getUserQuery,[userId])
    if(response.rows.length > 0)
    {
        return response.rows[0].email
    }
    else
    {
        return -1
    }
}
export async function getTodos(userId:number)
{
    const client = await getClient()
    const getTodoQuery = `SELECT * FROM todos WHERE user_id=$1`
    let response = await client.query(getTodoQuery,[userId])
    return response.rows
}