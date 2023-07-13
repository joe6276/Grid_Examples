
// const getUser=()=>{
//     setTimeout(()=>{
//         return {name:"Max"}
//     },0)
// }

// const user = getUser() //{name:"Max"}
// console.log(user.name);

// const btn = document.getElementById('btn')


// function trackMe(){
//     navigator.geolocation.getCurrentPosition(positionData=>{
//        setTimeout(()=>{
//         console.log(positionData);
//        },2000)
//     },error=>{
//         console.log(error);
//     })
// }
// function getLocation(){
//     const promise = new Promise((resolve, reject)=>{
//         navigator.geolocation.getCurrentPosition(positionData=>{
//             resolve(positionData)
//         }, error=>{
//             reject(error)
//         })
//     })
//     return promise
// }
// function getPosts(){
//     const promise=new Promise((resolve,reject)=>{
//         fetch("https://jsonplaceholder.typicode.com/posts").then(
//             response=>{
//                 let posts = response.json()
//                 resolve(posts)
//             }
//         ).catch(error=>{
//             reject(error)
//         })
//     })
//     return promise;
// }

// function timer(duration){
//     const promise =new Promise((resolve, reject)=>{
//         setTimeout(()=>{
//             resolve("Hello World")
//         }, duration)
//     })

//     return promise 
// }

// async function trackMe(){
//      try {
//         const positionData = await getLocation()
//         const message= await timer(3000)
//         const posts= await getPosts()
//         console.log(positionData,message,posts);
//     }catch (error) {
//         console.log(error);
//     }
//  }
// function trackMe(){
//     let position;
//  getLocation().then(positonData=>{//success state 
//         position=positonData
//     // We can set this back to pending
//     return timer(2000) // success=> pending
//  }).then(message=>{
//     console.log(position,message);
//  })
//  .catch(error=>{  // Does not stop the executon
//     console.log(error);
//     return " We can get Data From the Other API"
//  }).then(other=>{
//     console.log(other);
//  })
//  }
    
// btn.addEventListener('click',trackMe)


// console.log("Hello World");





// getPosts().then(posts=>{
//     console.log(posts);
// }).catch(error=>{
//     console.log(error);
// })

const app= document.getElementById('app')
const carName= document.getElementById('name')
const carDescription=document.getElementById('description')
const carImage =document.getElementById('image')
const carPrice= document.getElementById('price')
const btn = document.getElementById('submit')

class Car{
    static async showCars(){
        const response= await fetch('http://localhost:3000/cars')
        const cars= await response.json()

        // Displaying then on the UI

        let html=''

        cars.forEach(car=>{
            html+=`
            <div class="item">
            <img src=${car.image} alt=${car.name}/>
            <h1>${car.name}</h1>
            <p>${car.description}</p>
            <p>$ ${car.price}</p>
            <div class="btn">
            <button  onclick="Car.UpdateCar(${car.id})" class="upt">Update</button>
            <button onclick="Car.DeleteCar(${car.id})" class="del">Delete</button>
            </div>
        </div>`

        
        })

        // console.log(html);

        app.innerHTML=html
    }

    static async AddCar(){
        // console.log(Car.readValues());
        const newCar= Car.readValues()
        // console.log(newCar, JSON.stringify(newCar));
        await fetch('http://localhost:3000/cars',{
            method:'POST',
            body:JSON.stringify(newCar),
            headers:{
                "Content-Type":"application/json"
            }
        })

    }

    static readValues(){
        const image = carImage.value
        const description= carDescription.value
        const price= carPrice.value
        const name=carName.value
        return {image,description,price,name}
    }

    static async DeleteCar(id){

        // console.log(id);
        await fetch(`http://localhost:3000/cars/${id}`,{
            method:'DELETE',
            headers:{
                "Content-Type":"application/json"
            }
        })
    }


    static async UpdateCar(id){
        const response= await fetch(`http://localhost:3000/cars/${id}`)
        const car= await response.json()
        Car.Prepopulate(car)

        btn.addEventListener('click', ()=>{
            const updatedCar= Car.readValues()
            if(btn.innerText==='Update'){
                Car.Update(id,updatedCar)
            }
        })
   
    }

    static async Update(id, updatedCardetails){
        await fetch(`http://localhost:3000/cars/${id}`,{
            method:'PATCH',
            body:JSON.stringify(updatedCardetails),
            headers:{
                "Content-Type":"application/json"
            }
        })
    }

    static Prepopulate(car){
        carImage.value = car.image
        carDescription.value=car.description
        carPrice.value=car.price
        carName.value=car.name

        btn.innerText="Update"
    }
}

Car.showCars()
btn.addEventListener('click', ()=>{
    if(btn.innerText==='Submit'){
        Car.AddCar()
    }
})