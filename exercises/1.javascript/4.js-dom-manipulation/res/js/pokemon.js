  /*==================================================================================================
        ======================================== Magic Happens Here! =======================================
        ==================================================================================================*/
        //Variables are declared.
        let base_url = "https://pokeapi.co/api/v2/";
        let poke_search = document.getElementById("pokesearch");
        let search = document.getElementById("search");
        let previous = document.getElementById("previous");
        let next = document.getElementById("next");
        let list = document.getElementById("list");
        let result_ul= document.getElementById("result");
        let pokemon_name;
        let pokemon_id;
        let pokemon_moves;
        let pokemon_abilities;
        let pokemon_image;
        let pokemon_weight;
        //EventListeners are added to HTML elements.
        list.addEventListener("click", LoadPokemonList)
        search.addEventListener("click", function() {
            LoadPokemon(poke_search.value);
        });
        poke_search.addEventListener("keyup", function(event) {
            if (event.key === "Enter") {
                LoadPokemon(poke_search.value);
            }
        })
        previous.addEventListener("click", function() {
            if (pokemon_id === undefined) {
                pokemon_id = 2;
            }
            LoadPokemon(--pokemon_id);
        });
        next.addEventListener("click", function() {
            if (pokemon_id === undefined) {
                pokemon_id = 0;
            }
            LoadPokemon(++pokemon_id);
        })
        //Function that looks up the data for a pokemon when it's given the pokemon's name or id number.
        function LoadPokemon(pokemon){
            let request = new XMLHttpRequest();
            let dots = 1;
            request.onreadystatechange = function() {
                if (this.readyState === 4 && this.status == 200 && pokemon !== "") {
                    SetVariables(JSON.parse(this.responseText));
                }
                else {
                    SetVariables(dots++);
                }
            }
            request.open("GET", base_url + "pokemon/" + pokemon.toString().toLowerCase(), true);
            request.send();
        }
        //This function changes the variables with the most recent pokemon's information.
        function SetVariables(data){
            if(typeof data === "number") {
            }
            else {
                console.log("Data found!")
                pokemon_name = data.name;
                pokemon_id = data.id;
                pokemon_moves = data.moves.map(x => x.move.name);
                pokemon_abilities = data.abilities.map(x => x.ability.name);
                pokemon_image = data.sprites.front_default;
                pokemon_weight = data.weight;
                DoThingsWithTheDom();
            }
        }
        //This function loads all of the pokemons and stores them in a list in your HTML.
        //Clicking one of the list items will then look up data for that specific pokemon!
        function LoadPokemonList() {
            let request = new XMLHttpRequest();
            list.innerHTML = "";
            request.onreadystatechange = function() {
                if (this.readyState === 4 && this.status == 200) {
                    let pokemon_list = JSON.parse(this.responseText).results.map(x => x.name);
                    for (pokemon of pokemon_list) {
                        let li = document.createElement("li");
                        li.innerHTML = pokemon;
                        li.addEventListener("click", function() {
                            LoadPokemon(this.innerHTML);
                        })
                        list.append(li);
                    }
                }
            }
            request.open("GET", base_url + "pokemon?offset=0&limit=807", true);
            request.send();
        }
        //Function that you can call to see the current pokemon's information
        function LogPokeData() {
            console.dir("Name: " + pokemon_name
            + "\n" + "ID: " + pokemon_id
            + "\n" + "Moves:", pokemon_moves
            , "\n" + "Abilities:", pokemon_abilities
            , "\n" + "Image URL: " + pokemon_image
            + "\n" + "Weight: " + pokemon_weight);
        }
        /*==================================================================================================
        ======================================== Magic Ends Here! ==========================================
        ==================================================================================================*/
        function DoThingsWithTheDom() {
            document.getElementById("name").innerHTML = pokemon_name;
            document.getElementById("image").src = pokemon_image;
            document.getElementById("weight").innerHTML = pokemon_weight / 10 + " kg";
            document.getElementById("moves").innerHTML = pokemon_moves;
            document.getElementById("abilities").innerHTML = pokemon_abilities;
            
        }
        function showstats(){
            
        }
        // for (var i=0; i<words.length; i++){
        //     words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        //     ans22 += words[i] + "<br>"; 
        //   }