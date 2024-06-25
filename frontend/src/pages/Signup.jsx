import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "axios";
import { useNavigate } from "react-router-dom"

export function Signup() {

    const [firstName, setfirstname] = useState("");
    const [lastName, setlastname] = useState("");
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");

    const navigate = useNavigate();


    return <div>
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your information to create an account"} />
        <InputBox label={"First Name"} placeholder={"Deependra"} onChange={e => {
            setfirstname(e.target.value);
        }} />
        <InputBox label={"Last Name"} placeholder={"Kumar"} onChange={e => {
            setlastname(e.target.value);
        }} />
        <InputBox label={"Email"} placeholder={"name@example.com"} onChange={e => {
            setusername(e.target.value);
        }} />
        <InputBox label={"Password"} placeholder={"123456"} onChange={e => {
            setpassword(e.target.value);
        }} />
        <Button onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                firstName,
                lastName,
                password
            });

            localStorage.setItem("token", response.data.token)
            //showAlert("User regsiteresd Successfully")
            navigate("/dashboard")
        }} label={"Sign up"} />
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
    </div>
}
