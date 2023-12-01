import { getClient } from "..";

export async  function updateTodoDone(todoId:number,userId:number)
{
    const client = await getClient()
    const updateTodoDoneQuery = `UPDATE todos SET done=$1 WHERE
    id=$2 AND user_id=$3 RETURNING *`
    let response = await client.query(updateTodoDoneQuery,[true,todoId,userId])
    console.log(response)
    if(response.rows.length >0)
    {
        return response.rows[0]
    }
    else
    {
        return -1
    }
} 
export async function updateTodo(userId:number,todoId:number,title?:string,description?:string)
{
    const client = await getClient()
    const updateTodoQuery = `UPDATE todos SET title=COALESCE($1,title),
    description = COALESCE($2,description)
    WHERE id=$3 AND user_id=$4 RETURNING *`
    let respone = await client.query(updateTodoQuery,[title,description,todoId,userId])
    if(respone.rows.length>0)
    {
        return respone.rows[0]
    }
    else
    {
        return -1
    }
}