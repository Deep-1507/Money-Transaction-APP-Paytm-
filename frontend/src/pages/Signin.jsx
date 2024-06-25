import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom"


export const Signin = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    return <div>
        <Heading label={"Sign in"}/>
        <SubHeading label={"Enter ypur credentials to access your account"}/>
        <InputBox label={"Email"} placeholder={"name@example.com"} onChange={e => {
            setUsername(e.target.value);
        }}/>
        <InputBox label={"Password"} onChange={e => {
            setPassword(e.target.value);
        }} />
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signin",{
                username,
                password
            });

            //is this even needed in sign in page as token to sirf signup min milta hai
            localStorage.setItem("token", response.data.token)
            navigate("/dashboard")
        }} label={"Sign up"}/>
        <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>

    </div>
}