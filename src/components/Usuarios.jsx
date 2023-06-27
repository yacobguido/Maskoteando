import React, { useState, useEffect } from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const UsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const PasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const Login = () => {
    if (username === 'usuario' && password === 'contraseña') {
      setLoggedIn(true);
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  };

  const Logout = () => {
    setLoggedIn(false);
    setUsername('');
    setPassword('');
    setSearchTerm('');
  };

  const Search = (event) => {
    setSearchTerm(event.target.value);
  };

  const AddUser = async () => {
    const fullname = prompt('Ingresa el nombre del nuevo usuario');
    const avatar = prompt('Ingresa el avatar del nuevo usuario');
    const email = prompt('Ingresa el email del nuevo usuario');
  
    if (fullname , avatar , email) {
      const newUser = {
        fullname,
        avatar,
        email,
      };
  
      try {
        const response = await fetch('https://64947ee00da866a95367de73.mockapi.io/api/v1/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newUser),
        });
  
        if (response.ok) {
          const data = await response.json();
          setItems((prevItems) => [...prevItems, data]);
          alert('El usuario ha sido agregado correctamente.');
        } else {
          throw Error('Error al agregar el usuario');
        }
      } catch (error) {
        console.log('Error al agregar el usuario:', error);
        alert('Ocurrió un error al agregar el usuario. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };
  

  const EditUser = async (editedUser) => {
    const updatedFullname = prompt('Ingresa el nuevo nombre', editedUser.fullname);
    const updatedAvatar = prompt('Ingresa el nuevo avatar', editedUser.avatar);
    const updatedEmail = prompt('Ingresa el nuevo email', editedUser.email);
  
    if ( updatedFullname , updatedAvatar , updatedEmail) {
      const updatedUser = {
        ...editedUser,
        name: updatedFullname,
        avatar: updatedAvatar,
        email: updatedEmail,
      };
  
      try {
        await fetch(`https://64947ee00da866a95367de73.mockapi.io/api/v1/items/${editedUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedUser),
        });
  
        setItems((prevItems) => {
          const updatedItems = prevItems.map((item) => {
            if (item.id === editedUser.id) {
              return updatedUser;
            }
            return item;
          });
          return updatedItems;
        });
  
        alert('El usuario ha sido actualizado correctamente.');
      } catch (error) {
        console.log('Error al editar el usuario:', error);
        alert('Ocurrió un error al editar el usuario. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };
  

  const DeleteUser = async (userId) => {
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
  
    if (confirmDelete) {
      try {
        await fetch(`https://64947ee00da866a95367de73.mockapi.io/api/v1/items/${userId}`, {
          method: 'DELETE',
        });
  
        setItems((prevItems) => prevItems.filter((item) => item.id !== userId));
        alert('El usuario ha sido eliminado correctamente.');
      } catch (error) {
        console.log('Error al eliminar el usuario:', error);
        alert('Ocurrió un error al eliminar el usuario. Por favor, inténtalo de nuevo más tarde.');
      }
    }
  };
  

  useEffect(() => {
    if (isLoggedIn) {
      fetchItems();
    }
  }, [isLoggedIn]);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://64947ee00da866a95367de73.mockapi.io/api/v1/items');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log('Error fetching items:', error);
    }
  };

  return (
    <div>

      {!isLoggedIn ? (
        <>
          <h2>Página de logeo</h2>
          <input type="text" placeholder="Nombre de usuario" value={username} onChange={UsernameChange} />
          <input type="password" placeholder="Contraseña" value={password} onChange={PasswordChange} />
          <button onClick={Login}>Iniciar sesión</button>
        </>
      ) : (
        <>   
          <h3>Bienvenido {username}!!</h3>     
          <div>
            <input type="text" placeholder="Buscar usuario" value={searchTerm} onChange={Search} />
          </div>
          <button onClick={AddUser}>Agregar usuario</button>
          <h4>Usuarios:</h4>
          <div>
            <table>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
              {items.map((item) => (
                <tr key={item.id}>
                  <td th:ID>{item.id}</td>
                  <td th:Nombre>{item.fullname}</td>
                  <td th:Avatar><img src={item.avatar} alt="Avatar" /></td>
                  <td th:Email>{item.email}</td>
                  <td><button onClick={() => EditUser(item)}>Editar</button>
                  <button onClick={() => DeleteUser(item.id)}>Eliminar</button></td>
                </tr>
              ))}
            </table>          
          </div>                  
          <button onClick={Logout}>Cerrar sesión</button>
        </>
      )}
    </div>
  );
};

export default LoginPage;

          



