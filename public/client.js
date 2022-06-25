

let btnadd = document.getElementById('btnaddflight')
btnadd.addEventListener('click', (e) => {
    let title = document.getElementById('title').value
    let time = document.getElementById('time').value
    let price = document.getElementById('price').value
    let date = document.getElementById('date').value
    let error = false
    let mgs = ''
    if(title==''){
    msg = 'enter flight title\n'
    error = true
    }
    if(time==''){
        msg += 'enter flight time\n'
        error = true
    }
    if(price==''){
        msg += 'enter flight price\n'
        error = true
    }
    if(date==''){
        msg += 'enter flight date\n'
        error = true
    }

    if(!error){
        $.ajax({
            type: "POST",
            url: "/bookflight",
            data: { 
                'id':id,
                'title': title,
                'time':time,
                'price':price,
                'date':date
            },
            success: function(data) {
                if(data.success){
                    fillTable(data.flights)
                    alert(data.msg)
                }else{
                    alert(data.msg)
                }
            },
            error: function(jqXHR, textStatus, err) {
                alert('text status '+textStatus+', err '+err)
            }
        });
    }else{
        alert(msg)
    }
})

let table =document.getElementById('table')
table.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-info')){
        document.getElementById('id').innerHTML = e.target.parentNode.parentNode.children[0].innerHTML
        document.getElementById('title').value = e.target.parentNode.parentNode.children[1].innerHTML
        document.getElementById('time').value  = e.target.parentNode.parentNode.children[3].innerHTML
        document.getElementById('price').value = e.target.parentNode.parentNode.children[2].innerHTML
        document.getElementById('date').value = e.target.parentNode.parentNode.children[4].innerHTML
    }
})

let btnupdate = document.getElementById('btnupdateflight')
btnupdate.addEventListener('click', (e) => {
    let id = document.getElementById('id').innerHTML
    let title = document.getElementById('title').value
    let time = document.getElementById('time').value
    let price = document.getElementById('price').value
    let date = document.getElementById('date').value
    let error = false
    let mgs = ''
    if(title==''){
    msg = 'enter flight title\n'
    error = true
    }
    if(time==''){
        msg += 'enter flight time\n'
        error = true
    }
    if(price==''){
        msg += 'enter flight price\n'
        error = true
    }
    if(date==''){
        msg += 'enter flight date\n'
        error = true
    }

    if(!error){
        $.ajax({
            type: "POST",
            url: "/updateflight",
            data: {
                'id' : id, 
                'title': title,
                'time':time,
                'price':price,
                'date':date
            },
            success: function(data) {
                if(data.success){
                    fillTable(data.flights)
                    alert(data.msg)
                }else{
                    alert(data.msg)
                }
            },
            error: function(jqXHR, textStatus, err) {
                alert('text status '+textStatus+', err '+err)
            }
        });
    }else{
        alert(msg)
    }
})

table.addEventListener('click', (e) => {
    if(e.target.classList.contains('btn-info')){
        document.getElementById('title').value = e.target.parentNode.parentNode.children[1].innerHTML
        document.getElementById('time').value  = e.target.parentNode.parentNode.children[3].innerHTML
        document.getElementById('price').value = e.target.parentNode.parentNode.children[2].innerHTML
        document.getElementById('date').value = e.target.parentNode.parentNode.children[4].innerHTML
    }
})

const fillTable = (data) => {
    let table = document.getElementById('table')
    for(let i=table.children.length-1;i>=0;i--){
        table.removeChild(table.children[i])
    }

    for(item of data){
        let row = document.createElement('tr')
        row.innerHTML = '<td>' + item.title + '</td>' +
                        '<td>' + item.price + '</td>' +
                        '<td>' + item.price + '</td>' +
                        '<td>' + item.time + '</td>' +
                        '<td><button type="button" class="btn btn-info">Edit</button><button type="button" class="btn btn-danger">Delete</button></td>'
        table.append(row)
    }
}

