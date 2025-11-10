import React, { useState } from "react";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState(""); 

    const handleSubmit = async (e) => {
        console.log("Title:", title);
        console,log("Description:", description);
    };

    return(
        <div>
            <div></div>

        </div>        


        
    )