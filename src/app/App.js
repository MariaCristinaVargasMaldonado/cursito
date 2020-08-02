import React, { Component } from 'react'

class App extends Component {

    constructor(){
        super()
        this.state = {
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.addTask = this.addTask.bind(this)
    }

    addTask(e){
        if(this.state._id){
            fetch(`/api/task/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                } 
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'Tarea actualizada'})
                this.setState({ title:'', description: '', _id: ''})
                this.fetchTasks()
            })
        }else{
            fetch('/api/task', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                }            
            })            
            .then(res => res.json())
            .then(data => {
                console.log(data)
                this.notify()
                M.toast({html: 'Tarea guardada'})
                this.setState({title: '', description : ''})
                this.fetchTasks()
            })
            .catch(err => console.error(err))
            
        }

        e.preventDefault()
    }

    componentDidMount(){
        this.fetchTasks()
    }

    fetchTasks(){
        fetch('/api/task')
            .then(res => res.json())
            .then(data => {
                this.setState({tasks: data})
                console.log(this.state.tasks)
            })
    }

    deleteTask(id){
        if(confirm('estas seguro de eliminar la tarea')){
            fetch(`/api/task/${id}`,{
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json', 
                    'Content-Type': 'application/json'
                } 
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: 'tarea eliminada'})
                this.fetchTasks()
            })
        }
    }

    editTask(id){
        fetch(`/api/task/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            this.setState({
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }

    handleChange(e){
        const { name, value } = e.target
        this.setState({
            [name]: value 
        })
    }
    /* Scripts de notificaciones  */
    
    notify(){
        const options = {
        body: 'Nueva tarea publicada',
        icon:'icono.png',
        data:'extra-data',
        tag: 'notificaion Demo'
        }
        const notification = new Notification('Cursito',options)
        notification.addEventListener('close',()=>console.log('CLOSE'))
        notification.addEventListener('show',()=>console.log('SHOWN'))
        /* console.log(notification.data) */
    }

    /* vista HTML */
    render() {
        return (
            <div>
                {/* cabecera */ }
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Cursito</a>
                    </div>
                </nav>

                <div className="container">
                    <div className="row">
                    {/* <button id="permissions">Permissions</button> */}
                        <div className="col s12">
                            <div className="card">
                                <div className="card-content">
                                    <form id="form" onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} type="text" value={this.state.title} placeholder="titulo de la tarea"></input>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} value={this.state.description} placeholder="descripcion de la tarea" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button id="permissions" className="btn btn-light darken-4" type="submit">Enviar</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s12">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo </th>
                                        <th>Descripcion</th>
                                        <th>Opciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(tasks => {
                                            return (
                                                <tr key= { tasks._id }>
                                                    <td>{ tasks.title }</td>
                                                    <td>{ tasks.description }</td>
                                                    <td>
                                                        <button className=" btn ligth-yellow" onClick={() => this.editTask(tasks._id)}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button  className=" btn ligth-red" onClick={() => this.deleteTask(tasks._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div id="tasks" className="container"></div>
            </div>
        )
    }
}

export default App