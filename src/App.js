import { useState, useEffect } from 'react';

import './admim.css';
import { auth, db } from "./firebaseConnection";
import { 
    addDoc,
    collection,
    onSnapshot,
    query,
    orderBy,
    where,
    getDocs,
    doc,
    deleteDoc,
    updateDoc
} from 'firebase/firestore';


function App(){

    const [tarefaInput, setTarefaInput] = useState('');
    const [user, setUser] = useState({})
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState('');

    useEffect(() => {
        async function loadTarefas(){
            const userDatail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDatail))

            const tarefaRef = collection(db, "tarefas")
            const q = query(tarefaRef, orderBy("created", "desc"))
            const unsub = onSnapshot(q, (snapshot) => {
                let lista = [];
                snapshot.forEach((doc) => {
                    lista.push({
                        id: doc.id,
                        nome: doc.data().nome, 
                    })
                })
               
                setTarefas(lista);
            })

        } 
        loadTarefas();
    }, [])



  async function handleRegister(e){
        e.preventDefault();
       if(tarefaInput === ''){
        alert("Digite sua tarefa")
        return;
       }

       if(edit?.id){
        handleUpdateTarefa();
        return;
       }

       await addDoc(collection(db, "tarefas"), {
        nome: tarefaInput,
        created: new Date(),
       
       })
       .then(() => {
  
         console.log("Tarefa resitrada")
    
        setTarefaInput(''); 
       })
       .catch(( error) => {
        console.log("ERROR AO REGISTRAR " + error)
       })
       
    }

    async function deleteTarefa(id){
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef);
    }

    function editTarefa(item){
        setTarefaInput(item.nome);
        setEdit(item);
    }

    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit?.id)
        await updateDoc(docRef, {
            nome: tarefaInput
        })
        .then(() => {
            console.log("Client Atualizado")
            setTarefaInput('')
            setEdit({})
        })
        .catch(() => {
            console.log("Erro ao editar");
            setTarefaInput('');
            setEdit({})
        })
    }
    return(
        <div className="adim-container">
           <h1 className='titulo'>Adicione um cliente</h1>

           <form className='form' onSubmit={handleRegister}>
            <textarea
            className='textarea'
            placeholder="Digite um cliente"
            value={tarefaInput}
            onChange={(e) => setTarefaInput(e.target.value)}
            />
             {Object.keys(edit).length > 0 ? (
                <button className='botao' style={{backgroundColor: '#5660E3'}} type="submit">Editar cliente</button>
             ) : (
                <button className='botao' type="submit">Registrar</button>
             )}
           </form>

         {tarefas.map((item) => (
            
         <article key={item.id} className='list'>
            <p>{item.nome}</p>   

          <div>
            <button onClick={ () => editTarefa(item)}>Editar</button>
            <button onClick={() => deleteTarefa(item.id) } className='btn-delete'>Excluir</button>    
         </div>  
        </article> 
        ))  }
           

        </div>
    );
}
 
export default App;