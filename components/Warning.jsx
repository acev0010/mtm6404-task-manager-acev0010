
import React from "react";

export default function Warning(props){
    return (
        <div class="card info alert-warning" className="warning">

<div class="card-body ">
    <h5 class="card-title">Warning: Overdue tasks</h5>
    <p class="card-text">You have some overdue tasks for {props.course}.</p>
    
    <a href="#" class="btn btn-warning">See tasks</a>
</div>
</div>

)
}

