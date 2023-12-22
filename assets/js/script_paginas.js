
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
    // url.searchParams.set('p', number)
    // console.log(url.href)
    
    let params = new URLSearchParams(window.location.search);
    params.set('p', number);
    window.location.search = params;

    // fetch(url.href, {
    //     method: 'GET',
    //     headers: { 'Content-Type': 'application/json' },
    // }).then((response) => response.json())
    // .then((response) => {
    //     console.log(response)
    // })
    // .catch(function (err) {
    //     console.log(err)
    // })
}