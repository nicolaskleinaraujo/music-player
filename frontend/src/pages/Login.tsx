const Login = () => {
    return (
        <div className="flex flex-col h-screen items-center justify-center text-white">
            <label className="mb-5">
                <p>Usuario: </p>
                <input type="text" className="border-2 border-black rounded-md indent-1 mt-2"   />
            </label>
            <label>
                <p>Senha: </p>
                <input type="password" className="border-2 border-black rounded-md indent-1 mt-2" />
            </label>

            <button className="mt-5 border-2 border-white rounded-md p-1 hover:bg-white hover:text-black">Logar</button>
        </div>
    )
}

export default Login
