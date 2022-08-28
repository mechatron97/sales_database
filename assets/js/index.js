
$("#add_record").submit(function(event){
    event.preventDefault();

    var records = {
        "url" : `http://localhost:3000/api/records`,
        "method" : "POST",
        "data" : $("form").serialize()
    }

    var emails = {
        "url" : `http://localhost:3000/api/emails`,
        "method" : "POST",
        "data" : $("form").serialize()
    }

    var details = {
        "url" : `http://localhost:3000/api/details`,
        "method" : "POST",
        "data" : $("form").serialize()
    }

    $.ajax(records).done(function(response){
        alert("Data Updated Successfully");
    })
    .fail(function(err){
        alert("Data cannot be empty");
    })

    $.ajax(emails).done(function(response){
        alert("Data Updated Successfully");
    })
    .fail(function(err){
        alert("Data cannot be empty");
    })

    $.ajax(details).done(function(response){
        alert("Data Updated Successfully");
    })
    .fail(function(err){
        alert("Data cannot be empty");
    })

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
        "url" : `http://localhost:3000/api/emails/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    var request3 = {
        "url" : `http://localhost:3000/api/details/${data.id}`,
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

if(window.location.pathname == "/details"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/details/${id}`,
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

