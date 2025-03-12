// async1(function (input, result){
//     async2(function (result2){
//         async3(function (result3){
//             async4(function (result4){
//                 async5(function(result5){
//                     //block of code to  be executes
//               //initatior style/input
//               //middle ware
//               //terminator

//                })
//             })
//         })
//     })
// })


function final(someInput, callback){
    callback(`${someInput} and trminated by execting callback`)
}

function middleware(someInput, callback){
    return final(`${someInput} touched by middleware`, callback)

}

function initiate(){
    const someInput = 'hello this is a function'
middleware(someInput, function (result){
    console.log(result)
    //requires callback to retturn the result
})
}

initiate()


//state mangement
function getSong(){
    let _Song =''
    let i = 100
    for(i; i>0; i-=1){
        _Song += `${i} beers on the wall, you take one down and pass it around, ${
            i-1
        }bottle of beer on the wall \n`

        if(i===1){
            _Song += "hey let's get some more beer"         
        }

    }
    return _Song
}
function signSong(_song){
    if(!_song) throw new Error("song is ' empty, FEED ME A SONG!")
        console.log(_song)
}


const song = getSong()
//this will work
signSong(song)