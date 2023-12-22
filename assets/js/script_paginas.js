
// function changeURLNumber(number){
    
//     fetch(`/table_data`, {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//     }).then((response) => response.json())
//         .then((response) => {
//             console.log(response)
//         })
//         .catch(function (err) {
//             console.log(err)
//         })
// }



function changeURLNumber(number) {
    let url = new URL("http://localhost:3000/tabla");
    url.searchParams.set('p', number)
    console.log(url.href)

    fetch(url.href, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    }).then((response) => response.json())
    .then((response) => {
        console.log(response)
    })
    .catch(function (err) {
        console.log(err)
    })
}