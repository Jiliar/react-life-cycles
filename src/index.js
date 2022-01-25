import React, {Component, useEffect} from "react";
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

//ANALOGIA ENTRE CICLO DE VIDA DE COMPONENTES FUNCIONALES Y DE CLASES

//Ciclo de vida en componentes funcionales
let Example = (props)=>{
  let [contador, setContador] = useEffect(0);
    useEffect(()=>{ //Su comportamientos es similar a componentDidUpdate
        console.log("I were mounted")
        return () =>{
          alert('Bye'); //Su comportamiento es similiar a componentWillUnmount
        }
    }, []) // si se coloca [] su comportamiento es similar a componentDidMount
    return(
      <>
          <p>Contador: {contador}</p>
          <button onClick={(ev)=>this.setContador(contador + 1)}>
            Suma!
          </button>
      </>
    );
}


//Los componentes de clases deben heredar React.Component 
class App extends Component{
  //Otro modo de definir Props pero la prioridad esta en el mismo elemento <App name={'Jiliar'}/>
  static defaultProps = {
    name: "Default Jiliar"
  }

  //Permite validar el tipo de valorq que se le puede asignar a un prop especifico se debe instalar prop-types en package.json
  //Validaciones especificas
  static propTypes = {
    name: PropTypes.string
  }

  //Desarrollo de constructor en Componentes de Clases de React
  constructor(props){
    super(props);
    this.state = {
      contador: 0
    }

    //2. Tambien se puede conservar el contexto usando...
    this.updateCounter = this.updateCounter.bind(this);
  }

  //1. La función si es creada normalmente sin => podria acontecer un problema de contexto y no se podra espeficicar la función.
  updateCounter = () =>{
    this.setState({contador: this.state.contador + 1})
  }

  //Lifecycles: un componente expone una serie de metodos para trabajar con ellos
  //componenteDidMount (Mounting): El codigo se ejecuta una vez que React actualice el DOM. (Produce efectos secundarios)
  //componentDidUpdate: El codigo se ejecuta despues de actualizar el DOM
  //componentWillUnmount: El codigo que se ejecuta despues de la etapa de desmontaje del componente del DOM
  componentDidMount(){
    console.log("I were created");
    /*let intervalo = setInterval(()=> this.setState({contador: this.contador + 1}), 10000)
    this.setState({
      interval: intervalo
    })*/
  }

  componentDidUpdate(prevProps, prevState){
    console.log(prevState, this.state)
    if(prevState.contador !== this.state.contador){
        this.setState({
          updatedAt: new Date()
        })
    }
    console.log("I were updated")
  }

  //Metodo llamado antes de que el DOM se actualice
  getSnapshotBeforeUpdate(){
    console.log("before kill")
  }

  //Antes de irse
  
  componentWillUnmount(){
    console.log("I were killed")
    /*let intervalo = setInterval(()=> this.setState({contador: this.contador + 1}), 10000)
    clearInterval(this.state.interval);*/
  }

  render(){
       console.log(this.props)
       //el simbolo <> sirve para agrupar elementos de un componente
       //Todas las modificaciones del State deben realizarce via al metodo setState
      return <>
                <p>Hello World!</p>
                <p>Contador: {this.state.contador}</p>
                <button onClick={(ev)=>this.setState({contador: this.state.contador + 1})}>
                  Click me!
                </button>
                <button onClick={(ev)=>this.setState(this.updateCounter())}>
                  Click me with Function!
                </button>
                <hr/>
              </>
  }
}



//name={'Jiliar'} Prioridad
ReactDOM.render(<App name={"Jiliar"}/>, document.getElementById("root"));


//Los valores con los que se trabajan en un componentes se deben estar actualizando, los valores no se deben estar modificando dentro de un componente, debe estar sucediendo por fuera. A menos que se emplee el uso de States.