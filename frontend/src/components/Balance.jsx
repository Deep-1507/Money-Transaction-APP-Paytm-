import axios from "axios";
import { useState } from "react";

export function Balance({value}){
   
    return <div>
        <div>
            Your balance is : Rs {value}
        </div>
    </div>
}