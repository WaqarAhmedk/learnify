import React from 'react'

export default function Datetimepicker(props) {
    return (
      
        
        <section class="container">
            <div className="input-group mb-3">
            <label for="exampleFormControlTextarea1" className="form-label">{props.title}</label>
            <form>
                <div class="row form-group">
                    <label for="date" class="col-sm-1 col-form-label">Date</label>
                    <div class="col-sm-4">
                        <div class="input-group date" id="datepicker">
                            <input type="date" class="form-control" />
                            <span class="input-group-append">
                                <span class="input-group-text bg-white">
                                    <i class="fa fa-calendar"></i>
                                </span>
                            </span>
                        </div>
                    </div>
                </div>
            </form>
            </div>
        </section>

  
  )
}
