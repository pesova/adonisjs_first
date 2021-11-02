import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Todo from "App/Models/Todo";

export default class TodosController {
    public async index(){
        return Todo.all()
    }

    public async store({request, response}: HttpContextContract){
        Todo.create({
            title:request.input('title'),
            is_completed:false
        })

        return response.send('created')
    }
}
