import { useState } from "react";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { useSearchParams } from 'react-router-dom';
import axios from "axios";

export function SendMoney() {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);

    return <div>
        <div>
            <Heading label={"Send Money"} />
        </div>

        <div>
            <div>
                <span>{name[0].toUpperCase()}</span>
            </div>
            <h3 class="text-2xl font-semibold">{name}</h3>
        </div>
        
        <div>
            <InputBox label={"amount (in Rs"} placeholder={"Enter Amount"} onChange={(e) => {
                setAmount(e.target.value);
            }} />
        </div>

       
        <div>
            <Button label={"Initiate Transfer"} onClick={() => {
                axios.post("http://localhost:3000/api/v1/account/transfer",{
                    to:id,
                    amount
                },{
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                })
            }} />
        </div>
    </div>
}