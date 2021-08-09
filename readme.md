# pokemon

## Project Requirements

```
- Create a VueJs App that displays Pokémons.
    -Requirements:
    - The end-user is able to navigate through a list of the first 150 Pokémons.
    - For each Pokémon, display the following: name, image, height and weight.
    - At first load do not display more than 50 Pokémons.
    - The editor should be able to choose between two types of navigation:
        1. By having a load more button which load the next 15 Pokémons.
        2. By having a pagination (30 Pokémons maximum per page).
```

## How it works?

### View 1

```
- when component is created, it dispatches an action --> loadPokemons

- loadPokemons
    loading --> 1
    dispatch action: loadPokemons [calls api]
        - with limit 50 it creates array and map  function getPokemonFromUrl to generate promises
        - wait for promise to resolve
        - transform array to make it compitable with the code
        - return transformed array
    loading --> 0

- on button is clicked, loadMoreHandler is called

- loadMoreHandler
    loading --> 1
    dispatch action: loadMorePokemons[calls api]
        - create a object with limit and offset
        - use the object to call the api
        - then same as above
    loading --> 0

- when loading the button will display loading instead of load more.

```

### View 2

```
To be updated...
```

### Noteworthy mentions

```
To be updated...
```
