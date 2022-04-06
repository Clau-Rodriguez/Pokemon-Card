console.log("Hola")






document.addEventListener("DOMContentLoaded", () => {
    const random = getRamdomInt(1, 151)
    fetchData(random)
})

const getRamdomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min
}

const fetchData = async (id) => {
    try{
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const data = await res.json()
        const pokemon = {
            img: data.sprites.other.dream_world.front_default,
            name: data.name,
            gif: data.sprites.versions["generation-v"]["black-white"].animated.front_default,
            hp: data.stats[0].base_stat,
            hp_name: data.stats[0].stat.name,
            attack: data.stats[1].base_stat,
            attack_name: data.stats[1].stat.name,
            deffense:data.stats[2].base_stat,
            defense_name: data.stats[2].stat.name,
            exp: data.base_experience
        }
        paintCard(pokemon)
    } catch (error){
        console.log(error)
    }
}



const paintCard = (pokemon) => {
    const flex = document.querySelector(".flex")
    const template = document.querySelector("#template-card").content
    const clone = template.cloneNode(true)
    const fragment = document.createDocumentFragment()


    clone.querySelector(".card-body-img").setAttribute("src",pokemon.gif)
    clone.querySelector(".card-body-title").innerHTML = `${pokemon.name}`
    //pokemon.sprites.versions.generation-v.black-white.animated.front_default
    //pokemon.sprites.other.dream_world.front_default

    clone.querySelector(".card-body-tex").textContent = `${pokemon.exp} EXP`

    clone.querySelectorAll(".card-footer-social h3")[0].textContent = `${pokemon.attack}`
    clone.querySelectorAll(".card-footer-social p")[0].textContent = `${pokemon.attack_name}`

    clone.querySelectorAll(".card-footer-social h3")[1].textContent = `${pokemon.hp}`
    clone.querySelectorAll(".card-footer-social p")[1].textContent = `${pokemon.hp_name}`

    clone.querySelectorAll(".card-footer-social h3")[2].textContent = `${pokemon.deffense}`
    clone.querySelectorAll(".card-footer-social p")[2].textContent = `${pokemon.defense_name}`


    fragment.appendChild(clone)
    flex.appendChild(fragment)



}

