import { getClient } from "..";
export async function deleteTodo(todoId:number,userId:number)
{
    console.log('hi i ma in qury')
    const client = await getClient()
    const deleteTodoQuery = `DELETE FROM todos WHERE id=$1 AND user_id=$2`
    let response = await client.query(deleteTodoQuery,[todoId,userId])
    console.log(response.rowCount)
    if (response.rowCount !== null) {
        if (response.rowCount > 0) {
            return 1
        } else {
            return -1
        }
    } else {
        return 0
    }
}