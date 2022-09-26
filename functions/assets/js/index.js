/* eslint-disable camelcase */
/* eslint-disable no-undef */

// add data

$("#add_record").submit(function(event) {
  event.preventDefault();

  const data = $(this).serializeArray();

  const records = {
    "url": "http://localhost:3000/api/records",
    "method": "POST",
    "data": data,
  };

  $.ajax(records).done(function(response) {
    alert("Data Updated Successfully");
  }).fail(function(err) {
    alert("Data cannot be empty");
  });
});

$("#add_details").submit(function(event) {
  event.preventDefault();

  const data = $(this).serializeArray();

  const details = {
    "url": "http://localhost:3000/api/details",
    "method": "POST",
    "data": data,
  };

  $.ajax(details).done(function(response) {
    alert("Data Updated Successfully");
  })
      .fail(function(err) {
        alert("Data cannot be empty");
      });
});

$("#add_email").submit(function(event) {
  event.preventDefault();

  const data = $(this).serializeArray();

  const emails = {
    "url": "http://localhost:3000/api/emails",
    "method": "POST",
    "data": data,
  };

  $.ajax(emails).done(function(response) {
    alert("Data Updated Successfully");
  })
      .fail(function(err) {
        alert("Data cannot be empty");
      });
});

// update data

$("#update_record").submit(function(event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  const data = {};

  $.map(unindexed_array, function(n, i) {
    data[n["name"]] = n["value"];
  });


  const request1 = {
    "url": `http://localhost:3000/api/records/${data.id}`,
    "method": "PUT",
    "data": data,
  };

  $.ajax(request1).done(function(response) {
    alert("Data Updated Successfully");
  });
});

$("#update_email").submit(function(event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  const data = {};

  $.map(unindexed_array, function(n, i) {
    data[n["name"]] = n["value"];
  });

  const request2 = {
    "url": `http://localhost:3000/api/emails/${data.id}`,
    "method": "PUT",
    "data": data,
  };

  $.ajax(request2).done(function(response) {
    alert("Data Updated Successfully");
  });
});

$("#update_details").submit(function(event) {
  event.preventDefault();

  const unindexed_array = $(this).serializeArray();
  const data = {};

  $.map(unindexed_array, function(n, i) {
    data[n["name"]] = n["value"];
  });

  const request3 = {
    "url": `http://localhost:3000/api/details/${data.id}`,
    "method": "PUT",
    "data": data,
  };

  $.ajax(request3).done(function(response) {
    alert("Data Updated Successfully");
  });
});

// delete data

if (window.location.pathname == "/app/records") {
  $(".table tbody td a.delete").click(function() {
    const id = $(this).attr("data-id");

    const request = {
      "url": `/app/api/records/${id}`,
      "method": "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function(response) {
        alert("Data Deleted Successfully");
        location.reload();
      });
    }
  });
}

if (window.location.pathname == "/app/emails") {
  $(".table tbody td a.delete").click(function() {
    const id = $(this).attr("data-id");

    const request = {
      "url": `/app/api/emails/${id}`,
      "method": "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function(response) {
        alert("Data Deleted Successfully");
        location.reload();
      });
    }
  });
}

if (window.location.pathname == "/app/details") {
  $(".table tbody td a.delete").click(function() {
    const id = $(this).attr("data-id");

    const request = {
      "url": `/app/api/details/${id}`,
      "method": "DELETE",
    };

    if (confirm("Do you really want to delete this record?")) {
      $.ajax(request).done(function(response) {
        alert("Data Deleted Successfully");
        location.reload();
      });
    }
  });
}

