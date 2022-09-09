import React from 'react'
import { useState } from 'react';

export default function CreateAssignment() {
    const [title ,setTitle]=useState("")
    return (
        <form>
            <div class="form-group">
                <label for="examzpleInputEmail1">Topic Name</label>
                <input type="text" class="form-control" placeholder="Enter Course name" value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }} />
            </div>



        </form>
    )
}
