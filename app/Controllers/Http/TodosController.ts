import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Todo from "App/Models/Todo";

export default class TodosController {
    public async index({request}:HttpContextContract){
        const page = request.input('page', 1)
        const limit = 1

        const todos = await Todo.query().paginate(page, limit)
        console.log(todos)

        return todos
    }

    public async store({request, response}: HttpContextContract){
        Todo.create({
            title:request.input('title'),
            is_completed:false
        })

        return response.status(201).json({'messaage': 'created'})
    }

    public async update({request, response, params}: HttpContextContract){
        const todo = await Todo.findOrFail(params.id)
        todo.title = request.input('title')
        todo.save()
        return response.status(200).json({'message':'todo updated', 'data': todo})
    }

    public async show({request, response, params}: HttpContextContract){
        const todo = await Todo.findOrFail(params.id)
        
        return response.status(200).json({'message':'todo detail', 'data': todo})
    }
}
