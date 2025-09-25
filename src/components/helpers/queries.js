const userAdmin = {
    email: 'admin@chocodevs.com',
    password: '123Aa123'
}

export const  login = (usuario) =>{
    if(usuario.email === userAdmin.email && usuario.password === userAdmin.password){
        sessionStorage.setItem('usuarioChocodevs', JSON.stringify(userAdmin.email))
        return true
    } else{
        return false
    }
}
