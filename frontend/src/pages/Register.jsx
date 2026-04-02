function Register(){

    

    return(
        <div>
           <h1> Register Page</h1>
           <form>
            <label htmlFor="username">Username: </label>
            <input id="username" name="username" type="text" required />

            <label htmlFor="email">Email: </label>
            <input id="email" name="email" type="email" required />

            <label htmlFor="password">Password: </label>
            <input id="password" name="password" type="password" required />

            <button>Register</button>
           </form>
        </div>
    )
}

export default Register;