
$("#add_record").submit(function(event){
    if(!request){
        alert("Content cannot be empty");
    }else{
        alert("Data Inserted Successfully");
    }
    
})

$("#update_record").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request1 = {
        "url" : `http://localhost:3000/api/records/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    var request2 = {
        "url" : `http://localhost:3000/api/contacts/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    var request3 = {
        "url" : `http://localhost:3000/api/locations/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    var request4 = {
        "url" : `http://localhost:3000/api/emails/${data.id}`,
        "method" : "PUT",
        "data" : data
    }


    $.ajax(request1).done(function(response){
        alert("Data Updated Successfully");
    })

    $.ajax(request2).done(function(response){
        alert("Data Updated Successfully");
    })

    $.ajax(request3).done(function(response){
        alert("Data Updated Successfully");
    })

    $.ajax(request4).done(function(response){
        alert("Data Updated Successfully");
    })


})



if(window.location.pathname == "/records"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/records/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully");
                location.reload();
            })
        }

    })
}

if(window.location.pathname == "/contacts"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/contacts/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully");
                location.reload();
            })
        }

    })
}

if(window.location.pathname == "/locations"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/locations/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully");
                location.reload();
            })
        }

    })
}

if(window.location.pathname == "/emails"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/emails/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully");
                location.reload();
            })
        }

    })
}


